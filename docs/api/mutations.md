For each table 8base GraphQL API exposes three mutations:
* To **create** a record. Example: `orderCreate(data: {...}): Order`.
* To **update** a record. Example: `orderUpdate(data: { id: "...", price: 100, ... }): Order`.
* To **delete** a record. Example: `orderDelete(data: { id: "..." }): SuccessResponse`.
[block:api-header]
{
  "title": "Relationships"
}
[/block]
A cool feature of 8base API is that you can create related objects at the same time as creating or updating a parent object. For example, the following mutation creates a Customer record along with two orders connected to that customer in a single transaction.

```
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

The following operations on relationships are supported:
- **create**. Creates a connected object(s). 
- **connect**. Connect existing related object(s) *in addition to* already connected objects.
- **reconnect** (-update mutation only). Replace old connected objects with a new set of connected objects.
- **disconnect** (-update mutation only). Disconnect connected object(s).