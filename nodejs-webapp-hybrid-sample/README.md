# Nodejs Sample Hybrid App

    This sample expects Nodejs version >= 12.0

# Installing Dependencies

[express](https://www.npmjs.com/package/express)

    npm install express

[openid-client](https://www.npmjs.com/package/openid-client)

    npm install openid-client

[pug](https://www.npmjs.com/package/pug)

    npm install pug

[jose](https://www.npmjs.com/package/jose)

    npm install jose

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

**tip 1:** `redirect_uri` and `post_logout_redirect_uri` metadata can accept any uri that you want as long as it is registered on your grantId application.

# Running

    node server.js

Application will be running on http://localhost:8091

# Using the WebApp

The only private route on the application is http://localhost:8091/Home/PrivateRoute, if the user is not already authenticated, when trying to access this resource, it will be redirected to the GrantId login page to perform authentication.


