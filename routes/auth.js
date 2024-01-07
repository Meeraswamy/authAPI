// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const redisService = require('../services/redisService')
const logger = require('../services/logger')
const {limiter,maxFailedAttempts,lockoutDuration} = require('../middleware/rateLimitMiddleware')


router.post('/register', async (req, res) => {
  try {

    const { username, email, password } = req.body;
    // Check if the email is already registered.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.error('The email is already registered.');
      return res.status(409).json({ message: 'The email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database.
    await newUser.save();
    req.session.authUser = { username };
    return res.redirect("/");
  } catch (error) {
    logger.error('Error during registration:', error);
    return res.status(500).json({ message: 'Registration failed. Please try again later.',error: error.message });
  }
});

router.post('/login', limiter, async (req, res) => {
  const { email, password } = req.body; // Can use email or username to authenticate.
  const ip = req.ip;

  try {
    // Check if the account is locked due to too many failed attempts.
    const attempts = parseInt(await redisService.get(ip), 10) || 0;

    if (attempts >= maxFailedAttempts) {
      logger.warn(`Account is locked for IP ${ip} due to multiple failed login attempts.`);
      return res.status(401).send('Your Account is locked due to multiple failed login attempts. Please try after 1 hour');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.authUser = { username: user.username };
      await redisService.del(ip);
      return res.redirect('/');
    } else {
      await redisService.set(ip, (attempts || 0) + 1, 'EX', lockoutDuration / 1000);

      logger.error(`Failed login attempt for IP ${ip}. Remaining attempts: ${maxFailedAttempts - (attempts + 1)}`);
      return res.status(401).send('Invalid credentials.');
    }
  } catch (error) {
    logger.error('Error during login:', error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
