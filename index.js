// index.js

const express = require('express');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const logger  = require('./services/logger')
const config = require('./config');
const authRoutes = require('./routes/auth');
const cors = require('cors')

const app = express();

mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(expressWinston.logger({
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
}));    // This middleware logs all HTTP requests.

app.use(cors(config.corsConfig));
app.options('*',cors(config.corsConfig));

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({message:"This is home"});
});

app.use(expressWinston.errorLogger({
  winstonInstance: logger,
  msg: 'HTTP {{req.method}} {{req.url}} {{err.message}}',
})); // This middleware logs errors.


const PORT = config.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
