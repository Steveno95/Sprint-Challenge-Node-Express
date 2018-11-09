const express = require('express');

// npm i express helmet morgan
// yarn add express helmet morgan

const configureMiddleware = require('../config/middleware.js');

const server = express();

// configure middleware
configureMiddleware(server);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});


module.exports = server;