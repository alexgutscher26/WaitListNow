/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-default-export */
'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

import { toast } from 'sonner';
import { DashboardPage } from '@/components/dashboard-page';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppearanceSection } from '@/components/waitlist/edit/appearance-section';
import { BasicInfoSection } from '@/components/waitlist/edit/basic-info-section';
import { BehaviorSection } from '@/components/waitlist/edit/behavior-section';
import { CustomFieldsSection } from '@/components/waitlist/edit/custom-fields-section';
import { WaitlistPreview } from '@/components/waitlist/edit/waitlist-preview';

// Reuse the same types from the new waitlist page
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
  options?: string[];
}

export interface WaitlistStyle {
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
  maxSignups: number;
  customFields: CustomField[];
  style: WaitlistStyle;
  settings: {
    confirmationType: ConfirmationType;
    confirmationMessage: string;
    redirectUrl: string;
    requireEmailVerification: boolean;
    enableReferrals: boolean;
    maxReferrals: number;
  };
}

export default function EditWaitlistPage() {
  const router = useRouter();
  const params = useParams();
  const waitlistId = params.id as string;

  const [activeTab, setActiveTab] = useState<'basic' | 'fields' | 'appearance' | 'behavior'>(
    'basic',
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    websiteUrl: '',
    redirectUrl: '',
    logoUrl: '',
    maxSignups: 0,
    customFields: [],
    style: {
      primaryColor: '#3b82f6',
      buttonText: 'Join Waitlist',
      buttonColor: '#3b82f6',
      buttonTextColor: '#ffffff',
      buttonVariant: 'default',
      buttonRounded: 'md',
      formLayout: 'stacked',
      showLabels: true,
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'sans',
      boxShadow: 'md',
      padding: '6',
      borderRadius: 'md',
    },
    settings: {
      confirmationType: 'message',
      confirmationMessage: 'Thanks for joining the waitlist!',
      redirectUrl: '',
      requireEmailVerification: false,
      enableReferrals: false,
      maxReferrals: 0,
    },
  });

  // Fetch waitlist data
  useEffect(() => {
    const fetchWaitlist = async () => {
      try {
        const response = await fetch(`/api/waitlists/${waitlistId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist');
        }
        const data = await response.json();

        // Transform the API data to match our form data structure
        setFormData({
          name: data.name,
          description: data.description || '',
          websiteUrl: data.websiteUrl || '',
          redirectUrl: data.redirectUrl || '',
          logoUrl: data.logoUrl || '',
          maxSignups: data.maxSignups ?? 0,
          customFields: data.customFields || [],
          style: {
            primaryColor: data.style?.primaryColor || '#3b82f6',
            buttonText: data.style?.buttonText || 'Join Waitlist',
            buttonColor: data.style?.buttonColor || '#3b82f6',
            buttonTextColor: data.style?.buttonTextColor || '#ffffff',
            buttonVariant: data.style?.buttonVariant || 'default',
            buttonRounded: data.style?.buttonRounded || 'md',
            formLayout: data.style?.formLayout || 'stacked',
            showLabels: data.style?.showLabels ?? true,
            backgroundColor: data.style?.backgroundColor || '#ffffff',
            textColor: data.style?.textColor || '#1f2937',
            fontFamily: data.style?.fontFamily || 'sans',
            boxShadow: data.style?.boxShadow || 'md',
            padding: data.style?.padding || '6',
            borderRadius: data.style?.borderRadius || 'md',
          },
          settings: {
            confirmationType: data.settings?.confirmationType || 'message',
            confirmationMessage:
              data.settings?.confirmationMessage || 'Thanks for joining the waitlist!',
            redirectUrl: data.settings?.redirectUrl || '',
            requireEmailVerification: data.settings?.requireEmailVerification || false,
            enableReferrals: data.settings?.enableReferrals || false,
            maxReferrals: data.settings?.maxReferrals || 0,
          },
        });
      } catch (error) {
        console.error('Error fetching waitlist:', error);
        toast.error('Failed to load waitlist data');
      } finally {
        setIsLoading(false);
      }
    };

    if (waitlistId) {
      fetchWaitlist();
    }
  }, [waitlistId]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    [],
  );

  const handleStyleChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [name]: value,
      },
    }));
  }, []);

  const handleSettingsChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value,
      },
    }));
  }, []);

  const addCustomField = useCallback((field: Omit<CustomField, 'id'>) => {
    setFormData((prev) => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        {
          ...field,
          id: `field-${Date.now()}`,
        },
      ],
    }));
  }, []);

  const updateCustomField = useCallback((id: string, updates: Partial<CustomField>) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    }));
  }, []);

  const removeCustomField = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== id),
    }));
  }, []);

  const reorderCustomFields = useCallback((dragIndex: number, dropIndex: number) => {
    setFormData((prev) => {
      const newFields = [...prev.customFields];
      const [removed] = newFields.splice(dragIndex, 1);
      newFields.splice(dropIndex, 0, removed);
      return {
        ...prev,
        customFields: newFields,
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/waitlists/${waitlistId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update waitlist');
      }

      toast.success('Waitlist updated successfully!');
      router.push(`/dashboard/waitlists/${waitlistId}`);
    } catch (error) {
      console.error('Error updating waitlist:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update waitlist');
    } finally {
      setIsSaving(false);
    }
  };

  const getBorderRadius = (size: ButtonRounded) => {
    switch (size) {
      case 'none':
        return '0';
      case 'sm':
        return '0.25rem';
      case 'md':
        return '0.375rem';
      case 'lg':
        return '0.5rem';
      case 'full':
        return '9999px';
      default:
        return '0.375rem';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <DashboardPage
      title="Edit Waitlist"
      description="Update your waitlist settings and appearance"
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
            type="button"
          >
            Preview
          </Button>
          <Button
            size="sm"
            type="submit"
            form="waitlist-form"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      }
    >
      <form
        id="waitlist-form"
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <Tabs
          value={activeTab}
          onValueChange={(v: string) => setActiveTab(v as 'basic' | 'fields' | 'appearance' | 'behavior')}
        >
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
            <TabsTrigger
              id="appearance-tab"
              value="appearance"
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic">
              <BasicInfoSection
                formData={formData}
                onChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="fields">
              <CustomFieldsSection
                formData={formData}
                onAddField={addCustomField}
                onUpdateField={updateCustomField}
                onRemoveField={removeCustomField}
                onReorderFields={reorderCustomFields}
              />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSection
                formData={formData}
                onStyleChange={handleStyleChange}
                getBorderRadius={getBorderRadius}
              />
            </TabsContent>

            <TabsContent value="behavior">
              <BehaviorSection
                formData={formData}
                onSettingsChange={handleSettingsChange}
              />
            </TabsContent>
          </div>
        </Tabs>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Waitlist Preview</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    // Scroll to the appearance tab when clicking "Customize"
                    setActiveTab('appearance');
                    setShowPreview(false);
                    // Small delay to ensure tab is active before scrolling
                    setTimeout(() => {
                      document
                        .getElementById('appearance-tab')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Customize
                </Button>
              </div>
            </div>
            <div
              className="p-8 overflow-auto"
              style={{ maxHeight: 'calc(90vh - 80px)' }}
            >
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <WaitlistPreview formData={formData} />
                </div>
              </div>
              <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>This is a preview of how your waitlist will appear to visitors.</p>
                <p className="mt-1">
                  Changes are saved automatically when you click outside the preview.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardPage>
  );
}
