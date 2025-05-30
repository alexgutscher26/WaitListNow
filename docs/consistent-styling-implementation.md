# Consistent Styling Implementation Guide

## Overview

This document outlines the implementation approach for ensuring consistent styling between the waitlist preview in the dashboard and the live embedded widget on customer websites. The goal is to create a seamless experience where what users see in the preview exactly matches what appears on their website.

## Current Architecture

Currently, the styling implementation is split between:

1. **Dashboard Preview**: Implemented as a React component with styling applied through CSS modules or Tailwind classes
2. **Embedded Widget**: Implemented as either a JavaScript snippet or an iframe with separate styling logic

This separation leads to inconsistencies in how user customizations are applied.

## User Customization Options

The waitlist system allows users to customize the following styling aspects:

| Category           | Options                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Colors**         | Primary color, Background color, Text color                                                                |
| **Typography**     | Font family, Font size                                                                                     |
| **Button Styling** | Button text, Button variant (default, outline, ghost, link), Button corner radius (none, sm, md, lg, full) |
| **Form Layout**    | Stacked/inline layout, Field spacing, Show/hide labels                                                     |
| **Container**      | Box shadow, Border radius, Padding                                                                         |
| **Branding**       | Show/hide "Powered by WaitlistNow"                                                                         |

## Implementation Strategy

### 1. Create a Shared Configuration Interface

Define a TypeScript interface that represents all possible customization options:

```typescript
// src/types/waitlist-config.ts
export interface WaitlistStyleConfig {
  // Colors
  primaryColor: string;
  backgroundColor: string;
  textColor: string;

  // Typography
  fontFamily: string;
  fontSize?: 'sm' | 'md' | 'lg';

  // Button
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'ghost' | 'link';
  buttonRounded: 'none' | 'sm' | 'md' | 'lg' | 'full';

  // Layout
  formLayout: 'stacked' | 'inline';
  fieldSpacing: 'tight' | 'normal' | 'relaxed';
  showLabels: boolean;

  // Container
  boxShadow: 'none' | 'sm' | 'md' | 'lg';
  containerRadius: 'none' | 'sm' | 'md' | 'lg';
  padding: 'sm' | 'md' | 'lg';

  // Branding
  hideBranding: boolean;
}

export interface WaitlistConfig {
  id: string;
  name: string;
  description?: string;
  style: WaitlistStyleConfig;
  customFields: CustomField[];
  // Other non-style configuration options
}
```

### 2. Create a Shared Styling Utility

Implement a utility that processes the configuration and applies consistent styling:

```typescript
// src/lib/waitlist-styles.ts
import type { WaitlistStyleConfig } from '@/types/waitlist-config';

// Convert style config to CSS variables
export function styleConfigToCssVars(config: WaitlistStyleConfig): Record<string, string> {
  return {
    '--primary-color': config.primaryColor,
    '--background-color': config.backgroundColor,
    '--text-color': config.textColor,
    '--font-family': config.fontFamily,
    '--button-radius': getBorderRadius(config.buttonRounded),
    '--container-radius': getBorderRadius(config.containerRadius),
    '--box-shadow': getBoxShadow(config.boxShadow),
    '--padding': getPadding(config.padding),
    '--field-spacing': getSpacing(config.fieldSpacing),
    // Add other CSS variables
  };
}

// Apply CSS variables to an element
export function applyStyleConfig(element: HTMLElement, config: WaitlistStyleConfig): void {
  const cssVars = styleConfigToCssVars(config);

  Object.entries(cssVars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });

  // Apply classes based on configuration
  if (config.formLayout === 'inline') {
    element.classList.add('inline-layout');
  } else {
    element.classList.remove('inline-layout');
  }

  if (!config.showLabels) {
    element.classList.add('hide-labels');
  } else {
    element.classList.remove('hide-labels');
  }

  // Apply other class-based styling
}

// Helper functions for specific style properties
export function getBorderRadius(size: 'none' | 'sm' | 'md' | 'lg' | 'full'): string {
  const radiusMap = {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  };

  return radiusMap[size] || '0.375rem';
}

export function getBoxShadow(size: 'none' | 'sm' | 'md' | 'lg'): string {
  const shadowMap = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return shadowMap[size] || 'none';
}

export function getPadding(size: 'sm' | 'md' | 'lg'): string {
  const paddingMap = {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  };

  return paddingMap[size] || '1.5rem';
}

export function getSpacing(spacing: 'tight' | 'normal' | 'relaxed'): string {
  const spacingMap = {
    tight: '0.5rem',
    normal: '1rem',
    relaxed: '1.5rem',
  };

  return spacingMap[spacing] || '1rem';
}

// Generate CSS for the waitlist form
export function generateWaitlistCss(config: WaitlistStyleConfig): string {
  return `
    .waitlist-container {
      --primary-color: ${config.primaryColor};
      --background-color: ${config.backgroundColor};
      --text-color: ${config.textColor};
      --font-family: ${config.fontFamily};
      --button-radius: ${getBorderRadius(config.buttonRounded)};
      --container-radius: ${getBorderRadius(config.containerRadius)};
      --box-shadow: ${getBoxShadow(config.boxShadow)};
      --padding: ${getPadding(config.padding)};
      --field-spacing: ${getSpacing(config.fieldSpacing)};
      
      background-color: var(--background-color);
      color: var(--text-color);
      font-family: var(--font-family);
      border-radius: var(--container-radius);
      box-shadow: var(--box-shadow);
      padding: var(--padding);
    }
    
    .waitlist-container .form-field {
      margin-bottom: var(--field-spacing);
    }
    
    .waitlist-container .submit-button {
      background-color: var(--primary-color);
      border-radius: var(--button-radius);
      color: white;
    }
    
    .waitlist-container.inline-layout .form-fields {
      display: flex;
      gap: 0.5rem;
    }
    
    .waitlist-container.hide-labels label {
      display: none;
    }
    
    /* Button variants */
    .waitlist-container .submit-button.outline {
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    
    .waitlist-container .submit-button.ghost {
      background-color: transparent;
      color: var(--primary-color);
    }
    
    .waitlist-container .submit-button.link {
      background-color: transparent;
      color: var(--primary-color);
      text-decoration: underline;
      box-shadow: none;
    }
    
    /* Additional styling rules */
  `;
}
```

### 3. Create a Shared Waitlist Form Component

Implement a React component that can be used in both the preview and embedded contexts:

```tsx
// src/components/waitlist/WaitlistForm.tsx
import React, { useEffect, useRef } from 'react';
import type { WaitlistConfig } from '@/types/waitlist-config';
import { applyStyleConfig } from '@/lib/waitlist-styles';

interface WaitlistFormProps {
  config: WaitlistConfig;
  isPreview?: boolean;
  onSubmit?: (data: any) => void;
}

export function WaitlistForm({ config, isPreview = false, onSubmit }: WaitlistFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      applyStyleConfig(containerRef.current, config.style);
    }
  }, [config.style]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isPreview) {
      // In preview mode, just show a message
      alert('This is a preview. Form submission is disabled.');
      return;
    }

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`waitlist-container ${config.style.formLayout === 'inline' ? 'inline-layout' : ''} ${!config.style.showLabels ? 'hide-labels' : ''}`}
    >
      {/* Form header */}
      <div className="waitlist-header">
        <h3>{config.name || 'Join Our Waitlist'}</h3>
        {config.description && <p>{config.description}</p>}
      </div>

      {/* Form fields */}
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          {/* Email field (always present) */}
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Custom fields */}
          {config.customFields.map((field) => (
            <div
              key={field.id}
              className="form-field"
            >
              <label htmlFor={field.id}>{field.name}</label>
              {field.type === 'text' && (
                <input
                  type="text"
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
              {/* Add other field types (select, textarea, etc.) */}
            </div>
          ))}

          {/* Submit button */}
          <div className="form-field">
            <button
              type="submit"
              className={`submit-button ${config.style.buttonVariant}`}
            >
              {config.style.buttonText || 'Join Waitlist'}
            </button>
          </div>
        </div>
      </form>

      {/* Branding */}
      {!config.style.hideBranding && (
        <div className="waitlist-branding">
          Powered by{' '}
          <a
            href="https://waitlistnow.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            WaitlistNow
          </a>
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

### 4. Update the Dashboard Preview Component

Modify the existing preview component to use the shared form component:

```tsx
// src/app/dashboard/waitlists/new/page.tsx (or wherever the preview is defined)
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';

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
        <WaitlistForm
          config={formData}
          isPreview={true}
        />
      </CardContent>
    </Card>
  );
}
```

### 5. Create Widget Script for Embedding

Implement a script that can be embedded on customer websites:

```typescript
// src/app/widget.js/route.ts
import { NextResponse } from 'next/server';
import { generateWaitlistCss } from '@/lib/waitlist-styles';

export async function GET() {
  // This script will be injected into the customer's website
  const script = `
    (function() {
      // Get the script element
      const script = document.currentScript;
      
      // Extract waitlist ID
      const waitlistId = script.getAttribute('data-waitlist-id');
      
      if (!waitlistId) {
        console.error('WaitlistNow: Missing data-waitlist-id attribute');
        return;
      }
      
      // Create container element
      const container = document.createElement('div');
      container.className = 'waitlistnow-container';
      script.parentNode.insertBefore(container, script);
      
      // Function to render the waitlist form
      function renderWaitlistForm(container, config) {
        // Create the form with the same structure as the shared component
        const formHtml = \`
          <div class="waitlist-container \${config.style.formLayout === 'inline' ? 'inline-layout' : ''} \${!config.style.showLabels ? 'hide-labels' : ''}">
            <div class="waitlist-header">
              <h3>\${config.name || 'Join Our Waitlist'}</h3>
              \${config.description ? \`<p>\${config.description}</p>\` : ''}
            </div>
            
            <form id="waitlist-form-\${config.id}">
              <div class="form-fields">
                <div class="form-field">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                
                \${config.customFields.map(field => \`
                  <div class="form-field">
                    <label for="\${field.id}">\${field.name}</label>
                    <input type="\${field.type}" id="\${field.id}" name="\${field.id}" placeholder="\${field.placeholder || ''}" \${field.required ? 'required' : ''} />
                  </div>
                \`).join('')}
                
                <div class="form-field">
                  <button type="submit" class="submit-button \${config.style.buttonVariant}">
                    \${config.style.buttonText || 'Join Waitlist'}
                  </button>
                </div>
              </div>
            </form>
            
            \${!config.style.hideBranding ? \`
              <div class="waitlist-branding">
                Powered by <a href="https://waitlistnow.com" target="_blank" rel="noopener noreferrer">WaitlistNow</a>
              </div>
            \` : ''}
          </div>
        \`;
        
        // Add the form to the container
        container.innerHTML = formHtml;
        
        // Apply CSS variables for styling
        const formElement = container.querySelector('.waitlist-container');
        if (formElement) {
          formElement.style.setProperty('--primary-color', config.style.primaryColor);
          formElement.style.setProperty('--background-color', config.style.backgroundColor);
          formElement.style.setProperty('--text-color', config.style.textColor);
          formElement.style.setProperty('--font-family', config.style.fontFamily);
          // Apply all other CSS variables
        }
        
        // Add form submission handler
        const form = container.querySelector(\`#waitlist-form-\${config.id}\`);
        if (form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Submit the form data
            fetch(\`https://\${window.location.hostname.includes('waitlistnow.com') ? window.location.hostname : 'api.waitlistnow.com'}/api/waitlists/\${config.id}/signup\`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                // Show success message
                form.innerHTML = \`<div class="success-message">\${config.successMessage || 'Thank you for joining our waitlist!'}</div>\`;
              } else {
                // Show error message
                console.error('Form submission error:', result.error);
                alert(result.error || 'An error occurred. Please try again.');
              }
            })
            .catch(error => {
              console.error('Form submission error:', error);
              alert('An error occurred. Please try again.');
            });
          });
        }
      }
      
      // Add CSS to the page
      const style = document.createElement('style');
      style.textContent = \`
        .waitlistnow-container {
          font-family: sans-serif;
          max-width: 500px;
          margin: 0 auto;
        }
        
        /* Base styles that will be overridden by CSS variables */
        .waitlist-container {
          background-color: var(--background-color, #ffffff);
          color: var(--text-color, #333333);
          font-family: var(--font-family, inherit);
          border-radius: var(--container-radius, 0.375rem);
          box-shadow: var(--box-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
          padding: var(--padding, 1.5rem);
        }
        
        /* Additional styling rules matching the shared CSS */
      \`;
      document.head.appendChild(style);
      
      // Fetch the waitlist configuration
      fetch(\`https://\${window.location.hostname.includes('waitlistnow.com') ? window.location.hostname : 'api.waitlistnow.com'}/api/waitlists/\${waitlistId}\`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load waitlist configuration');
          }
          return response.json();
        })
        .then(config => {
          // Merge with any overrides from data attributes
          const mergedConfig = {
            ...config,
            style: {
              ...config.style,
              primaryColor: script.getAttribute('data-primary-color') ? '#' + script.getAttribute('data-primary-color') : config.style.primaryColor,
              backgroundColor: script.getAttribute('data-background-color') ? '#' + script.getAttribute('data-background-color') : config.style.backgroundColor,
              // Merge other style overrides
            }
          };
          
          // Render the waitlist form
          renderWaitlistForm(container, mergedConfig);
        })
        .catch(error => {
          container.innerHTML = '<p>Error loading waitlist. Please try again later.</p>';
          console.error('WaitlistNow error:', error);
        });
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

### 6. Create Iframe Embed Option

Implement an iframe option for embedding:

```tsx
// src/app/widget/embed/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import type { WaitlistConfig } from '@/types/waitlist-config';

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load waitlist');
        }
        return response.json();
      })
      .then((data) => {
        // Merge with query parameters for style overrides
        const mergedConfig = {
          ...data,
          style: {
            ...data.style,
            primaryColor: searchParams.get('primary-color')
              ? `#${searchParams.get('primary-color')}`
              : data.style.primaryColor,
            // Other style overrides
          },
        };

        setConfig(mergedConfig);
        setLoading(false);
      })
      .catch((err) => {
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

  return (
    <div className="iframe-container">
      <WaitlistForm
        config={config}
        onSubmit={async (data) => {
          try {
            const response = await fetch(`/api/waitlists/${config.id}/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
              // Show success message
              document.querySelector('.iframe-container')!.innerHTML =
                `<div class="success-message">${config.successMessage || 'Thank you for joining our waitlist!'}</div>`;
            } else {
              // Show error message
              alert(result.error || 'An error occurred. Please try again.');
            }
          } catch (error) {
            console.error('Form submission error:', error);
            alert('An error occurred. Please try again.');
          }
        }}
      />
    </div>
  );
}
```

### 7. Update Embed Code Generation

Modify the embed code generation to include all styling parameters:

```tsx
// In the waitlist creation/editing form
const embedCode = useMemo(() => {
  // Get the domain (default or custom)
  const domain = selectedDomain ? selectedDomain.domain : 'waitlistnow.com';
  const baseUrl = `https://${domain}`;

  // Create a string of data attributes for all style options
  const dataAttributes = [
    `data-waitlist-id="${waitlistId}"`,
    `data-primary-color="${formData.style.primaryColor.replace('#', '')}"`,
    `data-background-color="${formData.style.backgroundColor.replace('#', '')}"`,
    `data-text-color="${formData.style.textColor.replace('#', '')}"`,
    `data-font-family="${formData.style.fontFamily}"`,
    `data-button-text="${formData.style.buttonText}"`,
    `data-button-variant="${formData.style.buttonVariant}"`,
    `data-button-rounded="${formData.style.buttonRounded}"`,
    `data-form-layout="${formData.style.formLayout}"`,
    `data-show-labels="${formData.style.showLabels}"`,
    `data-box-shadow="${formData.style.boxShadow}"`,
    `data-padding="${formData.style.padding}"`,
    `data-hide-branding="${formData.style.hideBranding}"`,
  ].join(' ');

  if (embedType === 'js') {
    return `<script src="${baseUrl}/widget.js" ${dataAttributes} async></script>`;
  } else {
    // For iframe embedding, convert data attributes to query parameters
    const params = new URLSearchParams();
    params.append('waitlist-id', waitlistId);
    params.append('primary-color', formData.style.primaryColor.replace('#', ''));
    params.append('background-color', formData.style.backgroundColor.replace('#', ''));
    // Add other parameters

    const iframeUrl = `${baseUrl}/widget/embed?${params.toString()}`;
    return `<iframe src="${iframeUrl}" width="100%" height="500" frameborder="0" style="border: none; border-radius: 8px;" scrolling="no"></iframe>`;
  }
}, [formData, embedType, selectedDomain, waitlistId]);
```

## Testing and Validation

To ensure consistency between the preview and embedded widget:

1. **Visual Comparison Testing**:

   - Create a test page that shows both the preview and embedded widget side by side
   - Verify that they look identical with various configuration options

2. **Cross-Browser Testing**:

   - Test in Chrome, Firefox, Safari, and Edge
   - Verify that styling is consistent across browsers

3. **Responsive Testing**:

   - Test at different viewport sizes
   - Ensure that both preview and embedded widget respond similarly

4. **Custom Domain Testing**:
   - Test with both default and custom domains
   - Verify that styling remains consistent regardless of domain

## Implementation Timeline

1. **Week 1**: Create shared types and styling utilities
2. **Week 2**: Implement shared form component and update preview
3. **Week 3**: Create widget script and iframe embed option
4. **Week 4**: Testing, bug fixes, and documentation

## Conclusion

By implementing this shared styling approach, we can ensure that the waitlist preview in the dashboard exactly matches the live embedded widget on customer websites. This will improve user experience, reduce confusion, and build trust in the product.

The key principles are:

1. Single source of truth for styling configuration
2. Shared styling logic between preview and embedded widget
3. Complete parameter passing in embed code
4. Consistent rendering across all contexts
