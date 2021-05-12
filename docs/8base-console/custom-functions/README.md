# Custom Functions
In 8base, pretty much everything is extensible when using *Custom Functions* (CFs). If you want to extend your GraphQL API, add custom endpoints, or build some other server side functionality, CFs will be the answer. So, how do they work?

CFs in 8base are essentially AWS Lambdas that get enriched with access to your workspace resources. For example, 8base makes sure you're able to access the workspace's environment variables and database from within a CF by default. CFs can be written in either JavaScript or TypeScript (we'll package them for you... so no need to worry about Babel) and be deployed in a matter of minutes.

### Highlights
* **Serverless execution:** Once deployed, CFs are ready to scale from 1 to 1,000,000+ calls thanks to serverless design
* **JavaScript + TypeScript:** Write in JavaScript or TypeScript and 8base will compile it as needed
* **Predefined Triggers:** 8base currently offers four types of CF triggers that will cover 99.999% of requirements
* **Easily Permissioned:** As with most 8base features, authorizing CFs can be easily configured in the *Role Manager*

### Custom Function Types
There are 4-types of CFs made available on 8base that we will go over in depth in the following 4 sections. They are:

* **[Resolvers](/docs/8base-console/custom-functions/resolvers)**: For extending your GraphQL API
* **[Webhooks](/docs/8base-console/custom-functions/webhooks)**: For RESTful endpoints (GET, POST, DELETE, etc...)
* **[Triggers](/docs/8base-console/custom-functions/triggers)**: For functions requiring event-based execution
* **[Tasks](/docs/8base-console/custom-functions/tasks)**: For invocable and scheduled (cron) functions

All CFs must be declared in your projects 8base.yml file.

### Custom Function Arguments
All CFs receive the same function arguments when invoked; *event* and *ctx*. These arguments are positional, so you may rename them to whatever names you prefer.

##### event
When a CF is invoked, 8base will attempt to parse the request body and query string to add any parsed values to `event.data` attribute. However, the raw request body will always be available on at `event.body`. The `event` argument can be expected to have the following structure:

```json
{
	"event": {
	  "data": {
	    "arg1": "arg1 value",
	    "arg2": "arg2 value"
	  },
	  "headers": {
	    "x-header-1": "header value",
	    "x-header-2": "header value"
	  },
	  "body": "raw request body"
	}
}
```
##### ctx
The context argument - `ctx` - exposes 8base GraphQL and other APIs. It can be used to run Queries and Mutations from inside the CF and to call other functions.

```javascript
// Code...
ctx.api.gqlRequest(QUERY, { ...variables });
```

The `gqlRequest` method accepts an optional options object as it's third argument. On that `options` object, the `checkPermissions` option is available. By default, `checkPermissions=true` and any query run from inside the function gets scoped to the requester's permissions. When set to `false`, the query runs without checking permissions.

```javascript
if (runWithRolesEnforced) {
	ctx.api.gqlRequest(QUERY, VARIABLES);
} 
else if (runWithoutRolesEnforced) {
	ctx.api.gqlRequest(QUERY, VARIABLES, { checkPermissions: false });
}
```

For obvious security reasons, `checkPermissions` is ONLY available from within custom functions. It cannot be used when making requests from client applications.

As opposed to using `checkPermissions` option, [API Tokens](/docs/8base-console/roles-and-permissions#api-tokens) associated with defined roles can be used to permission `gqlRequest` calls. This ability accommodates situations where permissions are required, but not in the context of the requesting user. To accomplish this, the API Token can be added as a bearer token to the call.

```javascript
await ctx.api.gqlRequest(QUERY, VARIABLES, { 
	headers: {
		Authorization: "Bearer <MY_API_TOKEN>"
	}
});
```

### Timeouts
All custom functions types have maximum 20 seconds execution time. After the execution time limit is reached the execution times out and returns an error. Please let us know if you have a use case where you need more than 20 seconds continuous execution. 

In some cases, you can reach a timeout when executing several functions sequentially, in order not to await them you can spawn background tasks using the `context.invokeFunction` API [described here](/docs/8base-console/custom-functions/tasks).

Sometimes your function reaches the 20s limit and also must be executed sequentially. In that case, to not spread the logic of the function across multiple tasks you could make one task and run it multiple times in a recursive manner as shown below:
```javascript
// Create `myLongTask` that contains all your logic
module.exports = async (event, ctx) => {
  const { param1, param2, param3, subtask = "operation1" } = event.data;

  switch (subtask) {
    case "operation1": {
      // first part of the long-run task
      console.log(param1);
      // run the next part
      await ctx.invokeFunction(
        "myLongTask",
        {
          subtask: "operation2",
          param2: "world",
        },
        {
          waitForResponse: false,
        }
      );
      break;
    }
    case "operation2": {
      // second part of the long-run task
      console.log(param2);
      // run the next part
      await ctx.invokeFunction(
        "myLongTask",
        {
          subtask: "operation3",
          param3: "!!!",
        },
        {
          waitForResponse: false,
        }
      );
      break;
    }
    case "operation3": {
      // third part of the long-run task
      console.log(param3);
      break;
    }
    default: {
      throw new Error(`Subtask ${subtask} not found`);
    }
  }

  return {
    data: {
      result: `${subtask}: done`,
    },
  };
};

// In some other custom function run that task
await ctx.invokeFunction(
  "myLongTask",
  {
    param1: "Hello",
  },
  {
    waitForResponse: false,
  }
);
```

### Managing Dependencies
8base deploys CFs to a Node.js 10 runtime environment in which any compatible NPM dependencies are supported. On deploy, the system will check whether or not your dependencies have been installed and handle that accordingly. As expected, deploys run significantly faster when dependencies are installed locally. Feel free to use either NPM or Yarn as your package manager during development.

### Development Tips
CFs are developed in a local development environment and then deployed to a given workspace using the [8base CLI](/docs/development-tools/cli). When in development, they can be invoked locally for testing purposes. 

Using the `8base generate` command is recommended when creating new functions. Doing so provides a recommended folder structure that helps keep everything organized when developing CFs locally, including a `mocks` directory and management of the `8base.yml` file.

```bash
$ 8base generate resolver findPossumly

=> Updated file 8base.yml
Created file src/resolvers/findPossumly/handler.ts
Created file src/resolvers/findPossumly/mocks/request.json
Created file src/resolvers/findPossumly/schema.graphql

Boom! Your new findPossumly function has been successfully generated. 
To add any required settings, check out its configuration block in your projects 8base.yml file.
```

Inside a functions `handler.(js|ts)` file the command that's needed to begin invoking the function locally get automatically generated - along with the required resources for its execution. The benefit of this is the ability to quickly test your functions locally using the CLI and a well defined request object.

```javascript
/**
 * src/resolvers/findPossumly/handler.ts
 * 
 * To invoke this function locally, run:
 *  8base invoke-local findPossumly -p src/resolvers/findPossumly/mocks/request.json
 */

// Code...
```
