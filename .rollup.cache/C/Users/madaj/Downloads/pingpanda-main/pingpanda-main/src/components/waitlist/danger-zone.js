'use client';
import { __awaiter, __generator } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Download } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
export function DangerZone(_a) {
    var _this = this;
    var waitlistId = _a.waitlistId, waitlistName = _a.waitlistName;
    var router = useRouter();
    var _b = useState(false), isDeleting = _b[0], setIsDeleting = _b[1];
    var _c = useState(false), isExporting = _c[0], setIsExporting = _c[1];
    var _d = useState(false), showDeleteDialog = _d[0], setShowDeleteDialog = _d[1];
    var handleDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsDeleting(true);
                    return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to delete waitlist');
                    }
                    toast({
                        title: 'Success',
                        description: 'Waitlist deleted successfully',
                    });
                    // Redirect to dashboard after deletion
                    router.push('/dashboard');
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error deleting waitlist:', error_1);
                    toast({
                        title: 'Error',
                        description: 'Failed to delete waitlist. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setIsDeleting(false);
                    setShowDeleteDialog(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleExport = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, contentDisposition, filename, blob, url, a, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setIsExporting(true);
                    return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId, "/export"), {
                            method: 'GET',
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to export subscribers');
                    }
                    contentDisposition = response.headers.get('Content-Disposition');
                    filename = contentDisposition
                        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                        : "subscribers-".concat(waitlistId, ".csv");
                    return [4 /*yield*/, response.blob()];
                case 2:
                    blob = _a.sent();
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                    toast({
                        title: 'Success',
                        description: 'Subscribers exported successfully',
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error exporting subscribers:', error_2);
                    toast({
                        title: 'Error',
                        description: 'Failed to export subscribers. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsExporting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "rounded-md border border-red-200 bg-white p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-red-800", children: "Delete Waitlist" }), _jsx("p", { className: "text-sm text-red-600", children: "Once deleted, all subscribers and data will be permanently removed." })] }), _jsx(Button, { variant: "destructive", onClick: function () { return setShowDeleteDialog(true); }, disabled: isDeleting, children: isDeleting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Deleting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete Waitlist"] })) })] }) }), _jsx("div", { className: "rounded-md border border-amber-200 bg-white p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-amber-800", children: "Export Subscribers" }), _jsx("p", { className: "text-sm text-amber-600", children: "Download all subscriber data as a CSV file." })] }), _jsx(Button, { variant: "outline", className: "border-amber-300 text-amber-700 hover:bg-amber-50", onClick: handleExport, disabled: isExporting, children: isExporting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Exporting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export CSV"] })) })] }) }), _jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }), _jsxs(AlertDialogDescription, { children: ["This action cannot be undone. This will permanently delete the \"", waitlistName, "\" waitlist and remove all associated subscriber data from our servers."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { disabled: isDeleting, children: "Cancel" }), _jsx(AlertDialogAction, { onClick: handleDelete, className: "bg-red-600 hover:bg-red-700 focus:ring-red-500", disabled: isDeleting, children: isDeleting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Deleting..."] })) : ('Delete permanently') })] })] }) })] }));
}
//# sourceMappingURL=danger-zone.js.map