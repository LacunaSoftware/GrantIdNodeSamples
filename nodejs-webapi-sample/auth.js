let _openIdConfig = null;
let _keyStore = null;
let _jose = null;

init = async (Issuer, openIdConfig, jose) => {
    _openIdConfig = openIdConfig;
    _jose = jose;

    const issuer = await Issuer.discover(openIdConfig.issuer);
    issuer.keystore().then(function(keyStore) { 
        _keyStore = keyStore 
    });
}

accessDeniedResponse = (res, code, message) => {
    return res.status(code).json({
        success: false,
        message: message
    });
}

checkToken = (req, res, next) => {
    try {
        let authorizationHeader = req.headers['authorization'];

        let token = null;
        if (authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.slice(7, authorizationHeader.length);
        }
        
        _jose.JWT.verify(token, _keyStore, { 
            issuer: _openIdConfig.issuer_url,
        });

        decoded = _jose.JWT.decode(token);
        if (!decoded.scope.includes(_openIdConfig.api_scope)) {
            return accessDeniedResponse(res, 401, 'Unauthorized user.');
        }

        req.decoded = decoded;        
        next();
    }
    catch (exception) {
        return accessDeniedResponse(res, 401, 'Unauthorized user.');
    }
}

module.exports = {
    init: init,
    checkToken: checkToken,
}