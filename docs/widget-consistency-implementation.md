# Widget Consistency Implementation Plan

## Problem Statement

Currently, there's an inconsistency between the waitlist preview shown in the dashboard and the actual embedded widget that appears on websites. This creates confusion for users who expect the embedded widget to look exactly like the preview they see in the dashboard.

## Implementation Plan

### Phase 1: Shared Styling Module (1-2 days)

1. **Create a shared styling utility**:
   - Create `src/lib/waitlist-styles.ts` to contain all styling logic
   - Extract styling functions from the `WaitlistPreview` component
   - Ensure all style calculations are consistent

2. **Define a common configuration format**:
   - Create a TypeScript interface for waitlist configuration
   - Ensure it covers all customization options
   - Add proper documentation for each option

```typescript
// src/types/waitlist.ts
export interface WaitlistConfig {
  id: string;
  name: string;
  description?: string;
  style: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    buttonText: string;
    buttonVariant: 'default' | 'outline' | 'ghost' | 'link';
    buttonRounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
    formLayout: 'stacked' | 'inline';
    showLabels: boolean;
    boxShadow: 'none' | 'sm' | 'md' | 'lg';
    padding: string;
  };
  customFields: Array<{
    id: string;
    name: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'number';
    required: boolean;
    placeholder?: string;
    options?: string[]; // For select fields
  }>;
  enableReferrals: boolean;
  referralReward?: string;
  maxSignups?: number;
  requireEmailVerification: boolean;
  confirmationType: 'message' | 'redirect';
  confirmationMessage?: string;
  confirmationRedirectUrl?: string;
  hideBranding: boolean;
  customDomain?: string;
}
```

### Phase 2: Shared Component Structure (2-3 days)

1. **Create a shared waitlist form component**:
   - Create `src/components/waitlist/WaitlistForm.tsx`
   - Implement the form structure that will be used by both preview and embedded widget
   - Use the shared styling module for consistent appearance

2. **Update the preview component**:
   - Refactor `WaitlistPreview` to use the shared form component
   - Add a `isPreview` flag to show preview-specific elements

3. **Create a standalone widget component**:
   - Create `src/components/waitlist/EmbeddedWaitlist.tsx`
   - Use the shared form component with `isPreview={false}`
   - Add functionality for form submission and validation

### Phase 3: Widget Script and Embed Routes (2-3 days)

1. **Create widget script endpoint**:
   - Create `src/app/widget.js/route.ts` to serve the widget script
   - Implement script that loads the waitlist configuration and renders the form
   - Add proper error handling and loading states

```typescript
// src/app/widget.js/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // This script will be injected into the customer's website
  const script = `
    (function() {
      // Get the script element
      const script = document.currentScript;
      
      // Extract configuration from data attributes
      const waitlistId = script.getAttribute('data-waitlist-id');
      const config = {
        id: waitlistId,
        style: {
          buttonText: script.getAttribute('data-button-text') || 'Join Waitlist',
          buttonVariant: script.getAttribute('data-button-variant') || 'default',
          buttonRounded: script.getAttribute('data-button-rounded') || 'md',
          primaryColor: '#' + (script.getAttribute('data-primary-color') || '3b82f6'),
          // Extract other style attributes
        },
        // Extract other configuration options
      };
      
      // Create container element
      const container = document.createElement('div');
      container.className = 'waitlistnow-container';
      script.parentNode.insertBefore(container, script);
      
      // Fetch the waitlist data
      fetch('https://' + window.location.hostname + '/api/waitlists/' + waitlistId)
        .then(response => response.json())
        .then(data => {
          // Merge fetched data with configuration from attributes
          const fullConfig = { ...data, ...config };
          
          // Render the waitlist form
          renderWaitlistForm(container, fullConfig);
        })
        .catch(error => {
          container.innerHTML = '<p>Error loading waitlist. Please try again later.</p>';
          console.error('WaitlistNow error:', error);
        });
      
      // Function to render the waitlist form
      function renderWaitlistForm(container, config) {
        // Create the form with the same structure as the preview
        // Use the same styling logic
        // Add event listeners for form submission
      }
    })();
  `;
  
  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

2. **Create iframe embed endpoint**:
   - Create `src/app/widget/embed/page.tsx` for iframe embedding
   - Use the shared form component with configuration from query parameters
   - Add proper error handling and loading states

```typescript
// src/app/widget/embed/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import type { WaitlistConfig } from '@/types/waitlist';

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<WaitlistConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const waitlistId = searchParams.get('waitlist-id');
    
    if (!waitlistId) {
      setError('Waitlist ID is required');
      setLoading(false);
      return;
    }
    
    // Fetch the waitlist configuration
    fetch(`/api/waitlists/${waitlistId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load waitlist');
        }
        return response.json();
      })
      .then(data => {
        // Merge with query parameters
        const mergedConfig = {
          ...data,
          style: {
            ...data.style,
            buttonText: searchParams.get('button-text') || data.style.buttonText,
            buttonVariant: searchParams.get('button-variant') || data.style.buttonVariant,
            buttonRounded: searchParams.get('button-rounded') || data.style.buttonRounded,
            primaryColor: searchParams.get('primary-color') 
              ? `#${searchParams.get('primary-color')}` 
              : data.style.primaryColor,
            // Other style parameters
          },
          // Other configuration parameters
        };
        
        setConfig(mergedConfig);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);
  
  if (loading) {
    return <div className="loading">Loading waitlist...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!config) {
    return <div className="error">Waitlist configuration not found</div>;
  }
  
  return <WaitlistForm config={config} isPreview={false} />;
}
```

### Phase 4: Custom Domain Support (3-4 days)

1. **Update database schema**:
   - Add `CustomDomain` model to Prisma schema
   - Add relations to `User` and `Waitlist` models
   - Run migrations

2. **Create domain management UI**:
   - Create `src/app/dashboard/domains/page.tsx` for domain management
   - Implement UI for adding, verifying, and removing domains
   - Add domain selection to waitlist creation/editing form

3. **Implement domain verification**:
   - Create utility for DNS verification
   - Implement API endpoints for domain verification
   - Add proper error handling and user feedback

4. **Update CORS and routing**:
   - Modify CORS configuration to allow custom domains
   - Create middleware to handle requests from custom domains
   - Update embed code generation to use selected domain

### Phase 5: Testing and Documentation (2-3 days)

1. **Comprehensive testing**:
   - Test preview and embedded widget side by side
   - Test with various configuration options
   - Test custom domain functionality
   - Test across different browsers and devices

2. **Update documentation**:
   - Create user guide for custom domains
   - Update embedding documentation
   - Add troubleshooting section

3. **Create migration plan**:
   - Plan for migrating existing waitlists
   - Ensure backward compatibility

## Timeline

- **Total Estimated Time**: 10-15 days
- **Phase 1**: Days 1-2
- **Phase 2**: Days 3-5
- **Phase 3**: Days 6-8
- **Phase 4**: Days 9-12
- **Phase 5**: Days 13-15

## Resources Required

- Frontend developer (1)
- Backend developer (1)
- Designer for review (part-time)
- QA tester (part-time)

## Success Metrics

- Visual consistency between preview and embedded widget
- Successful implementation of custom domain support
- Positive user feedback on the embedding experience
- Reduction in support tickets related to embedding issues