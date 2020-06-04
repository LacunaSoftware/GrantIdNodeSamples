# Nodejs Web Api Sample 

    This sample expects Nodejs version >= 12.0

# Installing Dependencies

[express](https://www.npmjs.com/package/express)

    npm install express

[openid-client](https://www.npmjs.com/package/openid-client)

    npm install openid-client

[jose](https://www.npmjs.com/package/jose)

    npm install jose

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


