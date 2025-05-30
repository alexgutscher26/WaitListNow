# Custom Domain Feature - Technical Specification

## Overview

The Custom Domain feature allows users to serve their waitlist forms from their own domain instead of the default waitlistnow.com domain. This enhances brand consistency and professionalism for users' waitlist campaigns.

## User Stories

1. As a user, I want to add my own domain to use with my waitlists
2. As a user, I want to verify ownership of my domain through DNS records
3. As a user, I want to select which domain to use when creating or editing a waitlist
4. As a user, I want my embedded waitlist to be served from my custom domain
5. As a user, I want to manage multiple custom domains (Pro/Business plans only)
6. As a user, I want to see the verification status of my domains

## Database Schema Changes

Add a new `CustomDomain` model to the Prisma schema:

```prisma
model CustomDomain {
  id          String    @id @default(cuid())
  domain      String    @unique
  verified    Boolean   @default(false)
  verificationCode String @unique @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  waitlistId  String?
  waitlist    Waitlist? @relation(fields: [waitlistId], references: [id], onDelete: SetNull)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId])
  @@index([waitlistId])
}

// Update existing models
model User {
  // existing fields
  customDomains CustomDomain[]
  // Add plan field if not already present
  plan         String    @default("free") // "free", "pro", "business"
}

model Waitlist {
  // existing fields
  customDomains CustomDomain[]
}
```

## API Endpoints

### Domain Management

1. **Add Domain**

   - Endpoint: `POST /api/domains`
   - Request Body: `{ domain: string }`
   - Response: `{ id: string, domain: string, verified: boolean, verificationCode: string }`
   - Authorization: Requires authentication
   - Validation: Check if domain is valid and not already registered

2. **Verify Domain**

   - Endpoint: `POST /api/domains/:id/verify`
   - Response: `{ success: boolean, message: string }`
   - Authorization: Requires authentication
   - Action: Checks DNS records for verification TXT record

3. **List Domains**

   - Endpoint: `GET /api/domains`
   - Response: `{ domains: Domain[] }`
   - Authorization: Requires authentication

4. **Delete Domain**

   - Endpoint: `DELETE /api/domains/:id`
   - Response: `{ success: boolean }`
   - Authorization: Requires authentication
   - Validation: Check if domain belongs to user

5. **Assign Domain to Waitlist**
   - Endpoint: `POST /api/domains/:id/assign`
   - Request Body: `{ waitlistId: string }`
   - Response: `{ success: boolean }`
   - Authorization: Requires authentication
   - Validation: Check if domain and waitlist belong to user

### Implementation

```typescript
// src/server/routers/domain-router.ts
import { Hono } from 'hono';
import { prisma } from '../db';
import { verifyDomain } from '../utils/domain-verification';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Domain validation schema
const domainSchema = z.object({
  domain: z.string().regex(/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/),
});

// Waitlist assignment schema
const assignSchema = z.object({
  waitlistId: z.string(),
});

export const domainRouter = new Hono()
  // Add a new domain
  .post('/', zValidator('json', domainSchema), async (c) => {
    const { domain } = await c.req.json();
    const userId = c.get('userId'); // From auth middleware

    // Check user's plan for domain limits
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { customDomains: true },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Check domain limits based on plan
    const domainCount = user.customDomains.length;
    const domainLimits = {
      free: 0,
      pro: 3,
      business: 10,
    };

    if (domainCount >= domainLimits[user.plan]) {
      return c.json(
        {
          error: `Your plan allows a maximum of ${domainLimits[user.plan]} custom domains. Please upgrade to add more.`,
        },
        403,
      );
    }

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
        verificationCode: `waitlist-verify-${Math.random().toString(36).substring(2, 15)}`,
      },
    });

    return c.json({
      id: newDomain.id,
      domain: newDomain.domain,
      verified: newDomain.verified,
      verificationCode: newDomain.verificationCode,
    });
  })

  // Verify domain ownership
  .post('/:id/verify', async (c) => {
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

    // Verify domain ownership (DNS check)
    const isVerified = await verifyDomain(domain.domain, domain.verificationCode);

    if (isVerified) {
      await prisma.customDomain.update({
        where: { id: domainId },
        data: { verified: true },
      });

      return c.json({
        success: true,
        message: 'Domain verified successfully',
      });
    }

    return c.json({
      success: false,
      message: 'Domain verification failed. Please check your DNS settings.',
    });
  })

  // List user's domains
  .get('/', async (c) => {
    const userId = c.get('userId'); // From auth middleware

    const domains = await prisma.customDomain.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { waitlist: { select: { id: true, name: true } } },
    });

    return c.json({ domains });
  })

  // Delete a domain
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
  })

  // Assign domain to waitlist
  .post('/:id/assign', zValidator('json', assignSchema), async (c) => {
    const domainId = c.req.param('id');
    const { waitlistId } = await c.req.json();
    const userId = c.get('userId'); // From auth middleware

    // Check if domain exists and belongs to user
    const domain = await prisma.customDomain.findFirst({
      where: {
        id: domainId,
        userId,
      },
    });

    if (!domain) {
      return c.json({ error: 'Domain not found' }, 404);
    }

    // Check if waitlist exists and belongs to user
    const waitlist = await prisma.waitlist.findFirst({
      where: {
        id: waitlistId,
        userId,
      },
    });

    if (!waitlist) {
      return c.json({ error: 'Waitlist not found' }, 404);
    }

    // Check if domain is verified
    if (!domain.verified) {
      return c.json(
        { error: 'Domain must be verified before it can be assigned to a waitlist' },
        400,
      );
    }

    // Update domain with waitlist assignment
    await prisma.customDomain.update({
      where: { id: domainId },
      data: { waitlistId },
    });

    return c.json({ success: true });
  });
```

## Domain Verification

Create a utility for verifying domain ownership through DNS TXT records:

```typescript
// src/server/utils/domain-verification.ts
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

/**
 * Verify domain ownership by checking for a TXT record
 * @param domain The domain to verify
 * @param verificationCode The verification code to look for
 * @returns Promise<boolean> True if verified, false otherwise
 */
export async function verifyDomain(domain: string, verificationCode: string): Promise<boolean> {
  try {
    // Construct the verification domain
    const verificationDomain = `_waitlistnow-verification.${domain}`;

    // Resolve TXT records
    const records = await resolveTxt(verificationDomain);

    // Check if any record matches the verification code
    return records.some((record) => record.some((value) => value === verificationCode));
  } catch (error) {
    console.error(`Error verifying domain ${domain}:`, error);
    return false;
  }
}
```

## CORS Configuration

Update the CORS configuration to allow requests from verified custom domains:

```typescript
// src/server/index.ts
import { prisma } from './db';

// Cache verified domains to avoid database queries on every request
let verifiedDomains: string[] = [];
let lastCacheUpdate = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getVerifiedDomains(): Promise<string[]> {
  const now = Date.now();

  // Update cache if expired
  if (now - lastCacheUpdate > CACHE_TTL) {
    const domains = await prisma.customDomain.findMany({
      where: { verified: true },
      select: { domain: true },
    });

    verifiedDomains = domains.map((d) => d.domain);
    lastCacheUpdate = now;
  }

  return verifiedDomains;
}

// Check if an origin is a verified custom domain
async function isVerifiedCustomDomain(origin: string): Promise<boolean> {
  try {
    const hostname = new URL(origin).hostname;
    const domains = await getVerifiedDomains();
    return domains.includes(hostname);
  } catch (error) {
    return false;
  }
}

// Configure CORS with dynamic origin validation
const corsOptions = {
  origin: async (origin) => {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return true;

    const allowedOrigins = ['http://localhost:3000', 'https://waitlistnow.com'];

    // Check if the origin is an allowed origin
    if (allowedOrigins.some((allowed) => origin.startsWith(allowed))) return true;

    // Check if the origin is a verified custom domain
    return await isVerifiedCustomDomain(origin);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

const app = new Hono().basePath('/api').use(cors(corsOptions));
```

## Custom Domain Middleware

Create a middleware to handle requests from custom domains:

```typescript
// src/server/middleware/custom-domain.ts
import { prisma } from '../db';

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

## UI Implementation

### Domain Management Page

Create a page for users to manage their custom domains:

```tsx
// src/app/dashboard/domains/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Trash, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function DomainsPage() {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(null);
  const { toast } = useToast();

  // Fetch domains on page load
  useEffect(() => {
    fetchDomains();
  }, []);

  // Fetch domains from API
  const fetchDomains = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/domains');
      const data = await response.json();
      setDomains(data.domains);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load domains',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new domain
  const addDomain = async (e) => {
    e.preventDefault();

    if (!newDomain) return;

    try {
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: newDomain }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add domain');
      }

      toast({
        title: 'Domain added',
        description: 'Please add the verification record to your DNS settings',
      });

      setNewDomain('');
      fetchDomains();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Verify a domain
  const verifyDomain = async (domainId) => {
    setVerifying(domainId);

    try {
      const response = await fetch(`/api/domains/${domainId}/verify`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Domain verified successfully',
        });
        fetchDomains();
      } else {
        toast({
          title: 'Verification failed',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify domain',
        variant: 'destructive',
      });
    } finally {
      setVerifying(null);
    }
  };

  // Delete a domain
  const deleteDomain = async (domainId) => {
    if (!confirm('Are you sure you want to delete this domain?')) {
      return;
    }

    try {
      const response = await fetch(`/api/domains/${domainId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete domain');
      }

      toast({
        title: 'Domain deleted',
        description: 'The domain has been removed',
      });

      fetchDomains();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Custom Domains</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add a Custom Domain</CardTitle>
          <CardDescription>
            Use your own domain for your waitlist forms. You'll need to verify ownership by adding a
            TXT record to your DNS settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={addDomain}
            className="flex gap-4"
          >
            <Input
              placeholder="waitlist.yourdomain.com"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Add Domain</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Your Domains</h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <RefreshCw className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : domains.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              You haven't added any custom domains yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {domains.map((domain) => (
            <Card key={domain.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{domain.domain}</CardTitle>
                  <Badge variant={domain.verified ? 'success' : 'outline'}>
                    {domain.verified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                {domain.waitlist && (
                  <CardDescription>Assigned to: {domain.waitlist.name}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {!domain.verified ? (
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      Verification Required
                    </h3>
                    <p className="text-sm mb-2">
                      Add the following TXT record to your DNS settings:
                    </p>
                    <div className="bg-background p-2 rounded border mb-2">
                      <p className="text-sm font-mono mb-1">Name:</p>
                      <p className="text-sm font-mono font-bold">
                        _waitlistnow-verification.{domain.domain}
                      </p>
                    </div>
                    <div className="bg-background p-2 rounded border">
                      <p className="text-sm font-mono mb-1">Value:</p>
                      <p className="text-sm font-mono font-bold">{domain.verificationCode}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-semibold flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Domain Verified
                    </h3>
                    <p className="text-sm mt-2">
                      Your domain is verified and ready to use with your waitlists.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!domain.verified && (
                  <Button
                    variant="outline"
                    onClick={() => verifyDomain(domain.id)}
                    disabled={verifying === domain.id}
                  >
                    {verifying === domain.id ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Domain'
                    )}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteDomain(domain.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Domain Selection in Waitlist Form

Add domain selection to the waitlist creation/editing form:

```tsx
// In the waitlist form component
import { useEffect, useState } from 'react';

// Add to the form state
const [verifiedDomains, setVerifiedDomains] = useState([]);
const [selectedDomainId, setSelectedDomainId] = useState('');

// Fetch verified domains on component mount
useEffect(() => {
  async function fetchDomains() {
    try {
      const response = await fetch('/api/domains');
      const data = await response.json();

      // Filter to only verified domains
      const verified = data.domains.filter((domain) => domain.verified);
      setVerifiedDomains(verified);

      // If editing an existing waitlist, set the selected domain
      if (waitlistData?.customDomainId) {
        setSelectedDomainId(waitlistData.customDomainId);
      }
    } catch (error) {
      console.error('Failed to load domains:', error);
    }
  }

  fetchDomains();
}, [waitlistData]);

// Add to the form JSX
<div className="space-y-2">
  <Label>Domain for Embedding</Label>
  <Select
    value={selectedDomainId}
    onValueChange={setSelectedDomainId}
  >
    <SelectTrigger>
      <SelectValue placeholder="Default (waitlistnow.com)" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="">Default (waitlistnow.com)</SelectItem>
      {verifiedDomains.map((domain) => (
        <SelectItem
          key={domain.id}
          value={domain.id}
        >
          {domain.domain}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  <p className="text-sm text-muted-foreground">
    Select a domain to use for your embedded waitlist.
    <Link
      href="/dashboard/domains"
      className="text-primary ml-1"
    >
      Manage domains
    </Link>
  </p>
</div>;

// Update the form submission to include the selected domain
const formData = {
  // Other form fields
  customDomainId: selectedDomainId || null,
};
```

## Deployment Considerations

### DNS Configuration

1. **Custom Domain Handling**:

   - Configure the web server (Nginx, etc.) to handle requests for custom domains
   - Set up wildcard SSL certificates or use Let's Encrypt for dynamic SSL provisioning

2. **Proxy Configuration**:
   - Set up a proxy to route requests from custom domains to the appropriate waitlist

### SSL Certificates

1. **Automatic SSL Provisioning**:

   - Implement automatic SSL certificate provisioning for verified domains
   - Use Let's Encrypt or a similar service for free SSL certificates

2. **Certificate Renewal**:
   - Set up automatic renewal of SSL certificates
   - Implement monitoring for certificate expiration

## Testing Plan

1. **Unit Tests**:

   - Test domain validation logic
   - Test DNS verification utility
   - Test CORS configuration

2. **Integration Tests**:

   - Test domain management API endpoints
   - Test domain assignment to waitlists
   - Test custom domain middleware

3. **End-to-End Tests**:
   - Test adding and verifying a domain
   - Test embedding a waitlist with a custom domain
   - Test form submission through a custom domain

## Rollout Plan

1. **Phase 1 - Database Migration**:

   - Add CustomDomain model to the database
   - Run migrations

2. **Phase 2 - Backend Implementation**:

   - Implement domain management API
   - Implement domain verification
   - Update CORS configuration

3. **Phase 3 - Frontend Implementation**:

   - Create domain management UI
   - Add domain selection to waitlist form
   - Update embed code generation

4. **Phase 4 - Testing and Deployment**:

   - Test all functionality
   - Deploy to staging environment
   - Conduct beta testing with select users

5. **Phase 5 - Production Rollout**:
   - Deploy to production
   - Monitor for issues
   - Collect user feedback

## Conclusion

The Custom Domain feature will enhance the professional appearance of waitlists and improve brand consistency for users. By following this technical specification, we can implement a robust and user-friendly custom domain system that integrates seamlessly with the existing waitlist functionality.
