// services/logger.js

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // remove this property if you dont want to log to the console
    new winston.transports.File({ filename: 'combined.log' }), // specify file to save logs
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

module.exports = logger;
