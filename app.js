const mongoose = require('mongoose');

// Lấy thông tin từ môi trường
const dbUser = process.env.MONGODB_USERNAME || 'supplychain'; // Username
const dbPassword = process.env.MONGODB_PASSWORD || 'your_password'; // Password
const dbName = 'supplychain'; // Tên database
const mongoUri = `mongodb://${dbUser}:${dbPassword}@mongodb:27017/${dbName}?authSource=admin`;

// Kết nối đến MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Kết nối đến MongoDB thành công');
  })
  .catch(err => {
    console.error('Lỗi khi kết nối đến MongoDB:', err);
  });
