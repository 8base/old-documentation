Here we have defined a simple "Hello World" resolver to be added to the 8base GraphQL API.
[block:code]
{
  "codes": [
    {
      "code": "functions:\n  hello:\n    handler:\n      code: src/hello.js\n    type: resolver\n    schema: src/hello.graphql",
      "language": "yaml",
      "name": "8base.yml"
    },
    {
      "code": "type HelloResult {\n  result: String!\n}\n\nextend type Mutation {\n  hello(name: String): HelloResult\n}\n\n# Alternatively:\n# extend type Query {\n#   hello(name: String): HelloResult\n# }",
      "language": "text",
      "name": "hello.graphql"
    },
    {
      "code": "module.exports = event => {\n  const name = event.data.name;\n  \n  return {\n    data: {\n      result: `Hello ${name}!`\n    }    \n  }\n};",
      "language": "javascript",
      "name": "hello.js"
    }
  ]
}
[/block]
Call this function via the CLI using the following syntax:

`8base invoke-local hello -j '{ "data": { "name": "Bob" } }'`

The response should look like this:

```
Result:
{
  "data": {
    "result": "Hello Bob!"
  }
}
```