# Embeddable Widget Guide

This guide explains how to use the WaitListNow embeddable widget on your website, including how to set up custom domain integration.

## Quick Start

### Option 1: JavaScript Embed (Recommended)

Add this script tag to your HTML where you want the waitlist form to appear:

```html
<script
  src="https://waitlist.yourdomain.com/widget.js"
  data-waitlist-id="your-waitlist-id"
  data-button-text="Join Waitlist"
  data-primary-color="3b82f6"
  async
></script>
```

### Option 2: iFrame Embed

Alternatively, you can use an iframe to embed your waitlist:

```html
<iframe
  src="https://waitlist.yourdomain.com/widget/embed?waitlist-id=your-waitlist-id&button-text=Join%20Waitlist"
  width="100%"
  height="500"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  scrolling="no"
>
</iframe>
```

## Customization Options

You can customize the appearance and behavior of your waitlist widget by adding data attributes to the script tag:

| Attribute               | Description                   | Default            | Example                                |
| ----------------------- | ----------------------------- | ------------------ | -------------------------------------- |
| `data-waitlist-id`      | Your unique waitlist ID       | (required)         | `data-waitlist-id="abc123"`            |
| `data-button-text`      | Text for the submit button    | "Join Waitlist"    | `data-button-text="Get Early Access"`  |
| `data-button-variant`   | Button style                  | "default"          | `data-button-variant="outline"`        |
| `data-button-rounded`   | Button corner radius          | "md"               | `data-button-rounded="full"`           |
| `data-primary-color`    | Primary color (hex without #) | "3b82f6"           | `data-primary-color="ff4500"`          |
| `data-form-layout`      | Form field layout             | "stacked"          | `data-form-layout="inline"`            |
| `data-show-labels`      | Show field labels             | "true"             | `data-show-labels="false"`             |
| `data-show-branding`    | Show "Powered by" branding    | "true"             | `data-show-branding="false"`           |
| `data-enable-referrals` | Enable referral system        | "false"            | `data-enable-referrals="true"`         |
| `data-referral-reward`  | Referral reward text          | "Get early access" | `data-referral-reward="Skip the line"` |
| `data-max-signups`      | Maximum signups allowed       | (unlimited)        | `data-max-signups="1000"`              |

## Using Custom Domains

### Default Domain

By default, your waitlist is accessible at:

```
https://waitlist.yourdomain.com/[your-waitlist-slug]
```

This is the domain used in the embed code when you don't have a custom domain configured.

### Setting Up a Custom Domain

To use your own domain for your waitlist:

1. Go to your waitlist dashboard
2. Navigate to Settings > Custom Domains
3. Click "Add Domain"
4. Enter your domain (e.g., `waitlist.example.com`)
5. Follow the DNS configuration instructions
6. Verify your domain

### Using Your Custom Domain in Embeds

Once your custom domain is verified and active, your embed code will automatically update to use your custom domain:

```html
<script
  src="https://waitlist.example.com/widget.js"
  data-waitlist-id="your-waitlist-id"
  data-button-text="Join Waitlist"
  data-primary-color="3b82f6"
  async
></script>
```

You can also manually update any existing embed codes to use your custom domain.

### DNS Configuration

To set up your custom domain, you'll need to add the following DNS records:

#### For a subdomain (e.g., waitlist.example.com):

Add a CNAME record:

- Type: CNAME
- Name: waitlist
- Value: waitlist.yourdomain.com
- TTL: 3600 (or default)

#### For a root domain (e.g., example.com):

Add an A record:

- Type: A
- Name: @
- Value: [Our server IP address]
- TTL: 3600 (or default)

Also add a CNAME record for www:

- Type: CNAME
- Name: www
- Value: waitlist.yourdomain.com
- TTL: 3600 (or default)

## Advanced Integration

### API Integration

For more advanced use cases, you can integrate directly with our API:

```javascript
// Example: Submit to waitlist via API
async function submitToWaitlist(email, name, referralCode = null) {
  const response = await fetch('https://waitlist.yourdomain.com/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      waitlistId: 'your-waitlist-id',
      email,
      name,
      referralCode,
    }),
  });

  return response.json();
}
```

### Custom Styling

For more advanced styling beyond the data attributes, you can add custom CSS:

```html
<style>
  .waitlistnow-form {
    /* Your custom styles */
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .waitlistnow-button {
    /* Custom button styles */
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
```

## Troubleshooting

### Widget Not Loading

- Check if JavaScript is enabled in the browser
- Verify that your waitlist ID is correct
- Check for any Content Security Policy (CSP) issues
- Ensure your domain is properly verified if using a custom domain

### Custom Domain Not Working

- Verify DNS records are correctly configured
- Check that domain verification is complete
- Ensure SSL certificate has been provisioned
- Allow 24-48 hours for DNS changes to propagate fully

### Referral System Issues

- Ensure referrals are enabled for your waitlist
- Check that your plan supports the referral feature
- Verify the referral links are being generated correctly

## Support

If you encounter any issues with your embeddable widget or custom domain setup, please contact our support team at support@waitlistnow.com or visit our help center at https://help.waitlistnow.com.
