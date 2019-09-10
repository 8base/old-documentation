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

### Arguments
8base accepts to the following mutation arguments, depending on the operation.

* **data**. Data used to update or locate the record.
* **filter**. A filter containing a unique field value for locating the record.
* **force**. Deletes all child records having a mandatory association to the record being deleted. Defaults to `false`.
