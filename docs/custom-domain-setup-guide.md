# Custom Domain Setup Guide

## Introduction

WaitlistNow allows you to use your own domain for your waitlist forms, providing a seamless branded experience for your users. This guide will walk you through the process of setting up and verifying your custom domain.

## Benefits of Using a Custom Domain

- **Brand Consistency**: Keep your brand identity consistent throughout the user journey
- **Increased Trust**: Users are more likely to sign up when they see your domain
- **Professional Appearance**: Create a more polished and professional experience
- **Better Analytics**: Track conversions more accurately with your own domain

## Setting Up Your Custom Domain

### Step 1: Add Your Domain in the Dashboard

1. Log in to your WaitlistNow dashboard
2. Navigate to **Settings > Domains**
3. Click the **Add Domain** button
4. Enter your domain or subdomain (e.g., `waitlist.yourdomain.com`)
5. Click **Add Domain**

![Add Domain Screenshot](https://example.com/add-domain.png)

> **Note**: We recommend using a subdomain (like `waitlist.yourdomain.com`) rather than your root domain for better flexibility.

### Step 2: Configure DNS Settings

To verify ownership of your domain and enable it for use with WaitlistNow, you'll need to add two DNS records:

#### CNAME Record

This record directs traffic from your domain to WaitlistNow servers:

| Type  | Name                      | Value                    | TTL      |
|-------|---------------------------|--------------------------|----------|
| CNAME | waitlist (or your subdomain) | custom.waitlistnow.com | 3600 (1h) |

#### TXT Record for Verification

This record verifies that you own the domain:

| Type | Name                                  | Value                           | TTL      |
|------|---------------------------------------|----------------------------------|----------|
| TXT  | _waitlistnow-verification.yourdomain.com | [Your verification code from dashboard] | 3600 (1h) |

> **Important**: The exact steps to add these records will vary depending on your DNS provider. Common providers include Cloudflare, GoDaddy, Namecheap, and Google Domains.

### Step 3: Verify Your Domain

1. After adding the DNS records, return to the WaitlistNow dashboard
2. On the Domains page, find your domain and click **Verify**
3. WaitlistNow will check for the correct DNS records
4. If verification is successful, your domain status will change to "Verified"

> **Note**: DNS changes can take up to 48 hours to propagate, though they often take effect within a few hours.

## Using Your Custom Domain with Waitlists

Once your domain is verified, you can use it with your waitlists:

### For New Waitlists

1. When creating a new waitlist, go to the **Embedding** section
2. Select your verified domain from the dropdown menu
3. Save your waitlist
4. The embed code will automatically use your custom domain

### For Existing Waitlists

1. Go to your waitlist dashboard
2. Select the waitlist you want to update
3. Click **Edit**
4. Go to the **Embedding** section
5. Select your verified domain from the dropdown menu
6. Save your changes
7. Get the updated embed code with your custom domain

## Testing Your Custom Domain

After setting up your custom domain:

1. Copy the embed code from your waitlist settings
2. Paste it into a test page on your website
3. Visit the page and verify that:
   - The waitlist form loads correctly
   - The form styling matches your preview
   - Form submissions are recorded in your dashboard

## SSL Certificates

WaitlistNow automatically provisions SSL certificates for your custom domain once it's verified. This ensures that your waitlist forms are served securely over HTTPS.

> **Note**: SSL certificate provisioning can take up to 24 hours after domain verification.

## Troubleshooting

### Domain Not Verifying

- Double-check your DNS records for typos
- Ensure you've added both the CNAME and TXT records
- Wait at least 4 hours for DNS propagation before trying again
- Use a DNS lookup tool like [DNSChecker](https://dnschecker.org) to verify your records are visible

### Form Not Loading on Custom Domain

- Ensure your domain is showing as "Verified" in the dashboard
- Check that you've selected the correct domain for your waitlist
- Clear your browser cache and try again
- Check your browser console for any error messages

### CORS Errors

If you're seeing CORS errors in your browser console:

- Ensure your domain is fully verified
- Check that you're using the correct embed code from the dashboard
- If you're using a custom implementation, ensure you're making requests to your custom domain, not the default WaitlistNow domain

## FAQ

**Q: Can I use multiple custom domains?**
A: Yes, Pro and Business plans can add multiple custom domains.

**Q: Can I use my root domain (example.com)?**
A: Yes, but we recommend using a subdomain for better flexibility.

**Q: Will my existing waitlist links still work?**
A: Yes, your waitlistnow.com links will continue to work alongside your custom domain.

**Q: Can I transfer my custom domain between waitlists?**
A: Yes, you can change which waitlist uses your custom domain at any time.

**Q: Is there an additional cost for using custom domains?**
A: Custom domains are included in Pro and Business plans at no additional cost.

## Need Help?

If you're having trouble setting up your custom domain, our support team is here to help:

- Email: support@waitlistnow.com
- Live chat: Available in your dashboard (Business plan only)
- Help center: [help.waitlistnow.com](https://help.waitlistnow.com)