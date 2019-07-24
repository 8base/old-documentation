# Setup 
1. Log in to 8base and create a new workspace called Todo
2. Create a table called Todos in your new workspace
3. In the Schema for your Todos table, define the following fields:
  - `text: text `
  - `completed: switch, format: Yes/No`
4. Manually add a few records in your table.
5. Click the endpoint button to get your workspace URI
6. Navigate to Settings --> Roles --> Guest and allow CRUD access for the Todos table
7. Navigate to Settings --> API Tokens and create a new API token with the developer role. Save this token, you will use this for examples that use authorization below.


#Connect your Data

_Replace all instances of {your-endpoint-here} with your workspace endpoint and all instances of {your-api-token-here} with your developer API token_

* [Curl](doc:connecting-to-your-frontend#section-curl) 
* [Node (w/graphql-request)](doc:connecting-to-your-frontend#section-node-w-graphql-request-https-www-npmjs-com-package-graphql-request-) 
* [Vanilla JS (w/ fetch)](doc:connecting-to-your-frontend#section-vanilla-js-w-fetch-https-developer-mozilla-org-en-us-docs-web-api-fetch_api-)
* [Create React App (w/ Apollo Client)](doc:connecting-to-your-frontend#section-create-react-app-w-apollo-client-https-www-apollographql-com-docs-react-)
* [Python (w/ python-graphql-client)](doc:connecting-to-your-frontend#section-python-w-python-graphql-client-https-github-com-prisma-python-graphql-client-)

## Curl


Read

```curl
curl \
   -X POST \
   -H "Content-Type: application/json" \
 --data '{ "query": "{ todosList { items { text } } }" }' \
 {your-endpoint-here}
 ```

Mutate

```curl
curl \
   -X POST \
   -H "Content-Type: application/json" \
 --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL\", completed: false}) {id text completed}}"}' \
{your-endpoint-here}
 ```

Mutate with Authentication

```curl
curl \
   -X POST \
   -H "Content-Type: application/json" \
   -H 'authorization: Bearer {your-api-token-here}' \
   --data '{"query":"mutation TodoCreate { todoCreate(data: {text: \"from CURL with auth\", completed: false}) {id text completed}}"}' \
{your-endpoint-here}
```

***

## Node (w/ [graphql-request](https://www.npmjs.com/package/graphql-request))



Read

1. `mkdir node && cd node && npm init -y && touch getTodos.js`

2. `npm install graphql-request`

3. Copy and paste this code into getTodos.js:

```javascript
const { request } = require('graphql-request')

const ENDPOINT = `{your-endpoint-here}`

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

4. Open your terminal and run `node getTodos.js`

Mutate

1. Make a copy of getTodos.js and name it makeTodos.js
2. Add the following code to makeTodos.js

```javascript
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
```
3. Modify the request function to look like this: `request(ENDPOINT, MAKE_TODO ).then((r) => console.log(r))`
4. Open your terminal and run `node makeTodos.js`

Mutate with Authentication

1. Go back to makeTodos.js and make these changes/ additions:

```javascript
const { request, GraphQLClient } = require('graphql-request') // extract `GraphQLClient` in the `require` statement:

// {...}

// create a new instance of GraphQLClient in order to add an authorization header
const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: 'Bearer {your-api-token-here}',
  },
})

// {...}

// update the request function so it runs in the context of client
client.request(MAKE_TODO).then((r) => console.log(r))
```

2. Test your request by changing the role permissions on 8base and running `node makeTodos.js`



***
## Vanilla JS (w/ [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API))

Read
```javascript
fetch("{your-endpoint-here}",
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
fetch("{your-endpoint-here}",
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
          "authorization": "Bearer {your-api-token-here}"
      },
      "body": "{\"query\":\"mutation TodoCreate { todoCreate(data: {text: \\\"from js fetch with auth\\\", completed: false}) { id, text, completed }}\"}",
      "method": "POST"
  }
).then((r) => r.json()).then(r => console.log("success: ", JSON.stringify(r)))
```

***
## Create React App (w/ [Apollo Client](https://www.apollographql.com/docs/react/))


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
  uri: "{your-endpoint-here}"
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
6. Next you need to create the Todos component - create a new file called Todos.jsx in the _src_ directory
7. Copy and paste this code

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

8. Make sure you are in the root directory and run `npm start` - this should start your development server and display the queries from the Todos table.

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


2. The createTodo function that gets called onSubmit is what we’re going to focus on. We don’t actually have this function implemented yet so lets go ahead and add that to our code:

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

> Here we are using the graphql function again, only this time we are using the second parameter (config) to define the _createTodo_ function. Defining the _createTodo_ function in the context of graphql lets you access the function later in the component it is being injected into. This way you are able to pass query variables from that component as an argument to the _createTodo_ function and use them in your mutation.

3. The last thing we have to do is inject the createTodo function into our CreateTodo component so we can execute it in our application. Add the following line of code to App.js and add an instance of the CreateTodo component in App:

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

4. Run `npm start` and create a new record via the input box.

Mutate with Authentication

1. Add the following code to the client declaration in App.js 

```javascript
const client = new ApolloClient({
  uri: "{your-api-endpoint}",
  headers: {
    Authorization: 'Bearer {your-api-token-here}'
  }
});
```

2. Change the role permissions in application settings, start your react server and enter a new todo item to test your mutation.

***
## Python (w/ [python-graphql-client](https://github.com/prisma/python-graphql-client))

1. `pip install graphqlclient`
2. Copy and paste the following code in your project

```python
from graphqlclient import GraphQLClient

client = GraphQLClient('{your-endpoint-here}')

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