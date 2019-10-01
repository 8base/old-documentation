*For the sake of the any examples, let's consider a scenario where a table called Posts exists, having expected fields and relations like title, body, author, etc.*

### GraphQL Subscriptions
A GraphQL subscription is a web-socket connection where the client receives an event with data whenever the observed event occures upstream.

8base's GraphQL engine auto-generates subscriptions as part of the GraphQL schema based on your workspace tables. All workspace tables can recieve subscriptions through the workspace endpoint using `wss` protocol.

### Auto-generated subscriptions
Whenever a table is added to a work space, a GraphQL subscriptions operation is auto-generated for the table.

* `TableName(...)` - Accepts `filter` as an argument with which it will listen for specified mutation events on one or more scoped records.

### Arguments
8base accepts to the following subscription argument.

* **filter**. A `SubscriptionFilter` type filter containing values for mutation types, table filter, and updated fields filter.

### SubscriptionFilter type
The `SubscriptionFilter` type is different from filters used in GraphQL queries. Instead, the `SubscriptionFilter` contains 3-top level keys:

* **mutation_in**: An array of mutation events on which to listen (create, update, delete).
* **node**: Normal query filter that allows for scoping of one or more records.
* **updatedFields**: For specifying which individual fields to observe. 
