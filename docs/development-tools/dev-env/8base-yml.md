# 8base Config

`8base.yml` is the main configuration file where you define how custom functions get exposed and called as well as the list of custom permissions that can restrict access to certain paths in your code.

The file has one main section:

* `functions` - list and configure all your custom functions. Read more on how to configure functions [here](https://docs.8base.com/docs/8base-console/custom-functions). 


### Example 8base.yml

```yaml
functions:
  resolverExample:
    handler:
      code: src/resolverFunc.ts
    type: resolver
    schema: src/resolverFunc.graphql
    description: |
      An optional description of your resolver function.

  triggerBefore:
    handler:
      code: src/triggerBefore.ts
    type: trigger.before
    operation: TableName.create
    description: |
      An optional description of your trigger function.

  triggerAfter:
    handler:
      code: src/triggerAfter.ts
    type: trigger.after
    operation: TableName.create
    description: |
      An optional description of your trigger function.
  
  webhookExample:
    handler:
      code: src/webhookFunc.ts
    type: webhook
    path: webhook_url #optional, default: function name
    method: POST
    description: |
      An optional description of your webhook function.
    
  taskExample:
    handler:
      code: src/taskFunc.ts
    type: task
    schedule: 'rate(1 minute)'
    description: |
      An optional description of your task function.
```
