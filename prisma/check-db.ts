import { PrismaClient } from '@prisma/client';

console.log('🔍 Checking database content...');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * Asynchronously queries and logs all users from the database.
 * This function uses Prisma's `findMany` method to fetch user records.
 * If successful, it logs the user data; otherwise, it logs any errors encountered.
 * Finally, it ensures that the Prisma client connection is properly disconnected.
 */
async function checkData() {
  try {
    console.log('\n🔎 Querying users...');
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
