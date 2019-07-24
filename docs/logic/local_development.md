8base CLI provides a set of tools to assist with debugging functions locally as well as viewing remote logs.
[block:api-header]
{
  "title": "Logs"
}
[/block]
In order to view logs from remote function execution use:
 
`8base logs [FUNCTION NAME]`. 

Optional parameters `-n` and `-t` allow you to specify number of lines returned as well as continuously stream logs in your terminal (tail).
[block:api-header]
{
  "title": "Invoke function locally"
}
[/block]
For testing purposes you can execute functions locally and supply JSON value for `event` parameter: 

`8base invoke-local [FUNCTION NAME] -j '{ "data": { "key1": "val1" }}'`. 

You can specify JSON inline using the `-j` option or path to a file with JSON using `-p` option.

*To test this feature, implement the `hello` resolver from [Resolvers](doc:resolvers) and run the following command in your CLI.* 

`8base invoke-local hello -j '{ "data": { "name": "Bob" } }'`
[block:callout]
{
  "type": "info",
  "title": "Environment variables",
  "body": "If you'd like to set environment variables while running `invoke-local` there are a couple of options. You can either include variables directly in the command, such as:\n```\nVAR1=test 8base invoke-local hello\n```\nyou can also create a `.env` file with variables and use it as follows:\n```\nenv $(cat .env | xargs) 8base invoke-local hello\n```"
}
[/block]

[block:api-header]
{
  "title": "Invoke function remotely"
}
[/block]
Similarly to `invoke-local` you can execute functions remotely using: 

`8base invoke [FUNCTION NAME] -j '{ "data": { "key1": "val1" }}'`