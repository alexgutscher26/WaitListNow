'use client';
import { __assign, __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
var emailSettingsSchema = z.object({
    sendConfirmationEmail: z.boolean().default(true),
    customThankYouMessage: z.string().max(500).optional(),
});
export function EmailSettingsForm(_a) {
    var _b, _c, _d;
    var waitlist = _a.waitlist;
    var router = useRouter();
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var form = useForm({
        resolver: zodResolver(emailSettingsSchema),
        defaultValues: {
            sendConfirmationEmail: (_c = (_b = waitlist.customFields) === null || _b === void 0 ? void 0 : _b.sendConfirmationEmail) !== null && _c !== void 0 ? _c : true,
            customThankYouMessage: ((_d = waitlist.customFields) === null || _d === void 0 ? void 0 : _d.customThankYouMessage) ||
                "Thank you for joining our waitlist! We'll notify you when we launch.",
        },
    });
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlist.id, "/email-settings"), {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    customFields: __assign(__assign({}, waitlist.customFields), { sendConfirmationEmail: data.sendConfirmationEmail, customThankYouMessage: data.customThankYouMessage }),
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to update email settings');
                        }
                        // Refresh the page to show updated data
                        router.refresh();
                        toast({
                            title: 'Success',
                            description: 'Email settings updated successfully',
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error updating email settings:', error_1);
                        toast({
                            title: 'Error',
                            description: 'Failed to update email settings. Please try again.',
                            variant: 'destructive',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "send-confirmation-email", checked: form.watch('sendConfirmationEmail'), onCheckedChange: function (checked) { return form.setValue('sendConfirmationEmail', checked); }, disabled: isLoading }), _jsx(Label, { htmlFor: "send-confirmation-email", className: "cursor-pointer", children: "Send confirmation emails to new subscribers" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "custom-thank-you", children: "Custom Thank You Message" }), _jsx(Textarea, __assign({ id: "custom-thank-you", placeholder: "Enter a custom thank you message", className: "min-h-[100px]" }, form.register('customThankYouMessage'), { disabled: isLoading })), _jsx("p", { className: "text-sm text-muted-foreground", children: "This message will be shown to users after they sign up for your waitlist." })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? 'Saving...' : 'Save Email Settings' }) })] }));
}
//# sourceMappingURL=email-settings-form.js.map