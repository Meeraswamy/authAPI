// index.js

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const client =  require('./services/redisService')
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const logger  = require('./services/logger')
const config = require('./config');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
}));    // This middleware logs all HTTP requests.

app.use(
  session({
    store: new RedisStore({ client: client }),
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie,
  })
);   // express session middleware.

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send(req.session.authUser ? `Hello, ${req.session.authUser.username}! <a href="/auth/logout">Logout</a>` : 'Home Page');
});

app.use(expressWinston.errorLogger({
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.url}} {{err.message}}',
})); // This middleware logs errors.


const PORT = config.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
