'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

// Define the form schema using Zod
const emailSettingsSchema = z.object({
  sendConfirmationEmail: z.boolean().default(true),
  customThankYouMessage: z.string().max(500).optional(),
});

type EmailSettingsValues = z.infer<typeof emailSettingsSchema>;

interface EmailSettingsFormProps {
  waitlist: {
    id: string;
    customFields?: {
      sendConfirmationEmail?: boolean;
      customThankYouMessage?: string;
    } | null;
  };
}

export function EmailSettingsForm({ waitlist }: EmailSettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailSettingsValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      sendConfirmationEmail: waitlist.customFields?.sendConfirmationEmail ?? true,
      customThankYouMessage: waitlist.customFields?.customThankYouMessage || "Thank you for joining our waitlist! We'll notify you when we launch.",
    },
  });

  async function onSubmit(data: EmailSettingsValues) {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/waitlists/${waitlist.id}/email-settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customFields: {
            ...waitlist.customFields,
            sendConfirmationEmail: data.sendConfirmationEmail,
            customThankYouMessage: data.customThankYouMessage,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update email settings');
      }

      // Refresh the page to show updated data
      router.refresh();
      
      toast({
        title: 'Success',
        description: 'Email settings updated successfully',
      });
    } catch (error) {
      console.error('Error updating email settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update email settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="send-confirmation-email"
          checked={form.watch('sendConfirmationEmail')}
          onCheckedChange={(checked) => form.setValue('sendConfirmationEmail', checked)}
          disabled={isLoading}
        />
        <Label htmlFor="send-confirmation-email" className="cursor-pointer">
          Send confirmation emails to new subscribers
        </Label>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="custom-thank-you">Custom Thank You Message</Label>
        <Textarea
          id="custom-thank-you"
          placeholder="Enter a custom thank you message"
          className="min-h-[100px]"
          {...form.register('customThankYouMessage')}
          disabled={isLoading}
        />
        <p className="text-sm text-muted-foreground">
          This message will be shown to users after they sign up for your waitlist.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Email Settings'}
        </Button>
      </div>
    </form>
  );
}
