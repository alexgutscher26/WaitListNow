# Custom Domain Feature for WaitListNow

This document outlines the implementation plan for adding custom domain support to the WaitListNow application, allowing users to use their own domains for waitlist pages and embeddable widgets.

## Overview

The custom domain feature will enable users to:

1. Connect their own domains to their WaitListNow waitlists
2. Provide a professional, branded experience for their users
3. Maintain brand consistency across all touchpoints
4. Choose between using the default domain (waitlist.yourdomain.com) or their own custom domain

## Implementation Plan

### 1. Database Schema Updates

Add a new model to the Prisma schema to store custom domain information:

```prisma
model CustomDomain {
  id            String       @id @default(cuid())
  domain        String       @unique
  waitlistId    String
  waitlist      Waitlist     @relation(fields: [waitlistId], references: [id], onDelete: Cascade)
  userId        String
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  status        DomainStatus @default(PENDING)
  verificationToken String?
  verifiedAt    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@index([domain])
  @@index([userId])
  @@index([waitlistId])
}

enum DomainStatus {
  PENDING
  VERIFIED
  ACTIVE
  FAILED
}
```

### 2. User Interface Components

#### 2.1 Domain Settings Page

Create a new page in the dashboard for managing custom domains:

- Path: `/dashboard/waitlists/[id]/domains`
- Features:
  - Add new domain
  - View domain status
  - Verify domain ownership
  - Set primary domain
  - Remove domains

#### 2.2 Domain Setup Wizard

Create a step-by-step wizard to guide users through the domain setup process:

1. Enter domain name
2. Choose configuration method (DNS records or CNAME)
3. Verify domain ownership
4. Activate domain

#### 2.3 Domain Card Component

Create a reusable component to display domain information:
- Domain name
- Status indicator (pending, verified, active, failed)
- Last verified date
- Actions (verify, set as primary, delete)

### 3. Backend API Endpoints

#### 3.1 Domain Management

Create the following API endpoints:

- `POST /api/domains` - Add a new custom domain
- `GET /api/domains` - List all domains for the user
- `GET /api/domains/:id` - Get details for a specific domain
- `DELETE /api/domains/:id` - Remove a domain
- `POST /api/domains/:id/verify` - Trigger domain verification
- `POST /api/domains/:id/primary` - Set domain as primary

#### 3.2 Domain Verification

Implement two verification methods:

1. **DNS TXT Record Verification**
   - Generate a unique verification token
   - User adds a TXT record to their DNS settings
   - System verifies the presence of the token

2. **CNAME Verification**
   - User adds a CNAME record pointing to our verification subdomain
   - System verifies the CNAME is correctly configured

### 4. Server Configuration

#### 4.1 Domain Routing

Update the server configuration to handle requests from custom domains:

- Configure Next.js to handle multiple domains
- Set up middleware to detect and route custom domain requests
- Implement domain-to-waitlist mapping logic

#### 4.2 SSL Certificates

Implement automatic SSL certificate provisioning for custom domains:

- Use Let's Encrypt for certificate generation
- Implement certificate renewal process
- Handle certificate errors gracefully

### 5. Embeddable Widget Updates

Update the embeddable widget to work with custom domains:

- Modify widget generation code to use the custom domain when available
- Update embed code snippets to reference the custom domain
- Ensure all assets and API calls use the custom domain

### 6. DNS Configuration Instructions

Create comprehensive documentation for users on how to configure their DNS settings:

#### 6.1 Root Domain Setup

Instructions for setting up a root domain (example.com):
- A record pointing to our server IP
- CNAME record for www subdomain

#### 6.2 Subdomain Setup

Instructions for setting up a subdomain (waitlist.example.com):
- CNAME record pointing to our application

### 7. Pricing Tier Integration

Integrate custom domain feature with the pricing model:

- Free tier: Use default subdomain (waitlist.yourdomain.com/[slug])
- Starter tier: One custom domain
- Growth/Pro tier: Multiple custom domains

### 8. Testing Plan

Develop a comprehensive testing plan:

- Unit tests for domain verification logic
- Integration tests for API endpoints
- End-to-end tests for the domain setup process
- Load testing to ensure performance with multiple domains

## Technical Implementation Details

### Domain Routing Implementation

The application will use a middleware approach to handle custom domains:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Skip for known application hostnames
  if (hostname.includes('waitlistnow.com') || hostname.includes('localhost')) {
    return NextResponse.next();
  }
  
  // Check if this is a custom domain
  const customDomain = await db.customDomain.findUnique({
    where: { domain: hostname, status: 'ACTIVE' },
    include: { waitlist: true },
  });
  
  if (customDomain) {
    // Rewrite the request to the waitlist page
    const url = request.nextUrl.clone();
    url.pathname = `/waitlist/${customDomain.waitlist.slug}`;
    return NextResponse.rewrite(url);
  }
  
  // Continue with normal processing if not a custom domain
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};
```

### Domain Verification Process

The domain verification process will work as follows:

1. When a user adds a new domain, the system generates a unique verification token
2. The user is instructed to add a TXT record to their DNS settings with the token
3. The system periodically checks for the presence of the token
4. Once verified, the domain status is updated to VERIFIED
5. The system then attempts to provision an SSL certificate
6. If successful, the domain status is updated to ACTIVE

```typescript
// Example verification function
async function verifyDomain(domainId: string): Promise<boolean> {
  const domain = await db.customDomain.findUnique({
    where: { id: domainId },
  });
  
  if (!domain || !domain.verificationToken) {
    return false;
  }
  
  try {
    // Use DNS resolution library to check for TXT record
    const records = await dns.resolveTxt(domain.domain);
    const verified = records.some(record => 
      record.includes(`waitlistnow-verify=${domain.verificationToken}`)
    );
    
    if (verified) {
      await db.customDomain.update({
        where: { id: domainId },
        data: { 
          status: 'VERIFIED',
          verifiedAt: new Date()
        },
      });
      
      // Trigger SSL certificate provisioning
      await provisionSSLCertificate(domain.domain);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Domain verification failed:', error);
    return false;
  }
}
```

## User Experience Flow

1. User navigates to waitlist settings and selects "Custom Domains"
2. User clicks "Add Domain" and enters their domain (e.g., waitlist.example.com)
3. System provides DNS configuration instructions
4. User updates their DNS settings with their provider
5. User clicks "Verify Domain" in the dashboard
6. System checks DNS configuration and updates status
7. Once verified, the system provisions SSL certificate
8. When active, the user can set this domain as primary
9. All waitlist links and embeds will now use the custom domain

## Implementation Timeline

1. **Week 1**: Database schema updates and API endpoint development
2. **Week 2**: User interface components and domain management page
3. **Week 3**: Domain verification and SSL certificate provisioning
4. **Week 4**: Embeddable widget updates and testing
5. **Week 5**: Documentation and final testing

## Limitations and Considerations

- DNS propagation can take up to 48 hours, affecting verification time
- SSL certificate provisioning requires proper DNS configuration
- Some DNS providers may have limitations on TXT record length
- Custom domains will require additional server resources for SSL certificates
- Rate limiting should be implemented to prevent abuse

## Future Enhancements

- Support for wildcard domains
- Domain health monitoring
- Automatic DNS verification retries
- Custom domain analytics
- Domain-specific SEO settings
- Domain-level access controls