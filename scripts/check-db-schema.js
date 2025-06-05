import { PrismaClient } from '@prisma/client';

/**
 * Checks and ensures the presence of required columns in the User table within a database.
 *
 * This function first checks if the 'User' table exists. If it does, it then verifies the existence
 * of specific columns, such as 'waitlist_preferences'. If the 'waitlist_preferences' column is missing,
 * the function attempts to add this column with predefined default values. The function handles any errors
 * that occur during these operations and ensures proper disconnection from the database in the `finally` block.
 *
 * @returns void - This function does not return any value.
 */
async function checkSchema() {
  const prisma = new PrismaClient();

  try {
    // Check if User table exists
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'User';
    `;

    if (tables.length === 0) {
      console.log('User table does not exist in the database');
      return;
    }

    console.log('User table exists');

    // Check columns in User table
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'User';
    `;

    console.log('\nColumns in User table:');
    console.table(columns);

    // Check if waitlist_preferences column exists
    const waitlistPrefsColumn = columns.find((col) => col.column_name === 'waitlist_preferences');

    if (waitlistPrefsColumn) {
      console.log('\nwaitlist_preferences column exists:', waitlistPrefsColumn);
    } else {
      console.log('\nwaitlist_preferences column does NOT exist');

      // Try to add the column
      console.log('\nAttempting to add waitlist_preferences column...');
      try {
        await prisma.$executeRaw`
          ALTER TABLE "User"
          ADD COLUMN IF NOT EXISTS waitlist_preferences JSONB 
          DEFAULT '{"defaultWaitlistLimit":1,"autoApproveSubscribers":true,"emailNotifications":true,"maxSubscribers":1000,"requireEmailVerification":false}'::jsonb;
        `;
        console.log('Successfully added waitlist_preferences column');
      } catch (alterError) {
        console.error('Error adding waitlist_preferences column:', alterError);
      }
    }
  } catch (error) {
    console.error('Error checking database schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();
