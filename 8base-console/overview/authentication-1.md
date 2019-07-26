# Permissions

8base's GraphQL API uses a [JWT token](https://jwt.io/introduction/) to authenticate requests. To implement authentication in your application, you’ll need some details from the [Authentication Settings](https://app.8base.com/settings/authentication) section in the 8base App Builder. To obtain these details, you’ll need to create a new authentication profile.

Visit the [Authentication Settings](https://app.8base.com/settings/authentication) page in your designated workspace inside of 8base App Builder:

![](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562161944519_Screenshot+2019-06-18+at+4.17.49+PM.png)

Create an authentication profile by pressing {+}. Doing so will provide you with the required information that will be used to set up your client application for authentication. Fill in the following fields to create a new Authentication Profile:

![](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562162151659_Screenshot+2019-06-23+at+12.45.27+PM.png)

* **Name**: Choose a descriptive name that helps you or someone else reading your code to understand what this profile does. In this sample case, you can replace **My Auth** in the screenshot above with a name like **Guest User Auth**.
* **Type**: For now, select 8base authentication. Coming soon will be the ability to utilize external OAuth providers including non-8base `Auth0` accounts. Stay tuned for release announcements and [documentation](https://docs.8base.com/docs/authentication-client) to know when these will become available.
* **Self Signup**: The value for this should be `Open to all` if your app allows for self-registration. Otherwise you can restrict access to only invited users or users within a specific domain.
* **Roles:** The roles can be either `Guest`, `Administrator` or any other roles that are defined within 8base. You can also utilize a combination of roles.

## Get client information

A new authentication profile and its corresponding client-side information will be generated when you click on `Add Profile`. The client-side information is required for connecting the client application to the 8base backend and its corresponding authentication settings.

Copy the client information at the top of the [Authentication](https://app.8base.com/settings/authentication) page including `Client ID` and `Domain`. You’ll need them when setting up your client application.

![](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562164157188_8base-client.png)

## Configure Callback URLs

A **callback** **URL** is a URL that is invoked by 8base when authentication is complete. You will configure a mandatory callback URL in the Authentication Settings page. If this field is not set, users will be unable to log into the application and will receive an error.

![](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562167644154_Screenshot+2019-06-24+at+5.52.31+AM.png)

8base provides a default callback URL `http://localhost:3000/auth/callback`. You will want to use it or replace it with an existing URL from your application.

## Configure Logout URLs

A logout URL is a URL in your application that 8base returns to after the user has been successfully logged out of the authorization server.

You’ll enter your application’s logout URL in the **Allowed Logout URLs** field in the Authentication Settings page. Attempting logout without providing a logout URL will display an error. The default logout URL is `http://localhost:3000/`.

![](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562168522483_Screenshot+2019-06-24+at+5.52.31+AM.png)

## Configure your client for authentication

To get started, create a React application using the Create React App CLI and then install the following dependencies, including the 8base React SDK:

* [react-apollo](https://github.com/apollographql/react-apollo#readme) - contains the bindings for Apollo Client with React.
* [@8base/react-sdk](https://github.com/8base/sdk/tree/master/packages/react-sdk#readme) - provides tools to use 8base with React.
* [react-router-dom](https://github.com/ReactTraining/react-router#readme) - DOM bindings for React Router

First, you have to wrap the application with 8base App Provider, which loads fragments schema and provides them to Apollo client, alongside authentication. Open the `src/index.js` and make the following changes:

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, WebAuth0AuthClient } from '@8base/react-sdk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const URI = '<DATA_ENDPOINT>' // Your 8base data endpoint
const auth0WebClient = new WebAuth0AuthClient({
  domain: <AUTH_DOMAIN>, // domain client information from authentication page
  clientId: <AUTH_CLIENT_ID>, // client id information 
  redirectUri: `${window.location.origin}/auth/callback`, // the callback url you set
  logoutRedirectUri: `${window.location.origin}/`, // logout url you entered 
});

ReactDOM.render(
  <AppProvider
    uri={URI}
    authClient={auth0WebClient}
  >
    {({ loading }) => {
      if (loading) {
        return <p>Please wait...</p>;
      }
      return <App />;
    }}
  </AppProvider>,
  document.getElementById('root')
    );
```

> Copy the client information from the 8base authentication page

The 8base React SDK exports a provider and client class `WebAuth0AuthClient` for connecting to 8base using your auth client information. The `AppProvider` takes the `URI` and the `authClient` setup. Finally, the application is wrapped with `AppProvider`.

> The URI is the API endpoint displayed in the data page of your 8base dashboard

![Copy your application&#x2019;s API endpoint for use](https://paper-attachments.dropbox.com/s_852651193E1A9C7AB063A15777445082FCBA8EFB681C0ABC9C5C34FAD9595A67_1562188904588_8base-endpoint.png)

## Login

The 8base SDK exports a `withAuth` function to provide components with props for authorizing the user. Create a file `login.js` in the `src` directory and copy the following content into it:

```javascript
// src/login.js
import React from "react";
import { Redirect } from "react-router-dom";
import { withAuth, gql } from "@8base/react-sdk";
import { Query } from 'react-apollo';

const USER_INFO = gql`
  query UserQuery {
    user {
      firstName
    }
  }
`
const Login = ({ auth: { isAuthorized, authorize } }) => {
  // If user is authorized, fetch user information and display
  if (isAuthorized) {
    return <Query query={USER_INFO}>
      {({ data, loading }) => (
        <div>
          {!loading && <p>{data.user.firstName} </p>}
        </div>
      )}
    </Query>;
  }

  return (
    <div>
      <h2>Login</h2> <button onClick={() => authorize()}>Login</button>
    </div>
  );
};
export default withAuth(Login);
```

In the component, we check if the user `isAuthorized` before fetching and displaying the user information. The login button is displayed if the user is not authorized; clicking the login button triggers the process of authenticating the user.

Render this component in the `src/App.js` file:

```javascript
import React from 'react';
import Routes from './router';
import './App.css';
import Login from './login';

const App = () => (
  <div className="App">
    <Login/>
  </div>
);
export default App;
```

We haven’t set up the callback URL yet, so the authentication won’t run to completion.

## Authorization Callback

Create a `router.js` file in the `src` directory. This is where we’ll manage the routes in the application. Copy the content below into the file:

```javascript
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App'
import AuthCallback from './authCallback';

const Routes = () => (
  <Router>
    <Route path="/auth/callback" exact component={AuthCallback} />
    <Route path="/" exact component={App} />
  </Router>
);
export default Routes;
```

Ensure that the path for the `AuthCallback` component is the same as the one you entered on the [Authentication Settings](https://app.8base.com/settings/authentication) page.

Update the render method in the `index.js` to render the `Routes` component:

```javascript
// ...
import Routes from './router';

// ... rest of the file

ReactDOM.render(
  <AppProvider
    uri={URI}
    authClient={auth0WebClient}
  >
    {({ loading }) => {
      if (loading) {
        return <p>Please wait...</p>;
      }
      return <Routes />;
    }}
  </AppProvider>,
  document.getElementById('root')
);
```

Create a file `authCallback.js` to hold the `AuthCallback` component in the `src` directory and copy the following content into it:

```javascript
import React, {useEffect} from 'react';
import { withAuth, gql } from '@8base/react-sdk';
import { withApollo, compose } from 'react-apollo';

const CURRENT_USER = gql`
  query currentUser {
    user {
      id
    }
  }
`;
const SIGN_UP_USER = gql`
  mutation userSignUp($user: UserCreateInput!) {
    userSignUp(user: $user) {
      id
      email
    }
  }
`;

const AuthCallback = ({ auth, history, client }) => {
  useEffect(() => {
    const completeAuth = async () => {
      const { idToken, email } = await auth.getAuthorizedData();
      try {
        // Check if user exists, if not it'll return an error
        await client.query({
          query: CURRENT_USER,
          context: { headers: { authorization: `Bearer ${idToken}` } },
        });
      } catch {
        // If user is not found - sign them up
        await client.mutate({
          mutation: SIGN_UP_USER,
          variables: { user: { email } },
          context: { headers: { authorization: `Bearer ${idToken}` } },
        });
      }
      // After succesfull signup store token in local storage
      await auth.setAuthState({ token: idToken });
      // Redirect back to home page
      history.replace('/');
    };
    completeAuth();
  }, []);
  return <p>Please wait...</p>;
};

export default compose(withAuth,withApollo)(AuthCallback);
```

The `withAuth` function is useful for checking auth state and authorizing a user; When this component is called with the user data, we’re expecting one of two things, login or signup, so we’re going to check for an existing user with the provided details. When none exists, we proceed to create one and login the user in.

In the `completeAuth` function, we get the `idToken` and `email` returned from calling the `auth.getAuthorizedData` method. These values will be useful for querying the current user or signing them up.

The `idToken` will be used as the authorization token when making requests to the GraphQL endpoint. The `query` method of the client prop is used to run the `CURRENT_USER` query. When that fails, it indicates that there’s no user with that token, the execution is moved to the `catch` block where `SIGN_UP_USER` mutation is done using the `email` as a variable.

At the end of the `completeAuth` function, we update the `authState` with the `idToken` before redirecting to the `/` route.

You can now click the login button to initiate authentication. Here’s it in action:

![Clicking the login button should redirect to this page](https://paper-attachments.dropbox.com/s_66210AD8E619DBF1B5FFC6F0A64CFE2655C6A0925870CE59A3939E2B8D1BDC31_1561354686037_Screenshot+2019-06-24+at+6.37.49+AM.png)

## Logout

When logged in, you can easily log a user out with the help of the 8base React SDK. It exports a `withLogout` enhancer that exposes a `logout` function. Create a file `logout.js` in the `src` directory and populate it with the following content:

```javascript
import React from 'react';
import { withLogout } from '@8base/react-sdk';

const LogoutButton = ({ logout }) => (
  <button onClick={() => logout()}>logout</button>
);

export default withLogout(LogoutButton);
```

The `withLogout` enhancer is similar to the `withAuth` but it provides a `logout` function rather than an `authorize` function.

Render this component in the `src/login.js` file to display the logout button when the user is authenticated:

```javascript
// src/login.js

import React from "react";
// ...
import LogoutButton from "./logout";

const Login = ({ auth: { isAuthorized, authorize } }) => {
  // If user is authorized, fetch user information and display
  if (isAuthorized) {
    return <Query query={USER_INFO}>
      {({ data, loading }) => (
        <div>
          {!loading && <p>{data.user.firstName} </p>} | <LogoutButton/>
        </div>
      )}
    </Query>;
  }

  // ...
};
Login = withAuth(Login);
```

Be sure to install the required dependencies, start the application with `yarn start` or `npm start`, navigate to [http://localhost:3000](http://localhost:3000) to see the app in action. You can find the demo of this example on CodeSandbox [here](https://codesandbox.io/s/affectionate-https-cbre2).

