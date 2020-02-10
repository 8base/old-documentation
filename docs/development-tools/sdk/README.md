# SDK - Client Module

The 8base JavaScript SDK implements the client-side libraries used by applications using 8base services.

## Usage

The SDK makes available the `eight8base` class, on which the `configure()` method can be used to initialize any and all SDK modules in a single config file.

Once initialized, any configured submodule can be imported into or access in other script/component files.

### `configure()`

When using the `configure()` method, the `workspaceId` argument is required and gets passed down automatically to all submodules. The SDK generates the workspace endpoint URLs required for all GraphQL API calls.

```javascript
/**
 * Import 8base SDK
 */
import eightBase from "8base-sdk";

/**
 * Import configs (optionally stored in other files)
 */
import Auth from "./configs/auth.js";
import API from "./configs/api.js";

/**
 * Configure all SDK submodules in single configure call.
 */
export default eightBase.configure({
  workspaceId: "8BASE_WORKSPACE_ID",
  Auth,
  Api
});
```

Once configured, the SDK submodules can be imported into scripts and components that require them from the configuration file.

```javascript
import { Auth, Api } from "8base.js";
```

## Available SDK Modules

- [API](./api/README.md): Conveniently execute GraphQL queries, mutations, and subscriptions against a workspace.
- [AUTH](/.auth/README.md): Quickly authenticate users and build auth flows in client applications.

## Alternatives

There any a number of ways developers can connect to their workspace's GraphQL API, authenticate users, and build client apps. The 8base SDK is only one of them! Remember that your workspace is simply an flexible GraphQL API that can be developed on top of however you wish to.
