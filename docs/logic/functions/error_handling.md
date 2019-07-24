In order to return an error or a list of errors from a custom function you can always manually set the `errors` property of the returned object. 8base also has a convenient mechanism that allows you to use `throw`. Throwing an error is equivalent to returning the following object:

* For resolvers and triggers:
[block:code]
{
  "codes": [
    {
      "code": "// throw new Error(\"Error message\") =>\nreturn {\n  data: null,\n  errors: [{\n    message: error.message,\n    code: error.code,\n  }]\n}",
      "language": "javascript",
      "name": "throw.js"
    }
  ]
}
[/block]
* For webhooks:
[block:code]
{
  "codes": [
    {
      "code": "// throw new Error(\"Error message\") =>\nreturn {\n  statusCode: 500,\n  body: error.message\n}",
      "language": "javascript",
      "name": "throw.js"
    }
  ]
}
[/block]
