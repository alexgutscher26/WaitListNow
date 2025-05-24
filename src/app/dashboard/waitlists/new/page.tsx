"use client"

"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
// Simple Badge component
const Badge = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}: { 
  variant?: 'default' | 'secondary' | 'outline', 
  className?: string, 
  children: React.ReactNode,
  [key: string]: any 
}) => {
  const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
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

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Zap, Eye, Copy, Trash2, GripVertical, Check, X } from "lucide-react"
import { DashboardPage } from "@/components/dashboard-page"
import Link from "next/link"

// Types
type FieldType = 'text' | 'email' | 'number' | 'url' | 'tel' | 'textarea' | 'select'
type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
type FormLayout = 'stacked' | 'inline'
type ConfirmationType = 'message' | 'redirect'

interface CustomField {
  id: string
  name: string
  type: FieldType
  required: boolean
  placeholder?: string
  options?: string[] // for select type
}

interface WaitlistStyle {
  primaryColor: string
  buttonText: string
  buttonVariant: ButtonVariant
  buttonRounded: ButtonRounded
  formLayout: FormLayout
  showLabels: boolean
  backgroundColor: string
  textColor: string
  fontFamily: string
  boxShadow: string
  padding: string
  borderRadius: string
}

interface FormData {
  [x: string]: Color | undefined
  name: string
  description: string
  websiteUrl: string
  redirectUrl: string
  customFields: CustomField[]
  style: WaitlistStyle
  confirmationType: ConfirmationType
  confirmationMessage: string
  enableNotifications: boolean
  enableReferrals: boolean
  referralReward: string
  allowDuplicates: boolean
  requireEmailVerification: boolean
  maxSignups?: number
  showBranding: boolean
}

// Constants
const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'url', label: 'URL' },
  { value: 'tel', label: 'Phone' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' }
]

const BUTTON_VARIANTS: { value: ButtonVariant; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'outline', label: 'Outline' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'link', label: 'Link' }
]

const BORDER_RADIUS: { value: ButtonRounded; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'full', label: 'Pill' }
]

export default function NewWaitlistPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'fields' | 'appearance' | 'behavior'>('basic')
  const [previewMode, setPreviewMode] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [embedType, setEmbedType] = useState<'js' | 'iframe'>('js')

  // Initial form data
  const [formData, setFormData] = useState<FormData>({
    name: 'My Waitlist',
    description: 'Join our waitlist to get early access',
    websiteUrl: '',
    redirectUrl: '',
    customFields: [
      {
        id: '1',
        name: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your name'
      },
      {
        id: '2',
        name: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter your email'
      }
    ],
    style: {
      primaryColor: '#3b82f6',
      buttonText: 'Join Waitlist',
      buttonVariant: 'default',
      buttonRounded: 'md',
      formLayout: 'stacked',
      showLabels: true,
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'Inter',
      boxShadow: 'md',
      padding: '1.5rem',
      borderRadius: '0.5rem'
    },
    confirmationType: 'message',
    confirmationMessage: 'Thank you for joining our waitlist!',
    enableNotifications: true,
    enableReferrals: false,
    referralReward: 'Get early access',
    allowDuplicates: false,
    requireEmailVerification: false,
    maxSignups: undefined,
    showBranding: true // Always true by default for non-paying users
  })

  const [newField, setNewField] = useState<Partial<CustomField>>({ 
    name: "", 
    type: "text", 
    required: false,
    placeholder: "",
    options: []
  })

  // Helper functions
  const getBorderRadius = useCallback((size: ButtonRounded): string => {
    const radiusMap = {
      'none': '0px',
      'sm': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px'
    }
    return radiusMap[size] || '0.375rem'
  }, [])

  // Validation
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Waitlist name is required'
    }

    if (formData.websiteUrl && !isValidUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL'
    }

    if (formData.redirectUrl && !isValidUrl(formData.redirectUrl)) {
      newErrors.redirectUrl = 'Please enter a valid URL'
    }

    if (formData.maxSignups && formData.maxSignups < 1) {
      newErrors.maxSignups = 'Maximum signups must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Event handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target
    
    setFormData(prev => {
      const newState = { ...prev }
      
      // Handle nested style properties
      if (name.startsWith('style.')) {
        const styleField = name.split('.')[1] as keyof WaitlistStyle
        newState.style = {
          ...newState.style,
          [styleField]: type === 'checkbox' ? checked : value
        }
        return newState
      }
      
      // Handle checkbox inputs
      if (type === 'checkbox') {
        return { ...newState, [name]: checked }
      }
      
      // Handle number inputs
      if (type === 'number') {
        return { ...newState, [name]: value ? Number(value) : undefined }
      }
      
      // Handle all other inputs
      return { ...newState, [name]: value }
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const addCustomField = useCallback(() => {
    if (!newField.name?.trim()) return
    
    const field: CustomField = {
      id: `field-${Date.now()}`,
      name: newField.name,
      type: newField.type || 'text',
      required: newField.required || false,
      placeholder: newField.placeholder || '',
      options: newField.type === 'select' ? (newField.options || []) : undefined
    }
    
    setFormData(prev => ({
      ...prev,
      customFields: [...prev.customFields, field]
    }))
    
    setNewField({ name: "", type: "text", required: false, placeholder: "", options: [] })
  }, [newField])

  const removeCustomField = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== id)
    }))
  }, [])

  const updateCustomField = useCallback((id: string, updates: Partial<CustomField>) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    }))
  }, [])

  const reorderCustomFields = useCallback((dragIndex: number, dropIndex: number) => {
    setFormData(prev => {
      const fields = [...prev.customFields]
      const draggedField = fields[dragIndex]
      fields.splice(dragIndex, 1)
      fields.splice(dropIndex, 0, draggedField)
      return { ...prev, customFields: fields }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      console.log("Submitting form:", formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to the new waitlist's page
      router.push("/dashboard/waitlists/1") // Replace with actual waitlist ID
    } catch (error) {
      console.error("Error creating waitlist:", error)
      setErrors({ submit: 'Failed to create waitlist. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get branding preference from form data
  const showBranding = formData.showBranding !== false; // Default to true if undefined

  // Generate embed code based on selected type
  const embedCode = useMemo(() => {
    const baseUrl = 'https://yourdomain.com' // Replace with your actual domain
    const waitlistId = 'new' // This would be the actual waitlist ID in a real app
    
    const dataAttributes = [
      `data-waitlist-id="${waitlistId}"`,
      `data-button-text="${formData.style.buttonText}"`,
      `data-button-variant="${formData.style.buttonVariant}"`,
      `data-button-rounded="${formData.style.buttonRounded}"`,
      `data-primary-color="${formData.style.primaryColor.replace('#', '')}"`,
      `data-form-layout="${formData.style.formLayout}"`,
      `data-show-labels="${formData.style.showLabels}"`,
      `data-show-branding="${showBranding.toString()}"`,
      ...(formData.enableReferrals ? [`data-enable-referrals="true"`] : []),
      ...(formData.referralReward ? [`data-referral-reward="${formData.referralReward}"`] : []),
      ...(formData.maxSignups ? [`data-max-signups="${formData.maxSignups}"`] : [])
    ]

    if (embedType === 'js') {
      return `<script src="${baseUrl}/widget.js"\n  ${dataAttributes.join('\n  ')}\n  async>\n</script>`
    } else {
      // For iframe, we'll use a URL with query parameters
      const params = new URLSearchParams()
      dataAttributes.forEach(attr => {
        const [key, value] = attr.split('=')
        if (key && value) {
          const cleanKey = key.replace('data-', '').replace(/[\"\']/g, '')
          const cleanValue = value.replace(/[\"\']/g, '')
          params.append(cleanKey, cleanValue)
        }
      })
      const iframeUrl = `${baseUrl}/widget/embed?${params.toString()}`
      return `<iframe 
  src="${iframeUrl}"
  width="100%" 
  height="500" 
  frameborder="0" 
  style="border: none; border-radius: 8px;"
  scrolling="no"
></iframe>`
    }
  }, [formData, embedType, showBranding])

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy embed code:', err)
    }
  }

  const resetForm = () => {
    setFormData({
      name: 'My Waitlist',
      description: 'Join our waitlist to get early access',
      websiteUrl: '',
      redirectUrl: '',
      customFields: [
        {
          id: '1',
          name: 'Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your name'
        },
        {
          id: '2',
          name: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter your email'
        }
      ],
      style: {
        primaryColor: '#3b82f6',
        buttonText: 'Join Waitlist',
        buttonVariant: 'default',
        buttonRounded: 'md',
        formLayout: 'stacked',
        showLabels: true,
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Inter',
        boxShadow: 'md',
        padding: '1.5rem',
        borderRadius: '0.5rem'
      },
      confirmationType: 'message',
      confirmationMessage: 'Thank you for joining our waitlist!',
      enableNotifications: true,
      enableReferrals: false,
      referralReward: 'Get early access',
      allowDuplicates: false,
      requireEmailVerification: false,
      maxSignups: undefined,
      showBranding: true
    })
    setErrors({})
  }

  return (
    <DashboardPage 
      title="Create New Waitlist"
      hideBackButton={false}
      cta={
        <div className="flex gap-2">
          <Button variant="outline" asChild>
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
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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

      {previewMode ? (
        <WaitlistPreview formData={formData} />
      ) : (
        <form id="waitlist-form" onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">1</span>
                Basic
              </TabsTrigger>
              <TabsTrigger value="fields" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">2</span>
                Fields
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">3</span>
                Style
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">4</span>
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <BasicInfoSection 
                formData={formData} 
                errors={errors}
                onChange={handleInputChange} 
              />
            </TabsContent>

            <TabsContent value="fields" className="space-y-6">
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

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSection
                formData={formData}
                setFormData={setFormData}
                getBorderRadius={getBorderRadius}
              />
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                  <CardDescription>
                    Customize the branding on your waitlist form
                  </CardDescription>
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
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          showBranding: !prev.showBranding
                        }))}
                      >
                        {formData.showBranding ? 'Hide' : 'Show'} Branding
                      </Button>
                    </div>
                    
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
                                Upgrade to Pro to remove the "Powered by WaitlistNow" badge and unlock additional features.
                              </p>
                            </div>
                            <div className="mt-3">
                              <Button 
                                variant="outline" 
                                className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50"
                                onClick={() => {
                                  // Handle upgrade logic here
                                }}
                              >
                                Upgrade to Pro
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {formData.showBranding && (
                      <div className="mt-4 rounded-lg border p-4">
                        <h4 className="mb-2 text-sm font-medium">Preview</h4>
                        <div className="flex items-center justify-between rounded-md border bg-background p-3 text-sm text-muted-foreground">
                          <span>Powered by <strong>WaitlistNow</strong></span>
                          <span className="text-xs text-muted-foreground/60">Your form will look like this</span>
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
                    const tabs = ['basic', 'fields', 'appearance', 'behavior']
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1] as any)
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
                    const tabs = ['basic', 'fields', 'appearance', 'behavior']
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1] as any)
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
    </DashboardPage>
  )
}

// Component sections
interface SectionProps {
  formData: FormData
  errors?: Record<string, string>
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

function BasicInfoSection({ formData, errors, onChange }: SectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Set up the essential details for your waitlist
        </CardDescription>
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
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
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
            {errors?.websiteUrl && (
              <p className="text-red-500 text-sm">{errors.websiteUrl}</p>
            )}
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
            {errors?.redirectUrl && (
              <p className="text-red-500 text-sm">{errors.redirectUrl}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CustomFieldsSectionProps {
  formData: FormData
  newField: Partial<CustomField>
  setNewField: (field: Partial<CustomField>) => void
  addCustomField: () => void
  removeCustomField: (id: string) => void
  updateCustomField: (id: string, updates: Partial<CustomField>) => void
  reorderCustomFields: (dragIndex: number, dropIndex: number) => void
}

function CustomFieldsSection({
  formData,
  newField,
  setNewField,
  addCustomField,
  removeCustomField,
  updateCustomField,
  reorderCustomFields
}: CustomFieldsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
        <CardDescription>
          Collect additional information from your subscribers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <Input
              placeholder="Field name"
              value={newField.name || ''}
              onChange={(e) => setNewField({...newField, name: e.target.value})}
            />
          </div>
          <div className="col-span-3">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newField.type || 'text'}
              onChange={(e) => setNewField({...newField, type: e.target.value as FieldType})}
            >
              {FIELD_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <Input
              placeholder="Placeholder text"
              value={newField.placeholder || ''}
              onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
            />
          </div>
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              id="required"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
              checked={newField.required || false}
              onChange={(e) => setNewField({...newField, required: e.target.checked})}
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
              onChange={(e) => setNewField({
                ...newField, 
                options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
              })}
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
              {formData.customFields.map((field, index) => (
                <div key={field.id} className="flex items-center justify-between p-3 group">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{field.name}</p>
                        {field.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {FIELD_TYPES.find(t => t.value === field.type)?.label} 
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
  )
}

interface AppearanceSectionProps {
  formData: FormData
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void
  getBorderRadius: (size: ButtonRounded) => string
}

function AppearanceSection({ formData, setFormData, getBorderRadius }: AppearanceSectionProps) {
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
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  style: {...prev.style, buttonText: e.target.value}
                }))}
                placeholder="e.g., Join Waitlist"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Button Style</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.style.buttonVariant}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  style: { ...prev.style, buttonVariant: e.target.value as ButtonVariant }
                }))}
              >
                {BUTTON_VARIANTS.map(variant => (
                  <option key={variant.value} value={variant.value}>{variant.label}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Button Corners</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.style.buttonRounded}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  style: { ...prev.style, buttonRounded: e.target.value as ButtonRounded }
                }))}
              >
                {BORDER_RADIUS.map(radius => (
                  <option key={radius.value} value={radius.value}>{radius.label}</option>
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
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    style: { ...prev.style, primaryColor: e.target.value }
                  }))}
                  className="h-10 w-16 cursor-pointer rounded border"
                />
                <Input
                  value={formData.style.primaryColor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    style: { ...prev.style, primaryColor: e.target.value }
                  }))}
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
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      style: { ...prev.style, formLayout: 'stacked' }
                    }))}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  Stacked
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="inline"
                    checked={formData.style.formLayout === 'inline'}
                    onChange={() => setFormData(prev => ({
                      ...prev,
                      style: { ...prev.style, formLayout: 'inline' }
                    }))}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  Inline
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showLabels"
                checked={formData.style.showLabels}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  style: { ...prev.style, showLabels: e.target.checked }
                }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="showLabels" className="text-sm font-medium">
                Show field labels
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <WaitlistPreview formData={formData} />
      </div>
    </div>
  )
}

interface BehaviorSectionProps {
  formData: FormData
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void
  errors: Record<string, string>
  embedCode: string
  copyEmbedCode: () => void
  showBranding?: boolean
}

function BehaviorSection({ formData, setFormData, errors, embedCode, copyEmbedCode, showBranding = true }: BehaviorSectionProps) {
  const [embedType, setEmbedType] = useState<'js' | 'iframe'>('js')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Settings</CardTitle>
          <CardDescription>What happens after someone joins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="confirmationMessage"
                value="message"
                checked={formData.confirmationType === 'message'}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  confirmationType: 'message'
                }))}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label htmlFor="confirmationMessage" className="text-sm font-medium">
                Show confirmation message
              </label>
            </div>
            
            {formData.confirmationType === 'message' && (
              <div className="ml-6">
                <Textarea
                  value={formData.confirmationMessage}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    confirmationMessage: e.target.value
                  }))}
                  rows={3}
                  placeholder="Thanks for joining! We'll be in touch soon."
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="confirmationRedirect"
                value="redirect"
                checked={formData.confirmationType === 'redirect'}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  confirmationType: 'redirect'
                }))}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label htmlFor="confirmationRedirect" className="text-sm font-medium">
                Redirect to thank you page
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>Additional options for your waitlist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableNotifications"
                checked={formData.enableNotifications}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  enableNotifications: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="enableNotifications" className="text-sm font-medium">
                Email notifications for new signups
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="requireEmailVerification"
                checked={formData.requireEmailVerification}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requireEmailVerification: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="requireEmailVerification" className="text-sm font-medium">
                Require email verification
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allowDuplicates"
                checked={formData.allowDuplicates}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  allowDuplicates: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="allowDuplicates" className="text-sm font-medium">
                Allow duplicate email addresses
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableReferrals"
                checked={formData.enableReferrals}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  enableReferrals: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="enableReferrals" className="text-sm font-medium">
                Enable referral program
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxSignups">Maximum Signups (optional)</Label>
              <Input
                id="maxSignups"
                type="number"
                min="1"
                value={formData.maxSignups || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  maxSignups: e.target.value ? Number(e.target.value) : undefined
                }))}
                placeholder="Leave empty for unlimited"
                className={errors?.maxSignups ? 'border-red-500' : ''}
              />
              {errors?.maxSignups && (
                <p className="text-red-500 text-sm">{errors.maxSignups}</p>
              )}
            </div>
            
            {formData.enableReferrals && (
              <div className="space-y-2">
                <Label htmlFor="referralReward">Referral Reward</Label>
                <Input
                  id="referralReward"
                  value={formData.referralReward}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    referralReward: e.target.value
                  }))}
                  placeholder="e.g., Get 1 month free"
                />
                <p className="text-xs text-muted-foreground">
                  What will users get for referring others?
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>Add this waitlist to your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex border-b">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  embedType === 'js'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setEmbedType('js')}
              >
                JavaScript Snippet
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  embedType === 'iframe'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setEmbedType('iframe')}
              >
                iFrame
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{embedType === 'js' ? 'JavaScript Embed Code' : 'iFrame Embed Code'}</Label>
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
                {embedType === 'js' 
                  ? "Add this script tag to your website's HTML where you want the waitlist form to appear."
                  : "Add this iframe code to your website's HTML where you want the waitlist form to appear."}
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-md">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="border rounded-md p-4 bg-background">
                {embedType === 'js' ? (
                  <div className="aspect-video bg-muted/30 rounded flex flex-col items-center justify-center p-6 text-center">
                    <div className="mx-auto h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">JavaScript Embed</h4>
                    <p className="text-sm text-muted-foreground max-w-md">
                      The actual form will be rendered on your website where you place the script tag.
                    </p>
                  </div>
                ) : (
                  <div className="aspect-video bg-muted/30 rounded-md border-2 border-dashed flex flex-col items-center justify-center p-6 text-center">
                    <div className="mx-auto h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">iFrame Embed</h4>
                    <p className="text-sm text-muted-foreground max-w-md mb-3">
                      The form will be displayed within an iframe on your website.
                    </p>
                    <div className="w-full max-w-xs p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-left font-mono overflow-x-auto">
                      {embedCode}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Direct Link</Label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={`https://yourdomain.com/waitlist/new`}
                className="bg-muted"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => navigator.clipboard.writeText('https://yourdomain.com/waitlist/new')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this link directly with your audience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface WaitlistPreviewProps {
  formData: FormData
}

function WaitlistPreview({ formData }: WaitlistPreviewProps) {
  const getBorderRadius = (size: ButtonRounded): string => {
    const radiusMap = {
      'none': '0px',
      'sm': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px'
    }
    return radiusMap[size] || '0.375rem'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Preview
        </CardTitle>
        <CardDescription>
          How your waitlist form will look to visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div 
            className="relative rounded-lg border" 
            style={{ 
              maxWidth: '100%',
              width: '100%',
              backgroundColor: formData.style.backgroundColor,
              color: formData.textColor,
              fontFamily: formData.style.fontFamily,
              boxShadow: formData.style.boxShadow === 'none' ? 'none' : 
                formData.style.boxShadow === 'sm' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' :
                formData.style.boxShadow === 'md' ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' :
                '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              padding: formData.style.padding,
              borderRadius: getBorderRadius(formData.style.buttonRounded),
              paddingBottom: '2.5rem' // Add extra padding at the bottom for the badge
            }}
          >
            <div 
              className="absolute bottom-0 right-1 px-2 py-1 text-xs text-muted-foreground flex items-center"
              style={{
                zIndex: 10
              }}
            >
              <span>Powered by </span>
              <span className="font-medium">WaitlistNow</span>
              <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                PRO
              </span>
            </div>
          <div className="text-center">
            <h3 
              className="text-xl font-semibold mb-2" 
              style={{ color: formData.style.primaryColor }}
            >
              {formData.name || "Join Our Waitlist"}
            </h3>
            {formData.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {formData.description}
              </p>
            )}
          </div>
          
          <div className={`space-y-3 ${formData.style.formLayout === 'inline' ? 'md:flex md:flex-wrap md:gap-2 md:space-y-0' : ''}`}>
            {/* Email field (always present) */}
            <div className={formData.style.formLayout === 'inline' ? 'flex-1 min-w-0' : ''}>
              {formData.style.showLabels && (
                <label className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
              )}
              <Input 
                placeholder={formData.style.showLabels ? "" : "Your email address"}
                style={{
                  borderRadius: getBorderRadius(formData.style.buttonRounded)
                }}
                className="w-full"
              />
            </div>
            
            {/* Custom fields */}
            {formData.customFields.map((field) => (
              <div key={field.id} className={formData.style.formLayout === 'inline' ? 'flex-1 min-w-0' : ''}>
                {formData.style.showLabels && (
                  <label className="block text-sm font-medium mb-1">
                    {field.name}{field.required && <span className="text-red-500"> *</span>}
                  </label>
                )}
                {field.type === 'textarea' ? (
                  <Textarea
                    placeholder={formData.style.showLabels ? (field.placeholder || "") : (field.name + (field.required ? ' *' : ''))}
                    rows={3}
                    style={{
                      borderRadius: getBorderRadius(formData.style.buttonRounded)
                    }}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    style={{
                      borderRadius: getBorderRadius(formData.style.buttonRounded)
                    }}
                  >
                    <option value="">
                      {formData.style.showLabels ? (field.placeholder || `Choose ${field.name}`) : field.name}
                    </option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <Input 
                    placeholder={formData.style.showLabels ? (field.placeholder || "") : (field.name + (field.required ? ' *' : ''))}
                    type={field.type}
                    style={{
                      borderRadius: getBorderRadius(formData.style.buttonRounded)
                    }}
                  />
                )}
              </div>
            ))}
            
            {/* Submit button */}
            <div className={formData.style.formLayout === 'inline' ? 'flex-shrink-0' : ''}>
              <Button 
                className="w-full"
                variant={formData.style.buttonVariant}
                style={{
                  borderRadius: getBorderRadius(formData.style.buttonRounded),
                  backgroundColor: formData.style.buttonVariant === 'default' ? formData.style.primaryColor : undefined,
                  borderColor: formData.style.buttonVariant === 'outline' ? formData.style.primaryColor : undefined,
                  color: formData.style.buttonVariant === 'outline' ? formData.style.primaryColor : undefined
                }}
              >
                {formData.style.buttonText}
              </Button>
            </div>
          </div>
          
          {/* Additional info */}
          <div className="space-y-2 text-xs text-muted-foreground">
            {formData.maxSignups && (
              <p className="text-center">
                Limited to {formData.maxSignups.toLocaleString()} spots
              </p>
            )}
            
            {formData.enableReferrals && (
              <p className="text-center">
                💡 Refer friends and {formData.referralReward?.toLowerCase() || 'get rewards'}!
              </p>
            )}
            
            {formData.requireEmailVerification && (
              <p className="text-center text-amber-600">
                ⚠️ Email verification required
              </p>
            )}
          </div>
          
          {/* Success state preview */}
          {formData.confirmationType === 'message' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded-md">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="font-medium">Success!</span>
              </div>
              <p className="mt-1">{formData.confirmationMessage}</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm">
            <strong>Preview Note:</strong> This is how your form will appear to visitors. 
            The actual form will be fully functional when embedded on your website.
          </p>
        </div>
        </div>
      </CardContent>
    </Card>
    
  )
}