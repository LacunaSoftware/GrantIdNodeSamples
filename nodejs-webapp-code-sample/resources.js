const express = require('express');
const openId = require('./auth');

const router = express.Router();

router.get('/authorize', openId.openIdClient.authorize())

router.get('/logout', openId.openIdClient.unauthorized({ redirectTo: '/authorize'}), openId.openIdClient.deauthorize());

router.get('/login', openId.openIdClient.redirect(), (req, res, next) => {
    // Implement you own redirection logic here.
    const key = Object.keys(req.session)[1];
    const httpsUrl = Object.keys(req.session[key].resources)[0];
    const httpUrl = httpsUrl.replace('https', 'http');
    
    res.redirect(httpUrl);
});

router.get('/', (req, res, next) => {
    const tokenProvider = openId.openIdClient.getAuthorization({req});

    model = {
        title: "Home",
        userAuthenticated: tokenProvider.tokenSet !== undefined
    };
    res.render("index", model);
});

router.get('/Home/PrivateRoute', openId.openIdClient.unauthorized({ redirectTo: '/authorize'}), (req, res, next) => {
    const tokenProvider = openId.openIdClient.getAuthorization({req});
    const claims = openId.openIdClient.getClaims({ tokenSet: tokenProvider.tokenSet });
    model = {
        title: "Home",
        claims: claims,
        access_token: tokenProvider.tokenSet.access_token,
        id_token: tokenProvider.tokenSet.id_token,
        userAuthenticated: tokenProvider.tokenSet !== undefined
    };
    res.render("privateRoute", model);
});

router.get('/Home/Privacy',  (req, res, next) => {
    const tokenProvider = openId.openIdClient.getAuthorization({req});

    model = {
        title: "Privacy",
        userAuthenticated: tokenProvider.tokenSet !== undefined
    };
    res.render("privacy", model);
});

module.exports = router;