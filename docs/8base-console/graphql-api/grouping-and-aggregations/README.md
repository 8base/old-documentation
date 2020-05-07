# Grouping and Aggregations

In order to provide strong and flexible grouping and aggregation capabilities to the GraphQL API, 8base has implemented a "dynamic" approach that doesn't necessarily fit within the strict boundaries of a predefined static schema.

By taking that liberty, we're able to let users build powerful grouping and aggregation queries by manually assigning aliased names and a separate structure with expected results - for which they explicitly declare the result types. All queries that get written closely follow a strict SQL group by semantics. This is why a column should be either a grouping or an aggregation.

## Groupings

A _group_ can be defined by multiple fields, including relations. All the fields you want to see in the result set should have a unique alias specified in the `as` property. The alias should contain only alpha-numerical symbols, and `null` is a valid implicit grouping for an empty group.

Any _group_ gets defined in the `groupBy` argument of any tables list query (for example, `tableNameList(groupBy: $groupOptions)`). The expected result set is described in the GraphQL results object in a form `<ALIAS>: <EXPECTED_TYPE>`. Some reasonable result type conversions will be applied automatically during the query execution, if necessary.

**Example**

```javascript
/**
 * Group articles by their author's name, count how many articles belong to
 * each author, and return each groups article IDs while excluding any
 * articles that do NOT have an author.
 */
query {
  articlesList(groupBy: {
    query: {
      author: {
        name: {
          as: "authorName"
        }
      },
      id: {
        as: "authorPosts",
        fn: {
          aggregate: COUNT
        }
      },
      _group: {
        as: "posts"
      }
    },
    having: {
      alias: "authorName"
      string: {
        is_not_empty: true
      }
    }
  }) {
    groups {
      authorName: String
      authorPosts: Int
      posts: PostGroup {
        items {
          title
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "articlesList": {
      "groups": [
        {
          "authorName": "James Huxley",
          "authorPosts": 2,
          "posts": {
            "items": [
              {
                "title": "Post 1 Title"
              },
              {
                "title": "Post 2 Title"
              }
            ]
          }
        },
        {
          "authorName": "Huckelberry Ben",
          "authorPosts": 3,
          "posts": {
            "items": [
              {
                "title": "Post 11 Title"
              },
              {
                "title": "Post 12 Title"
              },
              {
                "title": "Post 13 Title"
              }
            ]
          }
        },
        {
          "authorName": "Stephen Begzz",
          "authorPosts": 4,
          "posts": {
            "items": [
              {
                "title": "Post 111 Title"
              },
              {
                "title": "Post 112 Title"
              },
              {
                "title": "Post 113 Title"
              },
              {
                "title": "Post 114 Title"
              }
            ]
          }
        }
      ]
    }
  }
}
```


## Aggregations

Every group defined has an additional `fn` property, where you can specify an array of functions (or single) to apply to the column. For example, `SUM` the column or return the `MIN` or `MAX` value.

**Example**

```javascript
/**
 * Create a single group that returns the oldest authors age
 * out of N many authors (sampleSize).
 */
query {
  authorsList(groupBy: {
    query: {
      age: {
        as: "oldestAuthor",
        fn: {
          aggregate: MAX
        }
      },
      id: {
        as: "sampleSize",
        fn: {
          aggregate: COUNT
        }
      }
    },
  }) {
    groups {
      oldestAuthor: Int
      sampleSize: Int
    }
  }
}

```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "oldestAuthor": 78,
          "sampleSize": 3
        }
      ]
    }
  }
}
```


## Sorting

Simple sorting can be achieved at the _groups_ level using ascending and descending order. Specifying the alias(es) for which the groups should be sorted by, `ASC` or `DESC` arguments can then get used.

**Group by sort is not the same as the sort and orderBy for the list queries** and gets specified inside the groupBy query definition object. Group sorting only applies to the result set of groups, not to the original records themselves.

**Example**

```javascript
/**
 * Group articles by their author's name, count how many articles belong to
 * each author, and sort in descending ording by the authorsPosts field.
 */
query {
  articlesList(groupBy: {
    query: {
      author: {
        name: {
          as: "authorName"
        }
      },
      id: {
        as: "authorPosts",
        fn: {
          aggregate: COUNT
        }
      }
    },
    sort: [
      { alias: "authorPosts", direction: DESC }
    ],
    having: {
      alias: "authorName"
      string: {
        is_not_empty: true
      }
    }
  }) {
    groups {
      authorName: String
      authorPosts: Int
    }
  }
}
```

```json
{
  "data": {
    "articlesList": {
      "groups": [
        {
          "authorName": "James Huxley",
          "authorPosts": 12
        },
        {
          "authorName": "Stephen Begzz",
          "authorPosts": 10
        },
        {
          "authorName": "Huckelberry Ben",
          "authorPosts": 7
        }
      ]
    }
  }
}
```


## Pagination

The `first` / `last` / `skip` pagination parameters are supported for groupings and **not related to the list query pagination parameters**. They work together with the group by sorting and also apply to the _group_ level result set rather than the source records.

**Example**

```javascript
/**
 * Group posts by title, count how many articles belong to each post's
 * author, and return the first 5 posts after skipping 1 through 10.
 */
query {
  articlesList(groupBy: {
    first: 5,
    skip: 10,
    query: {
      title: {
        as: "postTitle",
      },
      author: {
        articles: {
          id: {
            as: "authorsPosts"
            fn: {
              aggregate: COUNT
            }
          }
        }
      }
    },
    having: {
      alias: "postTitle"
      string: {
        contains: "Blog"
      }
    }
  }) {
    groups {
      postTitle: String
      authorsPosts: Int
    }
  }
}
```

```json
{
  "data": {
    "articlesList": {
      "groups": [
        {
          "postTitle": "Blog Post 11",
          "authorsPosts": 0
        },
        {
          "postTitle": "Blog Post 12",
          "authorsPosts": 12
        },
        {
          "postTitle": "Blog Post 13",
          "authorsPosts": 12
        },
        {
          "postTitle": "Blog Post 14",
          "authorsPosts": 0
        },
        {
          "postTitle": "Blog Post 15",
          "authorsPosts": 12
        }
      ]
    }
  }
}
```


## Filtering

You can use the same filter parameter as in list queries and combine it with groupings. The filter will be applied before the groupBy operation.

**Example**

```javascript
/**
 * Return average age of authors who are filtered by having
 * written articles with "Blog" in the title.
 */
query {
  authorsList(
    filter: {
      articles: {
        some: {
          title: {
            contains: "Blog"
          }
        }
      }
    },
    groupBy: {
      query: {
        age: {
          as: "averageAge",
          fn: {
            aggregate: AVG
          }
        }
      }
    }
  ) {
    groups {
      averageAge: Int
    }
  }
}

```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "averageAge": 59
        }
      ]
    }
  }
}
```


## Having

The `having` argument is a very powerful tool for adding filters that utilize aggregated or aliased fields. Unlike filters, though, the `having` clause is applied after the `groupBy` operation. Because of the execution order you can’t access entity field names and instead should use earlier declared aliases from the query part.

Another implication of it is that you should explicitly specify an expected filter type, because it can be different from the underlying column type. For example, using an `Int` filter when a `COUNT` aggregation function is applied to a text column.

**Example**

```javascript
/**
 * Group authors with their articles count as authorPosts and filter using
 * the having clause by groups (authors) with more than/equal to 10 authorPosts.
 */
query {
  authorsList(
    groupBy: {
      query: {
        name: {
          as: "name",
        },
        articles: {
          id: {
            as: "authorPosts"
            fn: {
              aggregate: COUNT
            }
          }
        }
      },
      having: {
        alias: "authorPosts"
        int: {
          gte: 10
        }
      }
    }
  ) {
    groups {
      name: String
      authorPosts: Int
    }
  }
}

```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "name": "James Huxley",
          "authorPosts": 12
        },
        {
          "name": "Stephen Begzz",
          "authorPosts": 10
        }
      ]
    }
  }
}
```


Compound having clauses are also supported in the similar way that filters do. You can specify them in two equivalent ways:

**Example**

```javascript
/**
 * Group authors with their articles count as authorPosts and filter using
 * a compound having clause by groups (authors) with more than/equal to 5 authorPosts
 * yet less than/equal to 10.
 */
query {
  authorsList(
    groupBy: {
      query: {
        name: {
          as: "name",
        },
        articles: {
          id: {
            as: "authorPosts"
            fn: {
              aggregate: COUNT
            }
          }
        }
      },
      having: {
        AND: [
					{
            alias: "authorPosts"
        		int: {
          		gte: 5
        	}
          },
					{
            alias: "authorPosts"
        		int: {
          		lte: 10
        	}
          }
        ]
      }
    }
  ) {
    groups {
      name: String
      authorPosts: Int
    }
  }
}
```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "name": "Huckelberry Ben",
          "authorPosts": 7
        },
        {
          "name": "Stephen Begzz",
          "authorPosts": 10
        }
      ]
    }
  }
}
```


In that case you can define multiple clauses for the same alias without alias duplication like in the previous example:

**Example**

```javascript
/**
 * Group authors with their articles count as authorPosts and filter using
 * a multiple having clause by groups (authors) with more than/equal to 5 authorPosts
 * yet less than/equal to 10.
 */
query {
  authorsList(
    groupBy: {
      query: {
        name: {
          as: "name",
        },
        articles: {
          id: {
            as: "authorPosts"
            fn: {
              aggregate: COUNT
            }
          }
        }
      },
      having: {
        alias: "authorPosts"
        int: AND: [{
          gte: 5
        },
        {
          lte: 10
        }]
      }
    }
  ) {
    groups {
      name: String
      authorPosts: Int
    }
  }
}
```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "name": "Huckelberry Ben",
          "authorPosts": 7
        },
        {
          "name": "Stephen Begzz",
          "authorPosts": 10
        }
      ]
    }
  }
}
```


## Special grouping fields

##### _group

8base provides a special groupBy query field called `_group`. It’s a shortcut to an aggregation function with a distinct modifier applied - { aggregate: GROUP_CONCAT, distinct: true }.

Using this field, you can access the array of records used in the grouping, including the joined tables from each group at different nesting levels.

**Example**

```javascript
/**
 * Group authors with their articles count as authorPostsCount and access the collection of authors posts.
 */
query {
  authorsList(
    groupBy: {
      query: {
        name: {
          as: "name",
        },
        articles: {
          id: {
            as: "authorPostsCount"
            fn: {
              aggregate: COUNT
            }
          },
          _group: {
            as: "authorPosts"
          }
        }
      }
    }
  ) {
    groups {
      name: String
      authorPostsCount: Int
      authorPosts: PostGroup {
        items {
          title
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "name": "Steven Snyder",
          "authorPostsCount": 3,
          "authorPosts": {
            "items": [
              {
                "title": "LEGACY: My Post - ADD ME AFTER"
              },
              {
                "title": "LEGACY: My Other Post - ADD ME AFTER"
              },
              {
                "title": "LEGACY: My Other Awesome Post - ADD ME AFTER"
              }
            ]
          }
        }
      ]
    }
  }
}
```


## Type Conversions

Type conversions are designed to perform a best effort on converting actual values to the expected type. If this is impossible or meaningless, an instructive error will be thrown. The following list shows the permitted expected types and each one's actual value types that are supported.

- **ID**
- any (if matches a CUID pattern)

- **String**
- string
- datetime (converted to ISO string)
- number

- **Int**
- number
- string (parsed as an integer)

- **BigInt**
- number (converted to string)
- string (if matches a big integer numeric pattern)

- **Float**
- number
- string (parsed as a floating point number)

- **DateTime**
- datetime
- date
- string (parsed as datetime)

- **Date**
- datetime
- date
- string (parsed as date)

- **Boolean**
- any (converted to boolean)

- **JSON**
- string (parsed as JSON if possible)
- any (returned as is)

- **{TableName}Group**
- array of the groups records

## Aggregation Functions
Each aggregation function is combined with optional distinct modifier, which is false by default.

- `AVG`: Average the columns values
- `SUM`: Sum the columns values
- `COUNT`: Count how many values are in a specified column
- `MIN`: Find the minimum value of the column
- `MAX`: Find the maximum value of the column
- `GROUP_CONCAT`: Concatenate all values in the specified column
- `ANY_VALUE`: Accept any value
