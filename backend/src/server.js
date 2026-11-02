import 'dotenv/config';
import app, { getAllowedOrigins } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start Express server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`=================================`);
      console.log(`🚀 Sunny Solar Backend Server`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
      console.log(`📝 Blogs API: http://localhost:${PORT}/api/blogs`);
      console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Allowed CORS Origins: ${getAllowedOrigins().join(', ')}`);
      console.log(`=================================`);
    });
  } catch (error) {
    console.error(`Failed to start server:`, error.message);
    process.exit(1);
  }
};

startServer();
