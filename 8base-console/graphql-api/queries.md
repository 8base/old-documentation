*For the sake of the following examples, let's consider a scenario where a table called Posts exists, having expected fields and relations like title, body, author, etc.*

### GraphQL Queries

GraphQL queries are used to fetch data via the workspace API.

8base's GraphQL engine auto-generates queries as part of the GraphQL schema based on your workspace tables. All workspace tables can be queried through the workspace endpoint.

### Auto-generated queries
Whenever a table is added to a work space, two GraphQL query operations are auto-generated for the table. They are:

* `tableName(...)` - Accepts any *mandatory* and *unique* value as an argument to retreive a single record from the database.

* `tableNameList(...)` - Accepts *filter*, *orderBy*, *sort*, *skip*, *after*, *before*, *first* and, *last* to retrive a list of curated records while supporting pagination, relational-filtering, sorting, and more.


### Understanding Fields
Put simply, GraphQL is a specification for requesting fields on objects. Let's look at a simple 8base query example and the result it returns when run:

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  user(email: "john@email.com") {
    firstName
    lastName
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "user": {
      "firstName": "John",
      "lastName": "Smith"
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

We see immediately that our result has the same shape as the query. This is key to GraphQL; you always get what you ask for, and the server knows which fields the clients was asking for.

8base GraphQL queries are interactive, and support relational queries natively. This mean two important things, 1) a query can be changed at any time, and 2) related data can be joined without writing complex database queries and serializers (it's handled for you). Let's try another example to demonstrate this.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  user(email: "john@email.com") {
    firstName
    roles {
      items {
        name
        description
      }
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "user": {
      "firstName": "John",
      "roles": {
        "items": [
          {
            "name": "Administrator",
            "description": "Administrator Role"
          }
        ]
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

In this previous example, the `lastName` field was removed from the query and a `roles` parameter added. In the response, we see this reflected by there no longer being a `lastName` key and the added `roles` array containing its specified parameters - a sub-selection on fields for the related object(s).

### Understanding Arguments
The power of the 8base GraphQL API is further enriched by the ability to specify different arguments when executing a query. This has been demonstrated several times now, where "john@email.com" is being passed as an argument to the query (`...user(email: "john@email.com")`). When creating data tables in the **Data Builder**, any field marked as *unique* can then be used as an argument for a query.

For example, were the *Users* table to have a *fingerPrintHash* field that was set to only permit unique values, we could then query a specific user record like so:

```javascript
{
  user(fingerPrintHash: "<UNIQUE_HASH_VALUE>") {
    firstName
    lastName
  }
}
```

### List Queries

For every data table defined in an 8base workspace, two default queries are automatically defined.

1. `<tableName>(...)`: Retrieval of a single record
2. `<tableName>List(...)`: Retrieval of a list of records

With list queries, a developer is able to request one or more records while optionally applying different selection options. For example, if you were to run a query requesting the first 10 users that have "gmail.com" email addresses, the query could look like so.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  usersList(first: 10, filter: {
    email: {
      ends_with: "gmail.com"
    }
  }) {
    items {
      firstName
      lastName
      email
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "usersList": {
      "items": [
        {
          "firstName": "Jake",
          "lastName": "Johnson",
          "email": "jake@gmail.com"
        },
        // More results...
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

As seen in the previous example, the query returns an object that is predictably formatted to the query itself, containing the requested information.

##### List Arguments
8base responds to the following query arguments when specified for *lists*.

* **filter**. Filters records based on field values.
* **orderBy**. Sort order configuration. Can be single- or multi- field sorting.
* **sort**. Alias for orderBy argument.
* **first**. Limit query to first N records. Default and maximum value is 1000.
* **skip**. Skip N records from the result. Used for offset-based pagination.
* **last**. Return N last records from the result.
* **after**. Return records after specified ID. Used for cursor-based pagination.
* **before**. Return records before specified ID. Used for cursor-based pagination.


##### Sort
```javascript
{
  postsList(sort: [
    {
      author: {
        name: ASC
      }
    }
  ]) {
    items {
      id
      title
      author {
        id
        name
      }
    }
  }
}
```

### Query Examples
For the sake of the following examples, let's consider a scenario where a table called *Posts* exists, having expected fields and relations like *title*, *body*, *author*, etc.

##### Query record by ID
Query a single record using it's `id`.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(id: "<POST_ID>") {
    id
    title
    body
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "post": {
      "id": "<POST_ID>",
      "title": "Awesome Possum",
      "body": "This post is awesome, like a possum!"
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Query record by Unique Attribute
Query a single record using a unique field other than `id`. **Note**, this field must be specified as *No Duplicate Values* in the table's field definition.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(title: "Awesome Possum") {
    title
    body
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "post": {
      "title": "Awesome Possum",
      "body": "This post is awesome, like a possum!"
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Query record with Related Record
Query a single record and return data from a related table in the response.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(title: "Awesome Possum") {
    title
    author {
      name
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "post": {
      "title": "Awesome Possum",
      "author": {
        "name": "Huxley"
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Query list of records
Query list of records from a single table.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  postsList {
    items {
      title
      body
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "body": "This post is awesome, like a possum!"
        },
        {
          "title": "A Sunset and Waves",
          "body": "There was once a beautiful sunset, and waves."
        },
        {
          "title": "Vapor Distilled Water for All",
          "body": "Everyone can have vapor distilled water."
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Query list of filtered records
Query list of records that are filtered.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  postsList(filter: {
    title: {
      contains: "Possum"
    },
    createdAt: {
      gt: "2019-09-01T00:00:00.000Z"
    }
  }) {
    items {
      title
      body
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "body": "This post is awesome, like a possum!"
        },
        {
          "title": "Everybody Loves Possum",
          "body": "Seriously, there is nothing like a sweet and cuddly possum."
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Query pagenated list of records
Query paginated list of records with related-table data in response and aggregator.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  postsList(skip: 10, first: 5) {
    items {
      title
      body
      author {
        name
        posts {
          count
        }
      }
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Response" %}
```javascript
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "body": "This post is awesome, like a possum!",
          "author": {
            "name": "Huxley",
            "posts": {
              "count": 2
            }
          }
        },
        {
          "title": "A Sunset and Waves",
          "body": "There was once a beautiful sunset, and waves.",
          "author": {
            "name": "Stevens",
            "posts": {
              "count": 2
            }
          }
        },
        {
          "title": "Vapor Distilled Water for All",
          "body": "Everyone can have vapor distilled water.",
          "author": {
            "name": "Vanderwall",
            "posts": {
              "count": 1
            }
          }
        },
        {
          "title": "Everybody Loves Possum",
          "body": "Seriously, there is nothing like a sweet and cuddly possum.",
          "author": {
            "name": "Stevens",
            "posts": {
              "count": 2
            }
          }
        },
        {
          "title": "Abominable Snowman Found Dead in Miami Motel",
          "body": "The abominable snowman, after not being seen since never, was found dead in a Miami motel.",
          "author": {
            "name": "Huxley",
            "posts": {
              "count": 2
            }
          }
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
