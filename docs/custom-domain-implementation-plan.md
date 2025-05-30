# Custom Domain Implementation Plan

This document outlines the step-by-step implementation plan for adding custom domain support to WaitListNow.

## Phase 1: Database and Backend (Week 1)

### Day 1-2: Database Schema Updates

- [ ] Update Prisma schema to add CustomDomain model
- [ ] Add DomainStatus enum
- [ ] Create migration
- [ ] Apply migration to development database
- [ ] Update Prisma client

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

### Day 3-5: API Endpoints

- [ ] Create domain controller with the following methods:

  - [ ] `createDomain` - Add a new custom domain
  - [ ] `listDomains` - List all domains for a user
  - [ ] `getDomain` - Get details for a specific domain
  - [ ] `deleteDomain` - Remove a domain
  - [ ] `verifyDomain` - Trigger domain verification
  - [ ] `setPrimaryDomain` - Set domain as primary

- [ ] Implement domain verification service:

  - [ ] DNS TXT record verification
  - [ ] CNAME verification
  - [ ] Verification token generation

- [ ] Add API routes:
  - [ ] `POST /api/domains`
  - [ ] `GET /api/domains`
  - [ ] `GET /api/domains/:id`
  - [ ] `DELETE /api/domains/:id`
  - [ ] `POST /api/domains/:id/verify`
  - [ ] `POST /api/domains/:id/primary`

## Phase 2: Middleware and Routing (Week 2)

### Day 1-2: Domain Routing Middleware

- [ ] Create Next.js middleware for custom domain handling
- [ ] Implement domain-to-waitlist mapping logic
- [ ] Add caching for domain lookups
- [ ] Test with mock domains

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
```

### Day 3-5: SSL Certificate Provisioning

- [ ] Research SSL certificate automation options
- [ ] Implement SSL certificate provisioning service
- [ ] Add certificate renewal process
- [ ] Implement error handling for certificate failures

## Phase 3: User Interface (Week 3)

### Day 1-2: Domain Management Page

- [ ] Create domain management page at `/dashboard/waitlists/[id]/domains`
- [ ] Implement domain list view
- [ ] Add domain status indicators
- [ ] Create domain action buttons (verify, set primary, delete)

### Day 3-4: Domain Setup Wizard

- [ ] Create step-by-step domain setup wizard
- [ ] Implement domain input validation
- [ ] Add DNS configuration instructions
- [ ] Create verification status checker

### Day 5: Domain Card Component

- [ ] Create reusable domain card component
- [ ] Implement status indicators
- [ ] Add action buttons
- [ ] Style for different states (pending, verified, active, failed)

## Phase 4: Embeddable Widget Updates (Week 4)

### Day 1-2: Widget Code Generation

- [ ] Update widget code generation to use custom domains
- [ ] Modify embed code snippets to reference custom domains
- [ ] Ensure all assets and API calls use the custom domain
- [ ] Test widget with custom domains

### Day 3-4: Domain Selection in Dashboard

- [ ] Add domain selection dropdown in waitlist settings
- [ ] Update preview URLs to use selected domain
- [ ] Implement domain switching logic
- [ ] Update embed code when domain changes

### Day 5: Documentation

- [ ] Create user documentation for custom domains
- [ ] Add DNS configuration instructions
- [ ] Create troubleshooting guide
- [ ] Update API documentation

## Phase 5: Testing and Deployment (Week 5)

### Day 1-2: Unit and Integration Testing

- [ ] Write unit tests for domain verification logic
- [ ] Create integration tests for API endpoints
- [ ] Test domain routing middleware
- [ ] Verify SSL certificate provisioning

### Day 3: End-to-End Testing

- [ ] Create end-to-end tests for domain setup process
- [ ] Test with real domains in staging environment
- [ ] Verify widget functionality with custom domains
- [ ] Test domain switching

### Day 4: Performance Testing

- [ ] Conduct load testing with multiple domains
- [ ] Optimize domain lookup performance
- [ ] Implement caching strategies
- [ ] Verify SSL certificate handling under load

### Day 5: Deployment Preparation

- [ ] Create deployment plan
- [ ] Update database migration scripts
- [ ] Prepare rollback strategy
- [ ] Create monitoring alerts for domain-related issues

## Post-Launch Monitoring

- [ ] Monitor domain verification success rates
- [ ] Track SSL certificate provisioning failures
- [ ] Collect user feedback on domain setup process
- [ ] Identify opportunities for improvement

## Resources Required

- DNS verification library (e.g., dns-packet, dns2)
- SSL certificate automation service (e.g., Let's Encrypt, ZeroSSL)
- Domain validation library
- DNS configuration documentation for major providers
- Testing domains for development

## Pricing Tier Integration

- Free tier: Use default subdomain (waitlist.yourdomain.com/[slug])
- Starter tier: One custom domain
- Growth/Pro tier: Multiple custom domains

## Risk Assessment

| Risk                                 | Impact | Likelihood | Mitigation                                                |
| ------------------------------------ | ------ | ---------- | --------------------------------------------------------- |
| DNS propagation delays               | Medium | High       | Clear user communication about potential delays           |
| SSL certificate failures             | High   | Medium     | Automated retry system and fallback to default domain     |
| Domain verification complexity       | Medium | Medium     | Simplified instructions and multiple verification methods |
| Performance impact of domain routing | Medium | Low        | Implement efficient caching and database indexing         |
| User DNS configuration errors        | High   | High       | Clear documentation and validation checks                 |
