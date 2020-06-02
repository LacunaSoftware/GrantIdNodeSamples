let _client = null;
let _openIdConfig = null;
let _jose = null;
let _sessionKey = null;
let _openIdClientLib = null;
let _tokenSetKey = null;

init = async function(openIdConfig, openIdClientLib, jose, sessionKey = 'session', tokenSetKey = 'tokenSet', clock_tolerance = 30) {
    _openIdConfig = openIdConfig;
    _openIdClientLib = openIdClientLib;
    _jose = jose;
    _sessionKey = sessionKey;
    _tokenSetKey = tokenSetKey;

    const issuer = await openIdClientLib.Issuer.discover(openIdConfig.issuer);
    _client = new issuer.Client(
        {
            client_id: openIdConfig.client_id,
            client_secret: openIdConfig.client_secret
        }
    );
    _client[openIdClientLib.custom.clock_tolerance] = clock_tolerance;
};

getAuthentication = function(req) {
    const session = req[_sessionKey];
    if (!session) {
      throw new Error('User session is not found.')
    }

    return session;
};

getClaims = function(req) {
    const authentication = getAuthentication(req);
    return _jose.JWT.decode(authentication.tokenSet.id_token);
}

userAuthenticated = function(req) {
    return getAuthentication(req).tokenSet !== undefined;
}

unauthorized = function({ redirectTo = '/' }) {
    return (req, res, next) => {
        const authentication = getAuthentication(req);
        authentication.tokenSet ? next() : res.redirect(redirectTo);
    }
};

authorize = (req, res, next) => {
    const state = _openIdClientLib.generators.state();
    const nonce = _openIdClientLib.generators.nonce();

    req.session.state = state;
    req.session.nonce = nonce;

    const url = _client.authorizationUrl(
        {
            redirect_uri: _openIdConfig.redirect_uri,
            response_type: _openIdConfig.response_type,
            response_mode: _openIdConfig.response_mode,
            scope: _openIdConfig.scope,
            state: state,
            nonce: nonce 
        }
    );
    res.redirect(url);
    next();
};


redirect = async (req, res, next) => {
    const authentication = getAuthentication(req);

    const options = { 
        state: authentication.state,
        nonce: authentication.nonce,
        response_type: _openIdConfig.response_type
    };

    const params = _client.callbackParams(req);
    const tokenSet = await _client.callback(_openIdConfig.redirect_uri, params, options);

    authentication.tokenSet = tokenSet;
    next();
}


deauthorize = (req, res, next) => {
    const authentication = getAuthentication(req);

    const endSessionUrlParams = {
        post_logout_redirect_uri: _openIdConfig.post_logout_redirect_uri,
        id_token_hint: authentication.tokenSet.id_token
    };
        
    req.session[_tokenSetKey] = undefined;

    const url = _client.endSessionUrl(endSessionUrlParams);
    res.redirect(url);
    next();
}

module.exports = {
    init: init,
    getAuthentication: getAuthentication,
    getClaims: getClaims,
    userAuthenticated: userAuthenticated,
    unauthorized: unauthorized,
    authorize: authorize,
    redirect: redirect,
    deauthorize: deauthorize
}