# WaitListNow - Modern Waitlist Management

A powerful waitlist management SaaS built with Next.js App Router, Supabase, TypeScript, Tailwind CSS, and Clerk

![WaitListNow Dashboard](https://github.com/yourusername/waitlistnow/blob/main/public/thumbnail.png)

## Features

- 🚀 Complete waitlist management solution built with Next.js 14
- 🎨 Beautiful, responsive landing page with conversion-focused design
- 📊 Real-time waitlist analytics and user management
- 🔔 Email notifications for waitlist updates
- 🔐 Secure authentication with Clerk
- 🎯 Easy integration with any website or application
- 📱 Mobile-responsive dashboard
- 🛠️ Built with TypeScript for type safety
- ⚡ Blazing fast performance with Next.js App Router
- 🌈 Modern UI built with Tailwind CSS and shadcn/ui
- 🔄 Real-time updates with Supabase
- 📈 Track conversion metrics and user engagement

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn
- Supabase account
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/waitlistnow.git
   cd waitlistnow
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and Clerk credentials

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Deployment

Deploy your waitlist application to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fwaitlistnow&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&project-name=waitlistnow&repository-name=waitlistnow)

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Acknowledgements

- [Clerk](https://clerk.com) for authentication
- [Supabase](https://supabase.com) for the backend
- [shadcn/ui](https://ui.shadcn.com) for the component library

## License

[MIT](https://choosealicense.com/licenses/mit/)
