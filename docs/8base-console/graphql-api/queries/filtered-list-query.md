# Filtered List Queries

*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

## Using filters in queries
Query list of records that are filtered. Notice the `filter` argument.

<div class="code-sample">
<div>
<label>Request</label>

```javascript
query {
  postsList(filter: {
    title: {
      contains: "Possum"
    },
    createdAt: {
      gt: "2019-09-01T00:00:00.000Z"
    }
  }) {
    items {
      title
      body
    }
  }
}
```

</div>
<div>
<label>Response</label>

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "body": "This post is awesome, like a possum!"
        },
        {
          "title": "Everybody Loves Possum",
          "body": "Seriously, there is nothing like a sweet and cuddly possum."
        }
      ]
    }
  }
}
```

</div>
</div>


## Conditional Filters
Conditional filters utilize the `AND` and `OR` keys. 

### Using `AND`
When `AND` is specified, all filter objects must return *truthy*. 

<div class="code-sample">
<div>
<label>Request</label>

```javascript
query {
  postsList(filter: {
    /* 1 to N filters can be specified */
    AND: [
      {
        title: {
          contains: "Possum"
        }
      },
      {
        author: {
          name: {
            not_equals: "Huxley"
          }
        }
      }
    ]
  }) {
    items {
      title
      author {
        name
      }
    }
  }
}
```

</div>
<div>
<label>Response</label>

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Everybody Loves Possum",
          "author": {
            "name": "Stevens"
          }
        }
      ]
    }
  }
}
```

</div>
</div>

### Using `OR`
When `OR` is specified, at least one filter object must return *truthy*. 

<div class="code-sample">
<div>
<label>Request</label>

```javascript
query {
  postsList(filter: {
    OR: [
      {
        title: {
          contains: "Possum"
        }
      },
      {
        author: {
          name: {
            not_equals: "Huxley"
          }
        }
      }
    ]
  }) {
    items {
      title
      author {
        name
      }
    }
  }
}
```

</div>
<div>
<label>Response</label>

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "author": {
            "name": "Huxley"
          }
        },
        {
          "title": "A Sunset and Waves",
          "author": {
            "name": "Stevens"
          }
        },
        {
          "title": "Everybody Loves Possum",
          "author": {
            "name": "Stevens"
          }
        }
      ]
    }
  }
}
```

</div>
</div>

## Nested Filters
Filters, and all their elements, can be nested to satisfy more complex specs.

<div class="code-sample">
<div>
<label>Request</label>

```javascript
query {
  postsList(filter: {
    OR: [
      {
        title: {
          contains: "Possum"
        }
      },
      {
        author: {
          name: {
            not_equals: "Huxley"
          }
        }
        AND: [
          {
            title: {
              starts_with: "Vapor"
            },
            author: {
              name: {
                starts_with: "Vander"
              }
            }
          },
          {
            createdAt: {
              gt: "2019-09-01T00:00:00.000Z"
            }
          }
        ]
      }
    ]
  }) {
    items {
      title
      createdAt
      author {
        name
      }
    }
  }
}
```

</div>
<div>
<label>Response</label>

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum",
          "createdAt": "2019-09-04T22:11:18.493Z",
          "author": {
            "name": "Huxley"
          }
        },
        {
          "title": "Vapor Distilled Water for All",
          "createdAt": "2019-09-04T22:23:22.710Z",
          "author": {
            "name": "Vanderwall"
          }
        },
        {
          "title": "Everybody Loves Possum",
          "createdAt": "2019-09-04T22:26:19.045Z",
          "author": {
            "name": "Stevens"
          }
        }
      ]
    }
  }
}
```

</div>
</div>


## Filter Types
Depending on a field type, different filter predicates are available. 

### ID
When filtering by a field of type ID, the available predicates are:
* *equals*: ID
* *not_equals*: ID
* *in*: [ID!]
* *not_in*: [ID!]
* *contains*: ID
* *not_contains*: ID
* *starts_with*: ID
* *not_starts_with*: ID
* *ends_with*: ID
* *not_ends_with*: ID
* *lt*: ID (less than)
* *lte*: ID (less than or equal to)
* *gt*: ID (greater than)
* *gte*: ID (greater that or equal to)
* *is_empty*: Boolean
* *is_not_empty*: Boolean

### Text/String
When filtering by a field of type String/Text, the available predicates are:
* *equals*: String
* *not_equals*: String
* *in*: [String!]
* *not_in*: [String!]
* *contains*: String
* *not_contains*: String
* *starts_with*: String
* *not_starts_with*: String
* *ends_with*: String
* *not_ends_with*: String
* *is_empty*: Boolean
* *is_not_empty*: Boolean

### Number/Integer
When filtering by a field of type Number/Integer, the available predicates are:
* *equals*: Int
* *not_equals*: Int
* *in*: [Int!]
* *not_in*: [Int!]
* *lt*: ID (less than)
* *lte*: ID (less than or equal to)
* *gt*: ID (greater than)
* *gte*: ID (greater that or equal to)
* *is_empty*: Boolean
* *is_not_empty*: Boolean

### Switch/Boolean
When filtering by a field of type Switch/Boolean, the available predicates are:
* *equals*: Boolean
* *not_equals*: Boolean
* *is_empty*: Boolean
* *is_not_empty*: Boolean

### Table
When filtering by a relation, the available predicates are:
* *some*: [tableName]Filter
* *every*: [tableName]Filter
* *none*: [tableName]Filter

### Users Table
The *Users* has two special conditional filters that can get used. They are referential to a user record and the logged in user. For example, was a *Post.createdBy* the logged in user?
* *is_self*: Boolean
* *not_self*: Boolean
