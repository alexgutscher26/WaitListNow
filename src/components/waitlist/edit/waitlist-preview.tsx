import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FieldType = 'text' | 'email' | 'number' | 'url' | 'tel' | 'textarea' | 'select';
type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
type FormLayout = 'stacked' | 'inline';

interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
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
  maxSignups?: number;
  customFields: CustomField[];
  style: WaitlistStyle;
  settings: {
    maxSignups?: number;
    emailVerification: boolean;
    allowDuplicates: boolean;
    referralEnabled: boolean;
    referralReward?: string;
    customCss?: string;
    customJs?: string;
    showBranding?: boolean;
  };
}

interface WaitlistPreviewProps {
  formData: FormData;
}

export function WaitlistPreview({ formData }: WaitlistPreviewProps) {
  // Helper function to get border radius value based on buttonRounded option
  const getBorderRadius = (size: ButtonRounded = 'md'): string => {
    const radiusMap = {
      none: '0px',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    };
    return radiusMap[size] || '0.375rem';
  };

  // Determine form layout classes
  const formLayoutClass =
    formData.style?.formLayout === 'inline' ? 'flex flex-wrap gap-4 items-end' : 'space-y-4';

  // Determine if we should show field labels
  const showLabels = formData.style?.showLabels !== false; // Default to true if not specified

  // Set CSS variables for primary color
  const style = {
    '--primary': formData.style?.primaryColor || '#3b82f6',
    '--primary-foreground': formData.style?.buttonTextColor || '#ffffff',
  } as React.CSSProperties;

  const getBoxShadow = (size: string) => {
    switch (size) {
      case 'sm':
        return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      case 'md':
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      case 'lg':
        return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      case 'xl':
        return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      default:
        return 'none';
    }
  };

  const getFontFamily = (font: string) => {
    const fonts: Record<string, string> = {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      inter: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
      poppins: '"Poppins", ui-sans-serif, system-ui, -apple-system, sans-serif',
    };
    return fonts[font] || fonts.sans;
  };

  const containerStyle = useMemo(
    () => ({
      backgroundColor: formData.style.backgroundColor,
      color: formData.style.textColor,
      fontFamily: getFontFamily(formData.style.fontFamily),
      boxShadow: getBoxShadow(formData.style.boxShadow),
      borderRadius: getBorderRadius(formData.style.borderRadius as ButtonRounded),
      padding: `${parseInt(formData.style.padding) * 0.5}rem`,
    }),
    [formData.style],
  );

  const buttonStyle = useMemo(
    () => ({
      backgroundColor: formData.style.buttonColor,
      color: formData.style.buttonTextColor,
      borderRadius: getBorderRadius(formData.style.buttonRounded as ButtonRounded),
    }),
    [formData.style],
  );

  const renderField = (field: CustomField) => {
    const commonProps = {
      key: field.id,
      id: `field-${field.id}`,
      name: field.name.toLowerCase().replace(/\s+/g, '-'),
      placeholder: field.placeholder || `Enter your ${field.name.toLowerCase()}`,
      required: field.required,
      className: 'w-full mt-1',
      style: {
        borderRadius: getBorderRadius(formData.style.borderRadius as ButtonRounded),
        padding: '0.5rem 0.75rem',
        border: '1px solid #e5e7eb',
        backgroundColor:
          formData.style.backgroundColor === formData.style.textColor
            ? '#ffffff'
            : formData.style.backgroundColor,
        color: formData.style.textColor,
      },
    };

    switch (field.type) {
      case 'email':
        return (
          <Input
            type="email"
            {...commonProps}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            {...commonProps}
          />
        );
      case 'url':
        return (
          <Input
            type="url"
            {...commonProps}
          />
        );
      case 'tel':
        return (
          <Input
            type="tel"
            {...commonProps}
          />
        );
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={3}
          />
        );
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.name.toLowerCase()}</option>
            {field.options?.map((option, i) => (
              <option
                key={i}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <Input
            type="text"
            {...commonProps}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        ...style,
        backgroundColor: formData.style?.backgroundColor || '#f3f4f6',
        fontFamily: formData.style?.fontFamily || 'Inter, sans-serif',
      }}
    >
      <div className="w-full max-w-md">
        {/* Browser-style header */}
        <div className="bg-gray-200 rounded-t-xl px-4 py-3 flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-700 text-sm font-normal">waitlist.yourdomain.com</span>
          </div>
        </div>

        {/* Main content card */}
        <div
          className="rounded-b-xl shadow-lg overflow-hidden transition-colors duration-200"
          style={{
            backgroundColor: formData.style?.backgroundColor || '#ffffff',
            color: formData.style?.textColor || '#1f2937',
          }}
        >
          <div className="px-12 py-16 text-center">
            <h1
              className="text-4xl font-bold mb-6 leading-tight"
              style={{
                color: formData.style?.textColor || '#111827',
              }}
            >
              {formData.name || 'Join the Waitlist'}
            </h1>

            {formData.description ? (
              <p
                className="text-lg mb-12 leading-relaxed font-normal"
                style={{
                  color: formData.style?.textColor ? `${formData.style.textColor}CC` : '#4b5563',
                }}
              >
                {formData.description}
              </p>
            ) : (
              <p
                className="text-lg mb-12 leading-relaxed font-normal"
                style={{
                  color: formData.style?.textColor ? `${formData.style.textColor}CC` : '#4b5563',
                }}
              >
                Be the first to know when we launch. Early adopters get exclusive perks!
              </p>
            )}

            <div className={`mb-8 ${formLayoutClass}`}>
              {/* Email input */}
              <div
                className={
                  formData.style?.formLayout === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'
                }
              >
                {showLabels && (
                  <label
                    htmlFor="email"
                    className="block text-left mb-2 text-sm font-medium"
                    style={{
                      color: formData.style?.textColor || '#374151',
                    }}
                  >
                    Email Address
                  </label>
                )}
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={"w-full px-6 py-4 border rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal"}
                    style={
                      {
                        backgroundColor:
                          formData.style?.backgroundColor === formData.style?.textColor
                            ? '#ffffff'
                            : formData.style?.backgroundColor || '#ffffff',
                        color: formData.style?.textColor || '#1f2937',
                        borderColor: formData.style?.primaryColor
                          ? `${formData.style.primaryColor}40`
                          : '#e5e7eb',
                        borderWidth: '1px',
                        borderRadius: formData.style?.buttonRounded
                          ? getBorderRadius(formData.style.buttonRounded)
                          : '0.5rem',
                        '--tw-ring-color': formData.style?.primaryColor || '#3b82f6',
                        '--tw-ring-opacity': '0.2',
                        '--tw-ring-offset-shadow':
                          'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                        '--tw-ring-shadow':
                          'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                        '--tw-ring-offset-width': '0px',
                        '--tw-ring-offset-color': '#fff',
                      } as React.CSSProperties
                    }
                  />
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <span className="text-xl">🎯</span>
                  </div>
                </div>
              </div>

              {/* Custom fields */}
              {formData.customFields.map((field) => (
                <div
                  key={field.id}
                  className={
                    formData.style?.formLayout === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'
                  }
                >
                  {showLabels && (
                    <label
                      htmlFor={field.id}
                      className="block text-left mb-2 text-sm font-medium"
                      style={{
                        color: formData.style?.textColor || '#374151',
                      }}
                    >
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}
                  <input
                    id={field.id}
                    type={field.type === 'email' ? 'email' : 'text'}
                    placeholder={field.placeholder || `Enter your ${field.name.toLowerCase()}`}
                    className={"w-full px-6 py-4 border rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal"}
                    style={
                      {
                        backgroundColor:
                          formData.style?.backgroundColor === formData.style?.textColor
                            ? '#ffffff'
                            : formData.style?.backgroundColor || '#ffffff',
                        color: formData.style?.textColor || '#1f2937',
                        borderColor: formData.style?.primaryColor
                          ? `${formData.style.primaryColor}40`
                          : '#e5e7eb',
                        borderWidth: '1px',
                        borderRadius: formData.style?.buttonRounded
                          ? getBorderRadius(formData.style.buttonRounded)
                          : '0.5rem',
                        '--tw-ring-color': formData.style?.primaryColor || '#3b82f6',
                        '--tw-ring-opacity': '0.2',
                        '--tw-ring-offset-shadow':
                          'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                        '--tw-ring-shadow':
                          'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                        '--tw-ring-offset-width': '0px',
                        '--tw-ring-offset-color': '#fff',
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}

              {/* Submit button */}
              <div
                className={
                  formData.style?.formLayout === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'
                }
              >
                <button
                  type="button"
                  className={"w-full px-8 py-4 text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"}
                  style={
                    {
                      backgroundColor:
                        formData.style?.buttonColor || formData.style?.primaryColor || '#3b82f6',
                      color: formData.style?.buttonTextColor || '#ffffff',
                      borderRadius: formData.style?.buttonRounded
                        ? getBorderRadius(formData.style.buttonRounded)
                        : '0.5rem',
                      '--tw-ring-offset-shadow':
                        'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                      '--tw-ring-shadow':
                        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                      '--tw-ring-color': formData.style?.primaryColor
                        ? `${formData.style.primaryColor}80`
                        : '#3b82f6',
                      '--tw-ring-offset-width': '2px',
                      '--tw-ring-offset-color': formData.style?.backgroundColor || '#ffffff',
                      '--tw-ring-opacity': '0.5',
                    } as React.CSSProperties
                  }
                >
                  {formData.style?.buttonText || 'Join the Waitlist'}
                </button>
              </div>
            </div>

            {/* Additional information */}
            {(formData.settings?.maxSignups || formData.settings?.emailVerification) && (
              <div className="text-sm text-gray-500 space-y-2">
                {formData.settings?.maxSignups && (
                  <p>Spots remaining: {formData.settings.maxSignups}</p>
                )}
                {formData.settings?.emailVerification && (
                  <p className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Email verification required</span>
                  </p>
                )}
              </div>
            )}

            {/* Branding */}
            {formData.settings?.showBranding !== false && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Powered by <span className="font-medium">WaitlistNow</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
