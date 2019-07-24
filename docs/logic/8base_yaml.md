`8base.yml` is the main configuration file where you define how custom functions get exposed and called as well as the list of custom permissions that can restrict access to certain paths in your code.

The file has two main sections:
  * `functions` - list and configure all your custom functions. Read more on how to configure functions [here](functions). 
  *  `permissions` - list custom permissions that can be used in your code. More [here](permissions-1).
[block:api-header]
{
  "title": "Example configuration"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "functions:\n  resolverExample:\n    handler:\n      code: src/resolverFunc.ts\n    type: resolver\n    schema: src/resolverFunc.graphql\n\n  triggerBefore:\n    handler:\n      code: src/triggerBefore.ts\n    type: trigger.before\n    operation: TableName.create\n\n  triggerAfter:\n    handler:\n      code: src/triggerAfter.ts\n    type: trigger.after\n    operation: TableName.create\n  \n  webhookExample:\n    handler:\n      code: src/webhookFunc.ts\n    type: webhook\n    path: webhook_url #optional, default: function name\n    method: POST\n    \n  taskExample:\n    handler:\n      code: src/taskFunc.ts\n    type: task\n    schedule: 'rate(1 minute)'",
      "language": "yaml",
      "name": "8base.yml"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Data schema management",
  "body": "Currently 8base CLI doesn't provide a way to manage the data schema. We are working on this and plan to add data schema management, including migrations, in the near future."
}
[/block]
