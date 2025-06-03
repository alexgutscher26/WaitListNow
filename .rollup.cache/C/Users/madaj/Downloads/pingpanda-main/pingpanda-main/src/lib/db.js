var _a;
import { PrismaClient } from '@prisma/client';
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
var globalForPrisma = globalThis;
var prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
export var db = prisma;
// For Edge Runtime support
// Note: Prisma doesn't officially support Edge Runtime yet
// Consider using API routes with Node.js runtime for database operations
//# sourceMappingURL=db.js.map