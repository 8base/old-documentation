# Tasks

Tasks are functions that can be invoked directly from other functions or executed on schedule. \[block:code\] { "codes": \[ { "code": "functions:\n myTask:\n handler:\n code: src/myTask.ts\n type: task", "language": "yaml", "name": "8base.yml" } \] } \[/block\]

\[block:api-header\] { "title": "Invoking tasks from other functions" } \[/block\] Functions like resolvers, triggers and webhooks usually run in response to user actions. Normally you'd want to return response to the user as soon as possible while offloading any longer-running processes to background tasks. In order to do so you can use the `context.invokeFunction(taskName, args, options)` method to invoke a background task.

Example:

```javascript
module.exports = async (event, context) => {
  const args = { param: "value" };
  const result = await context.invokeFunction('myTask', args, {
    waitForResponse: false
  });
}
```

The `waitForResponse: false` option tells the platform to resolve the promise immediately without waiting for the task to complete. If instead you'd like to wait for task result you can set `waitForResponse` to `true`.

The value of `args` is passed to the `event` argument of the invoked task. \[block:api-header\] { "title": "Scheduled tasks" } \[/block\] You can configure tasks to run on schedule using the `schedule` option as described below. \[block:code\] { "codes": \[ { "code": "functions:\n sendEmail:\n handler:\n code: src/sendEmail.ts\n type: task\n schedule: 'rate\(1 minute\)'", "language": "yaml", "name": "8base.yml" } \] } \[/block\] The `schedule` parameter accepts two types of expressions: Rate and Cron. You can check example expressions below or read detailed description of the syntax [here](https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html?shortFooter=true). \[block:api-header\] { "title": "Rate expressions" } \[/block\] `rate(Value Unit)` \[block:parameters\] { "data": { "h-0": "example", "h-1": "expression", "0-0": "Invoke task every 5 minutes", "0-1": "rate\(5 minutes\)", "1-0": "Invoke task every hour", "1-1": "rate\(1 hour\)", "2-0": "Invoke task every seven days", "2-1": "rate\(7 days\)" }, "cols": 2, "rows": 3 } \[/block\]

\[block:callout\] { "type": "info", "body": " _Rate frequencies of less than one minute are not supported.\n_ For a singular value the unit must be singular \(for example, `rate(1 day)`\), otherwise plural \(for example, `rate(5 days)`\).", "title": "Note" } \[/block\]

\[block:api-header\] { "title": "Cron expressions" } \[/block\] `cron(Minutes Hours Day-of-month Month Day-of-week Year)`

\[block:parameters\] { "data": { "h-0": "example", "h-1": "expression", "0-0": "Invoke task at 10:00am \(UTC\) everyday", "0-1": "cron\(0 10 _\_ ?_ \)", "1-0": "Invoke task at 12:15pm \(UTC\) everyday", "1-1": "cron\(15 12 __? _\)", "2-0": "Invoke task at 06:00pm \(UTC\) every Mon-Fri", "2-1": "cron\(0 18 ? \_MON-FRI_ \)", "3-0": "Invoke task every 10 min Mon-Fri", "3-1": "cron\(0/10 _?_ MON-FRI _\)", "4-0": "Invoke task every 5 minutes Mon-Fri between 8:00am and 5:55pm \(UTC\)", "4-1": "cron\(0/5 8-17 ?_ MON-FRI _\)", "5-0": "Invoke task at 9 a.m. \(UTC\) the first Monday of each month", "5-1": "cron\(0 9 ?_ 2\#1 \*\)" }, "cols": 2, "rows": 6 } \[/block\]

\[block:callout\] { "type": "info", "title": "Note", "body": " _Cron expressions that lead to rates faster than one minute are not supported.\n_ One of the day-of-month or day-of-week values must be a question mark \(?\)." } \[/block\]

\[block:callout\] { "type": "warning", "title": "Environment variables", "body": "Currently environment variables are not supported inside tasks. We are working on resolving this limitation shortly." } \[/block\]

