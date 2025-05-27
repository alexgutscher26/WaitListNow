# Widget Consistency Guide

## Overview

This guide addresses the inconsistency between the waitlist preview shown in the dashboard and the actual embedded widget that appears on websites. It also explains how to implement and use custom domains with your embedded waitlists.

## Current Implementation

Currently, there are two different implementations:

1. **Dashboard Preview**: A React component (`WaitlistPreview`) that renders a preview of the waitlist form based on the user's configuration.
2. **Embedded Widget**: JavaScript code that renders the actual waitlist form on the customer's website.

The inconsistency occurs because these two implementations have different styling and behavior.

## Making the Preview and Embedded Widget Consistent

### 1. Extract Common Styling Logic

Create a shared styling module that both the preview and embedded widget can use:

```typescript
// src/lib/waitlist-styles.ts
export function getWaitlistStyles(config) {
  return {
    borderRadius: getBorderRadius(config.style.buttonRounded),
    backgroundColor: config.style.backgroundColor,
    primaryColor: config.style.primaryColor,
    // Add all other style properties
  };
}

export function getBorderRadius(size) {
  const radiusMap = {
    none: '0px',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  };
  return radiusMap[size] || '0.375rem';
}
```

### 2. Create a Shared Component Structure

Ensure both implementations follow the same component structure:

```typescript
// src/components/waitlist/WaitlistForm.tsx
import { getWaitlistStyles } from '@/lib/waitlist-styles';

export function WaitlistForm({ config, isPreview = false }) {
  const styles = getWaitlistStyles(config);
  
  return (
    <div className="waitlist-container" style={{ backgroundColor: styles.backgroundColor }}>
      {/* Form header */}
      <div className="waitlist-header">
        <h3 style={{ color: styles.primaryColor }}>{config.name || 'Join Our Waitlist'}</h3>
        {config.description && <p>{config.description}</p>}
      </div>
      
      {/* Form fields */}
      <div className={`waitlist-fields ${config.style.formLayout === 'inline' ? 'inline-layout' : ''}`}>
        {/* Email field */}
        {/* Custom fields */}
        {/* Submit button */}
      </div>
      
      {/* Branding */}
      {!config.hideBranding && (
        <div className="waitlist-branding">
          Powered by <span>WaitlistNow</span>
        </div>
      )}
      
      {/* Preview notice */}
      {isPreview && (
        <div className="preview-notice">
          This is a preview. The actual form will be fully functional when embedded.
        </div>
      )}
    </div>
  );
}
```

### 3. Use the Shared Component in the Dashboard

Update the `WaitlistPreview` component to use the shared component:

```typescript
function WaitlistPreview({ formData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Preview
        </CardTitle>
        <CardDescription>How your waitlist form will look to visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <WaitlistForm config={formData} isPreview={true} />
      </CardContent>
    </Card>
  );
}
```

### 4. Generate Embedded Widget Code Using the Same Structure

Update the embedded widget code generation to use the same structure and styling:

```typescript
const embedCode = useMemo(() => {
  const baseUrl = customDomain || 'https://waitlistnow.com';
  const waitlistId = 'new'; // This would be the actual waitlist ID in a real app

  // Use the same styling logic as the preview
  const styles = getWaitlistStyles(formData);
  
  // Create a JSON configuration that matches the structure used by the preview
  const widgetConfig = JSON.stringify({
    id: waitlistId,
    name: formData.name,
    description: formData.description,
    style: formData.style,
    customFields: formData.customFields,
    // Other configuration options
  });
  
  if (embedType === 'js') {
    return `<script src="${baseUrl}/widget.js" data-config='${widgetConfig}' async></script>`;
  } else {
    // For iframe embedding
    const params = new URLSearchParams();
    params.append('config', widgetConfig);
    const iframeUrl = `${baseUrl}/widget/embed?${params.toString()}`;
    return `<iframe src="${iframeUrl}" width="100%" height="500" frameborder="0" style="border: none; border-radius: 8px;" scrolling="no"></iframe>`;
  }
}, [formData, embedType, customDomain]);
```

## Custom Domain Implementation

### Setting Up Custom Domains

1. **Add Domain Model to Database Schema**:

```prisma
// prisma/schema.prisma
model CustomDomain {
  id        String   @id @default(cuid())
  domain    String   @unique
  verified  Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  waitlistId String?
  waitlist  Waitlist? @relation(fields: [waitlistId], references: [id], onDelete: SetNull)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([waitlistId])
}

model User {
  // existing fields
  customDomains CustomDomain[]
}

model Waitlist {
  // existing fields
  customDomains CustomDomain[]
}
```

2. **Update CORS Configuration**:

```typescript
// src/server/index.ts
const corsOptions = {
  origin: (origin) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return true;
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://waitlistnow.com',
    ];
    
    // Check if the origin is an allowed origin
    if (allowedOrigins.includes(origin)) return true;
    
    // Check if the origin is a verified custom domain
    // This would be an async function in a real implementation
    return isVerifiedCustomDomain(origin);
  },
  // Other CORS options
};
```

3. **Create API Endpoints for Domain Management**:

```typescript
// src/server/routers/domain-router.ts
import { Hono } from 'hono';
import { prisma } from '../db';
import { verifyDomain } from '../utils/domain-verification';

export const domainRouter = new Hono()
  .post('/add', async (c) => {
    const { domain } = await c.req.json();
    const userId = c.get('userId'); // From auth middleware
    
    // Check if domain is already registered
    const existingDomain = await prisma.customDomain.findUnique({
      where: { domain },
    });
    
    if (existingDomain) {
      return c.json({ error: 'Domain already registered' }, 400);
    }
    
    // Create new domain record
    const newDomain = await prisma.customDomain.create({
      data: {
        domain,
        userId,
        verified: false,
      },
    });
    
    return c.json({ domain: newDomain });
  })
  
  .post('/verify', async (c) => {
    const { domainId } = await c.req.json();
    const userId = c.get('userId'); // From auth middleware
    
    const domain = await prisma.customDomain.findFirst({
      where: {
        id: domainId,
        userId,
      },
    });
    
    if (!domain) {
      return c.json({ error: 'Domain not found' }, 404);
    }
    
    // Verify domain ownership (DNS check)
    const isVerified = await verifyDomain(domain.domain);
    
    if (isVerified) {
      await prisma.customDomain.update({
        where: { id: domainId },
        data: { verified: true },
      });
      
      return c.json({ success: true, domain });
    }
    
    return c.json({ 
      success: false, 
      message: 'Domain verification failed. Please check your DNS settings.' 
    });
  })
  
  .get('/list', async (c) => {
    const userId = c.get('userId'); // From auth middleware
    
    const domains = await prisma.customDomain.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({ domains });
  })
  
  .delete('/:id', async (c) => {
    const domainId = c.req.param('id');
    const userId = c.get('userId'); // From auth middleware
    
    const domain = await prisma.customDomain.findFirst({
      where: {
        id: domainId,
        userId,
      },
    });
    
    if (!domain) {
      return c.json({ error: 'Domain not found' }, 404);
    }
    
    await prisma.customDomain.delete({
      where: { id: domainId },
    });
    
    return c.json({ success: true });
  });
```

### Using Custom Domains with Embedded Waitlists

1. **Update Waitlist Creation Form**:

Add a dropdown to select a custom domain when creating or editing a waitlist:

```tsx
<div className="space-y-2">
  <Label>Domain for Embedding</Label>
  <select
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
    value={selectedDomainId}
    onChange={(e) => setSelectedDomainId(e.target.value)}
  >
    <option value="">Default (waitlistnow.com)</option>
    {verifiedDomains.map((domain) => (
      <option key={domain.id} value={domain.id}>
        {domain.domain}
      </option>
    ))}
  </select>
  <p className="text-sm text-muted-foreground">
    Select a domain to use for your embedded waitlist. 
    <Link href="/dashboard/domains" className="text-primary ml-1">
      Manage domains
    </Link>
  </p>
</div>
```

2. **Update Embed Code Generation**:

```typescript
const embedCode = useMemo(() => {
  // Get the selected domain or use the default
  const domain = selectedDomain ? selectedDomain.domain : 'waitlistnow.com';
  const baseUrl = `https://${domain}`;
  
  // Rest of the embed code generation
  // ...
}, [formData, embedType, selectedDomain]);
```

3. **Handle Requests from Custom Domains**:

Create a middleware to handle requests from custom domains:

```typescript
// src/server/middleware/custom-domain.ts
export async function customDomainMiddleware(c, next) {
  const host = c.req.header('host');
  
  // Skip for default domain
  if (host === 'waitlistnow.com' || host.includes('localhost')) {
    return next();
  }
  
  // Look up the custom domain
  const customDomain = await prisma.customDomain.findUnique({
    where: { domain: host },
    include: { waitlist: true },
  });
  
  if (!customDomain || !customDomain.verified) {
    return c.text('Domain not configured or verified', 404);
  }
  
  // Add the custom domain info to the context
  c.set('customDomain', customDomain);
  
  // If this domain is tied to a specific waitlist, set that as well
  if (customDomain.waitlistId) {
    c.set('waitlistId', customDomain.waitlistId);
  }
  
  return next();
}
```

## DNS Configuration for Custom Domains

To use a custom domain with WaitlistNow, you'll need to configure your DNS settings:

1. **Add a CNAME Record**:
   - Create a CNAME record pointing your domain or subdomain to `custom.waitlistnow.com`
   - Example: `waitlist.yourdomain.com` → `custom.waitlistnow.com`

2. **Verify Domain Ownership**:
   - Add a TXT record to verify domain ownership
   - Name: `_waitlistnow-verification.yourdomain.com`
   - Value: The verification code provided in your dashboard

3. **SSL Certificate**:
   - SSL certificates will be automatically provisioned once your domain is verified

## Testing Your Custom Domain

After setting up your custom domain:

1. Test the embed code with your custom domain
2. Verify that the styling is consistent with the preview
3. Check that form submissions are properly recorded
4. Test the referral functionality if enabled

## Troubleshooting

- **Domain Not Working**: Ensure DNS changes have propagated (can take up to 48 hours)
- **Styling Inconsistencies**: Clear your browser cache and reload the page
- **CORS Errors**: Check that your domain is properly verified in the dashboard