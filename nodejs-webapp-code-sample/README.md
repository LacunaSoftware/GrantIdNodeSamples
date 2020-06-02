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

# Running

    node server.js

Application will be running on http://localhost:8091

# Using the WebApp

The only private route on the application is http://localhost:8091/Home/PrivateRoute, if the user is not already authenticated, when trying to access this resource, it will be redirected to the GrantId login page to perform authentication.


