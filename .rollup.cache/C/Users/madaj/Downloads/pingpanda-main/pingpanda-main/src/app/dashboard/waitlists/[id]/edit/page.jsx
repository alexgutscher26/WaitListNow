'use client';
import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { DashboardPage } from '@/components/dashboard-page';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoSection } from '@/components/waitlist/edit/basic-info-section';
import { CustomFieldsSection } from '@/components/waitlist/edit/custom-fields-section';
import { AppearanceSection } from '@/components/waitlist/edit/appearance-section';
import { BehaviorSection } from '@/components/waitlist/edit/behavior-section';
import { WaitlistPreview } from '@/components/waitlist/edit/waitlist-preview';
export default function EditWaitlistPage() {
    var _this = this;
    var router = useRouter();
    var params = useParams();
    var waitlistId = params.id;
    var _a = useState('basic'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = useState(false), isSaving = _c[0], setIsSaving = _c[1];
    var _d = useState(false), showPreview = _d[0], setShowPreview = _d[1];
    var _e = useState({
        name: '',
        description: '',
        websiteUrl: '',
        redirectUrl: '',
        logoUrl: '',
        maxSignups: null,
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
    }), formData = _e[0], setFormData = _e[1];
    // Fetch waitlist data
    useEffect(function () {
        var fetchWaitlist = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        _x.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId))];
                    case 1:
                        response = _x.sent();
                        if (!response.ok) {
                            throw new Error('Failed to fetch waitlist');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _x.sent();
                        // Transform the API data to match our form data structure
                        setFormData({
                            name: data.name,
                            description: data.description || '',
                            websiteUrl: data.websiteUrl || '',
                            redirectUrl: data.redirectUrl || '',
                            logoUrl: data.logoUrl || '',
                            maxSignups: data.maxSignups,
                            customFields: data.customFields || [],
                            style: {
                                primaryColor: ((_a = data.style) === null || _a === void 0 ? void 0 : _a.primaryColor) || '#3b82f6',
                                buttonText: ((_b = data.style) === null || _b === void 0 ? void 0 : _b.buttonText) || 'Join Waitlist',
                                buttonColor: ((_c = data.style) === null || _c === void 0 ? void 0 : _c.buttonColor) || '#3b82f6',
                                buttonTextColor: ((_d = data.style) === null || _d === void 0 ? void 0 : _d.buttonTextColor) || '#ffffff',
                                buttonVariant: ((_e = data.style) === null || _e === void 0 ? void 0 : _e.buttonVariant) || 'default',
                                buttonRounded: ((_f = data.style) === null || _f === void 0 ? void 0 : _f.buttonRounded) || 'md',
                                formLayout: ((_g = data.style) === null || _g === void 0 ? void 0 : _g.formLayout) || 'stacked',
                                showLabels: (_j = (_h = data.style) === null || _h === void 0 ? void 0 : _h.showLabels) !== null && _j !== void 0 ? _j : true,
                                backgroundColor: ((_k = data.style) === null || _k === void 0 ? void 0 : _k.backgroundColor) || '#ffffff',
                                textColor: ((_l = data.style) === null || _l === void 0 ? void 0 : _l.textColor) || '#1f2937',
                                fontFamily: ((_m = data.style) === null || _m === void 0 ? void 0 : _m.fontFamily) || 'sans',
                                boxShadow: ((_o = data.style) === null || _o === void 0 ? void 0 : _o.boxShadow) || 'md',
                                padding: ((_p = data.style) === null || _p === void 0 ? void 0 : _p.padding) || '6',
                                borderRadius: ((_q = data.style) === null || _q === void 0 ? void 0 : _q.borderRadius) || 'md',
                            },
                            settings: {
                                confirmationType: ((_r = data.settings) === null || _r === void 0 ? void 0 : _r.confirmationType) || 'message',
                                confirmationMessage: ((_s = data.settings) === null || _s === void 0 ? void 0 : _s.confirmationMessage) || 'Thanks for joining the waitlist!',
                                redirectUrl: ((_t = data.settings) === null || _t === void 0 ? void 0 : _t.redirectUrl) || '',
                                requireEmailVerification: ((_u = data.settings) === null || _u === void 0 ? void 0 : _u.requireEmailVerification) || false,
                                enableReferrals: ((_v = data.settings) === null || _v === void 0 ? void 0 : _v.enableReferrals) || false,
                                maxReferrals: ((_w = data.settings) === null || _w === void 0 ? void 0 : _w.maxReferrals) || 0,
                            },
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _x.sent();
                        console.error('Error fetching waitlist:', error_1);
                        toast.error('Failed to load waitlist data');
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (waitlistId) {
            fetchWaitlist();
        }
    }, [waitlistId]);
    var handleChange = useCallback(function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === 'checkbox' ? e.target.checked : value, _a)));
        });
    }, []);
    var handleStyleChange = useCallback(function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { style: __assign(__assign({}, prev.style), (_a = {}, _a[name] = value, _a)) }));
        });
    }, []);
    var handleSettingsChange = useCallback(function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), { settings: __assign(__assign({}, prev.settings), (_a = {}, _a[name] = value, _a)) }));
        });
    }, []);
    var addCustomField = useCallback(function (field) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: __spreadArray(__spreadArray([], prev.customFields, true), [
                __assign(__assign({}, field), { id: "field-".concat(Date.now()) }),
            ], false) })); });
    }, []);
    var updateCustomField = useCallback(function (id, updates) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.map(function (field) {
                return field.id === id ? __assign(__assign({}, field), updates) : field;
            }) })); });
    }, []);
    var removeCustomField = useCallback(function (id) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { customFields: prev.customFields.filter(function (field) { return field.id !== id; }) })); });
    }, []);
    var reorderCustomFields = useCallback(function (dragIndex, dropIndex) {
        setFormData(function (prev) {
            var newFields = __spreadArray([], prev.customFields, true);
            var removed = newFields.splice(dragIndex, 1)[0];
            newFields.splice(dropIndex, 0, removed);
            return __assign(__assign({}, prev), { customFields: newFields });
        });
    }, []);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSaving(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch("/api/waitlists/".concat(waitlistId), {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update waitlist');
                    }
                    toast.success('Waitlist updated successfully!');
                    router.push("/dashboard/waitlists/".concat(waitlistId));
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error updating waitlist:', error_2);
                    toast.error(error_2 instanceof Error ? error_2.message : 'Failed to update waitlist');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getBorderRadius = function (size) {
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
        return (<div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500"/>
      </div>);
    }
    return (<DashboardPage title="Edit Waitlist" description="Update your waitlist settings and appearance" actions={<div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={function () { return setShowPreview(true); }} type="button">
            Preview
          </Button>
          <Button size="sm" type="submit" form="waitlist-form" disabled={isSaving}>
            {isSaving ? (<>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Saving...
              </>) : ('Save Changes')}
          </Button>
        </div>}>
      <form id="waitlist-form" onSubmit={handleSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={function (v) { return setActiveTab(v); }}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
            <TabsTrigger id="appearance-tab" value="appearance">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic">
              <BasicInfoSection formData={formData} onChange={handleChange}/>
            </TabsContent>

            <TabsContent value="fields">
              <CustomFieldsSection formData={formData} onAddField={addCustomField} onUpdateField={updateCustomField} onRemoveField={removeCustomField} onReorderFields={reorderCustomFields}/>
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSection formData={formData} onStyleChange={handleStyleChange} getBorderRadius={getBorderRadius}/>
            </TabsContent>

            <TabsContent value="behavior">
              <BehaviorSection formData={formData} onSettingsChange={handleSettingsChange}/>
            </TabsContent>
          </div>
        </Tabs>
      </form>

      {/* Preview Modal */}
      {showPreview && (<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Waitlist Preview</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={function () { return setShowPreview(false); }} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  Close
                </Button>
                <Button variant="default" size="sm" onClick={function () {
                // Scroll to the appearance tab when clicking "Customize"
                setActiveTab('appearance');
                setShowPreview(false);
                // Small delay to ensure tab is active before scrolling
                setTimeout(function () {
                    var _a;
                    (_a = document
                        .getElementById('appearance-tab')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }}>
                  Customize
                </Button>
              </div>
            </div>
            <div className="p-8 overflow-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <WaitlistPreview formData={formData}/>
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
        </div>)}
    </DashboardPage>);
}
//# sourceMappingURL=page.jsx.map