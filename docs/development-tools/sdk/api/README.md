# Api Module

The `Api` module is used to conveniently execute GraphQL queries, mutations, and subscriptions against a workspace.

## Usage

The `Api` module requires a configuration object to initialize. When being initialized using the the module directly, the `workspaceId` value is required. When being initialized using the `eightBase.configure()` method, the `workspaceId` value is **not** required.

```javascript
import Api from '8base-sdk/api';

export const apiConfig = {
  /**
   * ONLY Required when eightBase.configure() isn't used.
   */
  workspaceId: '8BASE_WORKSPACE_ID',
  /**
   * Maximum timeout on API request (default: 1000ms)
   */
  timeout: 1000,​
  /**
   * Headers accepts a function or object. When a function, any headers
   * are passed to it as an argument and then the returned object is used.
   * ----------------------------
   * EXAMPLE 1 - Headers Function
   *
   * headers: (httpHeaders) => ({
   *   Authorization: `Bearer ${localHost.getItem('idToken')}`,
   *   ...httpHeaders
   * })
   * ----------------------------
   * EXAMPLE 2 - Headers Object
   *
   * headers: {
   *   Authorization: `Bearer ${SOME_API_TOKEN}`
   * }
   * ----------------------------
   */
  headers: : {
    Authorization: `Bearer ${SOME_API_TOKEN}`
  },
  /**
   * All API calls can be transformed before a request
   * is sent using one or more transformation functions.
   *
   * All functions will execute in order and update values
   * get passed to the follow function.
   */
  transformRequest: [
    (query, data, headers) => ({ data: firstTransformation(data) }),
    (query, data, headers) => ({ data: secondTransformation(data) })
  ],
​  /**
   * All successful API responses can be transformed before the
   * promise is resolved.
   *
   * All functions will execute in order and update values
   * get passed to the follow function.
   */
  transformResponse: [
    (response) => firstTransformation(response),
    (response) => secondTransformation(response)
  ],
  /**
   * All failed requests can be captured when a response is recieved.
   *
   * catchErrors can be an object that maps error codes to
   * specific handler functions, or just a single default
   * handler function.
   * ----------------------------
   * EXAMPLE 1 - Function
   *
   * catchErrors: (err, reRun) => { console.log(err) }
   * ----------------------------
   * EXAMPLE 2 - Object
   *
   * catchErrors: {
   *   TokenExpiredError: (err, reRun) => {
   *     const { idToken } = auth.refreshToken();
   *     store.setItem("id_token", idToken);
   *     reRun();
   *   },
   *   default: (err) => {},
   * }
   * ----------------------------
   */
  catchErrors: {
    TokenExpiredError: (err, reRun) => {},
    default: (err, reRun) => {},
  }
}

/* Initialize and export the Api module*/
export default new Api(apiConfig);
```

## request()

Execute any GraphQL Query or Mutation using the `request()` method.

```javascript
/**
 * Pass variables as an object as the 2nd positional argument, and
 * any non-default header options as the 3rd positional argument.
 *
 * api.request(query: string, variables?: object, headers?: object)
 */

await Api.request(
  `
	query($email: String) {
		person(filter: { email: $email }) {
			email
		}
	}
`,
  {
    email: "joe@shmo.com"
  },
  {
    "X-AMZ-HEADER": "SOME-VALUE"
  }
);
```

## query()

Execute any GraphQL Query using the `query()` method, without needing to specify the operation type or variables in the GraphQL document.

```javascript
/**
 * Pass variables as an object as the 2nd positional argument, and
 * any non-default header options as the 3rd positional argument.
 *
 * api.query(query: string, variables?: object, headers?: object)
 */

await Api.query(
  `
    {
      person(filter: { name: $name }) {
        email
      }
    }
  `,
  {
    name: "Joe"
  },
  {
    "X-AMZ-HEADER": "SOME-VALUE"
  }
);
```

## mutation()

Execute any GraphQL Mutation using the `mutation()` method, without needing to specify the operation type or variables in the GraphQL document.

```javascript
/**
 * Pass variables as an object as the 2nd positional argument, and
 * any non-default header options as the 3rd positional argument.
 *
 * api.mutation(mutation: string, variables?: object, headers?: object)
 */

await api.mutation(
  `
    {
      person(
        filter: { name: $email },
        data: { name: $newName }
      ){
        email
      }
    }
  `,
  {
    email: "joe@shmo.com",
    newName: "Tom"
  },
  {
    "X-AMZ-HEADER": "SOME-VALUE"
  }
);
```

## subscription()

Initialize a GraphQL Subscription using the `subscription()` method, without needing to work directly with the WebSocket class. The `subscription()` method's config allows for a several callbacks to be specified, providing a convenient interface through which you can build real-time components.

```javascript
/**
 * Unlike the query() and mutation() methods, the subscription() method only accepts two mandatory
 * arguments, which are the query string and subscription options.
 *
 * api.subscription(query: string, options: SDKApiSubscriptionOptionsInput);
 */
const SubscriptionOptions = {
  /**
   * Any variables that will get used in the Subscription query.
   */
  variables: {
    action: "create"
  },
  /**
   * Any non-default headers to be sent in the requests.
   */
  headers: {
    "X-AMZ-HEADER": "SOME-VALUE"
  },
  /**
   * Callback for when the connection is opened
   */
  open: () => console.log("Subscription connection established..."),
  /**
   * Callback for when data is recieved
   */
  data: data => console.log("Data recieved: ", data),
  /**
   * Callback for when connection is closed
   */
  close: () => console.log("Subscription connection closed..."),
  /**
   * Callback for when error is recieved
   */
  error: err => console.log("Subscription error: ", err)
};

const subscription = await api.subscription(
  `
		subscription {
		  Message(filter: {
        mutation_in: [$action]
		  }) {
		    node {
          id
          messageText
		    }
		  }
		}
  `,
  SubscriptionOptions
);
```

### Subscription.close()

The `subscription()` method returns a subscription instance once initialized. On that instance lives the `close()` method, which allows you to close/disconnect the WebSocket connection.

```javascript
const subscription = await api.subscription(
  SubscriptionQuery,
  SubscriptionOptions
);
/**
 * Close subscription connection a
 */
setTimeout(() => subscription.close(), 6000);
```

## invoke()

Execute any deployed to a workspace using the `invoke()` method.

```javascript
/**
 * Let's user invoke an custom function deployed to workspace with options.
 *
 * api.invoke(functionName: string, options: SDKApiInvokeOptionsInput, headers?: object)
 */

/**
 * Options required when the function is a webhook
 */
const WebhookOptions = {
  /* HTTP verb of webhook */
  method: 'POST',
  /* Params for url */
  params: object
}

const InvokeOptions = {
  /* Data passed to function */
  data: {
    email: "joe@shmo.com"
  },
  webhookOptions
}

await api.invoke(
  "myFunctionName",
  InvokeOptions, ,
  {
    "X-AMZ-HEADER": "SOME-VALUE"
  }
);
```

## Error Handlers

In the Api module config, you're able to specify error handler functions. While the first positional argument passed to the handler function is the error itself, the second positional argument is a function that will re-run the API request with its original scope - as well as resolve the original promise.

For example, this can be useful when handling expired authentication token errors.

```javascript
import auth from "auth.js";

const ApiConfig = {
  // other config options
  catchErrors: {
    /**
     * Error code is mapped to TokenExpiredError key name
     */
    TokenExpiredError: (err, reRun) => {
      try {
        /**
         * Refresh the token, store it using preferred store, and
         * call `reRun()` to execute original API call.
         */
        const { idToken } = auth.refreshToken();
        store.setItem("id_token", idToken);
        reRun();
        /**
         * If token refresh failed, catch error and handle user logout.
         */
      } catch (err) {
        auth.logout();
      }
    },
    default: err => {}
  }
};
```
