import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
// Helper function to convert array of objects to CSV string
function convertToCSV(data) {
    if (data.length === 0)
        return '';
    // Get headers from the first object
    var headers = Object.keys(data[0]);
    // Create CSV header
    var csv = headers.join(',') + '\n';
    // Add rows
    data.forEach(function (row) {
        var values = headers.map(function (header) {
            var _a;
            var value = (_a = row[header]) !== null && _a !== void 0 ? _a : '';
            // Escape quotes and wrap in quotes if contains comma or quote
            var escaped = String(value).replace(/"/g, '""');
            return "\"".concat(escaped, "\"");
        });
        csv += values.join(',') + '\n';
    });
    return csv;
}
export function GET(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, waitlistId, user, waitlist, subscribers, csvData, csv, filename, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    waitlistId = params.id;
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findFirst({
                            where: {
                                id: waitlistId,
                                userId: user.id,
                            },
                        })];
                case 2:
                    waitlist = _c.sent();
                    if (!waitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.subscriber.findMany({
                            where: { waitlistId: waitlistId },
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                createdAt: true,
                                status: true,
                                customFields: true,
                            },
                            orderBy: { createdAt: 'desc' },
                        })];
                case 3:
                    subscribers = _c.sent();
                    csvData = subscribers.map(function (subscriber) { return (__assign({ id: subscriber.id, email: subscriber.email, name: subscriber.name || '', status: subscriber.status, joined_at: subscriber.createdAt.toISOString() }, (subscriber.customFields || {}))); });
                    csv = convertToCSV(csvData);
                    filename = "waitlist-".concat(waitlist.slug, "-subscribers-").concat(new Date().toISOString().split('T')[0], ".csv");
                    // Create response with CSV data
                    return [2 /*return*/, new NextResponse(csv, {
                            status: 200,
                            headers: {
                                'Content-Type': 'text/csv',
                                'Content-Disposition': "attachment; filename=\"".concat(filename, "\""),
                            },
                        })];
                case 4:
                    error_1 = _c.sent();
                    console.error('[WAITLIST_EXPORT_ERROR]', error_1);
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? String(error_1) : undefined,
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map