# Authentication API with NodeJS

This project is an Authentication system built using Node.js, Express, and Redis along with a frontend user interface developed using React, Tailwind CSS, Axios, and React Router. It incorporates session handling, rate limiting, account lockout, and logging to enhance security.

## Table of Contents
- [Overview](#Overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Security Measures](#security-measures)
- [Logging](#logging)

## Overview

This project is built using React, Tailwind CSS, Axios, React Router, Express, Redis, Rate Limiter, and Logging functionalities. It provides a secure and user-friendly system for user registration, login, and authentication.

## Features

- **Express Session:** Handles user authentication and stores session data in a Redis database.
- **Rate Limiting:** Protects against brute force attacks by limiting the number of requests from a single IP.
- **Account Lockout:** Temporarily locks user accounts after a specified number of failed login attempts.
- **Logging:** Records security events and errors to a log file for analysis.
- **React UI:** Provides an intuitive and interactive interface for users to interact with the authentication system.


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
      secret:  'your_session_secret', // replace it with your session secret
      resave:  false,
      saveUninitialized:  true,
      cookie: { secure:  false, maxAge:60000, httpOnly:false, sameSite:'none'}, // Set secure to true if you are using HTTPS and maxAge of your choice.
      },
     mongodb: {
     uri:  'your_mongodb_uri',
     },
     env: {
      port: 3000,
    },
    corsConfig:{
    origin:'your client address',
    credentials:true,
    methods:["GET","POST"], // allowed methods
    allowedHeaders: ['Content-Type'], // allowed headers
   }
    };
   ```
2. create a .env file in the client root directory and update the file according to your server URL
     ```bash
   SERVER_URL= your server URL 
   ```

## Usage
 - Start the server
 
   ```bash
   node index.js
   ```    
 - Start the client

   ``` bash
   npm run dev
   ```

 -  Your authentication API is now running at `http://localhost:3000` (or another specified port) and the client app is now running at `http://localhost:5173`.
 
## Endpoints
- **Register:**
   - ` POST /register`
- **Login:**
   -  `POST /login`
- **Logout:**
   - `GET /logout`
- **Additional endpoints as needed.**

## React Components
- **Home:** Home page component.
- **Register:** Register component implements a registration form where users can sign up for new accounts. Upon submission it sends a POST request to the `\register` endpoint of the API and receives the session cookie and user details which will be stored in local storage of the Browser.
- **Login:** Login component implements login form for users to sing in to their accounts. Upon submission it sends a POST request to the `\login` endpoint of the API and receives the session cookie and user details which will be stored in local storage of the Browser.
- **Dashboard:** Simple component that says Hello to the authenticated users. It is only accessible after successful login into the user account. It has a button logout which calls the `\logout` endpoint of the API to logout and destroy the user session.

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
