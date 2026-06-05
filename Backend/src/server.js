import app from './app.js';
import { sequelize, initModels } from './models/initModels.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    initModels();
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully');

    app.listen(PORT, '127.0.0.1', () => {
      console.log(`✅ Server is running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();
