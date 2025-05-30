import { db } from '@/lib/db';

interface WaitlistPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: WaitlistPageProps) {
  try {
    const waitlist = await db.waitlist.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!waitlist) {
      return {
        title: 'Waitlist Not Found',
        description: 'The requested waitlist could not be found.',
      };
    }

    return {
      title: waitlist.name,
      description: waitlist.description || `Join the waitlist for ${waitlist.name}`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Waitlist',
      description: 'Join our waitlist to be the first to know when we launch.',
    };
  }
}

export default generateMetadata;
