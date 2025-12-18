import { connectDB, disconnectDB } from './src/db/db.js';
import app from './src/app.js';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// Server error handler | Graceful shutdown

process.on('unhandledRejection', (error) => {
  console.error("Unhandled Rejection", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('uncaughtException', async (error) => {
  console.error("Uncaught Exception", error);
  await disconnectDB();
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});