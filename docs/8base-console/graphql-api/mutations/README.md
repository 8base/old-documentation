_For the sake of the any examples, let's consider a scenario where a table called Posts exists, having expected fields and relations like title, body, author, etc._

### GraphQL Mutations

GraphQL mutations are used to create, update, and delete data via the workspace API.

8base's GraphQL engine auto-generates mutations as part of the GraphQL schema based on your workspace tables. All workspace tables can recieve mutations through the workspace endpoint.

### Auto-generated mutations

Whenever a table is added to a work space, four GraphQL mutation operations are auto-generated for the table. They are:

- `tableNameCreate(...)` - Accepts `data` as an argument from which it will populate a new record in the database table.

- `tableNameCreateMany(...)` - Accepts `data` as an argument from which it will populate one or more new records in the database table.

- `tableNameUpdate(...)` - Accepts `data` and `filter` as arguments with which it will update an existing record.

- `tableNameUpdateByFilter(...)` - Accepts `data` and `filter` as arguments with which it will update an list of existing record.

- `tableNameDelete(...)` - Accepts `data`, `filter`, and `force` as arguments with which it will delete an existing record - and dependent records when specified.

- `tableNameDestroy(...)` - Accepts `filter` and `force` as arguments with which it will permanently
  destroy an existing or deleted record - and dependent records when specified.

- `tableNameRestore(...)` - Accepts `id` as an argument with which it will restore a previously deleted records; does not work on destroyed records.

### Delete vs. Destroy

The 8base API differentiates between _soft delete_ and _hard delete_ actions by using _tableNameDelete_ and _tableNameDestroy_ operations.

When a record has a _tableNameDelete_ action performed on it, it's _deletedAt_ timestamp attribute is updated to reflect the time at which it got deleted. All records with a non-zero _deletedAt_ value will be hidden from API results, unless the `withDeleted: true` argument gets specified in a query. **Deleted records will still affect validations when creating and updating records that have mandatory and unique fields.**

When a record has a _tableNameDestroy_ action performed on it, it is permanently deleted from the database and cannot be recovered. Additionally, if the `force: true` argument is specified all dependent child records will also be permanently deleted.

### Relationships

A cool feature of 8base API is the ability to create related objects while creating or updating parent objects. The following operations on relationships are supported:

- **Create**: Create and relate child objects.
- **Update**: Updates a record through the existing relationship.
- **Connect**: Connect existing objects in addition to already connected objects.
- **Reconnect**: Replace old connected objects with a new set of connected objects (update mutation only).
- **Disconnect**: Disconnect connected object(s) (update mutation only).

### Arguments

8base accepts to the following mutation arguments, depending on the operation.

- **data**. Data used to update or locate the record.
- **filter**. A filter containing a unique field value for locating the record.
- **force**. Deletes all child records having a mandatory association to the record being deleted. Defaults to `false`.
