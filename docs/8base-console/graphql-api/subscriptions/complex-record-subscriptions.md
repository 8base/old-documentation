# Complex Record Subscriptions

*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

## Subscriptions using filters
You can subscribe to individual and related records being created, updated, and deleted using 8base's auto-generated GraphQL subscriptiong operation.

### Subscribing to all mutations on a single record
Subscription for observing a single record. Note that a subscription could listen for an individual record being `created` by specifying a unique field that the record will be created with, **only** if the subscription is established prior to the record being created.


```javascript
subscription {
  Posts(filter: {
    mutation_in: [
      create, 
      update, 
      delete
    ],
    node: {
      title: {
        equals: "Possumly the Best Coffee"
      }
    } 
  }) {
    node {
      title
      body
      publishingDate
      authors {
        name
      }
    }
    updatedFields
    mutation
  }
}
```



```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "Possumly the Best Coffee",
        "body": "This coffee is Possumly the best in all of the forrest!",
        "publishingDate": "2020-01-18",
        "authors": {
          "name": "Huxley"
        }
      },
      "updatedFields": [
        "title",
        "body",
        "publishingDate",
        "authors"
      ],
      "mutation": "update"
    }
  }
}
```



### Subscribing to all records related to a record
Subscription for observing a single record. Note that a subscription could listen for an individual record being `created` by specifying a unique field that the record will be created with, **only** if the subscription is established prior to the record being created.


```javascript
subscription {
  Posts(filter: {
    mutation_in: [
      create, 
      update, 
      delete
    ],
    node: {
      authors: {
        name: {
          equals: "Huxley"
        }
      }
    } 
  }) {
    node {
      title
      body
      publishingDate
    }
    mutation
  }
}
```



```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "It's a Hard Knock Life, for Possums",
        "body": "It is.",
        "publishingDate": "2020-01-18"
      },
      "mutation": "create"
    }
  }
}
```



### Subscription to field specific events on records
Subscription for listening to field change on table records.


```javascript
subscription {
  Posts(filter: {
    mutation_in: [update],
    updatedFields: {
      contains: ["title"]
    }
  }) {
    node {
      title
    }
    previousValues {
      title
    }
    mutation
  }
}
```



```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "You're the Coolest Possum"
      },
      "previousValues": {
        "title": "You're Possumly the Coolest"
      },
      "mutation": "update"
    }
  }
}
```


