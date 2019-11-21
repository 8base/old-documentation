## 8base React SDK Authentication

8base React SDK provides an easy way to implement authentication (sign-up, sign-in, sign-out) in your React.js apps. It works by wrapping an application in an AppProvider component that interfaces with a specified authentication client. with  To use it, the following dependencies are required.

* **react-apollo** contains the bindings for Apollo Client with React.
* **react-router-dom** DOM bindings for React Router
* **@8base/react-sdk** provides tools to use 8base with React.
* **@8base/auth** prodides auth and auth strategies modules

```sh
npm install -s @8base/react-sdk @8base/auth react-apollo react-router-dom
```

In the top level component of the application (main.js, app.js, index.js, etc...), wrap the root element with `<AppProvider>`. A *uri* and *authClient* argument is required. Please refer to the example below. 

```js
/* react/apollo packages */
import React from 'react';
import { Auth } from '@8base/auth';
import { AppProvider } from '@8base/react-sdk';

/* Root component */
import App from './App';

/* 8base Workspace API Endpoint */
const URI = '<API_ENDPOINT>'

/**
 * All option values can be set and retreived from 
 * the authentication profile settings in 8base.
 *
 * Don't forget set custom domains in the 
 * authentication settings!
 */
const authClient = Auth.createClient({
  strategy: '8base-auth',
  subscribable: true,
}, {
  /* Authentication profile client ID  */
  clientId: '<AUTH_CLIENT_ID>',
  /* Authentication profile domain */
  domain: '<AUTH_DOMAIN>',
  /* Permitted callback url */
  redirectUri: `${window.location.origin}/auth/callback/path`,
  /* Permitted logout redirect url */
  logoutRedirectUri: `${window.location.origin}/`
});


ReactDOM.render(
	/**
	 * On page load, AppProvider will either redirect the user to sign-in page. Or
	 * render the App component.
	 *
	 * When using the router component, the updated function may look like this:
	 *
	 *	<AppProvider uri={URI} authClient={auth0WebClient}>
	 *		{({ loading }) => loading ? <p>Please wait...</p> : <Routes />}
	 *	</AppProvider>,
	 * 
	 */
	<AppProvider uri={URI} authClient={authClient}>
		{({ loading }) => {
		  if (loading) {
		    return <p>Please wait...</p>;
		  }
		  return <App />;
		}}
	</AppProvider>,
	document.getElementById("root")
);
```

### Login

`@8base/react-sdk` exports the `withAuth` function to provide components with props for authorizing the user. The component determines whether the user is authorized before fetching and displaying the user information, from which the authentication state can be determined. It can be easily used for dynamically rendering components.


```js
import { Query } from 'react-apollo';
import { withAuth, gql } from "@8base/react-sdk";

/* GraphQL query for user information */
const USER_INFO = gql`
  query UserQuery {
    user {
      firstName
    }
  }
`;

/* Component generator function being passeda auth data */
const Login = ({ auth: { isAuthorized, authorize } }) => {
	/* Component to display when NOT authorized*/
  if (!isAuthorized) {
	  return (
	    <div>
	      <h2>Login</h2> <button onClick={() => authorize()}>Login</button>
	    </div>
	  );
  }

  /* Component to display when authorized*/
  return (
    <Query query={USER_INFO}>
      {({ data, loading }) => (
        <div>{!loading && <p>{data.user.firstName} </p>}</div>
      )}
    </Query>
  );
};

/* Decorate exported function with withAuth */
export default withAuth(Login);

```

### Authentication Handler
The `react-router-dom` *Router* component assumes the role of an app's `root` component when a component that handles authentication callbacks needs to be specified. The *Router* component should be provisioned with a *Route* handling the authentication profile's allowed callback url's path.


```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App'
import AuthCallback from './authCallback';

const Routes = () => (
  <Router>
  	/* Path declaration for auth callback to render AuthCallback component  */
    <Route path="/auth/callback" component={AuthCallback} exact />
    <Route path="/" component={App} exact />
  </Router>
);

export default Routes;
```

The `AuthCallback` component is up to the developer to define. When the component initializes, one of two things can be expected; sign-in or sign-up. Which action is approriate can be determined by checking for an existing user with the provided details. If none exist, a new user record can be created.

```js
import React, { useEffect } from 'react';
import { withAuth, gql } from '@8base/react-sdk';
import { withApollo, compose } from 'react-apollo';

/* Query the for the ID of the logged in user */
const CURRENT_USER = gql`
  query currentUser {
    user {
      id
    }
  }
`;

/* Mutation for adding user with email */
const SIGN_UP_USER = gql`
  mutation userSignUp($user: UserCreateInput!) {
    userSignUp(user: $user) {
      id
      email
    }
  }
`;

/* Authentication success callback function */
const AuthCallback = ({ auth, history, client }) => {
  useEffect(() => {
    const completeAuth = async () => {
    	/* Pull required values from authorized user data */
      const { idToken, email } = await auth.getAuthorizedData();

      /* Context for API calls */
      const context = { 
      	headers: { 
      		authorization: `Bearer ${idToken}` 
      	} 
      }

      try {
        /* Check if a user exists, if not an error will be thrown */
        await client.query({ query: CURRENT_USER, context });
      } catch {
        /* Sign up user if the request errored */
        await client.mutate({
          mutation: SIGN_UP_USER,
          variables: { 
          	user: { email } 
          },
          context
        });
      }

      /* After succesfull signup store token in local storage */
      await auth.setAuthState({ token: idToken });
      /* Redirect back to home page */
      history.replace('/');
    };

    /* Run authentication function */
    completeAuth();
  }, []);

  return <p>Please wait...</p>;
};

/* Decorated export */
export default compose(withAuth, withApollo)(AuthCallback);
```
**auth**, **history**, and **client** objects are passed to the function as arguments. Using these modules, most final authentication flows can be established. For example, the `idToken` and `email` of the authenticated user can be returned from the `auth.getAuthorizedData` method. These values can then be used to query the API using the `client.query` method.

{% hint style="warning" %}
##### How to use the idToken

`idToken` is a bearer token for authenticating requests to the GraphQL endpoint. Include it as a headers for non-public API calls - `Authorization: Bearer ${idToken}`.
{% endhint %}

![Clicking the login button should redirect to this page](https://paper-attachments.dropbox.com/s_66210AD8E619DBF1B5FFC6F0A64CFE2655C6A0925870CE59A3939E2B8D1BDC31_1561354686037_Screenshot+2019-06-24+at+6.37.49+AM.png)

### Logout

`@8base/react-sdk` exports the `loggedOut` function to provide easy sign-out functionality. The `withLogout` enhancer is similar to the `withAuth`, providing a `logout` function rather than an `authorize` function.

```js
import React from 'react';
import { withLogout } from '@8base/react-sdk';

const LogoutButton = ({ logout }) => (
  <button onClick={() => logout()}>logout</button>
);

export default withLogout(LogoutButton);
```