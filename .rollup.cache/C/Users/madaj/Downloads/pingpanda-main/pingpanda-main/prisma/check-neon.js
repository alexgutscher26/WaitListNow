import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { PrismaClient } from '@prisma/client';
// console.log('🔍 Checking NeonDB data...');
var prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
/**
 * Asynchronously queries users from the NeonDB database and logs the results.
 *
 * This function fetches all records from the "User" table in the NeonDB database using Prisma's `$queryRaw` method.
 * It handles both successful data retrieval and potential errors during the query, logging appropriate messages to the console.
 * Finally, it ensures that the Prisma client is disconnected regardless of the operation's success or failure.
 */
function checkNeonData() {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM \"User\""], ["SELECT * FROM \"User\""])))];
                case 1:
                    users = _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error querying NeonDB:', error_1);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
checkNeonData();
var templateObject_1;
//# sourceMappingURL=check-neon.js.map