# Project Structure

A typical project structure looks like this:

```text
├── src/
|   ├── function1.ts
|   └── function2.js
├── 8base.yml
└── package.json
```

This is a regular Node.js project. You can add dependencies via `npm` or `yarn`. 8base CLI comes with Webpack and TypeScript pre-configured out of the box. This allows you to write code in JavaScript or TypeScript. `async/await` is also supported.

`8base.yml` is used to configure custom functions and permissions. You can read more about it [here](https://github.com/8base/Documentation/tree/4df3b0cc7b342fe0d3468fbf0a5cafa597c6f037/docs/logic/8baseyml/README.md).

