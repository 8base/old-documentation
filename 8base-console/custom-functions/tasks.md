# Tasks

A *task* is a type of function that can be invoked directly from other functions or executed on a specified interval. This allows for cron job like execution of your custom functions and is great for re-occurring tasks.


### 8base.yml
A task can either be specified to run on a schedule or not. If not, it is then only expected to run whenever called by another custom function. The schedule parameter accepts by the minute, hourly, or daily intervals.

```yaml
functions:
  #
  # Declare tasks like so.
  sendEmail:
    handler:
      code: src/sendEmail.ts
    type: task
  #
  # Declare tasks (scheduled tasks) like so.
  sendWeeklyReport:
    handler:
      code: src/sendWeeklyReport.ts
    type: task
    schedule: 'rate(7 days)'
```

##### Non-scheduled function calls
Functions like resolvers, triggers and webhooks usually run in response to user actions. Normally, you'd want to return a response to the user as soon as possible while offloading any longer-running processes to background tasks. In order to do so you can use the `invokeFunction(taskName, args, options)` method found on the context argument to invoke a background task.

```javascript
// Context (ctx) argument maintains the invokeFunction method for
//invoking tasks from other functions.
module.exports = async (event, ctx) => {
  const args = { param: 'value' }

  await context.invokeFunction('myTask', args, {
    waitForResponse: false
  })
}
```

The `options.waitForResponse (default: false)` property tells the platform to resolve the promise immediately without waiting for the task to complete. If instead you'd like to wait for the task result you can set `waitForResponse` to `true`.

*Note: The value of `args` is passed to the `event.data` property of the invoked task.*

### Scheduled tasks
You can configure tasks to run on schedule using the `schedule` option in the 8base.yml declaration. The `schedule` parameter accepts two types of expressions: Rate and Cron - both of which specify a scheduled invocation on a re-occuring schedule.

##### Rate expressions
`rate(Value Unit)`

| Expression | Instruction |
| :--- | :--- |
| rate(5 minutes) | Invoke task every 5 minutes |
| rate(1 hour) | Invoke task every hour |
| rate(7 days) | Invoke task every seven days |

{% hint style="warning" %}
##### Singular vs. Plural

For a singular value (1) the unit must be written as singular, otherwise it needs to be plural - rate(**1 day** *vs.* **5 days**).
{% endhint %}

##### Cron expressions
`cron(Minutes Hours Day-of-month Month Day-of-week Year)`

| Expression | Instruction |
| :--- | :--- |
| cron(0 10 ? *) | Invoke task at 10:00am (UTC) everyday |
| cron(15 12 ? *) | Invoke task at 12:15pm (UTC) everyday |
| cron(0 18 ? MON-FRI ) | Invoke task at 06:00pm (UTC) every Mon-Fri |
| cron(0/10 ? MON-FRI *) | Invoke task every 10 min Mon-Fri |
| cron(0/5 8-17 ? MON-FRI ) | Invoke task every 5 minutes Mon-Fri between 8:00am and 5:55pm (UTC) |
| cron(0 9 ? 2#1 ) | Invoke task at 9 a.m. (UTC) the first Monday of each month |

Cron expressions that lead to rates faster than one invocation/minute are not supported. Additionally, one of the day-of-month or day-of-week values must be a question mark (?).

{% hint style="info" %}
##### Cron Docs

Check example expressions and read a detailed description of cron syntax [here](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html?shortFooter=true).
{% endhint %}

### Task Arguments
To learn about the arguments that are passed to tasks, review the [custom function arguments docs.](./README.md#custom-function-arguments)
