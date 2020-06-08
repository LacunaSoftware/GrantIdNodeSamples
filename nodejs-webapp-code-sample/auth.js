const openIdClientHelper = require('openid-client-helper')

const openIdClientHelperParams = {
    issuerMetadata: {
        issuer: 'https://lacuna-dev.grantid.com',
    },
    clientMetadata: {
        client_id: 'code-mvc-sample',
        client_secret: 'RYeohy2aoKyTBEWsH3rIpnhoUM+qhiRqEqLl8XkCAik=',
        token_endpoint_auth_method: 'client_secret_post',
        redirect_uri: 'http://localhost:8091/login',
        post_logout_redirect_uri: 'http://localhost:8091/'
    },
    resources: {
        'https://localhost:8091/Home/PrivateRoute': {
            scope: 'openid profile sample-api'
        }
    },
    customize: ({custom, client}) => {
        if (client) {
            client[custom.clock_tolerance] = 50
        }
    }
}

module.exports = {
    openIdClient: openIdClientHelper(openIdClientHelperParams)
}