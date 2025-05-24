import { PrismaClient } from '@prisma/client';

console.log('🔍 Checking database content...');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

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
