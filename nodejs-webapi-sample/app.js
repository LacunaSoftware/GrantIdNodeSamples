const express = require('express');

const app = express()

const resourceRoutes = require('./resources');

app.use('/', resourceRoutes);

module.exports = app;