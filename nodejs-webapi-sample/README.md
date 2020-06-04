# Nodejs Web Api Sample 

    This sample expects Nodejs version >= 12.0

# Installing Dependencies

[express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.

    npm install express

[openid-client](https://www.npmjs.com/package/openid-client) - openid-client is a server side OpenID Relying Party (RP, Client) implementation for Node.js runtime, supports passport.

    npm install openid-client

[jose](https://www.npmjs.com/package/jose) - "JSON Web Almost Everything" - JWA, JWS, JWE, JWT, JWK, JWKS for Node.js with minimal dependencies

    npm install jose

# Files

    node-webapp-hybrid-sample/
        |_ app.js                  - app intilization.
        |_ auth.js                 - jwt authentication methods.
        |_ config.js               - constant values and configurations.
        |_ resources.js            - sample controller with authentication.
        |_ server.js -             - server main.

# Customizing GrantId's Credentials

Replace the `openIdConfig` object inside the the `config.js` file with the following to use your own credentials:

```javascript
openIdConfig = {
    issuer: 'https://<your_subscription>.grantid.com',
    api_scope: '<your_api_scope>'
}
```

# Running

    node server.js

Application will be running on http://localhost:8092

# Using the endpoints

This sample offers three endpoints `/home` which requires **no authentication**, `/secret` and `/claims` both requiring a bearer token
issued by https://lacuna-dev.grantid.com.

**tip:** you can easily obtain a valid token for this api by running [this](https://github.com/LacunaSoftware/GrantIdNodeSamples/tree/master/nodejs-webapp-code-sample) webapp.


