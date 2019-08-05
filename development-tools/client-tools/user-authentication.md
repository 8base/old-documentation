# User Authentication

8base SDK provides an easy way to implement login in your client application. We use [auth0](https://www.auth0.com) to login users and generate a JWT token that can be used to authenticate the API.

8base SDK provides `Auth0WebClient` package that wraps and configures auth0 react library. You initialize `Auth0WebClient` with `domain`, `clientID` and `redirectUri` and pass it to `EightBaseAppProvider`. The example below shows recommended configuration using the default auth0 account.

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { EightBaseAppProvider } from '@8base/app-provider';
import { Auth0WebClient } from '@8base/auth';
import { EightBaseBoostProvider, Loader } from '@8base/boost';

import { Routes } from './routes';

// Use this auth0 configuration if you want 
// to use the default 8base auth0 account for authentication
const AUTH_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const AUTH_DOMAIN = 'auth.8base.com';

// Auth0 web client is initialized here
const auth0WebClient = new Auth0WebClient({
  domain: AUTH_DOMAIN,
  clientID: AUTH_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth/callback`
});

const App = () => (
  <BrowserRouter>
    <EightBaseBoostProvider>
      <EightBaseAppProvider uri={ process.env.REACT_APP_8BASE_API_URL } authClient={ auth0WebClient }>
        {
          ({ loading }) => loading ? <Loader /> : <Routes />
        }
      </EightBaseAppProvider>
    </EightBaseBoostProvider>
  </BrowserRouter>
);

export { App };
```

### withAuth HOC
}
[/block]
Once you initialized `EightBaseAppProvider` with `authClient` you can use `withAuth` higher order component to receive the current authentication state. `withAuth` injects `auth` prop into the wrapped component and allows you to check whether the user is logged in, trigger logout and more. Check out [`withAuth` source code](https://github.com/8base/sdk/blob/master/packages/auth/src/withAuth.js) for more details on what props it injects.

```javascript
import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@8base/auth';

class ProtectedComponent extends React.Component {
  render() {
    const {
      auth: { isAuthorized }    
    } = this.props;
  
    if (isAuthorized) {
      return (<div>User is logged in!</div>);
    }
    
    // Otherwise redirect to login screen.
    return <Redirect to={{ pathname: '/auth' }} 
  }
}

ProtectedRoute = withAuth(ProtectedRoute);

export { ProtectedComponent };
```
