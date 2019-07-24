For each table in a given workspace, 8base GraphQL API exposes two queries:
* To get a **single data object** by ID. Example: `user(id: ID): User`
* To get a **list of objects** based on filter, sorting and pagination parameters. Example: `usersList(filter: UserFilter, orderBy: [UserOrderBy], skip: Int, after: String, before: String, first: Int, last: Int): [User!]!`
[block:api-header]
{
  "title": "Single-object queries"
}
[/block]
Single-object queries allow you to get an object by id. For example, `user(id: ID): User` receives user id and returns the found `User` object or `null` if a user with this id is not found. Just like with any GraphQL query you can specify what fields or related objects you want to get. For example:
```
{
  user(id: "...") {
    firstName
    lastName
    groups {
      name
    }
  }
}
```
[block:api-header]
{
  "title": "List queries"
}
[/block]
List queries allow you to query collections of objects based on complex filter, sorting and pagination parameters. For example, the following query returns first 10 users with "a" in last name sorted by creation time. In addition, it returns the total count of records satisfying the filter criteria.
```
{
  usersList(filter: {
    lastName: {
      contains: "a"
    }
  }, first: 10, orderBy: [createdAt_ASC]) {
    count
    items {
      id
      firstName
      lastName
    }
  }
}
```
List queries take the following parameters:
- **filter**. Filters records based on field values.
- **orderBy**. Sort order configuration. Can be single- or multi- field sorting.
- **first**. Limit query to first N records. Default and maximum value is 1000. Used for offset-based pagination.
- **skip**. Skip N records from the result. Used for offset-based pagination.
- **last**. Return N last records from the result.
- **after**. Return records after specified ID. Used for cursor-based pagination.
- **before**. Return records before specified ID. Used for cursor-based pagination.