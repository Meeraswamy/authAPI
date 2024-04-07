// middleware/rateLimitMiddleware.js

const rateLimit = require('express-rate-limit');
const maxFailedAttempts = 3; // Set the maximum number of allowed failed attempts.
const lockoutDuration = 60 * 60; // Set the account lockout duration in seconds.

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max:10, // Set maximum number of requests per windowMs.
    message: 'Too many requests from this IP, please try again later.',
  });
  
module.exports = {limiter,maxFailedAttempts,lockoutDuration};
