import { PrismaClient } from '@prisma/client';

console.log('🔍 Checking database content...');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * Queries and logs all users from the database.
 * This function attempts to fetch all user records using Prisma's `findMany` method.
 * It logs the users if the query is successful, otherwise logs any errors encountered during the process.
 * Finally, it ensures that the Prisma client connection is disconnected.
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
