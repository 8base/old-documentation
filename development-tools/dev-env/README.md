# Development Environment

8base CLI provides a set of tools to assist with viewing remote logs as well as debugging functions locally.

### Logs

In order to view logs from remote function execution use:

`8base logs [FUNCTION NAME]`.

Optional parameters `-n` and `-t` allow you to specify number of lines returned as well as continuously stream logs in your terminal (tail). \

### Invoke functions locally

For testing purposes you can execute functions locally and supply a JSON value for the `event` parameter:

`8base invoke-local [FUNCTION NAME] -j '{ "data": { "key1": "val1" }}'`.

You can specify JSON inline using the `-j` option or a path to a file with JSON using `-p` option.

_To test this feature, implement the `hello` resolver from_ [_Resolvers_](doc:resolvers) _and run the following command in your CLI._

`8base invoke-local hello -j '{ "data": { "name": "Bob" } }'`

{% hint style="info" %}
##### Environment Variables

If you'd like to set environment variables while running `invoke-local` there are a couple of options. You can either include variables directly in the command, such as:

`VAR1=test 8base invoke-local hello\n`

you can also create a `.env` file with variables and use it as follows:

`env $(cat .env | xargs) 8base invoke-local hello`
{% endhint %}


### Invoke functions remotely

Similarly to `invoke-local` you can execute functions remotely using:

`8base invoke [FUNCTION NAME] -j '{ "data": { "key1": "val1" }}'`
