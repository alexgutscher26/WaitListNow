import { PrismaClient } from '@prisma/client';

// console.log('🔍 Checking NeonDB data...');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * Asynchronously queries users from the NeonDB database and logs the results.
 *
 * This function fetches all records from the "User" table in the NeonDB database using Prisma's `$queryRaw` method.
 * It logs the fetched user data to the console. If an error occurs during the query, it catches and logs the error.
 * Finally, it ensures that the Prisma client is disconnected regardless of the operation's success or failure.
 */
async function checkNeonData() {
  try {
    // console.log('\n🔎 Querying users from NeonDB...');
    const users = await prisma.$queryRaw`SELECT * FROM "User"`;
    // console.log('Users in NeonDB:', users);
  } catch (error) {
    console.error('Error querying NeonDB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNeonData();
