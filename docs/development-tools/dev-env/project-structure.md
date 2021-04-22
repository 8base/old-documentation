# Project Structure
When using the [8base CLI](/docs/development-tools/cli) to create a new project with all default options, it will create a directory structure that resembles the following:

```text
Building a new project called ExampleProject 🚀

ExampleProject
├── .workspace.json
├── 8base.yml
├── package.json
└── src
    ├── resolvers
    │   └── resolver
    │       ├── handler.ts
    │       ├── mocks
    │       │   └── request.json
    │       └── schema.graphql
    ├── tasks
    │   └── task
    │       ├── handler.ts
    │       └── mocks
    │           └── request.json
    ├── triggers
    │   └── trigger
    │       ├── handler.ts
    │       └── mocks
    │           └── request.json
    └── webhooks
        └── webhook
            ├── handler.ts
            └── mocks
                └── request.json

🎉 Project ExampleProject was successfully created 🎉
```

All the dependencies can be installed using `npm` or `yarn`. Additionally, the 8base CLI comes with Webpack and TypeScript pre-configured. This allows you to write code in JavaScript or TypeScript in your custom functions, as well as use `async/await`.

Following this project structure is valuable for staying organized and getting the most out of 8base's CLI. For example, the CLI's [generator commands](/docs/development-tools/cli/generators) offer great convenience for scaffolding new resources and will add generated files using pattern seen above (`src/<functionType>/<functionName>/**/*`).

## Server vs. Client
It's very common that developers wish to commit their server-side and client-side code to the same git repository. In such situations, we suggest cleanly seperating the two directories at the project's root level. This will prevent a number of errors that would otherwise occure when installing dependencies and deploying code.

Try using the following directory structure when committing server-side and client-side code to the same git repository:

```text
ExampleProject
├── README.md
├── client/
└── server/
```
