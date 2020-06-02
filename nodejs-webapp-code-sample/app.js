const express = require('express');
const path = require('path');
var session = require('express-session')
var flash = require('connect-flash')

const app = express()

const resourceRoutes = require('./resources');

app.use(session({
    secret: 'sad-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000
    }
}));

app.use('/', resourceRoutes);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(flash())

module.exports = app;