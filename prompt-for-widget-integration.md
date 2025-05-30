# Prompt for Implementing Waitlist Widget Integration

## Task Overview

Implement the waitlist widget integration functionality in the WaitListNow application at http://localhost:3000/dashboard/waitlists/new. Make both the JavaScript Snippet and iFrame embedding options fully functional while ensuring a cohesive brand experience between embedded widgets and direct waitlist links.

## Specific Requirements

### 1. JavaScript Snippet Implementation

- Create a client-side script (embed.js) that can be loaded on any website
- The script should:
  - Identify the target element with `id="waitlist-embed"` or `data-waitlist-embed` attribute
  - Fetch waitlist configuration from the server using the waitlist ID
  - Dynamically render the waitlist form with all configured styles and fields
  - Handle form submissions via AJAX to avoid page reloads
  - Show appropriate success/error messages after submission
  - Support all customization options (colors, fonts, layouts, etc.)

### 2. iFrame Implementation

- Create an iframe endpoint that renders the waitlist form in a standalone format
- Ensure the iframe:
  - Automatically adjusts its height based on content
  - Passes form submissions to the parent server
  - Supports all the same styling options as the JavaScript snippet
  - Handles cross-origin communication properly
  - Provides messaging back to the parent page for success/error states

### 3. Styling Consistency

- Ensure both embedded widgets and direct waitlist links share the same styling system
- The embedded version should maintain brand consistency while being more compact
- All style properties (colors, fonts, button styles, etc.) should be applied consistently
- Create a shared styling system that works across both contexts
- Ensure responsive design works in both standalone and embedded contexts

### 4. API Endpoints

- Create necessary API endpoints to:
  - Serve the embed.js script
  - Provide waitlist configuration to embedded widgets
  - Handle form submissions from embedded widgets
  - Generate iframe URLs with proper parameters

### 5. Preview & Testing

- Update the preview functionality in the dashboard to accurately show how embedded widgets will appear
- Implement a test mode that allows users to see exactly how their embedded widget will function
- Provide clear documentation on how to implement both embedding options

## Technical Considerations

- Ensure all code is secure and prevents XSS attacks
- Handle CORS properly for cross-domain embedding
- Optimize the embed.js script for minimal size and fast loading
- Implement proper error handling for all scenarios
- Make sure the embedded widgets work across all major browsers
- Ensure the styling system is flexible enough to adapt to different host website designs

## Success Criteria

- Users can successfully embed waitlist forms using either JavaScript or iFrame methods
- The embedded forms maintain consistent styling with direct waitlist links
- All customization options work correctly in both contexts
- Form submissions work properly in embedded contexts
- The preview in the dashboard accurately represents how embedded widgets will appear
