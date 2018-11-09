const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('../routers/projectRouter.js');
const actionRouter = require('../routers/actionRouter.js');

module.exports = server => {
  
  server.use(express.json()); 
  server.use(helmet()); 
  server.use(morgan('short'));

  server.use('/api/projects', projectRouter);
  server.use('/api/actions', actionRouter);
};