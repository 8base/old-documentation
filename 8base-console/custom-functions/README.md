# Custom Functions

In 8base, pretty much everything is extensible when using *Custom Functions* (CFs). If you want to extend your GraphQL API, add custom endpoints, or build some other server side functionality, CFs will be the answer. So, how do they work?

CFs in 8base are essentially AWS Lambdas that get enriched with access to your workspace resources. For example, 8base makes sure you're able to access the workspace's environment variables and database from within a CF by default. CFs can be written in either JavaScript or TypeScript (we'll package them for you... so no need to worry about Babel) and be deployed in a matter of minutes.

### Highlights
* **Serverless execution:** Once deployed, CFs are ready to scale from 1 to 1,000,000+ calls thanks to serverless design
* **JavaScript + TypeScript:** Write in JavaScript or TypeScript and 8base will compile it as needed
* **Predefined Triggers:** 8base currently offers four types of CF triggers that will cover 99.999% of requirements
* **Easily Permissioned:** As with most 8base features, authorizing CFs can be easily configered in the *Role Manager*

### Custom Function Types
There are 4-types of CFs made available on 8base that we will go over in depth in the following 4 sections. They are:

* [**Resolvers**](./resolvers.md): For extending your GraphQL API
* [**Webhooks**](./webhooks.md): For declaring RESTful endpoints (GET, POST, DELETE, etc...)
* [**Triggers**](./triggers.md): For functions that require event base execution
* [**Tasks**](./tasks.md): For functions that need to be scheduled and re-occuring (cron jobs)

All CFs must be declared in your projects 8base.yml file.

### Custom Function Arguments
All CFs recieve the same function arguments when invoked; *event* and *ctx*. These arguments are positional, so you may rename them to whatever names you prefer.

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
ctx.api.gqlRequest(QUERY, { ...parameters });
```

### Managing Dependencies
8base deploys CFs to a Node.js 8.10 runtime environment in which any compatible NPM dependencies are supported. On deploy, the system will check whether or not your dependencies have been installed and handle that accordingly. As expected, deploys run significantly faster when dependencies are installed locally. Feel free to use either NPM or Yarn as your package manager during development.

### Development Tips
CFs are developed in a local development environment and then deployed to a given workspace using the [8base CLI](../../development-tools/cli/README.md). When in development, they can be invoked locally for testing purposes. A folder structure we suggest when developing CFs locally is to have a `mocks` directories containing any desired request mock.

```bash
my-project
├── 8base.yml
└── src
    └── resolvers
        ├── mocks
	    │   └── request.json
        ├── hello.graphql
        └── hello.ts
```

The benefit of this is the ability to quickly test your functions locally using the CLI and a well defined request object. For example - we're I in the root of this 8base project - I'd be able to invoke my function locally using the `request.json` mock by running:

```bash
$ 8base invoke-local helloResolver -p src/resolvers/mocks/request.json
```
