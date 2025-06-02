import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { z } from 'zod';
var emailSettingsSchema = z.object({
    customFields: z.object({
        sendConfirmationEmail: z.boolean().optional(),
        customThankYouMessage: z.string().optional(),
    }),
});
export function PATCH(req_1, _a) {
    return __awaiter(this, arguments, void 0, function (req, _b) {
        var userId, waitlistId, body, validation, customFields, user, currentWaitlist, updatedCustomFields, updatedWaitlist, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    userId = getAuth(req).userId;
                    if (!userId) {
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    waitlistId = params.id;
                    return [4 /*yield*/, req.json()];
                case 1:
                    body = _c.sent();
                    validation = emailSettingsSchema.safeParse(body);
                    if (!validation.success) {
                        return [2 /*return*/, new NextResponse(JSON.stringify({ error: 'Invalid request data', details: validation.error }), { status: 400, headers: { 'Content-Type': 'application/json' } })];
                    }
                    customFields = validation.data.customFields;
                    return [4 /*yield*/, db.user.findUnique({
                            where: { externalId: userId },
                        })];
                case 2:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, new NextResponse('User not found', { status: 404 })];
                    }
                    return [4 /*yield*/, db.waitlist.findUnique({
                            where: { id: waitlistId },
                        })];
                case 3:
                    currentWaitlist = _c.sent();
                    if (!currentWaitlist) {
                        return [2 /*return*/, new NextResponse('Waitlist not found', { status: 404 })];
                    }
                    updatedCustomFields = __assign(__assign({}, (currentWaitlist.customFields || {})), customFields);
                    return [4 /*yield*/, db.waitlist.update({
                            where: {
                                id: waitlistId,
                                userId: user.id, // Ensure the waitlist belongs to the user
                            },
                            data: {
                                customFields: updatedCustomFields,
                            },
                        })];
                case 4:
                    updatedWaitlist = _c.sent();
                    return [2 /*return*/, NextResponse.json(updatedWaitlist)];
                case 5:
                    error_1 = _c.sent();
                    console.error('[WAITLIST_EMAIL_SETTINGS_UPDATE]', error_1);
                    return [2 /*return*/, new NextResponse(JSON.stringify({
                            error: 'Internal server error',
                            details: process.env.NODE_ENV === 'development' ? String(error_1) : undefined,
                        }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' },
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map