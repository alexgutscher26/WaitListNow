# List of TODOs: for the boilerplate part

- [ ] Email notifications, resend, nodemailer
- [ ] i18n, next-i18next, react-i18next
- [ ] File uploads, uploadthing, cloudinary
- [ ] Rate limiting, @upstash/ratelimit
- [ ] Feature flags, flagsmith, growthbook

# List of TODOs: for the waitlist part

- [ ] Create an API endpoint to handle form submission
- [ ] Update the redirect URL to point to the newly created waitlist
- [ ] Implement the embeddable widget functionality
- [ ] Add white-labeling for the widget (logo, colors, fonts)
  - [ ] Branding Elements:
    - Logo upload
    - Custom color schemes
    - Font family selection
    - Custom CSS overrides
  - [ ] Implementation Approach:
    - Add a "Branding" section in the widget settings
    - Store branding preferences in the database
    - Apply these settings in the widget's CSS-in-JS
  - [ ] Benefits:
    - Enhanced brand consistency
    - Professional appearance
    - Better user trust and recognition

# List of TODOs: for the referral part

- [ ] Create an API endpoint to handle referral rewards
- [ ] Implement the referral system
- [ ] Add white-labeling for the referral system (logo, colors, fonts)
- [ ] Add analytics for the referral system (Google Analytics, Mixpanel, etc.)
- [ ] Add email notifications for the referral system

# List of TODOs: for the dashboard part

- [ ] Add white-labeling for the dashboard (logo, colors, fonts)
- [ ] Add analytics for the dashboard (Google Analytics, Mixpanel, etc.)
- [ ] Add email notifications for the dashboard

🎯 Suggested Upgrade Triggers
500 signups = prompt to move to Starter

Enabling branding removal = requires Starter

Adding reward tiers = prompt upgrade to Growth

Adding webhook = prompt upgrade to Starter

make the onboarding route where user cannot use it again after completion

To complete the setup, you'll need to create the following API endpoints:

POST /api/waitlists - To create a new waitlist
POST /api/onboarding/complete - To mark onboarding as complete
Would you like me to help you create these API endpoints next? I can also help with:

Setting up the database schema for waitlists
Creating the embeddable widget
Adding authentication checks to the API routes
Implementing the dashboard to manage waitlists
