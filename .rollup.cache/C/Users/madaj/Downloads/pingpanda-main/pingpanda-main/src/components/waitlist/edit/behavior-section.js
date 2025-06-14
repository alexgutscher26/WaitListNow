import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check } from 'lucide-react';
/**
 * Renders a behavior section component for configuring waitlist settings.
 *
 * This function manages various tabs for different configuration options such as confirmation, verification,
 * referrals, and embedding. It uses React hooks to manage the state of active tab and copy status.
 * The component provides UI elements for users to configure settings like email verification, referral
 * tracking, and embedding code. It also includes functionality to copy the embed code to clipboard.
 */
export function BehaviorSection(_a) {
  var formData = _a.formData,
    onSettingsChange = _a.onSettingsChange;
  var _b = useState(false),
    copied = _b[0],
    setCopied = _b[1];
  var _c = useState('confirmation'),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var handleCopy = function (text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(function () {
      return setCopied(false);
    }, 2000);
  };
  var embedCode =
    '\n<script src="http://localhost:3000/widget.js"\n  data-waitlist-id="your waitlist id"\n  data-button-text="Join Waitlist"\n  data-button-variant="default"\n  data-button-rounded="md"\n  data-primary-color="3b82f6"\n  data-form-layout="stacked"\n  data-show-labels="true"\n  data-show-branding="true"\n  data-api-key="your api key"\n  async>\n</script>\n  '.trim();
  return _jsxs(Card, {
    children: [
      _jsxs(CardHeader, {
        children: [
          _jsx(CardTitle, { children: 'Behavior' }),
          _jsx(CardDescription, { children: 'Configure how your waitlist behaves.' }),
        ],
      }),
      _jsx(CardContent, {
        children: _jsxs(Tabs, {
          value: activeTab,
          onValueChange: setActiveTab,
          className: 'space-y-6',
          children: [
            _jsxs(TabsList, {
              children: [
                _jsx(TabsTrigger, { value: 'confirmation', children: 'Confirmation' }),
                _jsx(TabsTrigger, { value: 'verification', children: 'Verification' }),
                _jsx(TabsTrigger, { value: 'referrals', children: 'Referrals' }),
                _jsx(TabsTrigger, { value: 'embed', children: 'Embed' }),
              ],
            }),
            _jsx(TabsContent, {
              value: 'confirmation',
              className: 'space-y-6',
              children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                  _jsxs('div', {
                    children: [
                      _jsx(Label, { children: 'After Signup' }),
                      _jsxs('div', {
                        className: 'mt-2 space-y-2',
                        children: [
                          _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              _jsx('input', {
                                type: 'radio',
                                id: 'confirmation-message',
                                checked: formData.settings.confirmationType === 'message',
                                onChange: function () {
                                  return onSettingsChange('confirmationType', 'message');
                                },
                                className: 'h-4 w-4 text-indigo-600 focus:ring-indigo-500',
                              }),
                              _jsx(Label, {
                                htmlFor: 'confirmation-message',
                                className: 'font-normal',
                                children: 'Show confirmation message',
                              }),
                            ],
                          }),
                          _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                              _jsx('input', {
                                type: 'radio',
                                id: 'confirmation-redirect',
                                checked: formData.settings.confirmationType === 'redirect',
                                onChange: function () {
                                  return onSettingsChange('confirmationType', 'redirect');
                                },
                                className: 'h-4 w-4 text-indigo-600 focus:ring-indigo-500',
                              }),
                              _jsx(Label, {
                                htmlFor: 'confirmation-redirect',
                                className: 'font-normal',
                                children: 'Redirect to URL',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  formData.settings.confirmationType === 'message'
                    ? _jsxs('div', {
                        children: [
                          _jsx(Label, {
                            htmlFor: 'confirmation-message-text',
                            children: 'Confirmation Message',
                          }),
                          _jsx(Textarea, {
                            id: 'confirmation-message-text',
                            value: formData.settings.confirmationMessage,
                            onChange: function (e) {
                              return onSettingsChange('confirmationMessage', e.target.value);
                            },
                            rows: 3,
                            className: 'mt-2',
                            placeholder: "Thanks for joining the waitlist! We'll be in touch soon.",
                          }),
                        ],
                      })
                    : _jsxs('div', {
                        children: [
                          _jsx(Label, { htmlFor: 'redirect-url', children: 'Redirect URL' }),
                          _jsx(Input, {
                            id: 'redirect-url',
                            type: 'url',
                            value: formData.settings.redirectUrl,
                            onChange: function (e) {
                              return onSettingsChange('redirectUrl', e.target.value);
                            },
                            placeholder: 'https://example.com/thank-you',
                            className: 'mt-2',
                          }),
                        ],
                      }),
                ],
              }),
            }),
            _jsx(TabsContent, {
              value: 'verification',
              className: 'space-y-6',
              children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                  _jsxs('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      _jsxs('div', {
                        children: [
                          _jsx(Label, {
                            htmlFor: 'email-verification',
                            children: 'Email Verification',
                          }),
                          _jsx('p', {
                            className: 'text-sm text-muted-foreground',
                            children: 'Require users to verify their email address',
                          }),
                        ],
                      }),
                      _jsx(Switch, {
                        id: 'email-verification',
                        checked: formData.settings.requireEmailVerification,
                        onCheckedChange: function (checked) {
                          return onSettingsChange('requireEmailVerification', checked);
                        },
                      }),
                    ],
                  }),
                  formData.settings.requireEmailVerification &&
                    _jsx('div', {
                      className: 'p-4 bg-blue-50 rounded-md border border-blue-200',
                      children: _jsx('p', {
                        className: 'text-sm text-blue-700',
                        children:
                          'Users will receive an email with a verification link. They must click the link to confirm their subscription.',
                      }),
                    }),
                ],
              }),
            }),
            _jsx(TabsContent, {
              value: 'referrals',
              className: 'space-y-6',
              children: _jsxs('div', {
                className: 'space-y-4',
                children: [
                  _jsxs('div', {
                    className: 'flex items-center justify-between',
                    children: [
                      _jsxs('div', {
                        children: [
                          _jsx(Label, {
                            htmlFor: 'enable-referrals',
                            children: 'Enable Referrals',
                          }),
                          _jsx('p', {
                            className: 'text-sm text-muted-foreground',
                            children: 'Allow users to refer friends and track referrals',
                          }),
                        ],
                      }),
                      _jsx(Switch, {
                        id: 'enable-referrals',
                        checked: formData.settings.enableReferrals,
                        onCheckedChange: function (checked) {
                          return onSettingsChange('enableReferrals', checked);
                        },
                      }),
                    ],
                  }),
                  formData.settings.enableReferrals &&
                    _jsxs('div', {
                      className: 'space-y-4',
                      children: [
                        _jsxs('div', {
                          children: [
                            _jsx(Label, {
                              htmlFor: 'max-referrals',
                              children: 'Max Referrals Per User',
                            }),
                            _jsx(Input, {
                              id: 'max-referrals',
                              type: 'number',
                              min: '0',
                              value: formData.settings.maxReferrals,
                              onChange: function (e) {
                                return onSettingsChange(
                                  'maxReferrals',
                                  parseInt(e.target.value) || 0,
                                );
                              },
                              className: 'mt-2 w-32',
                            }),
                            _jsx('p', {
                              className: 'mt-1 text-sm text-muted-foreground',
                              children: 'Set to 0 for unlimited referrals',
                            }),
                          ],
                        }),
                        _jsx('div', {
                          className: 'p-4 bg-blue-50 rounded-md border border-blue-200',
                          children: _jsx('p', {
                            className: 'text-sm text-blue-700',
                            children:
                              'Users will receive a unique referral link to share with friends. You can track referrals in the dashboard.',
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            }),
            _jsx(TabsContent, {
              value: 'embed',
              className: 'space-y-6',
              children: _jsx('div', {
                className: 'space-y-4',
                children: _jsxs('div', {
                  children: [
                    _jsx(Label, { children: 'Embed Code' }),
                    _jsx('p', {
                      className: 'text-sm text-muted-foreground mb-2',
                      children: 'Add this code to your website to embed the waitlist form',
                    }),
                    _jsxs('div', {
                      className: 'relative',
                      children: [
                        _jsx('pre', {
                          className: 'p-4 bg-gray-100 rounded-md overflow-x-auto text-sm',
                          children: _jsx('code', { children: embedCode }),
                        }),
                        _jsx(Button, {
                          type: 'button',
                          variant: 'outline',
                          size: 'sm',
                          className: 'absolute right-2 top-2 h-8 w-8 p-0',
                          onClick: function () {
                            return handleCopy(embedCode);
                          },
                          children: copied
                            ? _jsx(Check, { className: 'h-4 w-4 text-green-500' })
                            : _jsx(Copy, { className: 'h-4 w-4' }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
//# sourceMappingURL=behavior-section.js.map
