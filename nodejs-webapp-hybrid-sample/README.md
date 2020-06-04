# Nodejs Sample Hybrid App

    This sample expects Nodejs version >= 12.0

# Installing Dependencies

[express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.

    npm install express

[openid-client](https://www.npmjs.com/package/openid-client) - openid-client is a server side OpenID Relying Party (RP, Client) implementation for Node.js runtime, supports passport.

    npm install openid-client

[jose](https://www.npmjs.com/package/jose) - "JSON Web Almost Everything" - JWA, JWS, JWE, JWT, JWK, JWKS for Node.js with minimal dependencies

    npm install jose
    
[pug](https://www.npmjs.com/package/pug) - Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.

    npm install pug

# Files

    node-webapp-hybrid-sample/
        |_ public/                 - sample style.
            |_ style.css
        |_ views/                  - sample front end.
            |_ index.pug
            |_ layout.pug
            |_ privacy.pug
            |_ privateRoute.pug   
        |_ app.js                  - app intilization.
        |_ auth.js                 - openid-client wrapper/authentication methods.
        |_ config.js               - constant values and configurations.
        |_ resources.js            - sample controller with authentication.
        |_ server.js -             - server main.
        
# Customizing GrantId's Credentials in your application

Replace the `openIdConfig` object inside the the `config.js` file with the following to use your own credentials:

```javascript
const openIdConfig = {
    issuer:'https://<your_subscription>.grantid.com',
    client_id: '<your_client_id>',
    client_secret: '<your_client_secret>',
    redirect_uri: 'http://localhost:8091/login',
    post_logout_redirect_uri: 'http://localhost:8091/',
    scope: 'openid profile <your_api_scope>',
    response_type: '<your_desired_response_type>',
    response_mode: 'form_post',
};
```

**tip:** `redirect_uri` and `post_logout_redirect_uri` metadata can accept any uri that you want as long as it is registered on your grantId application.

# Running

    node server.js

Application will be running on http://localhost:8091

# Using the WebApp

The only private route on the application is http://localhost:8091/Home/PrivateRoute, if the user is not already authenticated, when trying to access this resource, it will be redirected to the GrantId login page to perform authentication.


