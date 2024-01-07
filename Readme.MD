# Authentication API with NodeJS

This project is an authentication API built using Node.js, Express, and Redis. It incorporates session handling, rate limiting, account lockout, and logging to enhance security.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Security Measures](#security-measures)
- [Logging](#logging)

## Features

- **Express Session:** Handles user authentication and stores session data in a Redis database.
- **Rate Limiting:** Protects against brute force attacks by limiting the number of requests from a single IP.
- **Account Lockout:** Temporarily locks user accounts after a specified number of failed login attempts.
- **Logging:** Records security events and errors to a log file for analysis.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Redis](https://redis.io/) server running to store session data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Meeraswamy/authAPI.git
   cd authAPI 
   ```

## Configuration
1. Create a config.js file in the project root directory and Update the file according to your environment.

     ```javascript
      // config.js
      module.exports  = {
      session: {
      secret:  'your_session_secret',
      resave:  false,
      saveUninitialized:  true,
      cookie: { secure:  false }, // Set to true if you are using HTTPS
      },
     mongodb: {
     uri:  'your_mongodb_uri',
     },
     env: {
      port: 3000,
    },
    };
   ```
2. Make sure to replace `'your_session_secret'` and other values with your specific configuration.
## Usage
 - Start the server
 
   ```bash
   node index.js
   ```    
 -  Your authentication API is now running at `http://localhost:3000` (or another specified port).
 
 ## Endpoints
 - **Register:**
   - ` POST /register`
- **Login:**
   -  `POST /login`
- **Logout:**
   - `GET /logout`
- **Additional endpoints as needed.**

## Security Measures
### Express Session
- Sessions are stored securely in a Redis database.
- Note: Make sure to follow cookie security practices by setting flags such as `secure`,`httpOnly` ,`sameSite` and optionally specifying `domain` and `path`.

### Rate Limiting
- Rate limiting is implemented to prevent brute force attacks.
- Configurable thresholds to adjust the level of protection.

### Account Lockout
- Temporary lockout of user accounts after a specified number of failed login attempts.
- Enhances security by preventing continuous login attempts.

## Logging
- Security events and errors are logged to a designated log file.
- Logging provides a trail for analyzing security incidents.
