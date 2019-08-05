# 8base Config

`8base.yml` is the main configuration file where you define how custom functions get exposed and called as well as the list of custom permissions that can restrict access to certain paths in your code.

The file has two main sections:

* `functions` - list and configure all your custom functions. Read more on how to configure functions [here](../../8base-console/custom-functions/README.md). 
* `permissions` - list custom permissions that can be used in your code. More [here](../../8base-console/roles-permissions.md).

### Example 8base.yml

```yaml
functions:
  resolverExample:
    handler:
      code: src/resolverFunc.ts
    type: resolver
    schema: src/resolverFunc.graphql

  triggerBefore:
    handler:
      code: src/triggerBefore.ts
    type: trigger.before
    operation: TableName.create

  triggerAfter:
    handler:
      code: src/triggerAfter.ts
    type: trigger.after
    operation: TableName.create
  
  webhookExample:
    handler:
      code: src/webhookFunc.ts
    type: webhook
    path: webhook_url #optional, default: function name
    method: POST
    
  taskExample:
    handler:
      code: src/taskFunc.ts
    type: task
    schedule: 'rate(1 minute)'
```
