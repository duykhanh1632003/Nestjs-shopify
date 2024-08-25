export const Configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: process.env.MONGO_URI,
  keyJson: process.env.JWT_SECRET,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379', // Đường dẫn tới Redis
});
