# WaitListNow - Modern Waitlist Management

<div align="center">
  <img src="public/thumbnailnew.png" alt="WaitListNow Dashboard" width="800px" />
  <p><em>Transform your product launches with powerful waitlist management</em></p>
</div>

WaitListNow is a comprehensive SaaS platform designed to help businesses create, manage, and optimize waitlists for product launches, beta testing, and exclusive offerings. Built with modern technologies, it provides a seamless experience for both businesses and their customers.

## ✨ Features

### Core Functionality

- 🚀 **Complete Waitlist Management**: Create and manage multiple waitlists for different products or services
- 📊 **Real-time Analytics**: Track signups, conversion rates, and user engagement metrics
- 🔔 **Notification System**: Automated email notifications for waitlist updates and position changes
- 🔐 **Secure Authentication**: User management with Clerk for secure access control
- 🎯 **Embeddable Widgets**: Easily integrate waitlist forms into any website with customizable widgets
- 🚫 **Disposable Email Detection**: Disposable email addresses are not allowed for waitlist signups or API usage. Attempts to use a disposable email will result in a validation error.

### User Experience

- 🎨 **Beautiful UI/UX**: Conversion-focused design with modern aesthetics
- 📱 **Fully Responsive**: Optimized for all devices - mobile, tablet, and desktop
- ⚡ **High Performance**: Fast loading times and smooth interactions
- 🌐 **White-labeling Options**: Customize the look and feel to match your brand (Premium feature)

### Developer Experience

- 🛠️ **TypeScript Integration**: Full type safety throughout the codebase
- 🔄 **Real-time Updates**: Instant data synchronization with Prisma and PostgreSQL
- 📈 **Analytics Integration**: Easy connection with popular analytics platforms
- 🔌 **API Access**: RESTful API endpoints for custom integrations

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm/yarn
- PostgreSQL database (local or hosted)
- Clerk account for authentication
- (Optional) Stripe account for payment processing
- (Optional) CDN provider (e.g., Vercel, Cloudflare) for static asset delivery

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/alexgutscher26/WaitListNow.git
   cd WaitListNow
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:

   - Database connection string
   - Clerk API keys
   - Stripe API keys (if using payments)
   - Sentry DSN (for error tracking)

4. **Set up the database**:

   ```bash
   pnpm db:generate  # Generate Prisma client
   pnpm db:push      # Push schema to database
   pnpm db:seed      # (Optional) Seed with sample data
   ```

5. **Run the development server**:

   ```bash
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the application.

## 🏗️ Project Structure

```
WaitListNow/
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Authentication routes
│   │   ├── (landing)/    # Public landing pages
│   │   ├── api/          # API routes
│   │   └── dashboard/    # Dashboard pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── providers/        # React context providers
│   └── server/           # Server-side code
└── ...config files
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm db:*` - Database commands (generate, push, seed, reset, studio)

## 📦 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Query](https://tanstack.com/query)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)
- **Email**: [React Email](https://react.email/) with [Resend](https://resend.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚢 Deployment

Deploy your waitlist application to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falexgutscher26%2FWaitListNow&env=DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_APP_URL,STRIPE_SECRET_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY&project-name=waitlistnow&repository-name=waitlistnow)

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/waitlistnow?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_DOMAIN=localhost

# CDN Configuration (optional)
NEXT_PUBLIC_CDN_URL=
VERCEL_GIT_COMMIT_SHA=

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# PostHog Analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### CDN Configuration

For optimal performance, configure a CDN to serve your static assets:

1. Set up your CDN provider (Vercel, Cloudflare, etc.)
2. Configure your CDN to point to your application's domain
3. Set the `NEXT_PUBLIC_CDN_URL` environment variable to your CDN URL

For detailed CDN setup instructions, see [CDN Setup Guide](./docs/CDN_SETUP.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Clerk](https://clerk.com) for authentication
- [Prisma](https://www.prisma.io/) for database ORM
- [shadcn/ui](https://ui.shadcn.com) for the component library
- [Vercel](https://vercel.com) for hosting and deployment
- [Sentry](https://sentry.io) for error tracking

## API Validation

All endpoints that accept email addresses (e.g., waitlist signup, subscribers API) enforce the following:
- Email must be valid (RFC-compliant)
- **Disposable email addresses are not allowed** (using a maintained blocklist)
- Duplicate signups are prevented unless explicitly allowed by waitlist settings
- Proper error messages are returned for invalid or blocked emails
