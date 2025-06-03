'use client';
import { __awaiter, __generator } from "tslib";
import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
export function ExportButton(_a) {
    var _this = this;
    var hasExportAccess = _a.hasExportAccess;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var toast = useToast().toast;
    var handleExport = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, blob, url, a, contentDisposition, filenameMatch, filename, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!hasExportAccess) {
                        toast({
                            title: 'Upgrade Required',
                            description: 'Export is a premium feature. Please upgrade your plan to access this feature.',
                            variant: 'default',
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/export/waitlists')];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to export waitlists');
                    }
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _a.sent();
                    url = window.URL.createObjectURL(blob);
                    a = document.createElement('a');
                    a.href = url;
                    contentDisposition = response.headers.get('content-disposition');
                    filenameMatch = contentDisposition === null || contentDisposition === void 0 ? void 0 : contentDisposition.match(/filename="?(.+)"?/);
                    filename = filenameMatch
                        ? filenameMatch[1]
                        : "waitlist-export-".concat(new Date().toISOString().split('T')[0], ".csv");
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    // Cleanup
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    toast({
                        title: 'Export Successful',
                        description: 'Your waitlist data has been exported successfully.',
                        variant: 'default',
                    });
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Export error:', error_1);
                    toast({
                        title: 'Export Failed',
                        description: 'An error occurred while exporting. Please try again.',
                        variant: 'destructive',
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<Button variant="outline" size="sm" className="gap-2" onClick={handleExport} disabled={isLoading}>
      {isLoading ? (<>
          <Loader2 className="h-4 w-4 animate-spin"/>
          Exporting...
        </>) : (<>
          <Download className="h-4 w-4"/>
          Export
        </>)}
    </Button>);
}
//# sourceMappingURL=export-button.jsx.map