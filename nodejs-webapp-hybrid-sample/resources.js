const jose = require('jose');
const express = require('express');
const { Issuer, custom, generators } = require('openid-client');

const auth = require('./auth');
const config = require('./config');

const router = express.Router();

auth.init(config.openIdConfig, { Issuer, custom, generators}, jose);

router.get('/authorize', auth.authorize);

router.get('/logout', auth.unauthorized({ redirectTo: '/authorize' }), auth.deauthorize);

router.post('/login', auth.redirect, (req, res, next) => {
    res.redirect('/Home/PrivateRoute');
});

router.get('/', (req, res, next) => {
    model = {
        title: "Home",
        userAuthenticated: auth.userAuthenticated(req)
    };
    res.render("index", model);
});

router.get('/Home/PrivateRoute', auth.unauthorized({ redirectTo: '/authorize'}) , (req, res, next) => {
    const authentication = auth.getAuthentication(req);

    model = {
        title: "Home",
        claims: auth.getClaims(req),
        access_token: authentication.tokenSet.access_token,
        id_token: authentication.tokenSet.id_token,
        userAuthenticated: auth.userAuthenticated(req)
    };
    res.render("privateRoute", model);
});

router.get('/Home/Privacy',  (req, res, next) => {
    model = {
        title: "Privacy",
        userAuthenticated: auth.userAuthenticated(req)
    };
    res.render("privacy", model);
});

module.exports = router;