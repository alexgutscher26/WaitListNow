import { __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
// Define validation schema
var submissionSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().optional(),
    fields: z.record(z.any()).optional(),
    referralCode: z.string().optional(),
});
export function POST(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var waitlist, body, validation, _c, email, name_1, fields, referralCode, existingSubscriber, subscriber, headers, error_1;
        var params = _b.params;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    // Handle CORS preflight
                    if (request.method === 'OPTIONS') {
                        return [2 /*return*/, new Response(null, {
                                status: 204,
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                                    'Access-Control-Allow-Headers': 'Content-Type',
                                },
                            })];
                    }
                    return [4 /*yield*/, db.waitlist.findUnique({
                            where: { id: params.id },
                            select: {
                                id: true,
                                settings: true,
                                requireEmailVerification: true,
                            },
                        })];
                case 1:
                    waitlist = _d.sent();
                    if (!waitlist) {
                        return [2 /*return*/, NextResponse.json({ error: 'Waitlist not found' }, { status: 404 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _d.sent();
                    validation = submissionSchema.safeParse(body);
                    if (!validation.success) {
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid submission', details: validation.error.issues }, { status: 400 })];
                    }
                    _c = validation.data, email = _c.email, name_1 = _c.name, fields = _c.fields, referralCode = _c.referralCode;
                    return [4 /*yield*/, db.subscriber.findFirst({
                            where: {
                                email: email,
                                waitlistId: waitlist.id,
                            },
                        })];
                case 3:
                    existingSubscriber = _d.sent();
                    if (existingSubscriber) {
                        return [2 /*return*/, NextResponse.json({ error: 'You are already on the waitlist!' }, { status: 400 })];
                    }
                    return [4 /*yield*/, db.subscriber.create({
                            data: {
                                id: uuidv4(),
                                email: email,
                                name: name_1 || null,
                                waitlistId: waitlist.id,
                                fields: fields || {},
                                referralCode: referralCode || null,
                                isVerified: !waitlist.requireEmailVerification,
                            },
                        })];
                case 4:
                    subscriber = _d.sent();
                    headers = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    };
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Successfully joined the waitlist!',
                            requiresVerification: waitlist.requireEmailVerification
                        }, { headers: headers })];
                case 5:
                    error_1 = _d.sent();
                    console.error('Error processing submission:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Internal server error' }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function OPTIONS() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Response(null, {
                    status: 204,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    },
                })];
        });
    });
}
//# sourceMappingURL=route.js.map