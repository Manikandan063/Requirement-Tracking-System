import dotenv from 'dotenv';
import { sequelize, User, initModels } from '../models/initModels.js';
import { hashPassword } from '../shared/auth/bcrypt.js';

dotenv.config();

const seed = async () => {
  try {
    // Initialize associations
    initModels();
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');

    // Sync database
    await sequelize.sync();
    console.log('✅ Database synced successfully');

    // Check if Super Admin exists
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@rts.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log('⚠️ Super Admin already exists');
    } else {
      const password = await hashPassword(process.env.SUPER_ADMIN_PASSWORD || 'Admin@123');
      await User.create({
        name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
        email: adminEmail,
        phoneNumber: process.env.SUPER_ADMIN_PHONE || '9999999999',
        password: password,
        role: 'SUPER_ADMIN',
        isActive: true
      });
      console.log('✅ Super Admin created successfully');
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${process.env.SUPER_ADMIN_PASSWORD || 'Admin@123'}`);
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await sequelize.close();
  }
};

seed();
