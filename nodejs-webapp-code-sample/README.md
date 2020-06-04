# Nodejs Sample Code App

    This sample expects Nodejs version >= 12.0

# Installing Dependencies

[express](https://www.npmjs.com/package/express)

    npm install express

[openid-client](https://www.npmjs.com/package/openid-client)

    npm install openid-client

[openid-client-helper](https://www.npmjs.com/package/openid-client-helper)

    npm install openid-client-helper

[pug](https://www.npmjs.com/package/pug)

    npm install pug

# Customizing GrantId's Credentials in your application

Replace the `openIdClientHelperParams` object inside the the `auth.js` file to the following:

```javascript
const openIdClientHelperParams = {
    issuerMetadata: {
        issuer: 'https://<your_subscription>.grantid.com',
    },
    clientMetadata: {
        client_id: '<your_client_id>',
        client_secret: '<your_client_secret>',
        token_endpoint_auth_method: 'client_secret_post',
        redirect_uri: 'http://localhost:8091/login',
        post_logout_redirect_uri: 'http://localhost:8091/'
    },
    resources: {
        'https://localhost:8091/Home/PrivateRoute': {
            scope: 'openid profile <your_api_scope>'
        }
    },
    customize: ({custom, client}) => {
        if (client) {
            client[custom.clock_tolerance] = 0 // Your clock tolerance here.
        }
    }
}
```

**tip 1:** `redirect_uri` and `post_logout_redirect_uri` metadata can accept any uri that you want as long as it is registered on your grantId application.

# Running

    node server.js

Application will be running on http://localhost:8091

# Using the WebApp

The only private route on the application is http://localhost:8091/Home/PrivateRoute, if the user is not already authenticated, when trying to access this resource, it will be redirected to the GrantId login page to perform authentication.


