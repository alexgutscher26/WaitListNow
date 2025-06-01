import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { WaitlistFormValues } from '@/lib/validations/waitlist';
import { createWaitlist } from '@/lib/api/waitlists';

const defaultValues: WaitlistFormValues = {
  name: '',
  description: '',
  websiteUrl: '',
  redirectUrl: '',
  customFields: [],
  style: {
    buttonText: 'Join Waitlist',
    buttonColor: '#3b82f6',
    buttonTextColor: '#ffffff',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderRadius: 8,
    fontFamily: 'Inter',
    showLabels: true,
    formLayout: 'stacked',
  },
  settings: {
    emailVerification: true,
    allowDuplicates: false,
    referralEnabled: false,
  },
};

export function useWaitlistForm(initialValues: Partial<WaitlistFormValues> = {}) {
  const router = useRouter();
  const [formData, setFormData] = useState<WaitlistFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;

      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors],
  );

  const handleCustomFieldChange = useCallback((index: number, field: string, value: unknown) => {
    setFormData((prev) => {
      const updatedFields = [...prev.customFields];
      updatedFields[index] = {
        ...updatedFields[index],
        [field]: value,
      };
      return {
        ...prev,
        customFields: updatedFields,
      };
    });
  }, []);

  const addCustomField = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        {
          id: `field-${Date.now()}`,
          name: '',
          type: 'text',
          placeholder: '',
          required: false,
        },
      ],
    }));
  }, []);

  const removeCustomField = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  }, []);

  const handleStyleChange = useCallback(
    <T extends keyof WaitlistFormValues['style']>(
      field: T,
      value: WaitlistFormValues['style'][T],
    ) => {
      setFormData((prev) => ({
        ...prev,
        style: {
          ...prev.style,
          [field]: value,
        },
      }));
    },
    [],
  );

  const handleSettingsChange = useCallback(
    <T extends keyof WaitlistFormValues['settings']>(
      field: T,
      value: WaitlistFormValues['settings'][T],
    ) => {
      setFormData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [field]: value,
        },
      }));
    },
    [],
  );

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

    // Validate custom fields
    formData.customFields.forEach((field, index) => {
      if (!field.name.trim()) {
        newErrors[`customFields.${index}.name`] = 'Field name is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return { success: false, error: 'Please fix the form errors' };
    }

    setIsSubmitting(true);

    try {
      const data = await createWaitlist(formData);

      toast({
        title: 'Success!',
        description: 'Your waitlist has been created successfully.',
      });

      router.push(`/dashboard/waitlists/${data.id}`);
      return { success: true, data };
    } catch (error) {
      console.error('Error creating waitlist:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create waitlist',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, router, validateForm]);

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    handleChange,
    handleCustomFieldChange,
    handleStyleChange,
    handleSettingsChange,
    addCustomField,
    removeCustomField,
    handleSubmit,
  };
}

function isValidUrl(url: string): boolean {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
