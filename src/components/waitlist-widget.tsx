'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import styles from './waitlist-widget.module.css';

// Define types for the style props
export interface WaitlistWidgetStyle {
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  showLabels?: boolean;
  formLayout?: 'stacked' | 'inline';
}

export interface WaitlistWidgetProps {
  waitlistId: string;
  style?: Partial<WaitlistWidgetStyle>;
  apiKey?: string;
  showBranding?: boolean;
  className?: string;
}

export function WaitlistWidget({
  waitlistId,
  style = {},
  apiKey,
  showBranding = true,
  className = '',
}: WaitlistWidgetProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Error',
        description: 'Email is required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    console.log('Widget API Key:', apiKey);

    try {
      const response = await fetch(`/api/waitlists/${waitlistId}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join waitlist');
      }

      toast({
        title: 'Success!',
        description: 'You have been added to the waitlist',
      });

      setEmail('');
      setName('');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to join waitlist',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply default styles
  const {
    buttonText = 'Join Waitlist',
    buttonColor = '',
    buttonTextColor = '',
    backgroundColor = '',
    textColor = '',
    borderRadius = 8,
    fontFamily = '',
    showLabels = true,
    formLayout = 'stacked',
  } = style || {};

  // Generate CSS variables for dynamic styling
  const cssVariables: React.CSSProperties & {
    '--button-bg'?: string;
    '--button-text'?: string;
    '--text-color'?: string;
    '--bg-color'?: string;
    '--font-family'?: string;
    '--border-radius'?: string;
  } = {
    ...(buttonColor && { '--button-bg': buttonColor }),
    ...(buttonTextColor && { '--button-text': buttonTextColor }),
    ...(textColor && { '--text-color': textColor }),
    ...(backgroundColor && { '--bg-color': backgroundColor }),
    ...(fontFamily && { '--font-family': fontFamily }),
    ...(borderRadius && { '--border-radius': `${borderRadius}px` }),
  };

  return (
    <div
      className={cn(
        styles['waitlist-widget'],
        formLayout === 'inline'
          ? styles['waitlist-widget--inline']
          : styles['waitlist-widget--stacked'],
        !showLabels && styles['waitlist-widget--no-labels'],
        className,
      )}
      style={cssVariables}
    >
      <form
        onSubmit={handleSubmit}
        className={styles['waitlist-widget__form']}
      >
        <div className={styles['waitlist-widget__field']}>
          {showLabels && (
            <Label
              htmlFor="name"
              className={styles['waitlist-widget__label']}
            >
              Name (Optional)
            </Label>
          )}
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className={styles['waitlist-widget__input']}
          />
        </div>

        <div className={styles['waitlist-widget__field']}>
          {showLabels && (
            <Label
              htmlFor="email"
              className={styles['waitlist-widget__label']}
            >
              Email *
            </Label>
          )}
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={styles['waitlist-widget__input']}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={styles['waitlist-widget__button']}
        >
          {isLoading ? 'Joining...' : buttonText}
        </Button>
      </form>
      {showBranding && (
        <div style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>Powered by WaitlistNow</div>
      )}
    </div>
  );
}
