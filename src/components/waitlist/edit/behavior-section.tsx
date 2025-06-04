import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';

interface BehaviorSectionProps {
  formData: {
    [x: string]: unknown;
    settings: {
      confirmationType: 'message' | 'redirect';
      confirmationMessage: string;
      redirectUrl: string;
      requireEmailVerification: boolean;
      enableReferrals: boolean;
      maxReferrals: number;
    };
  };
  onSettingsChange: (name: string, value: unknown) => void;
}

export function BehaviorSection({ formData, onSettingsChange }: BehaviorSectionProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('confirmation');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const embedCode = `
<script src="http://localhost:3000/widget.js"
  data-waitlist-id="your waitlist id"
  data-button-text="Join Waitlist"
  data-button-variant="default"
  data-button-rounded="md"
  data-primary-color="3b82f6"
  data-form-layout="stacked"
  data-show-labels="true"
  data-show-branding="true"
  data-api-key="your api key"
  async>
</script>
  `.trim();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Behavior</CardTitle>
        <CardDescription>Configure how your waitlist behaves.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>

          <TabsContent
            value="confirmation"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label>After Signup</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="confirmation-message"
                      checked={formData.settings.confirmationType === 'message'}
                      onChange={() => onSettingsChange('confirmationType', 'message')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label
                      htmlFor="confirmation-message"
                      className="font-normal"
                    >
                      Show confirmation message
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="confirmation-redirect"
                      checked={formData.settings.confirmationType === 'redirect'}
                      onChange={() => onSettingsChange('confirmationType', 'redirect')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label
                      htmlFor="confirmation-redirect"
                      className="font-normal"
                    >
                      Redirect to URL
                    </Label>
                  </div>
                </div>
              </div>

              {formData.settings.confirmationType === 'message' ? (
                <div>
                  <Label htmlFor="confirmation-message-text">Confirmation Message</Label>
                  <Textarea
                    id="confirmation-message-text"
                    value={formData.settings.confirmationMessage}
                    onChange={(e) => onSettingsChange('confirmationMessage', e.target.value)}
                    rows={3}
                    className="mt-2"
                    placeholder="Thanks for joining the waitlist! We'll be in touch soon."
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="redirect-url">Redirect URL</Label>
                  <Input
                    id="redirect-url"
                    type="url"
                    value={formData.settings.redirectUrl}
                    onChange={(e) => onSettingsChange('redirectUrl', e.target.value)}
                    placeholder="https://example.com/thank-you"
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="verification"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-verification">Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require users to verify their email address
                  </p>
                </div>
                <Switch
                  id="email-verification"
                  checked={formData.settings.requireEmailVerification}
                  onCheckedChange={(checked) =>
                    onSettingsChange('requireEmailVerification', checked)
                  }
                />
              </div>

              {formData.settings.requireEmailVerification && (
                <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-700">
                    Users will receive an email with a verification link. They must click the link
                    to confirm their subscription.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="referrals"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-referrals">Enable Referrals</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to refer friends and track referrals
                  </p>
                </div>
                <Switch
                  id="enable-referrals"
                  checked={formData.settings.enableReferrals}
                  onCheckedChange={(checked) => onSettingsChange('enableReferrals', checked)}
                />
              </div>

              {formData.settings.enableReferrals && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-referrals">Max Referrals Per User</Label>
                    <Input
                      id="max-referrals"
                      type="number"
                      min="0"
                      value={formData.settings.maxReferrals}
                      onChange={(e) =>
                        onSettingsChange('maxReferrals', parseInt(e.target.value) || 0)
                      }
                      className="mt-2 w-32"
                    />
                    <p className="mt-1 text-sm text-muted-foreground">
                      Set to 0 for unlimited referrals
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                    <p className="text-sm text-blue-700">
                      Users will receive a unique referral link to share with friends. You can track
                      referrals in the dashboard.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="embed"
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <Label>Embed Code</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add this code to your website to embed the waitlist form
                </p>
                <div className="relative">
                  <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-sm">
                    <code>{embedCode}</code>
                  </pre>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => handleCopy(embedCode)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
