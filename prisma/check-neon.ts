import { PrismaClient } from '@prisma/client';

console.log('🔍 Checking NeonDB data...');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function checkNeonData() {
  try {
    console.log('\n🔎 Querying users from NeonDB...');
    const users = await prisma.$queryRaw`SELECT * FROM "User"`;
    console.log('Users in NeonDB:', users);
  } catch (error) {
    console.error('Error querying NeonDB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNeonData();
