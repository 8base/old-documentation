# Mutations

For each workspace table defined in 8base, our GraphQL API exposes three mutations:

* **Create** a record. Example: `orderCreate(data: {...}): Order`.
* **Update** a record. Example: `orderUpdate(data: { id: "...", price: 100, ... }): Order`.
* **Delete** a record. Example: `orderDelete(data: { id: "..." }): SuccessResponse`.

## GraphQL Mutations

The 8base GraphQL API exposes three mutation types for each data table.

* Create: To create a record 
  * `tablenameCreate(data: {...}): TableName`
* Update: To update a record 
  * `tablenameUpdate(data: { id: "...", price: 100, ... }): TableName`
* Delete: To delete a record
  * `tablenameDelete(data: { id: "..." }): SuccessResponse`

Each mutation is composed of both a request template and a response template, giving the developer great flexibility not only in managing data, but API responses as well. Consider the following examples when designing your mutations.

### Managing Order Examples

1. Create an order and return id, name, and price on success.
```javascript
mutation {
  orderCreate({
    name: "Order 1"
    price: 100
  }) {
    id
    name
    price
  }
}
```

2. Update the order price and only return the new price value.
```javascript
mutation {
  orderUpdate(data: {
    id: "<ORDER_ID>"
    price: 150
  }) {
    price
  }
}
```

3. Delete the order and only return Boolean indicating success or failure.
```javascript
mutation {
  orderDelete(data: {
    id: "<ORDER_ID>"
  }) {
    success
  }
}
```
When handling delete mutations, an additional force parameter can be specified in the data object that accepts a Boolean value - the default value is `false`. When set to `true` it will force a cascading delete on the record. This means that if the record being deleted is a parent in a mandatory relationship with child records, all child records will be deleted as well.

## Relationships

A cool feature of 8base API is the ability to create related objects while creating or updating parent objects. The following operations on relationships are supported:

* **Create**
  * Create and relate child objects.
* **connect**
  * Connect existing objects in addition to already connected objects.
* **reconnect**
  * \(-update mutation only\). Replace old connected objects with a new set of connected objects.
* **disconnect**
  * \(-update mutation only\). Disconnect connected object\(s\)

### Relationship Examples

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

