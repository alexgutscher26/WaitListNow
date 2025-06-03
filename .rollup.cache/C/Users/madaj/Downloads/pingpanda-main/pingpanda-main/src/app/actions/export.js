'server only';
import { __awaiter, __generator } from "tslib";
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { format } from 'date-fns';
/**
 * Exports user's waitlists with subscribers in CSV format.
 *
 * This function first authenticates the user, retrieves their waitlists along with subscribers,
 * converts the data to CSV format, and returns a Blob URL for download.
 *
 * @returns An ExportResult object containing success status, the Blob URL, filename, or error message.
 * @throws Error If authentication fails, no waitlists are found, or an unexpected error occurs during export.
 */
export function exportWaitlists() {
    return __awaiter(this, void 0, void 0, function () {
        var authResponse, userId, waitlists, csvContent_1, blob, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResponse = _a.sent();
                    userId = authResponse.userId;
                    if (!userId) {
                        throw new Error('Unauthorized');
                    }
                    return [4 /*yield*/, db.waitlist.findMany({
                            where: {
                                user: {
                                    externalId: userId,
                                },
                            },
                            include: {
                                subscribers: {
                                    select: {
                                        email: true,
                                        status: true,
                                        createdAt: true,
                                        updatedAt: true,
                                        referralCode: true,
                                        referredBy: true,
                                    },
                                },
                            },
                        })];
                case 2:
                    waitlists = _a.sent();
                    if (!waitlists || waitlists.length === 0) {
                        throw new Error('No waitlists found');
                    }
                    csvContent_1 = 'Waitlist Name,Subscriber Email,Status,Signup Date,Last Updated,Referral Code,Referred By\n';
                    waitlists.forEach(function (waitlist) {
                        if (waitlist.subscribers && waitlist.subscribers.length > 0) {
                            waitlist.subscribers.forEach(function (subscriber) {
                                csvContent_1 += "\"".concat(waitlist.name, "\",");
                                csvContent_1 += "\"".concat(subscriber.email, "\",");
                                csvContent_1 += "\"".concat(subscriber.status, "\",");
                                csvContent_1 += "\"".concat(format(new Date(subscriber.createdAt), 'yyyy-MM-dd HH:mm:ss'), "\",");
                                csvContent_1 += "\"".concat(subscriber.updatedAt ? format(new Date(subscriber.updatedAt), 'yyyy-MM-dd HH:mm:ss') : '', "\",");
                                csvContent_1 += "\"".concat(subscriber.referralCode || '', "\",");
                                csvContent_1 += "\"".concat(subscriber.referredBy || '', "\"\n");
                            });
                        }
                        else {
                            // Include waitlist even if it has no subscribers
                            csvContent_1 += "\"".concat(waitlist.name, "\",,,,,,\n");
                        }
                    });
                    blob = new Blob([csvContent_1], { type: 'text/csv;charset=utf-8;' });
                    url = URL.createObjectURL(blob);
                    return [2 /*return*/, {
                            success: true,
                            url: url,
                            filename: "waitlist-export-".concat(format(new Date(), 'yyyy-MM-dd'), ".csv"),
                        }];
                case 3:
                    error_1 = _a.sent();
                    console.error('Export failed:', error_1);
                    return [2 /*return*/, {
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : 'Failed to export waitlists',
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=export.js.map