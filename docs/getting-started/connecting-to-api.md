# Connecting to the API

<YoutubePlayer src="https://www.youtube.com/embed/gLM-Fc6gWlE"/>

An 8base Workspace API is a single endpoint from which **all** data sources can be queried. Simply put, it's the single source of truth for an application's data.

**Workspace Endpoint Anatomy**

```
https://api.8base.com/<WORKSPACE_ID>
```

All requests made to a workspace endpoint must be run using either a GraphQL client or an HTTP POST request - the only exception is when using [webhook custom functions](https://docs.8base.com/8base-console/custom-functions/webhooks). We highly recommend using a GraphQL client like the [8base SDK](https://docs.8base.com/development-tools/sdk/api-client) or [Apollo Client](https://github.com/apollographql/apollo-client).

That said, it doesn't matter what technology you use for the client - or server - application. As long as you can perform HTTP requests, you'll be able to query a workspace endpoint.

## Setup

In the following examples, we've made a few assumptions (feel free to re-create them for your learnings sake!). Those assumptions are the following:

1. An workspace API Token has been created.
2. You've defined a table named _Todos_ in a workspace.
3. The _Todos_ table has a `text` and `completed` field.
4. Guest users are permitted Create, Read, Update, Delete (CRUD) access to the _Todos_ table

## Executing API Calls

In all of the examples that follow, make sure to replace any occurance of `{API_ENDPOINT}` with your workspace's endpoint and `{API_TOKEN}` with your developer API token.

The examples provided are in Bash, JavaScript, and Python.

### Example GraphQL Query

In this query, we're querying a list of todos using the `todosList` operation. If successfull, the `text` field of each item in the list will be returned.

**Curl**
```bash
curl -X POST {API_ENDPOINT} \
    -H "Content-Type: application/json" \
    -d '''{
      "query": "mutation TodoCreate {
        todoCreate(data: {
          text: \"from CURL\",
          completed: false
        }) {
          id
          text
          completed
        }
      }"
    }'''
```

**Javascript**
```js
// 'graphql-request' or other GraphQL library is required
const { request } = require("graphql-request");
const ENDPOINT = "{API_ENDPOINT}";

const GET_TODOS = `
query {
  todosList {
    items {
      text
    }
  }
}
`;

request(ENDPOINT, GET_TODOS).then(r => console.log(r.todosList.items));
```

**Python**
```py
# 'graphqlclient' or other GraphQL library is required
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

### Example GraphQL Mutation

In this mutation, we're using the `todoCreate` operation to create a new note with both `text` and `completed` specified. If successful, the `id`, `text`, and `completed` fields will be returned.

**Curl**
```bash
curl -X POST {API_ENDPOINT} \
     -H "Content-Type: application/json" \
     -d '{ "query": "mutation TodoCreate { todoCreate(data: {text: \"from CURL\", completed: false}) {id text completed}}"}'
```

**Javascript**
```javascript
// 'graphql-request' or other GraphQL library is required
const { request } = require("graphql-request");
const ENDPOINT = `{API_ENDPOINT}`;

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
`;
request(ENDPOINT, MAKE_TODO).then(r => console.log(r));
```

**Python**
```py
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

### Example GraphQL Mutation with Authentication

In this mutation, we're using the `todoCreate` operation to create a new note while adding an API Token to authenticate the request. If successful, the `id`, `text`, and `completed` fields will be returned.

**Curl**
```bash
curl -X POST {API_ENDPOINT}\
     -H "Content-Type: application/json" \
     -H 'Authorization: Bearer {API_TOKEN}' \
     -d '{ "query": "mutation TodoCreate { todoCreate(data: {text: \"from CURL with auth\",
     completed: false}) {id text completed}} "}'
```

**Javascript**
```javascript
// 'graphql-request' or other GraphQL library is required
const { request, GraphQLClient } = require("graphql-request");
const ENDPOINT = `{API_ENDPOINT}`;

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
`;

// create a new instance of GraphQLClient in order to add an authorization header
const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: "Bearer {API_TOKEN}"
  }
});

// update the request function so it runs in the context of client
client.request(MAKE_TODO).then(r => console.log(r));
```

**Python**
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

## Using API Clients

It is not required that you use a script or the [8base API Explorer](https://docs.8base.com/8base-console/platform-tools/api-explorer) to query your API. Dozens of great API clients exist that allow you to investigate your workspace/GraphQL APIs.

When using a 3rd party API Client (**NOT** the 8base API Explorer) make sure to generate an API Token with full permissions and include it as an authorization header. Otherwise, you will likely run into authentication issues when running queries.

We've added a list below of some of the ones that we like. Feel free to use one of them or find another that you love!

- [GraphiQL](https://github.com/skevy/graphiql-app)
- [GraphiQL Online](https://graphiql-online.com/)
- [Postman](https://www.getpostman.com/)
- [GraphqlBin](https://www.graphqlbin.com/v2/new)
