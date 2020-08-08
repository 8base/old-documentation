# Triggers

A *trigger* is a type of function that runs in response to a data mutation event (i.e, while creating, updating or deleting an object). This allows for important actions to run as callbacks to your data commits, without cluttering up client apps with web requests.

### 8base.yml
There are two type qualifiers for triggers based on whether they run before or after the data is modified: `trigger.before` and `trigger.after`. The `operation` parameter defines what data type and event the trigger should listen to. For example, if we want to execute it after a `User` has been created we should specify `User.create`. Possible values for the data event are `create`, `update` and `delete`.

```yaml
function:
  #
  # Declare custom triggers like so.
  helloTrigger:
    handler:
      code: src/triggerBefor.ts
    type: trigger.before
    operation: User.create
```

<!--{% hint style="info" %}-->
##### *operation* Options
When defining an *operation*, use: `<TableName>.(create|update|delete)`
<!--{% endhint %}-->

### trigger.before
This type of trigger is executed before the data is written to the database. It allows you to validate or modify the data before saving it in the database.

```javascript
module.exports = event => {
  const { password, passwordConfirm } = event.data;

  if (password != passwordConfirm) {
    // Throwing an error will cancel the operation and data will not be inserted
    throw new Error('Passwords don\'t match');
  }

  // You can modify what goes into the database
  return {
    data: {
      ...event.data,
      status: 'confirmed'
    }
  }
}
```

### trigger.after
This type of trigger is executed after the data has been successfully saved in the database. It can be used to do any post-processing or to enrich the returned data. For example, after creating a new calendar event you might want to send an email notification alerting users they were invited.

```javascript
const sender = require('email-service');

module.exports = async event => {
  const { invitees } = event.data;

  let sent = false;
  try {
    await sender.sendInvites(invitees);
    sent = true;
  } catch(e) {
    console.error('Error sending invites: ', e);
  }

  // You can modify the returned response
  return {
    data: {
      ...event.data,
      sent
    }
  }
}
```

### Trigger Arguments
Alike the [standard custom function arguments](https://docs.8base.com/docs/8base-console/custom-functions/#custom-function-arguments), a *trigger.after* type function receives the output of a mutation in the `event.data` property. However, sometimes parameters that were originally passed in the mutation are needed. Therefore, the `event` object is enriched to have a `event.originalData` property which maintains the original input object.

`event.originalObject` also contains the version of the object before the mutation was applied to it. This is useful when you need to compare objects before and after the mutation to find out what fields changed.

```json
{
  // Data returned
  "data": {...},
  // Data sent
  "originalData": {...},
  // Original data record
  "originalObject": {...} // or null,
  // Request headers
  "headers": {...}
}
```

To learn more about the arguments that are passed to triggers, review the [custom function arguments docs.](https://docs.8base.com/docs/8base-console/custom-functions/#custom-function-arguments)

### Trigger Response
The value returned by a *trigger* is allowed two properties: *data* and *errors*.

```javascript
return {
  data: {
    ...event.data
  },
  errors: [{
    message: "Error message",
    code: "error_code"
  }]
}
```
