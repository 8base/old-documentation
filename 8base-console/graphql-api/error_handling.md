# Error Handling

In order to return an error or a list of errors from a custom function you can always manually set the `errors` property of the returned object. 8base also has a convenient mechanism that allows you to use `throw`. Throwing an error is equivalent to returning the following object:

* For resolvers and triggers:

```javascript
// throw new Error("Error message") =>
return {
  data: null,
  errors: [{
    message: error.message,
    code: error.code,
  }]
}
```

* For webhooks:

```javascript
// throw new Error("Error message") =>
return {
  statusCode: 500,
  body: error.message
}
```