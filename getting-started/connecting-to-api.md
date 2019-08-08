# Connecting to the API

8base provisions all database tables with over one-dozen built-in GraphQL schemas. These resources allow you to perform any Create, Read, Update and Delete \(CRUD\) action needed to effectively manage your data. Additionally, it doesn't matter what technology you're using for a client - or server - application. As long as you can perform web requests, you'll be able to connect to your 8base workspace endpoints.

### Setup

In the following examples, we've made a few assumptions \(feel free to re-create them for your learnings sake!\). Those assumptions are the following:

1. You manage a workspace named _Todo's Workspace_
2. You've defined a table named _Todos_
3. The _Todos_ table has the following fields:
   * `text: text`
   * `completed: switch, { format: Yes/No }`
4. One or more _Todos_ records have been created
5. Guest users are permitted CRUD access on the _Todos_ table
6. An API token has been created for a role named _Developer_.

### Executing API Calls

In all of the following examples, make sure to replace all occurances of `{API_ENDPOINT}` with your workspace's endpoint and all occurances of `{API_TOKEN}` with your developer API token.

#### Example GraphQL Query

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl  -X POST \
    -H "Content-Type: application/json"  \
    --data '{ "query": "{ todosList { items { text } } }" }'  \
    {API_ENDPOINT}
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

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL\", completed: false}) {id text completed}}"}' \
  {API_ENDPOINT}
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

{% code-tabs %}
{% code-tabs-item title="Bash" %}
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H 'Authorization: Bearer {API_TOKEN}' \
  --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL with auth\", completed: false}) {id text completed}}"}' \
  {API_ENDPOINT}
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
