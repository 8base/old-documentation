# User Authentication

8base SDK provides an easy way to implement login in your client application. We use [Auth0](https://www.auth0.com) to login users and generate a JWT token that can be used to authenticate the API.

8base SDK provides the `Auth0WebClient` package that wraps and configures the Auth0 React library. You initialize `Auth0WebClient` with `domain`, `clientID` and `redirectUri` and pass it to `EightBaseAppProvider`. The example below shows recommended configuration using the default Auth0 account.

```javascript
import { Auth0WebClient } from '@8base/auth';
// Use this Auth0 configuration if you want
// to use the default 8base Auth0 account for authentication
const AUTH_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const AUTH_DOMAIN = 'auth.8base.com';

// Auth0 web client is initialized here
const auth0WebClient = new Auth0WebClient({
  domain: AUTH_DOMAIN,
  clientID: AUTH_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`
});
```
