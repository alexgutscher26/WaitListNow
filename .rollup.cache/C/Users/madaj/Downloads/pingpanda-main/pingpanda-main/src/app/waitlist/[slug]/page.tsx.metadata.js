import { __awaiter, __generator } from "tslib";
import { db } from '@/lib/db';
export function generateMetadata(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var waitlist, error_1;
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
                    error_1 = _c.sent();
                    console.error('Error generating metadata:', error_1);
                    return [2 /*return*/, {
                            title: 'Waitlist',
                            description: 'Join our waitlist to be the first to know when we launch.',
                        }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=page.tsx.metadata.js.map