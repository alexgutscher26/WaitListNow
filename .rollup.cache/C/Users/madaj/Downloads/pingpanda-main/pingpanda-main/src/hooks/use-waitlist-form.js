import { __assign, __awaiter, __generator, __rest, __spreadArray } from "tslib";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { createWaitlist } from '@/lib/api/waitlists';
var defaultValues = {
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
export function useWaitlistForm(initialValues) {
    var _this = this;
    if (initialValues === void 0) { initialValues = {}; }
    var router = useRouter();
    var _a = useState(__assign(__assign({}, defaultValues), initialValues)), formData = _a[0], setFormData = _a[1];
    var _b = useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = useState({}), errors = _c[0], setErrors = _c[1];
    var handleChange = useCallback(function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'checkbox' ? e.target.checked : value, _a)));
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(function (prev) {
                var _a = prev, _b = name, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : String(_b)]);
                return rest;
            });
        }
    }, [errors]);
    var handleCustomFieldChange = useCallback(function (index, field, value) {
        setFormData(function (prev) {
            var _a;
            var updatedFields = __spreadArray([], prev.customFields, true);
            updatedFields[index] = __assign(__assign({}, updatedFields[index]), (_a = {}, _a[field] = value, _a));
            return __assign(__assign({}, prev), { customFields: updatedFields });
        });
    }, []);
    var addCustomField = useCallback(function () {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: __spreadArray(__spreadArray([], prev.customFields, true), [
                {
                    id: "field-".concat(Date.now()),
                    name: '',
                    type: 'text',
                    placeholder: '',
                    required: false,
                },
            ], false) })); });
    }, []);
    var removeCustomField = useCallback(function (index) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.filter(function (_, i) { return i !== index; }) })); });
    }, []);
    var handleStyleChange = useCallback(function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), (_a = {}, _a[field] = value, _a)) }));
        });
    }, []);
    var handleSettingsChange = useCallback(function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { settings: __assign(__assign({}, prev.settings), (_a = {}, _a[field] = value, _a)) }));
        });
    }, []);
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
        // Validate custom fields
        formData.customFields.forEach(function (field, index) {
            if (!field.name.trim()) {
                newErrors["customFields.".concat(index, ".name")] = 'Field name is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);
    var handleSubmit = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateForm()) {
                        return [2 /*return*/, { success: false, error: 'Please fix the form errors' }];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, createWaitlist(formData)];
                case 2:
                    data = _a.sent();
                    toast({
                        title: 'Success!',
                        description: 'Your waitlist has been created successfully.',
                    });
                    router.push("/dashboard/waitlists/".concat(data.id));
                    return [2 /*return*/, { success: true, data: data }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error creating waitlist:', error_1);
                    toast({
                        title: 'Error',
                        description: error_1 instanceof Error ? error_1.message : 'Failed to create waitlist',
                        variant: 'destructive',
                    });
                    return [2 /*return*/, { success: false, error: error_1 }];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [formData, router, validateForm]);
    return {
        formData: formData,
        setFormData: setFormData,
        errors: errors,
        isSubmitting: isSubmitting,
        handleChange: handleChange,
        handleCustomFieldChange: handleCustomFieldChange,
        handleStyleChange: handleStyleChange,
        handleSettingsChange: handleSettingsChange,
        addCustomField: addCustomField,
        removeCustomField: removeCustomField,
        handleSubmit: handleSubmit,
    };
}
function isValidUrl(url) {
    if (!url)
        return true;
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
//# sourceMappingURL=use-waitlist-form.js.map