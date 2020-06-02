const openIdConfig = {
    issuer:'https://lacuna-dev.grantid.com',
    client_id: 'hybrid-sample',
    client_secret: 'Erm6sTU5CkJnBzjA5aWPLqJUCaGL4ILsY3OWTiwRw2s=',
    redirect_uri: 'http://localhost:8091/login',
    post_logout_redirect_uri: 'http://localhost:8091/',
    scope: 'openid profile sample-api',
    response_type: 'code id_token',
    response_mode: 'form_post',
};

module.exports = {
    openIdConfig: openIdConfig
}