import { __awaiter, __generator } from 'tslib';
import { PrismaClient } from '@prisma/client';
// console.log('🔍 Checking database content...');
var prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
/**
 * Asynchronously queries and logs all users from the database.
 *
 * This function uses Prisma's `findMany` method to fetch user records.
 * It handles both successful retrieval of user data and any errors that occur during the query.
 * Finally, it ensures that the Prisma client connection is properly disconnected regardless of the outcome.
 */
function checkData() {
  return __awaiter(this, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, 3, 5]);
          return [4 /*yield*/, prisma.user.findMany()];
        case 1:
          users = _a.sent();
          return [3 /*break*/, 5];
        case 2:
          error_1 = _a.sent();
          console.error('Error querying database:', error_1);
          return [3 /*break*/, 5];
        case 3:
          return [4 /*yield*/, prisma.$disconnect()];
        case 4:
          _a.sent();
          return [7 /*endfinally*/];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
checkData();
//# sourceMappingURL=check-db.js.map
