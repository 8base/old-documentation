# Authentication

Every 8base workspace initializes with native support for signing up, managing, and authorizing your application's Users. This feature eliminates the requirement of managing emails and passwords or social sign-on providers without compromising on access to your user data.

## Authentication
Under the hood, 8base utilizes [Auth0](https://auth0.com/) to manage your users' identities and ensure the best security standards. All user accounts are by default stored in an Auth0 account that's managed by 8base. For upgraded workspace plans, the option of connecting one's Auth0 account or an OpenID provider is available.

### 8base Authentication
{% youtube src="https://www.youtube.com/watch?v=BTexF_yxrC0&feature=youtu.be" %}{% endyoutube %}

To create an *Authentication Profile*, navigate to the `Settings > Authentication` and press the `+` button. The form that appears can be completed using the following fields described.

* **Name**: A name that describes what this profile does. In this sample case, you can replace My Auth in the screenshot above with a name like Guest User Auth.

* **Type**: Select 8base authentication

* **Self Signup**: Open allows users to self-register. Otherwise, you can restrict access to only invited users or users within a specific domain (i.e., '@company.com').

* **Roles**: Roles can be either Guest, Administrator, or any custom role. Multiple-roles can be selected.

#### Client information
An authentication profile's corresponding client-side information is generated once created. Client-side information allows for connecting client applications to the 8base back-end and any corresponding authentication settings. Client ID and Domain are not sensitive strings and are added to one or more client apps.

#### Configure Callback URLs
A callback URL is an endpoint that is invoked after a user authenticates. Users are not able to log into an application and receive an error if this field is left empty. By default, the callback URL `http://localhost:3000/auth/callback` is set. Keep it, or replace it with an existing URL from your application.

#### Configure Logout URLs
The logout URL is where a user is sent after logging out. Specify them in the Allowed Logout URLs field. The default logout URL is http://localhost:3000/ and attempting to log out when no logout URL was provided displays an error.

### Your Own Auth0 Account
There are only a few steps required to set up your Auth0 account on 8base. First, navigate to the `Settings > Authentication` of your workspace and create a new *Authentication Profile*. In the form that appears, select *Your Auth0 Account*.

All required information is in the settings of your Auth0 account.

![Connecting your Auth0 account](../.gitbook/assets/auth-own-auth0.png)

### OpenID Connect
The ability to set up an authentication provider that supports the OpenID specification is available for workspaces on a *Professional* or *Enterprise* plan. Some light setup required in the Management Console and a custom *resolver* function needs to be deployed to your project's workspace to use this feature.

### Sign-on Providers
Sign-on providers can easily be enabled/disabled in the *8base Authentication Settings* section of the workspace's Authentication view. At least one authentication profile with the type set to "8base Authentication" is required to use this feature.

![Creating an Authentication Profile](../.gitbook/assets/signon-provider-form.png)

Each sign-on provider requires a *Client ID* and *Client Secret*. These credentials are collected from the sign-on provider(s) you want to configure. Once collected, enter the credentials into the relevant sign-on provider form before clicking "Enable Sign-On Provider" and "Save."

![Enabling a Sign-on Provider](../.gitbook/assets/signon-provider-config.png)

#### Configuring the OpenID Settings
In the 8base Management Console, you're able to configure one or more authentication providers under `Settings > Authentication`. Click the "+" button and fill out the provider form, selecting *OpenID* as the type and adding an OpenID Provider URL. Once completed, the record is saved to your *Authentication Profiles*.

![Adding an OpenID Authentication Provider in 8base](../.gitbook/assets/openid-settings.png)

#### getToken Resolver
A custom *getToken* resolver mutation function must be deployed to the workspace. This can be done by installing the [8base CLI](../development-tools/cli/README.md).

In the provided *getToken* function, the relevant environment variables are accessed - if set in the Management Console - to provide the required credentials and configurations. A request is then made to the authentication provider to query or create the authenticating user from the database and return the user's token.

{% code-tabs %}
{% code-tabs-item title="8base.yml" %}
```yaml
functions:
  getToken:
    handler:
      code: src/getToken.ts
    type: resolver
    schema: src/getToken.graphql
```
{% endcode-tabs-item %}

{% code-tabs-item title="handler.js" %}
```javascript
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const gql = require('graphql-tag');
const jwtDecode = require('jwt-decode');

const APP_ID_CLIENT_ID = process.env.APP_ID_CLIENT_ID;
const APP_ID_TENANT_ID = process.env.APP_ID_TENANT_ID;
const APP_ID_SECRET = process.env.APP_ID_SECRET;
const APP_ID_URL = process.env.APP_ID_URL;
const TOKEN_PATH = '/token';

const CLIENT_REDIRECT_URI = process.env.CLIENT_REDIRECT_URI;

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    user {
      id
      email
    }
  }
`;

const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;

export default async (event: any, context: any) => {
  const body = new URLSearchParams();

  body.append('grant_type', 'authorization_code');
  body.append('code', event.data.code);
  body.append('client_id', APP_ID_CLIENT_ID);
  body.append('redirect_uri', CLIENT_REDIRECT_URI);

  let token;
  let email;

  try {
    let tokenResponse = await fetch(`${APP_ID_URL}${APP_ID_TENANT_ID}/${TOKEN_PATH}`, {
      body,
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${APP_ID_CLIENT_ID}:${APP_ID_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
        'Accept': 'application/json',
      },
      method: 'post',
    });

    ({ id_token: token } = await tokenResponse.json());

    try  {
      await context.api.gqlRequest(CURRENT_USER_QUERY, {}, {
        authorization: token,
      });
    } catch (e) {
      ({ email } = jwtDecode(token));

      await context.api.gqlRequest(USER_SIGN_UP_MUTATION, {
        user: {
          email,
        },
        authProfileId: event.data.authProfileId,
      }, {
        authorization: token,
      });
    }
  } catch (e) {
    console.log(e);
    throw Error('Authorization Error');
  }

  return {
    data: {
      token,
    },
  };
};
```
{% endcode-tabs-item %}

{% code-tabs-item title="schema.graphql" %}
```javascript
type TokenResult {
  token: String!
}

extend type Mutation {
  getToken(code: String!, authProfileId: ID!): TokenResult
}

```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### Setting Environment Variables
To set environment variables that can be accessed from within custom functions, open up your workspace, and navigate to `Settings > Environment Variables`. Here, any key-value pair may be securely stored and accessed from within your functions at `process.env.<ENV_VARIABLE_KEYNAME>`.

![Environment variables manager in the 8base Management Console](../.gitbook/assets/openid-env-variables.png)

#### Troubleshooting
If you're unable to get the authentication provider to work and are receiving a "Not Authorized" error message, you may need to update the associated role and its API permissions. You can do this by first ensuring that the configured provider has an associated role, like *Guest*. Next, navigate to `Settings > Roles > [ROLE_NAME] > Data` and ensure that the role is enabled for the *Get Token* function call.