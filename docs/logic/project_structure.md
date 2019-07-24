A typical project structure looks like this:

```
├── src/
|   ├── function1.ts
|   └── function2.js
├── 8base.yml
└── package.json
```

This is a regular Node.js project. You can add dependencies via `npm` or `yarn`. 8base CLI comes with Webpack and TypeScript pre-configured out of the box. This allows you to write code in JavaScript or TypeScript. `async/await` is also supported.

`8base.yml` is used to configure custom functions and permissions. You can read more about it [here](8baseyml).