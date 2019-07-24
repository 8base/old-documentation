A resolver is a type of function that is exposed in the GraphQL API and can be directly called from the front-end app. Resolvers allow you to add custom queries and mutations in addition to auto-generated CRUD operations. Resolvers are used to integrate 3rd party APIs, query data from blockchain networks or run custom algorithms.

Resolver configuration consist of three elements:
1. `8base.yml` configuration
2. A file with the code
3. GraphQL file extending the API schema
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

[block:api-header]
{
  "title": "Input and output"
}
[/block]
Input arguments of a custom mutation or query are stored in the `event.data` object. In the example above `event.data` equals:
[block:code]
{
  "codes": [
    {
      "code": "{\n  name: \"Some string\"\n}",
      "language": "json",
      "name": "event.data"
    }
  ]
}
[/block]
The value returned by a resolver is allowed two properties: `data` and `errors`. The format of the `data` property should conform to the schema defined in the .graphql file.
[block:code]
{
  "codes": [
    {
      "code": "return {\n  data: {\n    result: \"Hello world\"\n  },\n  errors: [{\n    message: \"Error message\",\n    code: \"error_code\"\n  }]\n}",
      "language": "javascript",
      "name": "return"
    }
  ]
}
[/block]
