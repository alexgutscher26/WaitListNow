import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var envInfo, dbInfo, waitlists, totalWaitlists, totalSubscribers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    envInfo = {
                        nodeEnv: process.env.NODE_ENV,
                        databaseUrl: process.env.DATABASE_URL ? '***' : 'Not set',
                        appEnv: process.env.APP_ENV,
                    };
                    return [4 /*yield*/, db.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT current_database(), current_user, version()"], ["SELECT current_database(), current_user, version()"])))];
                case 1:
                    dbInfo = _a.sent();
                    return [4 /*yield*/, db.waitlist.findMany({
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                status: true,
                                createdAt: true,
                                updatedAt: true,
                                userId: true,
                                _count: {
                                    select: {
                                        subscribers: true,
                                    },
                                },
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                        })];
                case 2:
                    waitlists = _a.sent();
                    return [4 /*yield*/, db.waitlist.count()];
                case 3:
                    totalWaitlists = _a.sent();
                    return [4 /*yield*/, db.subscriber.count()];
                case 4:
                    totalSubscribers = _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            meta: {
                                timestamp: new Date().toISOString(),
                                environment: envInfo,
                                database: dbInfo,
                                counts: {
                                    waitlists: totalWaitlists,
                                    subscribers: totalSubscribers,
                                },
                            },
                            waitlists: waitlists,
                        })];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error in debug endpoint:', error_1);
                    return [2 /*return*/, NextResponse.json({
                            error: 'Debug endpoint error',
                            message: error_1 instanceof Error ? error_1.message : 'Unknown error',
                            stack: process.env.NODE_ENV === 'development' && error_1 instanceof Error
                                ? error_1.stack
                                : undefined,
                        }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;
//# sourceMappingURL=route.js.map