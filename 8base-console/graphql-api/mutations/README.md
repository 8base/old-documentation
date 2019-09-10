*For the sake of the any examples, let's consider a scenario where a table called Posts exists, having expected fields and relations like title, body, author, etc.*

### GraphQL Mutations
GraphQL mutations are used to create, update, and delete data via the workspace API.

8base's GraphQL engine auto-generates mutations as part of the GraphQL schema based on your workspace tables. All workspace tables can recieve mutations through the workspace endpoint.

### Auto-generated mutations
Whenever a table is added to a work space, four GraphQL mutation operations are auto-generated for the table. They are:

* `tableNameCreate(...)` - Accepts `data` as an argument from which it will populate a new record in the database table.

* `tableNameCreateMany(...)` - Accepts `data` as an argument from which it will populate one or more new records in the database table.

* `tableNameUpdate(...)` - Accepts `data` and `filter` as arguments with which it will update an existing record.

* `tableNameDelete(...)` - Accepts `data`, `filter`, and `force` as arguments with which it will delete an existing record - and dependent records when specified.

### Relationships
A cool feature of 8base API is the ability to create related objects while creating or updating parent objects. The following operations on relationships are supported:

* **Create**
  * Create and relate child objects.
* **connect**
  * Connect existing objects in addition to already connected objects.
* **reconnect**
  * (-update mutation only). Replace old connected objects with a new set of connected objects.
* **disconnect**
  * (-update mutation only). Disconnect connected object(s)

##### Relationship Examples
1. Creates a Customer record along with two Orders in a single transaction.
```javascript
mutation {
  customerCreate(data: {
    name: "John Smith"
    orders: {
      create: [{
        title: "iPhone X"
        price: 1000
      },
      {
        title: "iPad"
        price: 500
      }]
    }
  }) {
    id
    name
    orders {
      items {
        title
        price
      }
    }
  }
}
```

2. Relate one or more existing Orders to a Customer record.
```javascript
mutation {
  customerUpdate(data: {
    id: "<CUSTOMER_ID>"
    orders: {
      connect: [{
        id: "<ORDER_ID>"
      }]
    }
  }) {
    id
    name
    orders {
      items {
        title
        price
      }
    }
  }
}
```

3. Reconnect a list of Orders to a Customer record **while removing all currently related Orders**.
```javascript
mutation {
  customerUpdate(data: {
    id: "<CUSTOMER_ID>"
    orders: {
      reconnect: [{
        id: "<ORDER_ID>"
      }]
    }
  }) {
    id
    name
    orders {
      items {
        title
        price
      }
    }
  }
}
```

4. Disconnect one or more Orders from a Customer record.
   * The disconnect mutation is **not** valid on mandatory relationship fields. To disconnect a mandatory association, you must either update the parent record directly or delete the child record.

```javascript
mutation {
  customerUpdate(data: {
    id: ""
    orders: {
      disconnect: [{
        id: ""
      }]
    }
  }) {
  id
  name
  orders {
    items {
      title
      price
    }
  }
}
```

