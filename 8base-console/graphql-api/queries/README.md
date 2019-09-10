### GraphQL Queries
GraphQL queries are used to fetch data via the workspace API.

8base's GraphQL engine auto-generates queries as part of the GraphQL schema based on your workspace tables. All workspace tables can be queried through the workspace endpoint.

### Auto-generated queries
Whenever a table is added to a work space, two GraphQL query operations are auto-generated for the table. They are:

* `tableName(...)` - Accepts `id` and any *unique* value as an argument to retreive a single record from the database.

* `tableNameList(...)` - Accepts *filter*, *sort*, *skip*, *after*, *before*, *first* and, *last* to retrive a list of curated records while supporting pagination, relational-filtering, sorting, and more.

##### List Arguments
8base responds to the following query arguments when specified for *lists*.

* **filter**. Filters records based on field values.
* **orderBy**. [DEPRECIATING - Use *sort*]
* **sort**. Sort order configuration. Can be single- or multi- field sorting.
* **first**. Limit query to first N records. Default and maximum value is 5000.
* **skip**. Skip N records from the result.
* **last**. Return N last records from the result.
* **after**. Return records after specified ID. Used for cursor-based pagination.
* **before**. Return records before specified ID. Used for cursor-based pagination.
