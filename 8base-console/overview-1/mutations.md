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

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  orderCreate\(data: {\n    name: \"Order 1\"\n    price: 100\n  }\) {\n    id\n    name\n    price\n}\n  ",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

2. Update the order price and only return the new price value.

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  orderUpdate\(data: {\n    id: \"\"\n    price: 150\n  }\) {\n    price\n  }\n}\n",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

3. Delete the order and only return Boolean indicating success or failure.

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  orderDelete\(data: {\n    id: \"\"\n  }\) {\n    success\n  }\n}\n",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

   When handling delete mutations, an additional force parameter can be specified in the data object that accepts a Boolean value - the defaults is false. When set to true it will force delete the entry, ignoring any validation or dependency errors that may be in place.

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

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  customerCreate\(data: {\n    name: \"John Smith\"\n    orders: {\n      create: \[{\n        title: \"iPhone X\"\n        price: 1000\n      },\n      {\n        title: \"iPad\"\n        price: 500\n      }\]\n    }\n  }\) {\n    id\n    name\n    orders {\n      items {\n        title\n        price\n      }\n    }\n  }\n}",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

2. Relate one or more existing Orders to a Customer record.

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  customerUpdate\(data: {\n    id: \"\"\n    orders: {\n      connect: \[{\n        id: \"\"\n      }\]\n    }\n  }\) {\n    id\n    name\n    orders {\n      items {\n        title\n        price\n      }\n    }\n  }\n}",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

3. Reconnect a list of Orders to a Customer record **while removing all currently related Orders**.

   \[block:code\]

   {

   "codes": \[

    {

      "code": "mutation {\n  customerUpdate\(data: {\n    id: \"\"\n    orders: {\n      reconnect: \[{\n        id: \"\"\n      }\]\n    }\n  }\) {\n    id\n    name\n    orders {\n      items {\n        title\n        price\n      }\n    }\n  }\n}",

      "language": "javascript"

    }

   \]

   }

   \[/block\]

4. Disconnect one or more Orders from a Customer record.
   * The disconnect mutation is **not** valid on mandatory relationship fields. To disconnect a mandatory association, you must either update the parent record directly or delete the child record.

     \[block:code\]

     {

     "codes": \[

     {

     "code": "mutation {\n  customerUpdate\(data: {\n    id: \"\"\n    orders: {\n      disconnect: \[{\n        id: \"\"\n      }\]\n    }\n  }\) {\n    id\n    name\n    orders {\n      items {\n        title\n        price\n      }\n    }\n  }\n}",

     "language": "javascript"

     }

     \]

     }

     \[/block\]

