import { __awaiter, __generator } from "tslib";
import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { WaitlistWidget } from '@/components/waitlist-widget';
export default function WaitlistPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var waitlist, style, settings, showBranding, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                slug: params.slug,
                            },
                            include: {
                                _count: {
                                    select: {
                                        subscribers: true,
                                    },
                                },
                            },
                        })];
                case 1:
                    waitlist = _c.sent();
                    // console.log('Found waitlist (any status):', waitlist);
                    if (!waitlist) {
                        // console.log('Waitlist not found, showing ended message for slug:', params.slug);
                        return [2 /*return*/, (<div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Waitlist Ended</h1>
              <p className="text-muted-foreground">
                This waitlist is no longer active or has ended.
              </p>
              <p className="text-sm text-muted-foreground">
                If you believe this is a mistake, please contact the waitlist owner.
              </p>
            </div>
          </div>
        </div>)];
                    }
                    if (waitlist.status !== 'ACTIVE') {
                        // Don't log an error since we're handling this case gracefully
                        // console.log(`Waitlist found with status: ${waitlist.status}. Showing appropriate message.`);
                        return [2 /*return*/, (<div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{waitlist.name}</h1>
              <p className="text-muted-foreground">
                This waitlist is currently {waitlist.status.toLowerCase()}.
              </p>
              {waitlist.status === 'DRAFT' && (<p className="text-sm text-muted-foreground">
                  The owner of this waitlist needs to publish it before it can be accessed.
                </p>)}
              {waitlist.status === 'PAUSED' && (<p className="text-sm text-muted-foreground">
                  This waitlist is currently paused. Please check back later.
                </p>)}
              {waitlist.status === 'ARCHIVED' && (<p className="text-sm text-muted-foreground">
                  This waitlist has been archived and is no longer accepting new signups.
                </p>)}
            </div>
          </div>
        </div>)];
                    }
                    style = waitlist.style && typeof waitlist.style === 'object' && !Array.isArray(waitlist.style)
                        ? waitlist.style
                        : {};
                    settings = waitlist.settings &&
                        typeof waitlist.settings === 'object' &&
                        !Array.isArray(waitlist.settings)
                        ? waitlist.settings
                        : {};
                    showBranding = style.showBranding !== false;
                    return [2 /*return*/, (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
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
          <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <div className="px-12 py-16 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {waitlist.name || 'Join the Waitlist'}
              </h1>

              {waitlist.description ? (<p className="text-gray-600 text-lg mb-12 leading-relaxed font-normal">
                  {waitlist.description}
                </p>) : (<p className="text-gray-600 text-lg mb-12 leading-relaxed font-normal">
                  Be the first to know when we launch. Early adopters get exclusive perks!
                </p>)}

              <WaitlistWidget waitlistId={waitlist.id} style={{
                                buttonText: style.buttonText,
                                buttonColor: style.buttonColor,
                                buttonTextColor: style.buttonTextColor,
                                backgroundColor: style.backgroundColor,
                                textColor: style.textColor,
                                borderRadius: style.borderRadius,
                                fontFamily: style.fontFamily,
                                showLabels: style.showLabels,
                                formLayout: style.formLayout,
                            }}/>

              <p className="text-gray-500 text-base font-normal mb-6">
                Join{' '}
                {waitlist.subscriberCount > 0
                                ? waitlist.subscriberCount.toLocaleString()
                                : '1,247'}{' '}
                others on the waitlist
              </p>

              {/* Powered by WaitlistNow badge - can be hidden after payment */}
              {showBranding && (<div className="mt-8 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
                    <span>Powered by</span>
                    <a href="https://waitlistnow.com" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-500 hover:text-gray-700 transition-colors">
                      WaitlistNow
                    </a>
                    <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                      PRO
                    </span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>)];
                case 2:
                    error_1 = _c.sent();
                    console.error('Error fetching waitlist:', error_1);
                    notFound();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export function generateMetadata(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var waitlist, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db.waitlist.findUnique({
                            where: {
                                slug: params.slug,
                            },
                        })];
                case 1:
                    waitlist = _c.sent();
                    if (!waitlist) {
                        return [2 /*return*/, {
                                title: 'Waitlist Not Found',
                                description: 'The requested waitlist could not be found.',
                            }];
                    }
                    return [2 /*return*/, {
                            title: waitlist.name,
                            description: waitlist.description || "Join the waitlist for ".concat(waitlist.name),
                        }];
                case 2:
                    error_2 = _c.sent();
                    console.error('Error generating metadata:', error_2);
                    return [2 /*return*/, {
                            title: 'Waitlist',
                            description: 'Join our waitlist to be the first to know when we launch.',
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=page.jsx.map