# Javascript SDK

The 8base JavaScript SDK implements the client-side libraries used by applications using 8base services.

## Usage

The SDK makes available the `Eight8base` class which can be used to initialize any and all SDK modules in a single config file.

Once initialized, any configured submodule can be imported into or access in other script/component files.

### constructor

When initializing the `EightBase` class, the `workspaceId` argument is required and gets passed down automatically to all submodules. The SDK generates the workspace endpoint URLs required for all GraphQL API calls.

```javascript
import eightBase from "8base-js-sdk";

/**
 * Import configs (optionally stored in other files)
 */
import authConfig from "./configs/auth.js";
import apiConfig from "./configs/api.js";

/**
 * Configure all SDK submodules in single configure call.
 */
export const { api, auth } = eightBase.configure({
  /**
   * Workspace ID is required!
   */
  workspaceId: "<WORKSPACE_ID>",
  /**
   * Specify configs for any named SDK module 
   */
  Auth: AuthConfig,
  Api: ApiConfig
});
```

Once configured, the SDK submodules can be imported into scripts and components that require them from the configuration file.

```javascript
import { auth, api } from "8base.js";
```

## Available SDK Modules

- [Api](./api/README.md): Conveniently execute GraphQL queries, mutations, and subscriptions against a workspace.
- [Auth](./auth/README.md): Quickly authenticate users and build auth flows in client applications.

## Alternatives

There any a number of ways developers can connect to their workspace's GraphQL API, authenticate users, and build client apps. The 8base SDK is only one of them! Remember that your workspace is simply an flexible GraphQL API that can be developed on top of however you wish to.
