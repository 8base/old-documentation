# Auth Module

The `Auth` module is used to quickly enable user authentication and sign-up in 8base developer's client applications.

_Note: Before setting up Auth using the SDK, you must have first created an [Authentication Profile](../../../8base-console/authentication.md)_

## Usage

Dependent on a workspace's subscription tier, 8base provides several ways to implement authentication in client application. These include 8base Authentication, Auth0, or an OpenID provider. The SDKs `Auth` module is intended to help in setting up and in managing different authentication flow.

When initializing the `Auth` module, an auth strategy needs to be specified.

### Auth Strategies

All required settings values for initializing the Auth module can be collected from an [Authentication Profile](../../../8base-console/authentication#authorization) created in the 8base management console.

#### AUTH0_AUTH

The `AUTH0_AUTH` strategy is the simpliest method by which to set up authentication in client applications. This is the strategy you need to specify when an _Authentication Profile_ is using "8base Authentication" or "Your Auth0 Account" as the authentication type.

```javascript
import Auth from '8base-sdk/auth';

const Auth0Config = {
  strategy: "AUTH0_AUTH"
  /* Strategy settings */
  settings: {
    /* 8base Authentication Profile ID */
    authProfileId: "8BASE_AUTHENTICATION_PROFILE_ID",
    /* Client ID */
    clientId: "8BASE_AUTHENTICATION_PROFILE_CLIENT_ID",
    /* Auth domain */
    domain: "8BASE_AUTHENTICATION_PROFILE_DOMAIN",
    /* Allowed login redirect */
    redirectUri: `${window.location.href}/WHITELISTED/REDIRECT/PATH`,
    /* Allowed logout url */
    logoutRedirectURI: `${window.location.href}/WHITELISTED/LOGOUT/PATH`
  }
};

/* Configure 8base SDK */
export default new Auth(Auth0Config);
```

#### CUSTOM_AUTH

The `CUSTOM_AUTH` strategy is used when the _Authentication Profile_ is set to "OpenID" as the authentication type.

```javascript
import Auth from '8base-sdk/auth';

const OpenIDConfig = {
  strategy: "CUSTOM_AUTH"
  /* Strategy settings */
  settings: {
    /* 8base Authentication Profile ID */
    authProfileId: "8BASE_AUTHENTICATION_PROFILE_ID",
  }
};

/* Configure 8base SDK */
export default new Auth(OpenIDConfig);
```

## signUp()

**AUTH0_AUTH ONLY** - Sign up a new user using _Email / Password_ authentication.

```javascript
const {
  data: {
    userSignupWithPassword: { id, email, status, timezone, lastName, firstName }
  }
} = await auth.signUp({
  /* User's password */
  password: "myP@ssw0rd",
  /* User's profile data */
  user: {
    /**
     * Any fields available on the user record
     * can be specified here and get saved.
     *
     * username: "joe_shmo",
     * firstName: "Joe",
     * lastName: "Shmo"
     * ...
     */
    email: "joe@shmo.com"
  }
});
```

## signUpWithToken()

Sign up a new user using a valid `idToken` issued by any configured authentication provider.

```javascript
const {
  data: {
    userSignUpWithToken: { id, email, status, timezone, lastName, firstName }
  }
} = await auth.signUpWithToken(
  token: "VALID_ID_TOKEN",
  user: {
    /**
     * Any fields available on the user record
     * can be specified here and get saved.
     *
     * username: "joe_shmo",
     * firstName: "Joe",
     * lastName: "Shmo"
     * ...
     */
    email: "joe@shmo.com"
  })
);
```

## signIn()

**AUTH0_AUTH ONLY** - Sign in a new user using _Email / Password_ authentication.

```javascript
const {
  data: {
    userLogin: {
      success
      auth: {
        idToken
        refreshToken
      }
    }
  }
} = await auth.signIn(email: "joe@shmo.com", password: "myP@ssw0rd");
```

## authorize()

Navigates app user to the _Hosted Login Page_ provided by the Auth provider.

```javascript
auth.authorize();

/**
 * If the auth provider accepts options, two optional arguments can
 * be specified that get passed to the authorize method.
 *
 * auth.authorize("provider_name", { ...options });
 */
```

## signOut()

Sign/log out a user to invalidating their `idToken`. When used with `AUTH0_AUTH` strategy, this will result in a redirect to the configured `redirectUrl`.

```javascript
auth.signOut();

/**
 * If the auth provider accepts options, options can
 * be specified that get passed to the signOut method.
 *
 * auth.signOut({ ...options });
 */
```

## forgotPassword()

**AUTH0_AUTH ONLY** - Send a forgot password email to a user's specified email address (_Email / Password_ auth users only).

```javascript
await auth.forgotPassword("joe@shmo.com");
```

## currentUser()

Retrieve the current logged in user's session data.

```javascript
const { idToken } = await auth.currentUser();
```

## refreshToken()

**AUTH0_AUTH ONLY** - Refresh the user's `idToken` and `refreshToken`.

```javascript
const { idToken, refreshToken } = await auth.refreshToken();
```
