8base SDK provides an easy way to implement login in your client application. We use <a href="https://www.auth0.com" target="_blank">auth0</a> to login users and generate a JWT token that can be used to authenticate the API.

8base SDK provides `Auth0WebClient` package that wraps and configures auth0 react library. You initialize `Auth0WebClient` with `domain`, `clientID` and `redirectUri` and pass it to `EightBaseAppProvider`. The example below shows recommended configuration using the default auth0 account.
[block:code]
{
  "codes": [
    {
      "code": "import React from 'react';\nimport { BrowserRouter } from 'react-router-dom';\nimport { EightBaseAppProvider } from '@8base/app-provider';\nimport { Auth0WebClient } from '@8base/auth';\nimport { EightBaseBoostProvider, Loader } from '@8base/boost';\n\nimport { Routes } from './routes';\n\n// Use this auth0 configuration if you want \n// to use the default 8base auth0 account for authentication\nconst AUTH_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';\nconst AUTH_DOMAIN = 'auth.8base.com';\n\n// Auth0 web client is initialized here\nconst auth0WebClient = new Auth0WebClient({\n  domain: AUTH_DOMAIN,\n  clientID: AUTH_CLIENT_ID,\n  redirectUri: `${window.location.origin}/auth/callback`\n});\n\nconst App = () => (\n  <BrowserRouter>\n    <EightBaseBoostProvider>\n      <EightBaseAppProvider uri={ process.env.REACT_APP_8BASE_API_URL } authClient={ auth0WebClient }>\n        {\n          ({ loading }) => loading ? <Loader /> : <Routes />\n        }\n      </EightBaseAppProvider>\n    </EightBaseBoostProvider>\n  </BrowserRouter>\n);\n\nexport { App };",
      "language": "javascript",
      "name": "App.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "withAuth HOC"
}
[/block]
Once you initialized `EightBaseAppProvider` with `authClient` you can use `withAuth` higher order component to receive the current authentication state. `withAuth` injects `auth` prop into the wrapped component and allows you to check whether the user is logged in, trigger logout and more. Check out `withAuth` <a href="https://github.com/8base/sdk/blob/master/packages/auth/src/withAuth.js" target="_blank">source code</a> for more details on what props it injects.
[block:code]
{
  "codes": [
    {
      "code": "import React from 'react';\nimport { Redirect } from 'react-router-dom';\nimport { withAuth } from '@8base/auth';\n\nclass ProtectedComponent extends React.Component {\n  render() {\n    const {\n      auth: { isAuthorized }    \n    } = this.props;\n  \n    if (isAuthorized) {\n      return (<div>User is logged in!</div>);\n    }\n    \n    // Otherwise redirect to login screen.\n    return <Redirect to={{ pathname: '/auth' }} \n  }\n}\n\nProtectedRoute = withAuth(ProtectedRoute);\n\nexport { ProtectedComponent };",
      "language": "javascript",
      "name": "ProtectedComponent.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Use with React Native"
}
[/block]
Coming soon...
[block:api-header]
{
  "title": "Self-signup"
}
[/block]
Sometimes you want to give users ability to sign up into your workspace by themselves without an invitation. We are working on adding this feature and will add docs here shortly...
[block:api-header]
{
  "title": "Using your own auth0 account"
}
[/block]
We are working on implementation and will add docs shortly...

If you are interested in implementing a custom login in your application that doesn't use auth0 please contact [support@8base.com](mailto:support@8base.com).