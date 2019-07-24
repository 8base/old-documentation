Trigger is a type of function that runs in response to a data mutation event: creating, updating or deleting an object. There are two types of triggers based on whether they run before or after the data is modified: `trigger.before` and `trigger.after`.

`operation` parameter defines what data type and event the trigger should listen to. For example, if we want to execute it after a `User` has been created we should specify `User.create`. Possible values for the data event are `create`, `update` and  `delete`.
[block:api-header]
{
  "title": "trigger.before"
}
[/block]
This type of trigger is executed before the data is written to the database. It allows you to validate or modify the data before saving it in the database. 

This type of trigger is great for:
* Validation
* Triggering 3rd party APIs and saving results along with the data (e.g. the status of an operation)
[block:code]
{
  "codes": [
    {
      "code": "functions:\n  triggerBefore:\n    handler:\n      code: src/triggerBefore.js\n    type: trigger.before\n    operation: User.create",
      "language": "yaml",
      "name": "8base.yml"
    },
    {
      "code": "module.exports = event => {\n  const { password, passwordConfirm } = event.data;\n  \n  if (password != passwordConfirm) {\n    // Throwing an error will cancel the operation and data will not be inserted\n    throw new Error('Passwords don\\'t match');\n  }\n  \n  // You can modify what goes into the database\n  return {\n    data: {\n      ...event.data,\n      status: 'confirmed'\n    }\n  }\n}",
      "language": "javascript",
      "name": "triggerBefore.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "trigger.after"
}
[/block]
`trigger.after` is executed after the data has been successfully saved in the database. It can be used to do any post-processing or to enrich the returned data. For example, after creating a new calendar event you might want to send an email notification alerting users they were invited.
[block:code]
{
  "codes": [
    {
      "code": "functions:\n  triggerAfter:\n    handler:\n      code: src/sendInvite.js\n    type: trigger.after\n    operation: CalendarEvent.create",
      "language": "yaml",
      "name": "8base.yml"
    },
    {
      "code": "const sampleEmailService = require('./sampleEmailService');\n\nmodule.exports = async event => {\n  const { invitees } = event.data;\n  \n  let sent = false;\n  try {\n    await sampleEmailService.sendInvites(invitees);\n    sent = true;\n  } catch(e) {\n    console.error('Error sending invites: ', e);\n  }\n  \n  // You can modify the returned response\n  return {\n    data: {\n      ...event.data,\n      sent      \n    }\n  }\n}",
      "language": "javascript",
      "name": "sendInvite.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Input and output"
}
[/block]
Triggers are designed such that you can always return the `event` object unaltered. This can be useful if you don't want to modify the value stored in the database or returned by the API. The code below has no effect and simply passes the data through:
[block:code]
{
  "codes": [
    {
      "code": "module.exports = event => {\n  return event;\n}",
      "language": "javascript",
      "name": "passThrough.js"
    }
  ]
}
[/block]
* `trigger.before` receives mutation parameters in `event.data`.

* `trigger.after` receives an output of a mutation in the `event.data` property. However, sometimes you need parameters that were originally passed in the mutation. `event.originalData` property keeps the original input object.

The value returned by a trigger has two properties: `data` and `errors`. For example:
[block:code]
{
  "codes": [
    {
      "code": "return {\n  data: {\n    ...event.data\n  },\n  errors: [{\n    message: \"Error message\",\n    code: \"error_code\"\n  }]\n}",
      "language": "javascript",
      "name": "return"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Getting version of object before mutation"
}
[/block]
`event.originalObject` contains the version of the object before the mutation was applied to it. This is useful when you need to compare objects before and after the mutation to find out what fields changed.