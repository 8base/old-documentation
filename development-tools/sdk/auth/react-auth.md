## 8base React SDK Authentication

8base React SDK provides an easy way to implement authentication (sign-up, sign-in, sign-out) in your React.js apps. It works by wrapping an application in an AppProvider HoC that interfaces with a specified authentication client (generally an 8Base Auth Client). Install the following dependencies to start using it:

* **react-apollo** contains the bindings for Apollo Client with React.
* **@reach/router** a lightweight UI router that supports A11y standards.
* **@8base/react-sdk** provides tools to use 8base with React.
* **@8base/auth** provides auth and auth strategies modules.

{% hint style="warning" %}
##### Routing

In our examples, we use `@reach/router` to handle the UI routing, but this is *optional*, you can use any react routing library you wish as long as you expose an url endpoint to handle the OAuth callback workflow (which is beyond the scope of this document).
{% endhint %}

```sh
npm install -s @8base/react-sdk @8base/auth react-apollo @reach/router
```

To being, wrap the root element with `<AppProvider>`. An *uri* and *authClient* argument is required. Please refer to the example below. 

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
  /* Permitted callback url, make sure this is configured correctly on the 8base dashboard */
  redirectUri: `${window.location.origin}/auth/callback`,
  /* Permitted logout redirect url, make sure this is configured correctly on the 8base dashboard */
  logoutRedirectUri: `${window.location.origin}/logout`
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

`@8base/react-sdk` exports a HoC, `withAuth`, to inject authentication primitives into your custom components. One of the properties that are injected is `isAuthorized` which will inform you if the user is authorized (logged in). It can easily be used for dynamically rendering content based on user authentication state. Below, we use it to call `authClient.authorize()` which will trigger the "sign-in" or "sign-up" workflows from our authentication client, when a user is not logged in.

{% hint style="warning" %}
##### Common "Gotcha"

Make sure you have configured your 8base application's authentication profile to assign a role to users, or they will not be able to make Graphql requests even if they are authenticated!
{% endhint %}


```js
import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
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
const Login = ({ auth: { isAuthorized, authClient } }) => {
  useEffect(() => {
    if (!isAuthorized) {
      authClient.authorize();
    }
  }, [authClient]);

  const { loading, data, error } = useQuery(USER_INFO);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);

    return <p>Error!</p>;
  }

  return <h1>{data.user.id}</h1>;
};

/* Decorate exported function using the withAuth HoC */
export default withAuth(Login);

```

### Authentication Handler
In this example, we are using `Router` from `@reach/router` to configure a routing mechanism to handle the "callback" step, which is apart of the OAuth workflow.

```js
import { Router } from '@reach/router';

import App from './App'
import AuthCallback from './authCallback';

const Routes = () => (
  <Router>
    /* Path declaration for auth callback to render AuthCallback component  */
    <AuthCallback path="/auth/callback" />
    <App default />
  </Router>
);

export default Routes;
```

#### OAuth Callback

Generally, the `AuthCallback` component is up to the developer to define. In our example, when the component initializes one of two things can be expected; user sign-in or sign-up. The appropriate pathway can be determined by checking for an existing user with the provided user details. If the user doesn't exist, as indicated by a failed query for their ID, a new user record can be created in 8Base.

```js
import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { withAuth, gql } from "@8base/react-sdk";
import { withApollo } from "react-apollo";

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
const completeAuth = async (authClient, client) => {
  /* Pull required values from authorized user data */
  const { idToken, email } = await authClient.getAuthorizedData();

  /* After succesfull signup store token in local storage */
  await authClient.setState({ token: idToken });

  /* Context for API calls */
  const context = {
    headers: {
      authorization: `Bearer ${idToken}`
    }
  };

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
};

const AuthCallback = ({ auth: { authClient }, client }) => {
  useEffect(() => {
    /* Run authentication function */
    completeAuth(authClient, client).then(() => {
      /* Redirect back to home page */
      navigate("/");
    });
  }, [authClient, client]);

  return <p>Please wait...</p>;
};

/* Decorated export */
export default withAuth(withApollo(AuthCallback));
```

{% hint style="warning" %}
##### How to use the idToken

`idToken` is a bearer token for authenticating requests to the GraphQL endpoint. Include it as a headers for non-public API calls - `Authorization: Bearer ${idToken}`. Generally, this is included in your requests to 8Base automatically by means of the `AppProvider` we set up in the beginning of this guide.
{% endhint %}

![Clicking the login button should redirect to this page](https://paper-attachments.dropbox.com/s_66210AD8E619DBF1B5FFC6F0A64CFE2655C6A0925870CE59A3939E2B8D1BDC31_1561354686037_Screenshot+2019-06-24+at+6.37.49+AM.png)

### Logout

Logging out is very easy using `withAuth`. Using `withAuth` simply calling `authClient.logout()` will log out your user. 

{% hint style="warning" %}
##### Common "Gotcha"

Make sure you have configured your 8base application's supported logout urls to include the logout URL defined at the start. If you do not add the logout URL to your application's supported logout urls, you will be unable to log out users and logout's will land on a 8base error page (if you are using 8base Auth).
{% endhint %}

```js
import React from 'react';
import { withAuth } from '@8base/react-sdk';

const LogoutButton = ({ auth: { authClient } }) => (
  <button onClick={() => authClient.logout()}>logout</button>
);

export default withAuth(LogoutButton);
```
