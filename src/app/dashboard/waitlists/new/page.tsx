'use client';

import React from 'react';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/client';

// URL validation helper
const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
// Simple Badge component
/**
 * Renders a badge component with customizable variant and class name.
 */
const Badge = ({
  children,
  variant = 'default',
  className = '',
  ...props
}: {
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const baseStyles =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
    outline: 'text-foreground border-border',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Plus,
  Zap,
  Eye,
  Copy,
  Trash2,
  GripVertical,
  Check,
  X,
  Loader2,
  Pencil,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { DashboardPage } from '@/components/dashboard-page';
import Link from 'next/link';
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Modal } from '@/components/ui/modal';
import { WaitlistPreview } from '@/components/waitlist/edit/waitlist-preview';

// Types
type FieldType = 'text' | 'email' | 'number' | 'url' | 'tel' | 'textarea' | 'select';
type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
type FormLayout = 'stacked' | 'inline';
type ConfirmationType = 'message' | 'redirect';

interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select type
}

interface WaitlistStyle {
  primaryColor: string;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonVariant: ButtonVariant;
  buttonRounded: ButtonRounded;
  formLayout: FormLayout;
  showLabels: boolean;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  boxShadow: string;
  padding: string;
  borderRadius: string;
}
interface FormData {
  name: string;
  description: string;
  websiteUrl: string;
  redirectUrl: string;
  logoUrl: string;
  customFields: CustomField[];
  style: WaitlistStyle;
  confirmationType: ConfirmationType;
  confirmationMessage: string;
  enableNotifications: boolean;
  enableReferrals: boolean;
  referralReward: string;
  requireEmailVerification: boolean;
  maxSignups?: number;
  showBranding: boolean;
  settings: {
    maxSignups?: number;
    emailVerification: boolean;
    allowDuplicates: boolean;
    referralEnabled: boolean;
    referralReward?: string;
    customCss?: string;
    customJs?: string;
  };
}

// Constants
const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'url', label: 'URL' },
  { value: 'tel', label: 'Phone' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
];

const BUTTON_VARIANTS: { value: ButtonVariant; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'outline', label: 'Outline' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'link', label: 'Link' },
];

const BORDER_RADIUS: { value: ButtonRounded; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'full', label: 'Pill' },
];

/**
 * React component responsible for rendering a form to create or edit a waitlist.
 *
 * @function CreateOrEditWaitlist
 * @returns {JSX.Element} - The JSX element representing the form interface.
 */
export default function NewWaitlistPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'basic' | 'fields' | 'appearance' | 'behavior'>(
    'basic',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newField, setNewField] = useState<Partial<CustomField>>({
    type: 'text',
    required: false,
  });
  const [showFieldEditor, setShowFieldEditor] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    websiteUrl: '',
    redirectUrl: '',
    logoUrl: '',
    customFields: [],
    confirmationType: 'message',
    confirmationMessage: 'Thank you for joining the waitlist!',
    enableNotifications: false,
    enableReferrals: false,
    referralReward: '',
    requireEmailVerification: true,
    showBranding: true,
    style: {
      buttonText: 'Join Waitlist',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      borderRadius: '8',
      fontFamily: 'Inter',
      showLabels: true,
      formLayout: 'stacked',
      primaryColor: '#3b82f6',
      buttonVariant: 'default',
      buttonRounded: 'md',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1.5rem',
    },
    settings: {
      maxSignups: undefined,
      emailVerification: true,
      allowDuplicates: false,
      referralEnabled: false,
      referralReward: '',
      customCss: '',
      customJs: '',
    },
  });
  const [embedType, setEmbedType] = useState<'js' | 'iframe'>('js');
  // Plan check using React Query
  const { data: planData } = useQuery({
    queryKey: ['user-plan'],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get({});
      return await res.json();
    },
    refetchInterval: 60000, // Refresh every 60s
  });
  const userPlan = planData?.plan as string | undefined;
  const isProUser = userPlan === 'STARTER' || userPlan === 'GROWTH' || userPlan === 'PRO';
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Helper functions
  const getBorderRadius = useCallback((size: ButtonRounded): string => {
    const radiusMap = {
      none: '0px',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    };
    return radiusMap[size] || '0.375rem';
  }, []);

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Waitlist name is required';
    }

    if (formData.websiteUrl && !isValidUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }

    if (formData.redirectUrl && !isValidUrl(formData.redirectUrl)) {
      newErrors.redirectUrl = 'Please enter a valid URL';
    }

    if (formData.maxSignups && formData.maxSignups < 1) {
      newErrors.maxSignups = 'Maximum signups must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Form change handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const { name, value, type } = target;
      const checked = 'checked' in target ? target.checked : undefined;

      // Handle nested objects in form data (style, settings, etc.)
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...((prev[parent as keyof FormData] as object) || {}),
            [child]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
        }));
      }

      // Clear error when field is edited
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  // Handle color picker changes

  // Add a new custom field
  const addCustomField = () => {
    if (!newField.name) {
      toast.error('Field name is required');
      return;
    }

    // Check if field with this name already exists
    if (formData.customFields.some((field) => field.name === newField.name)) {
      toast.error('A field with this name already exists');
      return;
    }

    const field: CustomField = {
      id: `field-${Date.now()}`,
      name: newField.name,
      type: newField.type || 'text',
      required: newField.required || false,
      placeholder: newField.placeholder || '',
      options: newField.type === 'select' ? newField.options || [''] : undefined,
    };

    setFormData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, field],
    }));

    // Reset the new field form
    setNewField({
      type: 'text',
      required: false,
    });
    setShowFieldEditor(false);
    toast.success('Custom field added');
  };

  // Remove a custom field
  const removeCustomField = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }));
  }, []);

  // Update a custom field
  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    }));

    // If updating options for a select field, ensure at least one option exists
    if (updates.type === 'select' && !updates.options?.length) {
      setFormData((prev) => ({
        ...prev,
        customFields: prev.customFields.map((field) =>
          field.id === id ? { ...field, ...updates, options: [''] } : field,
        ),
      }));
    }
  };

  // Reorder custom fields
  const reorderCustomFields = useCallback((dragIndex: number, dropIndex: number) => {
    setFormData((prev) => {
      const fields = [...prev.customFields];
      const draggedField = fields[dragIndex];
      fields.splice(dragIndex, 1);
      fields.splice(dropIndex, 0, draggedField);
      return { ...prev, customFields: fields };
    });
  }, []);

  /**
   * Handles form submission by preventing default form behavior, validating input,
   * and making an API call to create a new waitlist.
   *
   * It performs client-side validation, prepares data for the API, sends a POST request to create the waitlist,
   * handles errors from the API response, sends a verification email if required, and redirects to the success page.
   *
   * @param e - The form event object.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Generate verification token if email verification is enabled
      const verificationToken = formData.requireEmailVerification ? crypto.randomUUID() : undefined;

      // Prepare the data for the API
      const waitlistData = {
        name: formData.name,
        description: formData.description,
        websiteUrl: formData.websiteUrl || '',
        redirectUrl: formData.redirectUrl || '',
        logoUrl: formData.logoUrl || '',
        customFields: formData.customFields,
        style: {
          ...formData.style,
          borderRadius: Number(formData.style.borderRadius) || 8, // Ensure borderRadius is a number
        },
        settings: {
          ...formData.settings,
          maxSignups: formData.settings.maxSignups || undefined,
          emailVerification: formData.requireEmailVerification,
          allowDuplicates: formData.settings.allowDuplicates || false,
          referralEnabled: formData.enableReferrals,
          referralReward: formData.referralReward || '',
          customCss: formData.settings.customCss || '',
          customJs: formData.settings.customJs || '',
        },
        verificationToken,
      };

      // Call the API to create the waitlist
      const response = await fetch('/api/waitlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error) {
          setErrors((prev) => ({
            ...prev,
            ...(typeof data.error === 'string' ? { _form: data.error } : data.error),
          }));
          toast.error('Please fix the errors in the form');
        } else {
          throw new Error(data.error || 'Failed to create waitlist');
        }
        return;
      }

      // If email verification is enabled, send verification email
      if (formData.requireEmailVerification && verificationToken) {
        try {
          const emailResponse = await fetch('/api/verify-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: data.email, // Assuming the API returns the email
              verificationToken,
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send verification email');
            // Continue with success flow even if email fails
          }
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          // Continue with success flow even if email fails
        }
      }

      // Success! Redirect to the waitlists page
      toast.success('Waitlist created successfully!');
      // Use replace to prevent going back to the form
      router.replace('/dashboard/waitlists');
      // Trigger a refresh of the waitlists data
      router.refresh();
    } catch (error) {
      console.error('Error creating waitlist:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get branding preference from form data

  // Generate embed code based on selected type
  const embedCode = useMemo(() => {
    const baseUrl = 'http://localhost:3000';
    const waitlistId = 'your waitlist id';
    const apiKey = 'your api key';

    // Ensure all style properties have default values
    const style = {
      buttonText: formData.style?.buttonText || 'Join Waitlist',
      buttonVariant: formData.style?.buttonVariant || 'default',
      buttonRounded: formData.style?.buttonRounded || 'md',
      primaryColor: formData.style?.primaryColor || '#3b82f6',
      formLayout: formData.style?.formLayout || 'stacked',
      showLabels: formData.style?.showLabels ?? true,
    };

    // ENFORCE BRANDING FOR FREE USERS
    const showBranding = isProUser ? formData.showBranding !== false : true;
    const dataAttributes = [
      `data-waitlist-id="${waitlistId}"`,
      `data-button-text="${style.buttonText}"`,
      `data-button-variant="${style.buttonVariant}"`,
      `data-button-rounded="${style.buttonRounded}"`,
      `data-primary-color="${style.primaryColor.replace('#', '')}"`,
      `data-form-layout="${style.formLayout}"`,
      `data-show-labels="${style.showLabels}"`,
      `data-show-branding="${showBranding}"`,
      ...(formData.enableReferrals ? ['data-enable-referrals="true"'] : []),
      ...(formData.referralReward ? [`data-referral-reward="${formData.referralReward}"`] : []),
      ...(formData.maxSignups ? [`data-max-signups="${formData.maxSignups}"`] : []),
      `data-api-key="${apiKey}"`,
    ];

    if (embedType === 'js') {
      return `<script src="${baseUrl}/widget.js"\n  ${dataAttributes.join('\n  ')}\n  async>\n</script>`;
    } else {
      // For iframe, we'll use a URL with query parameters
      const params = new URLSearchParams();
      dataAttributes.forEach((attr) => {
        const [key, value] = attr.split('=');
        if (key && value) {
          const cleanKey = key.replace('data-', '').replace(/["']/g, '');
          const cleanValue = value.replace(/["']/g, '');
          params.append(cleanKey, cleanValue);
        }
      });
      const iframeUrl = `${baseUrl}/widget/embed?${params.toString()}`;
      return `<iframe 
  src="${iframeUrl}"
  width="100%" 
  height="500" 
  frameborder="0" 
  style="border: none; border-radius: 8px;"
  scrolling="no"
></iframe>`;
    }
  }, [formData, embedType, isProUser]);

  /**
   * Attempts to copy the embed code to the clipboard and logs errors if it fails.
   */
  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast.success('Embed code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy embed code:', err);
      toast.error('Failed to copy embed code');
    }
  };

  /**
   * Resets form data to default values and clears errors.
   */
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      websiteUrl: '',
      redirectUrl: '',
      logoUrl: '',
      customFields: [],
      confirmationType: 'message',
      confirmationMessage: 'Thank you for joining the waitlist!',
      enableNotifications: false,
      enableReferrals: false,
      referralReward: '',
      requireEmailVerification: true,
      showBranding: true,
      style: {
        buttonText: 'Join Waitlist',
        buttonColor: '#3b82f6',
        buttonTextColor: '#ffffff',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderRadius: '8',
        fontFamily: 'Inter',
        showLabels: true,
        formLayout: 'stacked',
        primaryColor: '#3b82f6',
        buttonVariant: 'default',
        buttonRounded: 'md',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
      },
      settings: {
        maxSignups: undefined,
        emailVerification: true,
        allowDuplicates: false,
        referralEnabled: false,
        referralReward: '',
        customCss: '',
        customJs: '',
      },
    });
    setErrors({});
  };

  return (
    <DashboardPage
      title="Create New Waitlist"
      hideBackButton={false}
      cta={
        <div className="flex gap-2">
          <Button
            variant="outline"
            asChild
          >
            <Link href="/dashboard/waitlists">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            type="submit"
            form="waitlist-form"
            disabled={isSubmitting || !formData.name.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Create Waitlist
              </>
            )}
          </Button>
        </div>
      }
    >
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{errors.submit}</p>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2"
        >
          {previewMode ? (
            <>
              <Pencil className="h-4 w-4" />
              Edit Form
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Preview
            </>
          )}
        </Button>
      </div>

      {previewMode ? (
        <div className="border rounded-lg p-6 bg-card">
          <WaitlistPreview formData={formData} />
        </div>
      ) : (
        <form
          id="waitlist-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="basic"
                className="flex items-center gap-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  1
                </span>
                Basic
              </TabsTrigger>
              <TabsTrigger
                value="fields"
                className="flex items-center gap-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  2
                </span>
                Fields
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="flex items-center gap-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  3
                </span>
                Style
              </TabsTrigger>
              <TabsTrigger
                value="behavior"
                className="flex items-center gap-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  4
                </span>
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="basic"
              className="space-y-6"
            >
              <BasicInfoSection
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent
              value="fields"
              className="space-y-6"
            >
              <CustomFieldsSection
                formData={formData}
                newField={newField}
                setNewField={setNewField}
                addCustomField={addCustomField}
                removeCustomField={removeCustomField}
                updateCustomField={updateCustomField}
                reorderCustomFields={reorderCustomFields}
              />
            </TabsContent>

            <TabsContent
              value="appearance"
              className="space-y-6"
            >
              <AppearanceSection
                formData={formData}
                setFormData={setFormData}
                getBorderRadius={getBorderRadius}
              />
            </TabsContent>

            <TabsContent
              value="behavior"
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                  <CardDescription>Customize the branding on your waitlist form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h4 className="font-medium">Show "Powered by WaitlistNow"</h4>
                        <p className="text-sm text-muted-foreground">
                          {formData.showBranding
                            ? 'A small badge will be shown at the bottom of your waitlist form'
                            : 'The badge will be hidden from your waitlist form'}
                        </p>
                      </div>
                      <Button
                        variant={formData.showBranding ? 'outline' : 'default'}
                        onClick={() => {
                          if (!isProUser) {
                            toast.info('Upgrade to Pro to remove branding.');
                            return;
                          }
                          setFormData((prev) => ({
                            ...prev,
                            showBranding: !prev.showBranding,
                          }));
                        }}
                        disabled={!isProUser}
                      >
                        {formData.showBranding ? 'Hide' : 'Show'} Branding
                      </Button>
                    </div>

                    {/* Only show upgrade card if not on a paid plan */}
                    {!isProUser && (
                      <div className="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/20">
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="ml-3 flex-1">
                              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                Want to remove branding?
                              </h3>
                              <div className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                                <p>
                                  Upgrade to Pro to remove the "Powered by WaitlistNow" badge and
                                  unlock additional features.
                                </p>
                              </div>
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50"
                                  onClick={() => setShowUpgradeModal(true)}
                                >
                                  Upgrade to Pro
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.showBranding && (
                      <div className="mt-4 rounded-lg border p-4">
                        <h4 className="mb-2 text-sm font-medium">Preview</h4>
                        <div className="flex items-center justify-between rounded-md border bg-background p-3 text-sm text-muted-foreground">
                          <span>
                            Powered by <strong>WaitlistNow</strong>
                          </span>
                          <span className="text-xs text-muted-foreground/60">
                            Your form will look like this
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <BehaviorSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                embedCode={embedCode}
                copyEmbedCode={copyEmbedCode}
                showBranding={formData.showBranding}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
            >
              Reset Form
            </Button>
            <div className="flex gap-2">
              {activeTab !== 'basic' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = ['basic', 'fields', 'appearance', 'behavior'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1] as any);
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              {activeTab !== 'behavior' && (
                <Button
                  type="button"
                  onClick={() => {
                    const tabs = ['basic', 'fields', 'appearance', 'behavior'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1] as any);
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </form>
      )}
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <Modal
          showModal={showUpgradeModal}
          setShowModal={setShowUpgradeModal}
        >
          <div className="p-0 rounded-2xl overflow-hidden bg-white shadow-xl max-w-md mx-auto">
            {/* Accent bar */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 w-full" />
            <div className="flex flex-col items-center px-8 py-8">
              {/* Icon */}
              <div className="bg-blue-100 rounded-full p-3 mb-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 21 12 17.27 7.82 21 9 12.91l-5-3.64 5.91-.91L12 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Upgrade to <span className="text-blue-600">Starter</span>
              </h2>
              <p className="mb-4 text-gray-600">
                Remove branding and unlock all premium features with the Starter plan.
              </p>
              {/* Price and features */}
              <div className="mb-6 w-full bg-blue-50 rounded-lg p-4 text-left">
                <div className="flex items-center mb-2">
                  <span className="text-3xl font-bold text-blue-600 mr-2">$19</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 pl-4 list-disc">
                  <li>Remove "Powered by WaitlistNow" branding</li>
                  <li>Up to 3 active waitlists</li>
                  <li>10,000 signups per month</li>
                  <li>Custom domains & branding</li>
                  <li>Email notifications</li>
                  <li>Priority support</li>
                </ul>
              </div>
              <Button
                className="w-full h-12 mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg"
                onClick={() => {
                  setShowUpgradeModal(false);
                  window.location.href = '/dashboard/upgrade';
                }}
              >
                Upgrade Now
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => setShowUpgradeModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardPage>
  );
}

// Component sections
interface SectionProps {
  formData: FormData;
  errors?: Record<string, string>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

/**
 * Renders a section for basic information input fields in a form.
 *
 * This component includes input fields for the waitlist name, description,
 * website URL, thank you page URL, and optional logo URL. It handles form data changes through
 * the provided `onChange` function and displays error messages if applicable.
 *
 * The component uses conditional rendering to apply error styles and display
 * error messages next to respective input fields.
 *
 * @param formData - An object containing the current values of the form fields.
 * @param errors - An object containing error messages for each field, if any.
 * @param onChange - A callback function to handle changes in the form fields.
 */
function BasicInfoSection({ formData, errors, onChange }: SectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Set up the essential details for your waitlist</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Waitlist Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="e.g., Early Access Waitlist"
            required
            className={errors?.name ? 'border-red-500' : ''}
          />
          {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Tell people what they're signing up for"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={onChange}
              placeholder="https://yourapp.com"
              className={errors?.websiteUrl ? 'border-red-500' : ''}
            />
            {errors?.websiteUrl && <p className="text-red-500 text-sm">{errors.websiteUrl}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="redirectUrl">Thank You Page URL</Label>
            <Input
              id="redirectUrl"
              name="redirectUrl"
              type="url"
              value={formData.redirectUrl}
              onChange={onChange}
              placeholder="https://yourapp.com/thank-you"
              className={errors?.redirectUrl ? 'border-red-500' : ''}
            />
            {errors?.redirectUrl && <p className="text-red-500 text-sm">{errors.redirectUrl}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL (optional)</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            type="url"
            value={formData.logoUrl}
            onChange={onChange}
            placeholder="https://yourapp.com/logo.png"
          />
          <p className="text-sm text-muted-foreground">
            Display your logo at the top of the waitlist form
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface CustomFieldsSectionProps {
  formData: FormData;
  newField: Partial<CustomField>;
  setNewField: (field: Partial<CustomField>) => void;
  addCustomField: () => void;
  removeCustomField: (id: string) => void;
  updateCustomField: (id: string, updates: Partial<CustomField>) => void;
  reorderCustomFields: (dragIndex: number, dropIndex: number) => void;
}

/**
 * Renders a custom fields section component.
 *
 * This component manages custom fields in forms by providing inputs for field name, type,
 * placeholder text, and required status. It supports adding, removing, updating, and reordering of
 * custom fields. Additionally, it handles specific types like 'select' with options input.
 *
 * @param formData - The form data containing custom fields.
 * @param newField - The current state of the new custom field being added.
 * @param setNewField - A function to update the new custom field state.
 * @param addCustomField - A function to add a new custom field to the form data.
 * @param removeCustomField - A function to remove a custom field from the form data.
 */
function CustomFieldsSection({
  formData,
  newField,
  setNewField,
  addCustomField,
  removeCustomField,
}: CustomFieldsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
        <CardDescription>Collect additional information from your subscribers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <Input
              placeholder="Field name"
              value={newField.name || ''}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            />
          </div>
          <div className="col-span-3">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newField.type || 'text'}
              onChange={(e) => setNewField({ ...newField, type: e.target.value as FieldType })}
            >
              {FIELD_TYPES.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <Input
              placeholder="Placeholder text"
              value={newField.placeholder || ''}
              onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              id="required"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
              checked={newField.required || false}
              onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
            />
          </div>
          <div className="col-span-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCustomField}
              disabled={!newField.name?.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {newField.type === 'select' && (
          <div className="space-y-2">
            <Label>Select Options</Label>
            <Input
              placeholder="Enter options separated by commas"
              value={newField.options?.join(', ') || ''}
              onChange={(e) =>
                setNewField({
                  ...newField,
                  options: e.target.value
                    .split(',')
                    .map((opt) => opt.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        )}

        {formData.customFields.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Custom Fields</h4>
              <Badge variant="secondary">{formData.customFields.length}</Badge>
            </div>
            <div className="rounded-md border divide-y">
              {formData.customFields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3 group"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{field.name}</p>
                        {field.required && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {FIELD_TYPES.find((t) => t.value === field.type)?.label}
                        {field.placeholder && ` • "${field.placeholder}"`}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomField(field.id)}
                    className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface AppearanceSectionProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  getBorderRadius: (size: ButtonRounded) => string;
}

/**
 * Renders a section for customizing button appearance and form styling.
 */
function AppearanceSection({ formData, setFormData }: AppearanceSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Button Appearance</CardTitle>
            <CardDescription>Customize your call-to-action button</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.style.buttonText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    style: { ...prev.style, buttonText: e.target.value },
                  }))
                }
                placeholder="e.g., Join Waitlist"
              />
            </div>

            <div className="space-y-2">
              <Label>Button Style</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.style.buttonVariant}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    style: { ...prev.style, buttonVariant: e.target.value as ButtonVariant },
                  }))
                }
              >
                {BUTTON_VARIANTS.map((variant) => (
                  <option
                    key={variant.value}
                    value={variant.value}
                  >
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Button Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.style.buttonColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, buttonColor: e.target.value },
                    }))
                  }
                  className="h-10 w-16 cursor-pointer rounded border"
                />
                <Input
                  value={formData.style.buttonColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, buttonColor: e.target.value },
                    }))
                  }
                  className="w-32"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Button Text Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.style.buttonTextColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, buttonTextColor: e.target.value },
                    }))
                  }
                  className="h-10 w-16 cursor-pointer rounded border"
                />
                <Input
                  value={formData.style.buttonTextColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, buttonTextColor: e.target.value },
                    }))
                  }
                  className="w-32"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Button Corners</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.style.buttonRounded}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    style: { ...prev.style, buttonRounded: e.target.value as ButtonRounded },
                  }))
                }
              >
                {BORDER_RADIUS.map((radius) => (
                  <option
                    key={radius.value}
                    value={radius.value}
                  >
                    {radius.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Colors & Layout</CardTitle>
            <CardDescription>Set colors and form layout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.style.primaryColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, primaryColor: e.target.value },
                    }))
                  }
                  className="h-10 w-16 cursor-pointer rounded border"
                />
                <Input
                  value={formData.style.primaryColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, primaryColor: e.target.value },
                    }))
                  }
                  className="w-32"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Form Layout</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="stacked"
                    checked={formData.style.formLayout === 'stacked'}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        style: { ...prev.style, formLayout: 'stacked' },
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  Stacked
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="inline"
                    checked={formData.style.formLayout === 'inline'}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        style: { ...prev.style, formLayout: 'inline' },
                      }))
                    }
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  Inline
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showLabels"
                  checked={formData.style.showLabels}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      style: { ...prev.style, showLabels: e.target.checked },
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="showLabels"
                  className="text-sm font-medium"
                >
                  Show field labels
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showBranding"
                  checked={formData.showBranding}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      showBranding: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="showBranding"
                  className="text-sm font-medium"
                >
                  Show "Powered by WaitlistNow"
                </label>
                {!formData.showBranding && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Pro Feature
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <WaitlistPreview formData={formData} />
      </div>
    </div>
  );
}

interface BehaviorSectionProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  errors: Record<string, string>;
  embedCode: string;
  copyEmbedCode: () => void;
  showBranding?: boolean;
}

/**
 * Behavior Description:
 * This component renders a settings panel for configuring various aspects of a waitlist system,
 * including confirmation messages, notification preferences, and other options.
 *
 * The panel consists of three main sections:
 * 1. Confirmation Messages: Users can configure different types of messages (e.g., success, error)
 *    with customizable templates. They also have the option to disable certain message types entirely.
 * 2. Notification Preferences: Users can choose which email notifications they want to receive
 *    for various events related to their waitlist entries (e.g., status change, reminders).
 * 3. General Options: These include settings like allowing duplicates, enabling referrals,
 *    and setting maximum sign-ups.
 *
 * Component Structure:
 * - The component is composed of several child components, each responsible for rendering a specific
 *   section of the settings panel.
 * - It uses state management to keep track of user inputs and preferences.
 * - Upon saving changes, it triggers API calls to update the waitlist configuration on the server.
 *
 * User Interaction:
 * - Users can enable or disable different message types and customize their templates.
 * - They can select which notifications they want to receive for various events.
 * - General settings like allowing duplicates and enabling referrals are controlled via checkboxes.
 * - Changes are saved by clicking the "Save" button, which triggers the update process.
 *
 * Customization:
 * - The component allows customization of message templates through text input fields.
 * - Users can choose from a set of predefined email notification options.
 * - General settings provide flexibility in configuring various aspects of the waitlist system.
 */
function BehaviorSection({
  formData,
  setFormData,
  errors,
  embedCode,
  copyEmbedCode,
}: BehaviorSectionProps) {
  const [embedType, setEmbedType] = useState<'js' | 'iframe'>('js');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConfirmation = () => {
    setIsTesting(true);
    setShowConfirmation(true);
  };

  const handleCloseTest = () => {
    setShowConfirmation(false);
    // Small delay to allow the modal to close before resetting the testing state
    setTimeout(() => setIsTesting(false), 300);
  };

  const handleRedirect = () => {
    if (formData.confirmationType === 'redirect' && formData.redirectUrl) {
      window.open(formData.redirectUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Settings</CardTitle>
          <CardDescription>What happens after someone joins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="confirmationMessage"
                  name="confirmationType"
                  value="message"
                  checked={formData.confirmationType === 'message'}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmationType: 'message',
                    }))
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="confirmationMessage"
                  className="text-sm font-medium"
                >
                  Show confirmation message
                </label>
              </div>

              {formData.confirmationType === 'message' && (
                <div className="ml-6 space-y-2">
                  <Textarea
                    value={formData.confirmationMessage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmationMessage: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Thanks for joining! We'll be in touch soon."
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    This message will be shown after form submission
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="confirmationRedirect"
                  name="confirmationType"
                  value="redirect"
                  checked={formData.confirmationType === 'redirect'}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmationType: 'redirect',
                    }))
                  }
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="confirmationRedirect"
                  className="text-sm font-medium"
                >
                  Redirect to URL
                </label>
              </div>

              {formData.confirmationType === 'redirect' && (
                <div className="ml-6 space-y-2">
                  <input
                    type="url"
                    value={formData.redirectUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        redirectUrl: e.target.value,
                      }))
                    }
                    placeholder="https://example.com/thank-you"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500">
                    Users will be redirected to this URL after submission
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleTestConfirmation}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <span>Test confirmation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Confirmation Preview Modal */}
              <Dialog
                open={showConfirmation}
                onOpenChange={handleCloseTest}
              >
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      {formData.confirmationType === 'message'
                        ? 'Confirmation Message Preview'
                        : 'Redirect Confirmation'}
                    </DialogTitle>
                    <DialogDescription>
                      {formData.confirmationType === 'message'
                        ? 'This is how your confirmation message will appear to users.'
                        : 'Users will be redirected to the following URL after submission:'}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4">
                    {formData.confirmationType === 'message' ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <h4 className="text-green-800 font-medium">Success!</h4>
                              <p className="text-green-700 mt-1">
                                {formData.confirmationMessage || 'Your submission was successful.'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>
                            This is a preview of your confirmation message. Users will see this
                            after submitting the form.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-800 break-all">
                            {formData.redirectUrl || 'No redirect URL provided'}
                          </p>
                          {formData.redirectUrl && !isValidUrl(formData.redirectUrl) && (
                            <p className="text-red-500 text-sm mt-2">
                              Warning: This does not appear to be a valid URL
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>
                            Users will be automatically redirected to this URL after submission.
                          </p>
                          {formData.redirectUrl && isValidUrl(formData.redirectUrl) && (
                            <button
                              onClick={handleRedirect}
                              className="mt-2 inline-flex items-center text-blue-600 hover:underline text-sm"
                            >
                              Test redirect <ExternalLink className="w-3.5 h-3.5 ml-1" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleCloseTest}
                      variant="outline"
                      className="mr-2"
                    >
                      Close
                    </Button>
                    {formData.confirmationType === 'redirect' &&
                      formData.redirectUrl &&
                      isValidUrl(formData.redirectUrl) && (
                        <Button
                          onClick={handleRedirect}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Open URL
                        </Button>
                      )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>Add this waitlist to your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="js"
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="js">JavaScript Snippet</TabsTrigger>
              <TabsTrigger value="iframe">iFrame Embed</TabsTrigger>
              <TabsTrigger value="direct">Direct Script Embed</TabsTrigger>
            </TabsList>
            <TabsContent value="js">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>JavaScript Embed Code</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyEmbedCode}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                    <code>{embedCode}</code>
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add this script tag to your website's HTML where you want the waitlist form to
                  appear.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="iframe">
              {(() => {
                // Generate iframe code from formData
                const params = new URLSearchParams({
                  buttonText: formData.style?.buttonText || 'Join Waitlist',
                  buttonColor: formData.style?.buttonColor || '#3b82f6',
                  buttonTextColor: formData.style?.buttonTextColor || '#ffffff',
                  backgroundColor: formData.style?.backgroundColor || '#ffffff',
                  textColor: formData.style?.textColor || '#1f2937',
                  borderRadius: String(formData.style?.borderRadius || 8),
                  fontFamily: formData.style?.fontFamily || 'Inter',
                  showLabels: String(formData.style?.showLabels ?? true),
                  formLayout: formData.style?.formLayout || 'stacked',
                  showBranding: String(formData.showBranding),
                });
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://waitlistnow.app';
                const iframeUrl = `${baseUrl}/widget/iframe?waitlistId=your_waitlist_id&${params.toString()}`;
                const iframeCode = `<iframe src="${iframeUrl}" width="400" height="600" style="border:none;"></iframe>`;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>iFrame Embed Code</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(iframeCode)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                        <code>{iframeCode}</code>
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add this iframe code to your website's HTML where you want the waitlist form
                      to appear.
                    </p>
                    <div className="mt-4">
                      <Label className="mb-2 block">Live Preview</Label>
                      <div
                        className="border rounded overflow-hidden"
                        style={{ width: '100%', maxWidth: 500, height: 600 }}
                      >
                        <iframe
                          src={iframeUrl}
                          width="100%"
                          height={600}
                          style={{ border: 'none', width: '100%', height: 600, display: 'block' }}
                          title="Waitlist Widget Preview"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </TabsContent>
            <TabsContent value="direct">
              {(() => {
                // Generate direct script code from formData
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://waitlistnow.app';
                const waitlistId = 'your_waitlist_id';
                const apiKey = 'your_api_key';
                const style = formData.style || {};
                const showBranding = String(formData.showBranding);
                const dataAttrs = [
                  `data-waitlist-id=\"${waitlistId}\"`,
                  `data-api-key=\"${apiKey}\"`,
                  `data-button-text=\"${style.buttonText || 'Join Waitlist'}\"`,
                  `data-button-color=\"${style.buttonColor || '#3b82f6'}\"`,
                  `data-button-text-color=\"${style.buttonTextColor || '#fff'}\"`,
                  `data-background-color=\"${style.backgroundColor || '#fff'}\"`,
                  `data-text-color=\"${style.textColor || '#1f2937'}\"`,
                  `data-border-radius=\"${style.borderRadius || 8}\"`,
                  `data-font-family=\"${style.fontFamily || 'Inter'}\"`,
                  `data-show-labels=\"${String(style.showLabels ?? true)}\"`,
                  `data-form-layout=\"${style.formLayout || 'stacked'}\"`,
                  `data-show-branding=\"${showBranding}\"`,
                ];
                const scriptCode = `<script src=\"${baseUrl}/widget.js\"\n  ${dataAttrs.join('\n  ')}\n  async></script>`;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Direct Script Embed Code</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(scriptCode)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                        <code>{scriptCode}</code>
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add this script tag to your website's HTML where you want the waitlist form to
                      appear. This works on any site, no React or npm required.
                    </p>
                    <div className="mt-4">
                      <Label className="mb-2 block">Live Preview</Label>
                      <div
                        className="border rounded overflow-hidden"
                        style={{ width: '100%', maxWidth: 500, minHeight: 100 }}
                      >
                        {/* Live preview using an iframe to sandbox the script */}
                        <iframe
                          srcDoc={`<html><body><div id=\"preview-root\"></div><script src=\"${baseUrl}/widget.js\" ${dataAttrs.join(' ')} async></script></body></html>`}
                          width="100%"
                          height={600}
                          style={{ border: 'none', width: '100%', height: 600, display: 'block' }}
                          title="Waitlist Widget Direct Script Preview"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
