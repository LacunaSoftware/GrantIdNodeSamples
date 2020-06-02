const express = require('express');
const jose = require('jose');
const { Issuer } = require('openid-client');

const auth = require('./auth');
const config = require('./config');

auth.init(Issuer, config.openIdConfig, jose);

const router = express.Router();

router.get('/home', (req, res, next) => {
    res.status(200).json({
        message: "Home"
    });
});

router.get('/secret', auth.checkToken, (req, res, next) => {
    res.status(200).json({
        message: "Secret"
    });
});

router.get('/claims', auth.checkToken,  (req, res, next) => {
    res.json(req.decoded);
});

module.exports = router;