'use client';
import { __assign, __awaiter, __generator, __rest, __spreadArray } from "tslib";
import React from "react";
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
// URL validation helper
var isValidUrl = function (url) {
    if (!url)
        return false;
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
};
// Simple Badge component
/**
 * Renders a badge component with customizable variant and class name.
 */
var Badge = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, props = __rest(_a, ["children", "variant", "className"]);
    var baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    var variantStyles = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
        outline: 'text-foreground border-border',
    };
    return (<span className={"".concat(baseStyles, " ").concat(variantStyles[variant], " ").concat(className)} {...props}>
      {children}
    </span>);
};
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Zap, Eye, Copy, Trash2, GripVertical, Loader2, Pencil, ExternalLink, CheckCircle, } from 'lucide-react';
import { DashboardPage } from '@/components/dashboard-page';
import Link from 'next/link';
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, } from '@/components/ui/dialog';
// Constants
var FIELD_TYPES = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Number' },
    { value: 'url', label: 'URL' },
    { value: 'tel', label: 'Phone' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
];
var BUTTON_VARIANTS = [
    { value: 'default', label: 'Default' },
    { value: 'outline', label: 'Outline' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'link', label: 'Link' },
];
var BORDER_RADIUS = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'full', label: 'Pill' },
];
/**
 * This component is responsible for creating a new waitlist in the dashboard.
 * It includes various sections such as basic information, custom fields, appearance settings,
 * and behavior settings. Users can navigate between these tabs to customize their waitlist form.
 *
 * @returns {JSX.Element} - The rendered React component for creating a new waitlist.
 */
export default function NewWaitlistPage() {
    var _this = this;
    var router = useRouter();
    var _a = useState('basic'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = useState(false), previewMode = _c[0], setPreviewMode = _c[1];
    var _d = useState({}), errors = _d[0], setErrors = _d[1];
    var _e = useState({
        type: 'text',
        required: false,
    }), newField = _e[0], setNewField = _e[1];
    var _f = useState(false), showFieldEditor = _f[0], setShowFieldEditor = _f[1];
    var _g = useState({
        name: '',
        description: '',
        websiteUrl: '',
        redirectUrl: '',
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
    }), formData = _g[0], setFormData = _g[1];
    var _h = useState('js'), embedType = _h[0], setEmbedType = _h[1];
    var handleTestConfirmation = function () {
        // Removed from here
        setIsTesting(true);
        setShowConfirmation(true);
    };
    var handleCloseTest = function () {
        setShowConfirmation(false);
        // Small delay to allow the modal to close before resetting the testing state
        setTimeout(function () { return setIsTesting(false); }, 300);
    };
    var handleRedirect = function () {
        if (formData.confirmationType === 'redirect' && formData.redirectUrl) {
            window.open(formData.redirectUrl, '_blank');
        }
    };
    // Helper functions
    var getBorderRadius = useCallback(function (size) {
        var radiusMap = {
            none: '0px',
            sm: '0.25rem',
            md: '0.375rem',
            lg: '0.5rem',
            full: '9999px',
        };
        return radiusMap[size] || '0.375rem';
    }, []);
    // Validation
    var validateForm = useCallback(function () {
        var newErrors = {};
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
    var handleChange = useCallback(function (e) {
        var target = e.target;
        var name = target.name, value = target.value, type = target.type;
        var checked = 'checked' in target ? target.checked : undefined;
        // Handle nested objects in form data (style, settings, etc.)
        if (name.includes('.')) {
            var _a = name.split('.'), parent_1 = _a[0], child_1 = _a[1];
            setFormData(function (prev) {
                var _a, _b;
                return (__assign(__assign({}, prev), (_a = {}, _a[parent_1] = __assign(__assign({}, (prev[parent_1] || {})), (_b = {}, _b[child_1] = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value, _b)), _a)));
            });
        }
        else {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value, _a)));
            });
        }
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(function (prev) {
                var newErrors = __assign({}, prev);
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);
    // Handle color picker changes
    var handleColorChange = function (name, value) {
        if (name.includes('.')) {
            var _a = name.split('.'), parent_2 = _a[0], child_2 = _a[1];
            setFormData(function (prev) {
                var _a, _b;
                return (__assign(__assign({}, prev), (_a = {}, _a[parent_2] = __assign(__assign({}, (prev[parent_2] || {})), (_b = {}, _b[child_2] = value, _b)), _a)));
            });
        }
        else {
            setFormData(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
            });
        }
    };
    // Add a new custom field
    var addCustomField = function () {
        if (!newField.name) {
            toast.error('Field name is required');
            return;
        }
        // Check if field with this name already exists
        if (formData.customFields.some(function (field) { return field.name === newField.name; })) {
            toast.error('A field with this name already exists');
            return;
        }
        var field = {
            id: "field-".concat(Date.now()),
            name: newField.name,
            type: newField.type || 'text',
            required: newField.required || false,
            placeholder: newField.placeholder || '',
            options: newField.type === 'select' ? newField.options || [''] : undefined,
        };
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: __spreadArray(__spreadArray([], prev.customFields, true), [field], false) })); });
        // Reset the new field form
        setNewField({
            type: 'text',
            required: false,
        });
        setShowFieldEditor(false);
        toast.success('Custom field added');
    };
    // Remove a custom field
    var removeCustomField = useCallback(function (id) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.filter(function (field) { return field.id !== id; }) })); });
    }, []);
    // Update a custom field
    var updateCustomField = function (id, updates) {
        var _a;
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.map(function (field) {
                return field.id === id ? __assign(__assign({}, field), updates) : field;
            }) })); });
        // If updating options for a select field, ensure at least one option exists
        if (updates.type === 'select' && !((_a = updates.options) === null || _a === void 0 ? void 0 : _a.length)) {
            setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.map(function (field) {
                    return field.id === id ? __assign(__assign(__assign({}, field), updates), { options: [''] }) : field;
                }) })); });
        }
    };
    // Reorder custom fields
    var reorderCustomFields = useCallback(function (dragIndex, dropIndex) {
        setFormData(function (prev) {
            var fields = __spreadArray([], prev.customFields, true);
            var draggedField = fields[dragIndex];
            fields.splice(dragIndex, 1);
            fields.splice(dropIndex, 0, draggedField);
            return __assign(__assign({}, prev), { customFields: fields });
        });
    }, []);
    /**
     * Handles form submission by preventing default form behavior, validating input,
     * and making an API call to create a new waitlist.
     */
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var verificationToken, waitlistData, response, data_1, emailResponse, emailError_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    // Client-side validation
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    setErrors({});
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    verificationToken = formData.requireEmailVerification ? crypto.randomUUID() : undefined;
                    waitlistData = {
                        name: formData.name,
                        description: formData.description,
                        websiteUrl: formData.websiteUrl || '',
                        redirectUrl: formData.redirectUrl || '',
                        customFields: formData.customFields,
                        style: __assign(__assign({}, formData.style), { borderRadius: Number(formData.style.borderRadius) || 8 }),
                        settings: __assign(__assign({}, formData.settings), { maxSignups: formData.settings.maxSignups || undefined, emailVerification: formData.requireEmailVerification, allowDuplicates: formData.settings.allowDuplicates || false, referralEnabled: formData.enableReferrals, referralReward: formData.referralReward || '', customCss: formData.settings.customCss || '', customJs: formData.settings.customJs || '' }),
                        verificationToken: verificationToken,
                    };
                    return [4 /*yield*/, fetch('/api/waitlists', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(waitlistData),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data_1 = _a.sent();
                    if (!response.ok) {
                        if (response.status === 400 && data_1.error) {
                            setErrors(function (prev) { return (__assign(__assign({}, prev), (typeof data_1.error === 'string' ? { _form: data_1.error } : data_1.error))); });
                            toast.error('Please fix the errors in the form');
                        }
                        else {
                            throw new Error(data_1.error || 'Failed to create waitlist');
                        }
                        return [2 /*return*/];
                    }
                    if (!(formData.requireEmailVerification && verificationToken)) return [3 /*break*/, 7];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fetch('/api/verify-email', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: data_1.email, // Assuming the API returns the email
                                verificationToken: verificationToken,
                            }),
                        })];
                case 5:
                    emailResponse = _a.sent();
                    if (!emailResponse.ok) {
                        console.error('Failed to send verification email');
                        // Continue with success flow even if email fails
                    }
                    return [3 /*break*/, 7];
                case 6:
                    emailError_1 = _a.sent();
                    console.error('Error sending verification email:', emailError_1);
                    return [3 /*break*/, 7];
                case 7:
                    // Success! Redirect to the waitlists page
                    toast.success('Waitlist created successfully!');
                    // Use replace to prevent going back to the form
                    router.replace('/dashboard/waitlists');
                    // Trigger a refresh of the waitlists data
                    router.refresh();
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error creating waitlist:', error_1);
                    toast.error(error_1 instanceof Error ? error_1.message : 'Failed to create waitlist');
                    return [3 /*break*/, 10];
                case 9:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    // Get branding preference from form data
    var showBranding = formData.showBranding !== false; // Default to true if undefined
    // Generate embed code based on selected type
    var embedCode = useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        var baseUrl = 'https://yourdomain.com'; // Replace with your actual domain
        var waitlistId = 'new'; // This would be the actual waitlist ID in a real app
        // Ensure all style properties have default values
        var style = {
            buttonText: ((_a = formData.style) === null || _a === void 0 ? void 0 : _a.buttonText) || 'Join Waitlist',
            buttonVariant: ((_b = formData.style) === null || _b === void 0 ? void 0 : _b.buttonVariant) || 'default',
            buttonRounded: ((_c = formData.style) === null || _c === void 0 ? void 0 : _c.buttonRounded) || 'md',
            primaryColor: ((_d = formData.style) === null || _d === void 0 ? void 0 : _d.primaryColor) || '#3b82f6',
            formLayout: ((_e = formData.style) === null || _e === void 0 ? void 0 : _e.formLayout) || 'stacked',
            showLabels: (_g = (_f = formData.style) === null || _f === void 0 ? void 0 : _f.showLabels) !== null && _g !== void 0 ? _g : true,
        };
        var dataAttributes = __spreadArray(__spreadArray(__spreadArray([
            "data-waitlist-id=\"".concat(waitlistId, "\""),
            "data-button-text=\"".concat(style.buttonText, "\""),
            "data-button-variant=\"".concat(style.buttonVariant, "\""),
            "data-button-rounded=\"".concat(style.buttonRounded, "\""),
            "data-primary-color=\"".concat(style.primaryColor.replace('#', ''), "\""),
            "data-form-layout=\"".concat(style.formLayout, "\""),
            "data-show-labels=\"".concat(style.showLabels, "\""),
            "data-show-branding=\"".concat(showBranding.toString(), "\"")
        ], (formData.enableReferrals ? ['data-enable-referrals="true"'] : []), true), (formData.referralReward ? ["data-referral-reward=\"".concat(formData.referralReward, "\"")] : []), true), (formData.maxSignups ? ["data-max-signups=\"".concat(formData.maxSignups, "\"")] : []), true);
        if (embedType === 'js') {
            return "<script src=\"".concat(baseUrl, "/widget.js\"\n  ").concat(dataAttributes.join('\n  '), "\n  async>\n</script>");
        }
        else {
            // For iframe, we'll use a URL with query parameters
            var params_1 = new URLSearchParams();
            dataAttributes.forEach(function (attr) {
                var _a = attr.split('='), key = _a[0], value = _a[1];
                if (key && value) {
                    var cleanKey = key.replace('data-', '').replace(/["']/g, '');
                    var cleanValue = value.replace(/["']/g, '');
                    params_1.append(cleanKey, cleanValue);
                }
            });
            var iframeUrl = "".concat(baseUrl, "/widget/embed?").concat(params_1.toString());
            return "<iframe \n  src=\"".concat(iframeUrl, "\"\n  width=\"100%\" \n  height=\"500\" \n  frameborder=\"0\" \n  style=\"border: none; border-radius: 8px;\"\n  scrolling=\"no\"\n></iframe>");
        }
    }, [formData, embedType, showBranding]);
    /**
     * Copies the embed code to the clipboard and logs an error if it fails.
     */
    var copyEmbedCode = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(embedCode)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy embed code:', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Resets form data to default values and clears errors.
     */
    var resetForm = function () {
        setFormData({
            name: '',
            description: '',
            websiteUrl: '',
            redirectUrl: '',
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
    return (<DashboardPage title="Create New Waitlist" hideBackButton={false} cta={<div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/waitlists">
              <ArrowLeft className="mr-2 h-4 w-4"/>
              Cancel
            </Link>
          </Button>
          <Button variant="outline" onClick={function () { return setPreviewMode(!previewMode); }}>
            <Eye className="mr-2 h-4 w-4"/>
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button type="submit" form="waitlist-form" disabled={isSubmitting || !formData.name.trim()}>
            {isSubmitting ? (<>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Creating...
              </>) : (<>
                <Zap className="mr-2 h-4 w-4"/>
                Create Waitlist
              </>)}
          </Button>
        </div>}>
      {errors.submit && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{errors.submit}</p>
        </div>)}

      <div className="flex justify-end mb-4">
        <Button type="button" variant="outline" onClick={function () { return setPreviewMode(!previewMode); }} className="flex items-center gap-2">
          {previewMode ? (<>
              <Pencil className="h-4 w-4"/>
              Edit Form
            </>) : (<>
              <Eye className="h-4 w-4"/>
              Preview
            </>)}
        </Button>
      </div>

      {previewMode ? (<div className="border rounded-lg p-6 bg-card">
          <WaitlistPreview formData={formData}/>
        </div>) : (<form id="waitlist-form" onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={function (value) { return setActiveTab(value); }} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  1
                </span>
                Basic
              </TabsTrigger>
              <TabsTrigger value="fields" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  2
                </span>
                Fields
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  3
                </span>
                Style
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs">
                  4
                </span>
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <BasicInfoSection formData={formData} errors={errors} onChange={handleChange}/>
            </TabsContent>

            <TabsContent value="fields" className="space-y-6">
              <CustomFieldsSection formData={formData} newField={newField} setNewField={setNewField} addCustomField={addCustomField} removeCustomField={removeCustomField} updateCustomField={updateCustomField} reorderCustomFields={reorderCustomFields}/>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSection formData={formData} setFormData={setFormData} getBorderRadius={getBorderRadius}/>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
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
                      <Button variant={formData.showBranding ? 'outline' : 'default'} onClick={function () {
                return setFormData(function (prev) { return (__assign(__assign({}, prev), { showBranding: !prev.showBranding })); });
            }}>
                        {formData.showBranding ? 'Hide' : 'Show'} Branding
                      </Button>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/20">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400"/>
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
                              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50" onClick={function () {
                // Handle upgrade logic here
            }}>
                                Upgrade to Pro
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.showBranding && (<div className="mt-4 rounded-lg border p-4">
                        <h4 className="mb-2 text-sm font-medium">Preview</h4>
                        <div className="flex items-center justify-between rounded-md border bg-background p-3 text-sm text-muted-foreground">
                          <span>
                            Powered by <strong>WaitlistNow</strong>
                          </span>
                          <span className="text-xs text-muted-foreground/60">
                            Your form will look like this
                          </span>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
              <BehaviorSection formData={formData} setFormData={setFormData} errors={errors} embedCode={embedCode} copyEmbedCode={copyEmbedCode} showBranding={formData.showBranding}/>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <div className="flex gap-2">
              {activeTab !== 'basic' && (<Button type="button" variant="outline" onClick={function () {
                    var tabs = ['basic', 'fields', 'appearance', 'behavior'];
                    var currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1]);
                    }
                }}>
                  Previous
                </Button>)}
              {activeTab !== 'behavior' && (<Button type="button" onClick={function () {
                    var tabs = ['basic', 'fields', 'appearance', 'behavior'];
                    var currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                        setActiveTab(tabs[currentIndex + 1]);
                    }
                }}>
                  Next
                </Button>)}
            </div>
          </div>
        </form>)}
    </DashboardPage>);
}
/**
 * Renders a section for basic information input fields in a form.
 *
 * This component includes input fields for the waitlist name, description,
 * website URL, and thank you page URL. It handles form data changes through
 * the provided `onChange` function and displays error messages if applicable.
 *
 * The component uses conditional rendering to apply error styles and display
 * error messages next to respective input fields.
 *
 * @param formData - An object containing the current values of the form fields.
 * @param errors - An object containing error messages for each field, if any.
 * @param onChange - A callback function to handle changes in the form fields.
 */
function BasicInfoSection(_a) {
    var formData = _a.formData, errors = _a.errors, onChange = _a.onChange;
    return (<Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Set up the essential details for your waitlist</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Waitlist Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={onChange} placeholder="e.g., Early Access Waitlist" required className={(errors === null || errors === void 0 ? void 0 : errors.name) ? 'border-red-500' : ''}/>
          {(errors === null || errors === void 0 ? void 0 : errors.name) && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={onChange} placeholder="Tell people what they're signing up for" rows={3}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input id="websiteUrl" name="websiteUrl" type="url" value={formData.websiteUrl} onChange={onChange} placeholder="https://yourapp.com" className={(errors === null || errors === void 0 ? void 0 : errors.websiteUrl) ? 'border-red-500' : ''}/>
            {(errors === null || errors === void 0 ? void 0 : errors.websiteUrl) && <p className="text-red-500 text-sm">{errors.websiteUrl}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="redirectUrl">Thank You Page URL</Label>
            <Input id="redirectUrl" name="redirectUrl" type="url" value={formData.redirectUrl} onChange={onChange} placeholder="https://yourapp.com/thank-you" className={(errors === null || errors === void 0 ? void 0 : errors.redirectUrl) ? 'border-red-500' : ''}/>
            {(errors === null || errors === void 0 ? void 0 : errors.redirectUrl) && <p className="text-red-500 text-sm">{errors.redirectUrl}</p>}
          </div>
        </div>
      </CardContent>
    </Card>);
}
/**
 * Renders a custom fields section component.
 *
 * This component allows users to manage custom fields in forms by adding, removing, and updating them.
 * It includes input fields for field name, type, placeholder text, and required status.
 * Additionally, it supports reordering of custom fields and handling specific types like 'select' with options.
 *
 * @param formData - The form data containing custom fields.
 * @param newField - The current state of the new custom field being added.
 * @param setNewField - A function to update the new custom field state.
 * @param addCustomField - A function to add a new custom field to the form data.
 * @param removeCustomField - A function to remove a custom field from the form data.
 * @param updateCustomField - A function to update an existing custom field in the form data.
 * @param reorderCustomFields - A function to reorder custom fields within the form data.
 */
function CustomFieldsSection(_a) {
    var _b, _c;
    var formData = _a.formData, newField = _a.newField, setNewField = _a.setNewField, addCustomField = _a.addCustomField, removeCustomField = _a.removeCustomField, updateCustomField = _a.updateCustomField, reorderCustomFields = _a.reorderCustomFields;
    return (<Card>
      <CardHeader>
        <CardTitle>Custom Fields</CardTitle>
        <CardDescription>Collect additional information from your subscribers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-4">
            <Input placeholder="Field name" value={newField.name || ''} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { name: e.target.value })); }}/>
          </div>
          <div className="col-span-3">
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={newField.type || 'text'} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { type: e.target.value })); }}>
              {FIELD_TYPES.map(function (type) { return (<option key={type.value} value={type.value}>
                  {type.label}
                </option>); })}
            </select>
          </div>
          <div className="col-span-3">
            <Input placeholder="Placeholder text" value={newField.placeholder || ''} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { placeholder: e.target.value })); }}/>
          </div>
          <div className="col-span-1 flex items-center">
            <input type="checkbox" id="required" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0" checked={newField.required || false} onChange={function (e) { return setNewField(__assign(__assign({}, newField), { required: e.target.checked })); }}/>
          </div>
          <div className="col-span-1">
            <Button type="button" variant="outline" size="sm" onClick={addCustomField} disabled={!((_b = newField.name) === null || _b === void 0 ? void 0 : _b.trim())} className="w-full">
              <Plus className="h-4 w-4"/>
            </Button>
          </div>
        </div>

        {newField.type === 'select' && (<div className="space-y-2">
            <Label>Select Options</Label>
            <Input placeholder="Enter options separated by commas" value={((_c = newField.options) === null || _c === void 0 ? void 0 : _c.join(', ')) || ''} onChange={function (e) {
                return setNewField(__assign(__assign({}, newField), { options: e.target.value
                        .split(',')
                        .map(function (opt) { return opt.trim(); })
                        .filter(Boolean) }));
            }}/>
          </div>)}

        {formData.customFields.length > 0 && (<div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Custom Fields</h4>
              <Badge variant="secondary">{formData.customFields.length}</Badge>
            </div>
            <div className="rounded-md border divide-y">
              {formData.customFields.map(function (field, index) {
                var _a;
                return (<div key={field.id} className="flex items-center justify-between p-3 group">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move"/>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{field.name}</p>
                        {field.required && (<Badge variant="outline" className="text-xs">
                            Required
                          </Badge>)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(_a = FIELD_TYPES.find(function (t) { return t.value === field.type; })) === null || _a === void 0 ? void 0 : _a.label}
                        {field.placeholder && " \u2022 \"".concat(field.placeholder, "\"")}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={function () { return removeCustomField(field.id); }} className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </div>);
            })}
            </div>
          </div>)}
      </CardContent>
    </Card>);
}
/**
 * Renders a section for customizing button appearance and form styling.
 */
function AppearanceSection(_a) {
    var formData = _a.formData, setFormData = _a.setFormData, getBorderRadius = _a.getBorderRadius;
    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Button Appearance</CardTitle>
            <CardDescription>Customize your call-to-action button</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input value={formData.style.buttonText} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonText: e.target.value }) })); });
        }} placeholder="e.g., Join Waitlist"/>
            </div>

            <div className="space-y-2">
              <Label>Button Style</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.style.buttonVariant} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonVariant: e.target.value }) })); });
        }}>
                {BUTTON_VARIANTS.map(function (variant) { return (<option key={variant.value} value={variant.value}>
                    {variant.label}
                  </option>); })}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Button Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={formData.style.buttonColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonColor: e.target.value }) })); });
        }} className="h-10 w-16 cursor-pointer rounded border"/>
                <Input value={formData.style.buttonColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonColor: e.target.value }) })); });
        }} className="w-32"/>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Button Text Color</Label>
              <div className="flex items-center gap-2">
                <input type="color" value={formData.style.buttonTextColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonTextColor: e.target.value }) })); });
        }} className="h-10 w-16 cursor-pointer rounded border"/>
                <Input value={formData.style.buttonTextColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonTextColor: e.target.value }) })); });
        }} className="w-32"/>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Button Corners</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.style.buttonRounded} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { buttonRounded: e.target.value }) })); });
        }}>
                {BORDER_RADIUS.map(function (radius) { return (<option key={radius.value} value={radius.value}>
                    {radius.label}
                  </option>); })}
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
                <input type="color" value={formData.style.primaryColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { primaryColor: e.target.value }) })); });
        }} className="h-10 w-16 cursor-pointer rounded border"/>
                <Input value={formData.style.primaryColor} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { primaryColor: e.target.value }) })); });
        }} className="w-32"/>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Form Layout</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" value="stacked" checked={formData.style.formLayout === 'stacked'} onChange={function () {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { formLayout: 'stacked' }) })); });
        }} className="h-4 w-4 text-primary focus:ring-primary"/>
                  Stacked
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="inline" checked={formData.style.formLayout === 'inline'} onChange={function () {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { formLayout: 'inline' }) })); });
        }} className="h-4 w-4 text-primary focus:ring-primary"/>
                  Inline
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="showLabels" checked={formData.style.showLabels} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), { showLabels: e.target.checked }) })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                <label htmlFor="showLabels" className="text-sm font-medium">
                  Show field labels
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="showBranding" checked={formData.showBranding} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { showBranding: e.target.checked })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                <label htmlFor="showBranding" className="text-sm font-medium">
                  Show "Powered by WaitlistNow"
                </label>
                {!formData.showBranding && (<span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    Pro Feature
                  </span>)}
              </div>

              {/* TODO: Add upgrade modal for branding removal */}
              {/* <button
          type="button"
          className="text-xs text-blue-600 hover:underline mt-1 ml-6"
          onClick={() => {
            // TODO: Open upgrade modal
            console.log('Open upgrade modal');
          }}
        >
          Upgrade to remove branding
        </button> */}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <WaitlistPreview formData={formData}/>
      </div>
    </div>);
}
/**
 * Renders a behavior section component for configuring waitlist settings.
 *
 * This component provides UI elements to configure confirmation messages, advanced settings,
 * integration options, and direct links. It uses React state management to handle form data
 * updates and conditional rendering based on user selections. The component also includes
 * buttons for copying embed codes and a preview section for embedding the waitlist form.
 *
 * @param formData - The current form data containing configuration values.
 * @param setFormData - A function to update the form data.
 * @param errors - An object containing validation errors for form fields.
 * @param embedCode - The code snippet or iframe URL for embedding the waitlist.
 * @param copyEmbedCode - A function to handle copying the embed code to clipboard.
 * @param showBranding - A boolean indicating whether branding should be shown (default is true).
 */
function BehaviorSection(_a) {
    var formData = _a.formData, setFormData = _a.setFormData, errors = _a.errors, embedCode = _a.embedCode, copyEmbedCode = _a.copyEmbedCode, _b = _a.showBranding, showBranding = _b === void 0 ? true : _b;
    var _c = useState('js'), embedType = _c[0], setEmbedType = _c[1];
    var _d = useState(false), showConfirmation = _d[0], setShowConfirmation = _d[1];
    var _e = useState(false), isTesting = _e[0], setIsTesting = _e[1];
    var handleTestConfirmation = function () {
        setIsTesting(true);
        setShowConfirmation(true);
    };
    var handleCloseTest = function () {
        setShowConfirmation(false);
        // Small delay to allow the modal to close before resetting the testing state
        setTimeout(function () { return setIsTesting(false); }, 300);
    };
    var handleRedirect = function () {
        if (formData.confirmationType === 'redirect' && formData.redirectUrl) {
            window.open(formData.redirectUrl, '_blank');
        }
    };
    return (<div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Confirmation Settings</CardTitle>
          <CardDescription>What happens after someone joins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="confirmationMessage" name="confirmationType" value="message" checked={formData.confirmationType === 'message'} onChange={function () {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { confirmationType: 'message' })); });
        }} className="h-4 w-4 text-primary focus:ring-primary"/>
                <label htmlFor="confirmationMessage" className="text-sm font-medium">
                  Show confirmation message
                </label>
              </div>

              {formData.confirmationType === 'message' && (<div className="ml-6 space-y-2">
                  <Textarea value={formData.confirmationMessage} onChange={function (e) {
                return setFormData(function (prev) { return (__assign(__assign({}, prev), { confirmationMessage: e.target.value })); });
            }} rows={3} placeholder="Thanks for joining! We'll be in touch soon." className="w-full"/>
                  <p className="text-xs text-gray-500">
                    This message will be shown after form submission
                  </p>
                </div>)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="confirmationRedirect" name="confirmationType" value="redirect" checked={formData.confirmationType === 'redirect'} onChange={function () {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { confirmationType: 'redirect' })); });
        }} className="h-4 w-4 text-primary focus:ring-primary"/>
                <label htmlFor="confirmationRedirect" className="text-sm font-medium">
                  Redirect to URL
                </label>
              </div>

              {formData.confirmationType === 'redirect' && (<div className="ml-6 space-y-2">
                  <input type="url" value={formData.redirectUrl || ''} onChange={function (e) {
                return setFormData(function (prev) { return (__assign(__assign({}, prev), { redirectUrl: e.target.value })); });
            }} placeholder="https://example.com/thank-you" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"/>
                  <p className="text-xs text-gray-500">
                    Users will be redirected to this URL after submission
                  </p>
                </div>)}
            </div>

            <div className="pt-2">
              <button type="button" onClick={handleTestConfirmation} className="text-sm text-primary hover:underline flex items-center gap-1">
                <span>Test confirmation</span>
                <ExternalLink className="w-3.5 h-3.5"/>
              </button>

              {/* Confirmation Preview Modal */}
              <Dialog open={showConfirmation} onOpenChange={handleCloseTest}>
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
                    {formData.confirmationType === 'message' ? (<div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"/>
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
                      </div>) : (<div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-blue-800 break-all">
                            {formData.redirectUrl || 'No redirect URL provided'}
                          </p>
                          {formData.redirectUrl && !isValidUrl(formData.redirectUrl) && (<p className="text-red-500 text-sm mt-2">
                              Warning: This does not appear to be a valid URL
                            </p>)}
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>
                            Users will be automatically redirected to this URL after submission.
                          </p>
                          {formData.redirectUrl && isValidUrl(formData.redirectUrl) && (<button onClick={handleRedirect} className="mt-2 inline-flex items-center text-blue-600 hover:underline text-sm">
                              Test redirect <ExternalLink className="w-3.5 h-3.5 ml-1"/>
                            </button>)}
                        </div>
                      </div>)}
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={handleCloseTest} variant="outline" className="mr-2">
                      Close
                    </Button>
                    {formData.confirmationType === 'redirect' &&
            formData.redirectUrl &&
            isValidUrl(formData.redirectUrl) && (<Button onClick={handleRedirect} className="bg-blue-600 hover:bg-blue-700">
                          Open URL
                        </Button>)}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Advanced Settings</CardTitle>
            <button type="button" className="text-gray-400 hover:text-gray-600" onClick={function () {
            // TODO: Show help tooltip
            // console.log('Show advanced settings help');
        }} aria-label="Help">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
          <CardDescription>Additional options for your waitlist</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Signup Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input type="checkbox" id="enableNotifications" checked={formData.enableNotifications} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { enableNotifications: e.target.checked })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="enableNotifications" className="text-sm font-medium">
                    Email notifications
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Get notified when someone joins the waitlist
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input type="checkbox" id="requireEmailVerification" checked={formData.requireEmailVerification} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { requireEmailVerification: e.target.checked })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="requireEmailVerification" className="text-sm font-medium">
                    Email verification
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Require users to verify their email address
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input type="checkbox" id="allowDuplicates" checked={formData.settings.allowDuplicates} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { settings: __assign(__assign({}, prev.settings), { allowDuplicates: e.target.checked }) })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="allowDuplicates" className="text-sm font-medium">
                    Allow duplicate emails
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Let the same email sign up multiple times
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input type="checkbox" id="enableReferrals" checked={formData.enableReferrals} onChange={function (e) {
            return setFormData(function (prev) { return (__assign(__assign({}, prev), { enableReferrals: e.target.checked })); });
        }} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="enableReferrals" className="text-sm font-medium">
                    Enable referrals
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Let users refer friends to move up the list
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="maxSignups">Maximum Signups</Label>
                <span className="text-xs text-gray-500">(optional)</span>
              </div>
              <div className="relative">
                <Input id="maxSignups" type="number" min="1" value={formData.maxSignups || ''} onChange={function (e) {
            var value = e.target.value ? Math.max(1, Number(e.target.value)) : undefined;
            setFormData(function (prev) { return (__assign(__assign({}, prev), { maxSignups: value })); });
        }} placeholder="Leave empty for unlimited" className={"pr-16 ".concat((errors === null || errors === void 0 ? void 0 : errors.maxSignups) ? 'border-red-500' : '')}/>
                {formData.maxSignups && (<div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-500">
                    {formData.maxSignups.toLocaleString()}{' '}
                    {formData.maxSignups === 1 ? 'signup' : 'signups'}
                  </div>)}
              </div>
              {(errors === null || errors === void 0 ? void 0 : errors.maxSignups) ? (<p className="text-red-500 text-sm">{errors.maxSignups}</p>) : (<p className="text-xs text-gray-500">
                  Set a limit on total signups. Leave empty for no limit.
                </p>)}
            </div>

            {formData.enableReferrals && (<div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="referralReward">Referral Reward</Label>
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                    Beta
                  </span>
                </div>
                <Input id="referralReward" value={formData.referralReward || ''} onChange={function (e) {
                return setFormData(function (prev) { return (__assign(__assign({}, prev), { referralReward: e.target.value })); });
            }} placeholder="e.g., Get 1 month free, Earn 100 points, etc."/>
                <p className="text-xs text-gray-500">What will users get for referring others?</p>
              </div>)}
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
              <button type="button" className={"px-4 py-2 text-sm font-medium ".concat(embedType === 'js'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground')} onClick={function () { return setEmbedType('js'); }}>
                JavaScript Snippet
              </button>
              <button type="button" className={"px-4 py-2 text-sm font-medium ".concat(embedType === 'iframe'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground')} onClick={function () { return setEmbedType('iframe'); }}>
                iFrame
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{embedType === 'js' ? 'JavaScript Embed Code' : 'iFrame Embed Code'}</Label>
                <Button type="button" variant="outline" size="sm" onClick={copyEmbedCode} className="flex items-center gap-2">
                  <Copy className="h-4 w-4"/>
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
                {embedType === 'js' ? (<div className="aspect-video bg-muted/30 rounded flex flex-col items-center justify-center p-6 text-center">
                    <div className="mx-auto h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">JavaScript Embed</h4>
                    <p className="text-sm text-muted-foreground max-w-md">
                      The actual form will be rendered on your website where you place the script
                      tag.
                    </p>
                  </div>) : (<div className="aspect-video bg-muted/30 rounded-md border-2 border-dashed flex flex-col items-center justify-center p-6 text-center">
                    <div className="mx-auto h-12 w-12 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">iFrame Embed</h4>
                    <p className="text-sm text-muted-foreground max-w-md mb-3">
                      The form will be displayed within an iframe on your website.
                    </p>
                    <div className="w-full max-w-xs p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-left font-mono overflow-x-auto">
                      {embedCode}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Direct Link</Label>
            <div className="flex items-center gap-2">
              <Input readOnly value={'https://yourdomain.com/waitlist/new'} className="bg-muted"/>
              <Button type="button" variant="outline" size="sm" onClick={function () { return navigator.clipboard.writeText('https://yourdomain.com/waitlist/new'); }}>
                <Copy className="h-4 w-4"/>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this link directly with your audience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>);
}
/**
 * Renders a preview of a waitlist form based on the provided formData.
 *
 * This component dynamically generates a styled and interactive preview of the waitlist form,
 * incorporating custom fields, labels, buttons, and additional information such as max signups,
 * referrals, and email verification requirements. The form's style is determined by props from
 * formData, including background color, text color, font family, padding, border radius, button
 * styles, and layout options.
 *
 * @param {WaitlistPreviewProps} formData - An object containing all necessary data to render the form preview.
 */
function WaitlistPreview(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
    var formData = _a.formData;
    // Helper function to get border radius value based on buttonRounded option
    var getBorderRadius = function (size) {
        if (size === void 0) { size = 'md'; }
        var radiusMap = {
            none: '0px',
            sm: '0.25rem',
            md: '0.375rem',
            lg: '0.5rem',
            full: '9999px',
        };
        return radiusMap[size] || '0.375rem';
    };
    // Determine form layout classes
    var formLayoutClass = ((_b = formData.style) === null || _b === void 0 ? void 0 : _b.formLayout) === 'inline' ? 'flex flex-wrap gap-4 items-end' : 'space-y-4';
    // Determine if we should show field labels
    var showLabels = ((_c = formData.style) === null || _c === void 0 ? void 0 : _c.showLabels) !== false; // Default to true if not specified
    // Set CSS variables for primary color
    var style = {
        '--primary': ((_d = formData.style) === null || _d === void 0 ? void 0 : _d.primaryColor) || '#3b82f6',
        '--primary-foreground': ((_e = formData.style) === null || _e === void 0 ? void 0 : _e.buttonTextColor) || '#ffffff',
    };
    return (<div className="min-h-screen flex items-center justify-center p-6" style={__assign(__assign({}, style), { backgroundColor: ((_f = formData.style) === null || _f === void 0 ? void 0 : _f.backgroundColor) || '#f3f4f6', fontFamily: ((_g = formData.style) === null || _g === void 0 ? void 0 : _g.fontFamily) || 'Inter, sans-serif' })}>
      <div className="w-full max-w-md">
        {/* Browser-style header */}
        <div className="bg-gray-200 rounded-t-xl px-4 py-3 flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"/>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"/>
            <div className="w-3 h-3 bg-green-500 rounded-full"/>
          </div>
          <div className="flex-1 text-center">
            <span className="text-gray-700 text-sm font-normal">waitlist.yourdomain.com</span>
          </div>
        </div>

        {/* Main content card */}
        <div className="rounded-b-xl shadow-lg overflow-hidden transition-colors duration-200" style={{
            backgroundColor: ((_h = formData.style) === null || _h === void 0 ? void 0 : _h.backgroundColor) || '#ffffff',
            color: ((_j = formData.style) === null || _j === void 0 ? void 0 : _j.textColor) || '#1f2937',
        }}>
          <div className="px-12 py-16 text-center">
            <h1 className="text-4xl font-bold mb-6 leading-tight" style={{
            color: ((_k = formData.style) === null || _k === void 0 ? void 0 : _k.textColor) || '#111827',
        }}>
              {formData.name || 'Join the Waitlist'}
            </h1>

            {formData.description ? (<p className="text-lg mb-12 leading-relaxed font-normal" style={{
                color: ((_l = formData.style) === null || _l === void 0 ? void 0 : _l.textColor) ? "".concat(formData.style.textColor, "CC") : '#4b5563',
            }}>
                {formData.description}
              </p>) : (<p className="text-lg mb-12 leading-relaxed font-normal" style={{
                color: ((_m = formData.style) === null || _m === void 0 ? void 0 : _m.textColor) ? "".concat(formData.style.textColor, "CC") : '#4b5563',
            }}>
                Be the first to know when we launch. Early adopters get exclusive perks!
              </p>)}

            <div className={"mb-8 ".concat(formLayoutClass)}>
              {/* Email input */}
              <div className={((_o = formData.style) === null || _o === void 0 ? void 0 : _o.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                {showLabels && (<label htmlFor="email" className="block text-left mb-2 text-sm font-medium" style={{
                color: ((_p = formData.style) === null || _p === void 0 ? void 0 : _p.textColor) || '#374151',
            }}>
                    Email Address
                  </label>)}
                <div className="relative">
                  <input id="email" type="email" placeholder="Enter your email" className={'w-full px-6 py-4 border rounded-xl text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal'} style={{
            backgroundColor: ((_q = formData.style) === null || _q === void 0 ? void 0 : _q.backgroundColor) === ((_r = formData.style) === null || _r === void 0 ? void 0 : _r.textColor)
                ? '#ffffff'
                : ((_s = formData.style) === null || _s === void 0 ? void 0 : _s.backgroundColor) || '#ffffff',
            color: ((_t = formData.style) === null || _t === void 0 ? void 0 : _t.textColor) || '#1f2937',
            borderColor: ((_u = formData.style) === null || _u === void 0 ? void 0 : _u.primaryColor)
                ? "".concat(formData.style.primaryColor, "40")
                : '#e5e7eb',
            borderWidth: '1px',
            borderRadius: ((_v = formData.style) === null || _v === void 0 ? void 0 : _v.buttonRounded)
                ? getBorderRadius(formData.style.buttonRounded)
                : '0.5rem',
            '--tw-ring-color': ((_w = formData.style) === null || _w === void 0 ? void 0 : _w.primaryColor) || '#3b82f6',
            '--tw-ring-opacity': '0.2',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            '--tw-ring-offset-width': '0px',
            '--tw-ring-offset-color': '#fff',
        }}/>
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <span className="text-xl">🎯</span>
                  </div>
                </div>
              </div>

              {/* Custom fields */}
              {formData.customFields.map(function (field) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return (<div key={field.id} className={((_a = formData.style) === null || _a === void 0 ? void 0 : _a.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                  {showLabels && (<label htmlFor={field.id} className="block text-left mb-2 text-sm font-medium" style={{
                        color: ((_b = formData.style) === null || _b === void 0 ? void 0 : _b.textColor) || '#374151',
                    }}>
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>)}
                  <input id={field.id} type={field.type === 'email' ? 'email' : 'text'} placeholder={field.placeholder || field.name} className={'w-full px-6 py-4 border text-base transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 font-normal'} style={{
                    backgroundColor: ((_c = formData.style) === null || _c === void 0 ? void 0 : _c.backgroundColor) === ((_d = formData.style) === null || _d === void 0 ? void 0 : _d.textColor)
                        ? '#ffffff'
                        : ((_e = formData.style) === null || _e === void 0 ? void 0 : _e.backgroundColor) || '#ffffff',
                    color: ((_f = formData.style) === null || _f === void 0 ? void 0 : _f.textColor) || '#1f2937',
                    borderColor: ((_g = formData.style) === null || _g === void 0 ? void 0 : _g.primaryColor)
                        ? "".concat(formData.style.primaryColor, "40")
                        : '#e5e7eb',
                    borderWidth: '1px',
                    borderRadius: ((_h = formData.style) === null || _h === void 0 ? void 0 : _h.buttonRounded)
                        ? getBorderRadius(formData.style.buttonRounded)
                        : '0.5rem',
                    '--tw-ring-color': ((_j = formData.style) === null || _j === void 0 ? void 0 : _j.primaryColor) || '#3b82f6',
                    '--tw-ring-opacity': '0.2',
                    '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
                    '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
                    '--tw-ring-offset-width': '0px',
                    '--tw-ring-offset-color': ((_k = formData.style) === null || _k === void 0 ? void 0 : _k.backgroundColor) || '#ffffff',
                }}/>
                </div>);
        })}

              {/* Join button */}
              <div className={((_x = formData.style) === null || _x === void 0 ? void 0 : _x.formLayout) === 'inline' ? 'flex-1 min-w-[200px]' : 'w-full'}>
                <button className={cn('w-full px-8 py-4 text-base font-semibold cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2', {
            'bg-[--primary] text-[--primary-foreground] hover:bg-opacity-90': ((_y = formData.style) === null || _y === void 0 ? void 0 : _y.buttonVariant) === 'default',
            'border border-[--primary] text-[--primary] hover:bg-[--primary] hover:bg-opacity-10': ((_z = formData.style) === null || _z === void 0 ? void 0 : _z.buttonVariant) === 'outline',
            'bg-secondary text-secondary-foreground': ((_0 = formData.style) === null || _0 === void 0 ? void 0 : _0.buttonVariant) === 'secondary',
            'text-[--primary] hover:bg-[--primary] hover:bg-opacity-10': ((_1 = formData.style) === null || _1 === void 0 ? void 0 : _1.buttonVariant) === 'ghost',
            'text-[--primary] underline-offset-4 hover:underline p-0': ((_2 = formData.style) === null || _2 === void 0 ? void 0 : _2.buttonVariant) === 'link',
        })} style={__assign({ backgroundColor: ((_3 = formData.style) === null || _3 === void 0 ? void 0 : _3.buttonVariant) === 'default' ||
                ((_4 = formData.style) === null || _4 === void 0 ? void 0 : _4.buttonVariant) === 'secondary'
                ? (_5 = formData.style) === null || _5 === void 0 ? void 0 : _5.buttonColor
                : 'transparent', color: ((_6 = formData.style) === null || _6 === void 0 ? void 0 : _6.buttonVariant) === 'default' ||
                ((_7 = formData.style) === null || _7 === void 0 ? void 0 : _7.buttonVariant) === 'secondary'
                ? (_8 = formData.style) === null || _8 === void 0 ? void 0 : _8.buttonTextColor
                : ((_9 = formData.style) === null || _9 === void 0 ? void 0 : _9.buttonColor) || ((_10 = formData.style) === null || _10 === void 0 ? void 0 : _10.primaryColor), borderColor: ((_11 = formData.style) === null || _11 === void 0 ? void 0 : _11.buttonVariant) === 'outline'
                ? (_12 = formData.style) === null || _12 === void 0 ? void 0 : _12.buttonColor
                : 'transparent', borderRadius: ((_13 = formData.style) === null || _13 === void 0 ? void 0 : _13.buttonRounded)
                ? getBorderRadius(formData.style.buttonRounded)
                : '0.5rem', fontFamily: ((_14 = formData.style) === null || _14 === void 0 ? void 0 : _14.fontFamily) || 'Inter, sans-serif', borderWidth: ((_15 = formData.style) === null || _15 === void 0 ? void 0 : _15.buttonVariant) === 'outline' ? '1px' : '0' }, (((_16 = formData.style) === null || _16 === void 0 ? void 0 : _16.buttonVariant) === 'link'
            ? {
                padding: 0,
                height: 'auto',
                display: 'inline',
                width: 'auto',
            }
            : {}))}>
                  {((_17 = formData.style) === null || _17 === void 0 ? void 0 : _17.buttonText) || 'Join Waitlist'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-500 text-base font-normal">
                Join {formData.maxSignups ? "".concat(formData.maxSignups.toLocaleString()) : '1,247'}{' '}
                others on the waitlist
              </p>

              {formData.showBranding && (<div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <span>Powered by</span>
                  <span className="font-semibold text-gray-600">WaitlistNow</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
function setIsTesting(arg0) {
    throw new Error('Function not implemented.');
}
function setShowConfirmation(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=page.jsx.map