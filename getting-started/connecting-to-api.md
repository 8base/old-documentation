# Connection to 8base

8base provisions all database tables with over one-dozen built in GraphQL schemas. These resources allow you to perform any Create, Read, Update and Delete (CRUD) action needed to effectively manage your data. Additionally, it doesn't matter what technology you're using for a client - or server - applciation. As long as you can perform web requests, you'll be able to connect to your 8base workspace endpoints. 

### Setup

In the following examples, we've made a few assumptions (feel free to re-create them for your learnings sake!). Those assuptions are the following:

1. You've manage a workspace named *Todo's Workspace*
2. You've defined a table named *Todos*
3. The *Todos* table has the following fields:
   * `text: text`
   * `completed: switch, { format: Yes/No }`
4. One or more *Todos* records have been created
6. Guest users are permitted CRUD access on the *Todos* table
7. An API token has been created for a role named *Developer*.

### Executing API Calls

In all of the following examples, make sure to replace all occurances of `{API_ENDPOINT}` with your workspace's endpoint and all occurances of `{API_TOKEN}` with your developer API token. 

##### Example GraphQL Query

```sh
curl \
   -X POST \
   -H "Content-Type: application/json" \
 --data '{ "query": "{ todosList { items { text } } }" }' \
 {API_ENDPOINT}
```

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

##### Example GraphQL Mutation

```sh
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL\", completed: false}) {id text completed}}"}' \
  {API_ENDPOINT}
```

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

##### Example GraphQL Mutation with Authentication

```sh
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H 'authorization: Bearer {API_TOKEN}' \
  --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL with auth\", completed: false}) {id text completed}}"}' \
  {API_ENDPOINT}
```

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

1. Test your request by changing the role permissions on 8base and running `node makeTodos.js`

### Vanilla JS \(w/ [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)\)

Read

```javascript
fetch("{API_ENDPOINT}",
  {
      "headers": {
          "content-type": "application/json"
      },
      "body": "{\"query\":\"{ todosList { items { text, completed }}}\"}",
      "method": "POST"
  }
).then(r => r.json()).then(r => console.log("success: ", JSON.stringify(r)))
```

Mutate

```javascript
fetch("{API_ENDPOINT}",
  {
      "headers": {
          "content-type": "application/json"
      },
      "body": "{\"query\":\"mutation TodoCreate { todoCreate(data: {text: \\\"from js fetch again\\\", completed: false}) { id, text, completed }}\"}",
      "method": "POST"
  }
).then((r) => r.json()).then(r => console.log("success: ", JSON.stringify(r)))
```

Mutate with Authentication

```javascript
fetch("{your-api-endpoint}",
  {
      "headers": {
          "content-type": "application/json",
          "authorization": "Bearer {API_TOKEN}"
      },
      "body": "{\"query\":\"mutation TodoCreate { todoCreate(data: {text: \\\"from js fetch with auth\\\", completed: false}) { id, text, completed }}\"}",
      "method": "POST"
  }
).then((r) => r.json()).then(r => console.log("success: ", JSON.stringify(r)))
```

### Create React App \(w/ [Apollo Client](https://www.apollographql.com/docs/react/)\)

1. `create-react-app todo-8base`
2. `cd todo-8base`
3. `npm install apollo-boost graphql-tag react-apollo --save graphql`
4. Open text editor and delete unnecessary files
5. You’ll need to wrap your code in ApolloProvider in order to send graphql requests.

Replace the code in App.js with the following:

```javascript
import React, { Component } from 'react';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import Todos from './Todos';

const client = new ApolloClient({
  uri: "{API_ENDPOINT}"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider
        client={client}
         >
         <Todos />
      </ApolloProvider>
    );
  }
}
```

1. Next you need to create the Todos component - create a new file called Todos.jsx in the _src_ directory
2. Copy and paste this code

```javascript
import React from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';

let Todos = ({todos}) => {

  return (
    <div>
      {
        todos.map((item) => {
        return  <h1>{item.text}</h1>
      })}
    </div>
  )
}

const GET_TODOS_QUERY = gql`
  query {
    todosList {
      items {
        text
      }
    }
  }
`

export default graphql(GET_TODOS_QUERY, {
  props: (result) => {
    const { loading, data } = result;
    let items = [];
    if (data && data.todosList) items = data.todosList.items;
    return {
      loading,
      todos: items
    }
  }
})(Todos);
```

> Here we are using the graphql function from react-apollo to inject the result of the query as a prop into our Todos component. See more [here](https://www.apollographql.com/docs/react/basics/setup#graphql)

1. Make sure you are in the root directory and run `npm start` - this should start your development server and display the queries from the Todos table.

Mutate:

1. In the same project as before, create a class component called createTodos in App.js. This will handle user input and send the graphql request to make a new todo.

   It should look something like this

```javascript
class CreateTodo extends Component {
  state = {
    todo: ''
  }

  handleChange = (event) => {
    this.setState( {todo: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createTodo({ text: this.state.todo });
  }

  render(){

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.todo}
          onChange={this.handleChange}
          />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

1. The createTodo function that gets called onSubmit is what we’re going to focus on. We don’t actually have this function implemented yet so lets go ahead and add that to our code:

```javascript
const CREATE_TODO_MUTATION = gql`
  mutation TodoCreate($data: TodoCreateInput!) {
    todoCreate(data: $data) {
      id
      text
      completed
    }
  }
`;

const GET_TODOS_QUERY = gql`
  query {
    todosList {
      items {
        text
      }
    }
  }
`

const withCreateTodo = graphql(CREATE_TODO_MUTATION, {
  props: ({ mutate }) => ({
    createTodo: ({ text }) => {
      mutate({
        variables: { data: { text, completed: false } },
        refetchQueries: [{ query: GET_TODOS_QUERY }]
      });
    }
  })
});
```

> Here we are using the graphql function again, only this time we are using the second parameter \(config\) to define the _createTodo_ function. Defining the _createTodo_ function in the context of graphql lets you access the function later in the component it is being injected into. This way you are able to pass query variables from that component as an argument to the _createTodo_ function and use them in your mutation.

1. The last thing we have to do is inject the createTodo function into our CreateTodo component so we can execute it in our application. Add the following line of code to App.js and add an instance of the CreateTodo component in App:

```javascript
CreateTodo = withCreateTodo(CreateTodo);

class App extends Component {
  render() {
    return (
      <ApolloProvider
        client={client}
         >
         <CreateTodo />
         <Todos />
      </ApolloProvider>
    );
  }
};
```

1. Run `npm start` and create a new record via the input box.

Mutate with Authentication

1. Add the following code to the client declaration in App.js 

```javascript
const client = new ApolloClient({
  uri: "{your-api-endpoint}",
  headers: {
    Authorization: 'Bearer {API_TOKEN}'
  }
});
```

1. Change the role permissions in application settings, start your react server and enter a new todo item to test your mutation.

### Python \(w/ [python-graphql-client](https://github.com/prisma/python-graphql-client)\)

1. `pip install graphqlclient`
2. Copy and paste the following code in your project

```python
from graphqlclient import GraphQLClient

client = GraphQLClient('{API_ENDPOINT}')

result = client.execute('''
{
  allFilms {
    films {
      title
    }
  }
}
''')

print(result)
```

