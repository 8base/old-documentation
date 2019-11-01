# Connecting to the API
{% youtube src="https://www.youtube.com/watch?v=gLM-Fc6gWlE" %}{% endyoutube %}

An 8base Workspace API is a single endpoint from which **all** workspace data can be queried. Simply put, it's the single source of truth for an applications data.

{% hint style="info" %}
### Workspace Endpoint Anatomy

```
https://api.8base.com/<WORKSPACE_ID>
```
{% endhint %}

All requests made to a workspace endpoint must be done either using a GraphQL client or an HTTP POST request - the only exception is when using [webhook custom functions](https://docs.8base.com/8base-console/custom-functions/webhooks). We highly recommend using a GraphQL client, like [8base SDK](https://docs.8base.com/development-tools/sdk/api-client) or [Apollo Client](https://github.com/apollographql/apollo-client). That said, it doesn't matter what technology you're using for a client - or server - application. As long as you can perform HTTP web requests, you'll be able to connect to query a workspace endpoint.

### Setup
In the following examples, we've made a few assumptions (feel free to re-create them for your learnings sake!). Those assumptions are the following:

1. You manage a workspace named *Todo's Workspace*
2. You've defined a table named *Todos*
3. The *Todos* table has the following fields:
   * `text: text`
   * `completed: switch, { format: Yes/No }`
4. One or more *Todos* records have been created
5. An API token has been created for a role named *Developer*.
6. Guest users are permitted Create, Read, Update, Delete (CRUD) access to the *Todos* table

### Executing API Calls
In all of the following examples, make sure to replace all occurances of `{API_ENDPOINT}` with your workspace's endpoint and all occurances of `{API_TOKEN}` with your developer API token.

#### Example GraphQL Query
In this query, we're querying a list of todos using the `todosList` operation. If successfull, the `text` field of each item in the list will be returned. 

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl -X POST {API_ENDPOINT} \
     -H "Content-Type: application/json"  \
     -d '{ "query": "{ todosList { items { text } } }" }'
```
{% endcode-tabs-item %}

{% code-tabs-item title="JavaScript" %}
```javascript
// 'graphql-request' or other GraphQL library is required
const { request } = require('graphql-request')
const ENDPOINT = `{API_ENDPOINT}`

const GET_TODOS = `
query {
  todosList {
    items {
      text
    }
  }
}
`

request(ENDPOINT, GET_TODOS).then((r) => console.log(r.todosList.items))
```
{% endcode-tabs-item %}

{% code-tabs-item title="Python" %}
```python
# `graphqlclient` or other GraphQL library is required
from graphqlclient import GraphQLClient

client = GraphQLClient('{API_ENDPOINT}')

result = client.execute('''
query {
  todosList {
    items {
      text
    }
  }
}
''')

print(result)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### Example GraphQL Mutation
In this mutation, we're using the `todoCreate` operation to create a new note with both `text` and `completed` specified. If successful, the `id`, `text`, and `completed` fields will be returned.

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl -X POST {API_ENDPOINT} \
     -H "Content-Type: application/json" \
     -d '{ "query": "mutation TodoCreate { todoCreate(data: {text: \"from CURL\", completed: false}) {id text completed}}"}'
```
{% endcode-tabs-item %}

{% code-tabs-item title="JavaScript" %}
```javascript
// 'graphql-request' or other GraphQL library is required
const { request } = require('graphql-request')
const ENDPOINT = `{API_ENDPOINT}`

const MAKE_TODO = `
  mutation TodoCreate {
    todoCreate(
      data: {
        text: "from node",
        completed: false
    }) {
      id
      text
      completed
    }
  }
`
request(ENDPOINT, MAKE_TODO).then((r) => console.log(r))
```
{% endcode-tabs-item %}

{% code-tabs-item title="Python" %}
```python
# `graphqlclient` or other GraphQL library is required
from graphqlclient import GraphQLClient

client = GraphQLClient('{API_ENDPOINT}')

result = client.execute('''
mutation TodoCreate {
  todoCreate(
    data: {
      text: "from node",
      completed: false
  }) {
    id
    text
    completed
  }
}
''')

print(result)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### Example GraphQL Mutation with Authentication
In this mutation, we're using the `todoCreate` operation to create a new note while adding an API Token to authenticate the request. If successful, the `id`, `text`, and `completed` fields will be returned.

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl -X POST {API_ENDPOINT}\
     -H "Content-Type: application/json" \
     -H 'Authorization: Bearer {API_TOKEN}' \
     -d '{ "query": "mutation TodoCreate { todoCreate(data: {text: \"from CURL with auth\", completed: false}) {id text completed}} "}'
```
{% endcode-tabs-item %}

{% code-tabs-item title="JavaScript" %}
```javascript
// 'graphql-request' or other GraphQL library is required
const { request, GraphQLClient } = require('graphql-request')
const ENDPOINT = `{API_ENDPOINT}`

const MAKE_TODO = `
  mutation TodoCreate {
    todoCreate(
      data: {
        text: "from node",
        completed: false
    }) {
      id
      text
      completed
    }
  }
`

// create a new instance of GraphQLClient in order to add an authorization header
const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: 'Bearer {API_TOKEN}',
  },
})

// update the request function so it runs in the context of client
client.request(MAKE_TODO).then((r) => console.log(r))
```
{% endcode-tabs-item %}

{% code-tabs-item title="Python" %}
```python
# `graphqlclient` or other GraphQL library is required
from graphqlclient import GraphQLClient

client = GraphQLClient('{API_ENDPOINT}')
client.inject_token('Authorization','Bearer %s' % API_TOKEN)

result = client.execute('''
mutation TodoCreate {
  todoCreate(
    data: {
      text: "from node",
      completed: false
  }) {
    id
    text
    completed
  }
}
''')

print(result)
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### GraphiQL and other API Clients
It is not required that you use a script or the [8base API Explorer](https://docs.8base.com/8base-console/platform-tools/api-explorer) to explore your API. Dozens of great API clients exist that allow you to investigate your workspace API. We've added a list below of some of the ones that we like. Feel free to use one of them or find another that you love!

* [GraphiQL](https://github.com/skevy/graphiql-app) 
* [GraphiQL Online](https://graphiql-online.com/)
* [Postman](https://www.getpostman.com/)
* [GraphqlBin](https://www.graphqlbin.com/v2/new)