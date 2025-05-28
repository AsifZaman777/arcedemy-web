const mongoose = require('mongoose');
const config = require('./config');

const dbURL = config.db.url || 'mongodb://localhost:27017/dev_db';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });