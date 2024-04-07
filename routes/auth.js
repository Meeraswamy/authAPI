// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const {redisClient} = require('../services/redisService')
const logger = require('../services/logger')
const {limiter,maxFailedAttempts,lockoutDuration} = require('../middleware/rateLimitMiddleware')
const sessionMiddleware = require('../middleware/sessionMiddleware')



router.post('/register',sessionMiddleware, async (req, res) => {
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
    req.session.cookie.expires = 60 * 60 * 1000; // set cookie expiration time
    return res.status(200).json({ message: 'Registration successful', username });
  } catch (error) {
    logger.error('Error during registration:', error);
    return res.status(500).json({ message: 'Registration failed. Please try again later.',error: error.message });
  }
});

router.post('/login', limiter, sessionMiddleware, async (req, res) => {
  const { email, password,ip } = req.body; // Can use email or username to authenticate.
  
  try {
    // Check if the account is locked due to too many failed attempts.
    const attempts = parseInt(await redisClient.get(email), 10) || 0;

    if (attempts >= maxFailedAttempts) {
      logger.warn(`Account ${email} is locked from IP ${ip} due to multiple failed login attempts.`);
      return res.status(401).json({message:'Your Account is locked due to multiple failed login attempts. Please try after 1 hour'});
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.authUser = { username: user.username };
      req.session.cookie.expires = 60 * 60 * 1000;
      await redisClient.del(email); 
      return res.status(200).json({ message: 'Login successful', username: user.username });
    } else {
      await redisClient.set(email, (attempts || 0) + 1, {EX: lockoutDuration});

      logger.error(`Failed login attempt for Account ${email} from IP ${ip}. Remaining attempts: ${maxFailedAttempts - (attempts + 1)}`);
      return res.status(401).json({message:'Invalid credentials.'});
    }
  } catch (error) {
    logger.error('Error during login:', error);
    return res.status(500).json({message:'Internal Server Error',error:error.message});
  }
});

router.get('/logout', async (req, res) => {
  const sessionId = req.headers.cookie; 
  if(!sessionId){
    return res.status(400).json({ success: false, message: 'No session ID found in the cookie' });
  }
  const sessionIdFromCookie = sessionId.split('.')[0].substring(12);
  try{
    await redisClient.del(`sess:${sessionIdFromCookie}`) // delete session from redis
    res.clearCookie('session'); // clear cookie on the browser
    return res.status(200).json({message: 'Logout successful' });

  }
  catch(error){
    logger.error('Error occured during deleting session: ',error)
    return res.status(500).json({message:'Error, Logout Failed.'})
  }
});


module.exports = router;
