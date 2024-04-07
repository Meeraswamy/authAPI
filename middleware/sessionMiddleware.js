// middleware/sessionMiddleware.js

const session = require('express-session');
const config = require('../config');
const {store} = require('../services/redisService')

const sessionMiddleware = session({
    name : config.session.name,
    store: store,
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie,
  })

module.exports = sessionMiddleware;