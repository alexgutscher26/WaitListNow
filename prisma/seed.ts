import { PrismaClient, Plan } from '@prisma/client';

console.log('🌱 Starting database seeding...');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to test the database connection
async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing users
  console.log('🧹 Clearing existing users...');
  await prisma.user.deleteMany();

  // Create a test user
  console.log('👤 Creating test user...');
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      externalId: 'test_external_id',
      plan: Plan.PRO,
      quotaLimit: 1000,
      apiKey: 'test_api_key_123',
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log(`🔑 Test user email: ${user.email}`);
  console.log(`🔑 Test API key: ${user.apiKey}`);
}

// Execute the main function
main()
  .then(async () => {
    console.log('✅ Seeding completed successfully!');
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
