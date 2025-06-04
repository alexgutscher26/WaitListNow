import React from 'react';
import { Button } from './button';
import { Twitter, Linkedin, Mail } from 'lucide-react';

interface SocialShareButtonsProps {
  url: string;
  message?: string;
  className?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  message,
  className,
}) => {
  const encodedUrl = encodeURIComponent(url);
  // For Twitter, remove the link from the message if present
  let twitterMsg = message || '';
  if (twitterMsg.includes(url)) {
    twitterMsg = twitterMsg
      .replace(url, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
  }
  const encodedTwitterMsg = encodeURIComponent(twitterMsg);
  const encodedMsg = message ? encodeURIComponent(message) : '';

  const SOCIALS = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-[#1da1f2]/10 text-[#1da1f2] focus-visible:ring-[#1da1f2]',
      getUrl: () =>
        `https://twitter.com/intent/tweet?url=${encodedUrl}${encodedTwitterMsg ? `&text=${encodedTwitterMsg}` : ''}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-[#0077b5]/10 text-[#0077b5] focus-visible:ring-[#0077b5]',
      getUrl: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-[#ea4335]/10 text-[#ea4335] focus-visible:ring-[#ea4335]',
      getUrl: () => `mailto:?subject=${encodedMsg || 'Check this out!'}&body=${encodedUrl}`,
    },
  ];

  return (
    <div
      className={`flex gap-2 ${className || ''}`}
      aria-label="Share referral link"
    >
      {SOCIALS.map((social) => {
        const Icon = social.icon;
        const shareUrl = social.getUrl();
        return (
          <Button
            asChild
            size="icon"
            variant="ghost"
            aria-label={`Share on ${social.name}`}
            key={social.name}
            className={`rounded-full transition-colors duration-150 ${social.color}`}
          >
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
            >
              <Icon className="w-5 h-5" />
            </a>
          </Button>
        );
      })}
    </div>
  );
};
