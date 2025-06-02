import { __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { format } from 'date-fns';
/**
 * Export user waitlists with subscribers in CSV format.
 *
 * This function handles the export of waitlist data including subscriber information
 * to a CSV file. It fetches the waitlists associated with the authenticated user,
 * processes the data into CSV format, and returns it as a downloadable response.
 *
 * @returns A NextResponse object containing the CSV file or an error message.
 */
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var authResponse, userId, waitlists, csvContent_1, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth()];
                case 1:
                    authResponse = _a.sent();
                    userId = authResponse.userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
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
                        return [2 /*return*/, new NextResponse('No waitlists found', { status: 404 })];
                    }
                    csvContent_1 = 'Waitlist Name,Subscriber Email,Status,Signup Date,Last Updated,Referral Code,Referred By\n';
                    waitlists.forEach(function (waitlist) {
                        if (waitlist.subscribers && waitlist.subscribers.length > 0) {
                            waitlist.subscribers.forEach(function (subscriber) {
                                csvContent_1 += "\"".concat(waitlist.name.replace(/"/g, '""'), "\",");
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
                            csvContent_1 += "\"".concat(waitlist.name.replace(/"/g, '""'), "\",,,,,,\n");
                        }
                    });
                    response = new NextResponse(csvContent_1);
                    // Set headers for file download
                    response.headers.set('Content-Type', 'text/csv');
                    response.headers.set('Content-Disposition', "attachment; filename=waitlist-export-".concat(format(new Date(), 'yyyy-MM-dd'), ".csv"));
                    return [2 /*return*/, response];
                case 3:
                    error_1 = _a.sent();
                    console.error('Export error:', error_1);
                    return [2 /*return*/, new NextResponse('Internal Server Error', { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map