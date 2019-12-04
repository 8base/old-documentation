# Grouping and Aggregations

In order to provide strong and flexible grouping and aggregation capabilities to the GraphQL API, 8base has implemented a "dynamic" approach that doesn't necessarily fit within the strict boundaries of a predefined static schema.

By taking that liberty, we're able to let users build powerful grouping and aggregation queries by manually assigning aliased names and a seperate structure with expected results - for which they explicitly declare the result types. All queries that get written closely follow a strict SQL group by semantics. This is why a column should be either a grouping or an aggregation.

## Groupings

A _group_ can be defined by multiple fields, including relations. All the fields you want to see in the result set should have a unique alias specified in the `as` property. The alias should contain only alpha-numerical symbols, and `null` is a valid implicit grouping for an empty group.

Any _group_ gets defined in the `groupBy` argument of any tables list query (for example, `tableNameList(groupBy: $groupOptions)`). The expected result set is described in the GraphQL results object in a form `<ALIAS>: <EXPECTED_TYPE>`. Some reasonable result type conversions will be applied automatically during the query execution, if necessary.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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
      _groupIds: {
        as: "postsIds"
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
      postsIds: GroupIds
    }
  }
}
```

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

```json
{
  "data": {
    "articlesList": {
      "groups": [
        {
          "authorName": "James Huxley",
          "authorPosts": 12,
          "postsIds": [
            "ck37jzw2f001b01l7dhm09gcu",
            "ck37jzw2f001j01l77093d05d",
            "ck37jzw2f001a01l73cnf8ax5",
            "ck37jzw2f001i01l723258t3i",
            "ck37jzw2f001h01l78n2hagxp",
            "ck37jzw2f001g01l71wtk87kp",
            "ck37jzw2f001o01l7hjp5ee4n",
            "ck37jzw2f001f01l787o65uh7",
            "ck37jzw2f001e01l76wbmgnrt",
            "ck37jzw2f001m01l74cz49nb4",
            "ck37jzw2f001l01l7f93be80q",
            "ck37jzw2f001c01l78ga4brgb"
          ]
        },
        {
          "authorName": "Huckelberry Ben",
          "authorPosts": 7,
          "postsIds": [
            "ck37jzw2g002501l73ol60z36",
            "ck37jzw2g002l01l75799d0f4",
            "ck37jzw2g002t01l75ehxgbyt",
            "ck37jzw2h003g01l76rzaayho",
            "ck37jzw2g002c01l79r61banv",
            "ck37jzw2g002q01l77hg3hgz2",
            "ck37jzw2g002801l7ha9w90ov"
          ]
        },
        {
          "authorName": "Stephen Begzz",
          "authorPosts": 10,
          "postsIds": [
            "ck37jzw2o005z01l74727gcjl",
            "ck37jzw2n005201l7d5aidgfv",
            "ck37jzw2n004t01l7erv4fkom",
            "ck37jzw2m003w01l7cafeag37",
            "ck37jzw2p007701l7e0w5949g",
            "ck37jzw2n004y01l714dicfap",
            "ck37jzw2n005u01l7hg1u6yii",
            "ck37jzw2n004p01l78w0qfm2i",
            "ck37jzw2n005d01l78g7kd290",
            "ck37jzw2o006801l7ghhs0gm8"
          ]
        }
      ]
    }
  }
}
```

{% endcode-tabs-item %}
{% endcode-tabs %}

## Aggregations

Every group defined has an additional `fn` property, where you can specify an array of functions (or single) to apply to the column. For example, `SUM` the column or return the `MIN` or `MAX` value.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

## Sorting

Simple sorting can be achieved at the _groups_ level using ascending and descending order. Specifying the alias(es) for which the groups should be sorted by, `ASC` or `DESC` arguments can then get used.

**Group by sort is not the same as the sort and orderBy for the list queries** and gets specified inside the groupBy query definition object. Group sorting only applies to the result set of groups, not to the original records themselves.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

## Pagination

The `first` / `last` / `skip` pagination parameters are supported for groupings and **not related to the list query pagination parameters**. They work together with the group by sorting and also apply to the _group_ level result set rather than the source records.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

## Filtering

You can use the same filter parameter as in list queries and combine it with groupings. The filter will be applied before the groupBy operation.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

## Having

The `having` argument is a very powerful tool for adding filters that utilize aggregated or aliased fields. Unlike filters, though, the `having` clause is applied after the `groupBy` operation. Because of the execution order you can’t access entity field names and instead should use earlier declared aliases from the query part.

Another implication of it is that you should explicitly specify an expected filter type, because it can be different from the underlying column type. For example, using an `Int` filter when a `COUNT` aggregation function is applied to a text column.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

Compound having clauses are also supported in the similar way that filters do. You can specify them in two equivalent ways:

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

In that case you can define multiple clauses for the same alias without alias duplication like in the previous example:

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

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

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

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

{% endcode-tabs-item %}
{% endcode-tabs %}

## Special grouping fields

##### Group IDs

8base provides one special group by field called `_groupIds`. Actually it’s a shortcut to an aggregation function with a distinct modifier applied - { aggregate: GROUP_CONCAT, distinct: true }.

Using this field, you can get an array of result IDs including the joined tables from each group at different nesting levels.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}

```javascript
/**
 * Group authors with their articles count as authorPosts and filter using
 * a compound having clause by groups (authors) with less than/equal to 10 authorPosts
 * and return an array of their post's ids.
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
          _groupIds: {
            as: "authorPostIds"
          }
        }
      },
      having: {
        alias: "authorPosts"
        int: {
          lte: 10
        }
      }
    }
  ) {
    groups {
      name: String
      authorPosts: Int
      authorPostIds: GroupIds
    }
  }
}
```

{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}

```json
{
  "data": {
    "authorsList": {
      "groups": [
        {
          "name": "Huckelberry Ben",
          "authorPosts": 7,
          "authorPostIds": [
            "ck37jzw2g002501l73ol60z36",
            "ck37jzw2g002801l7ha9w90ov",
            "ck37jzw2g002c01l79r61banv",
            "ck37jzw2g002l01l75799d0f4",
            "ck37jzw2g002q01l77hg3hgz2",
            "ck37jzw2g002t01l75ehxgbyt",
            "ck37jzw2h003g01l76rzaayho"
          ]
        },
        {
          "name": "Stephen Begzz",
          "authorPosts": 10,
          "authorPostIds": [
            "ck37jzw2m003w01l7cafeag37",
            "ck37jzw2n004p01l78w0qfm2i",
            "ck37jzw2n004t01l7erv4fkom",
            "ck37jzw2n004y01l714dicfap",
            "ck37jzw2n005201l7d5aidgfv",
            "ck37jzw2n005d01l78g7kd290",
            "ck37jzw2n005u01l7hg1u6yii",
            "ck37jzw2o005z01l74727gcjl",
            "ck37jzw2o006801l7ghhs0gm8",
            "ck37jzw2p007701l7e0w5949g"
          ]
        }
      ]
    }
  }
}
```

{% endcode-tabs-item %}
{% endcode-tabs %}

### Type Conversions

Type conversions are designed to perform a best effort on converting actual values to the expected type. If this is impossible or meaningless, an instructive error will be thrown. The following list shows the permitted expected types and each one's actual value types that are supported.

##### `ID`

- any (if matches a CUID pattern)

##### `String`

- string
- datetime (converted to ISO string)
- number

##### `Int`

- number
- string (parsed as an integer)

##### `BigInt`

- number (converted to string)
- string (if matches a big integer numeric pattern)

##### `Float`

- number
- string (parsed as a floating point number)

##### `DateTime`

- datetime
- date
- string (parsed as datetime)

##### `Date`

- datetime
- date
- string (parsed as date)

##### `Boolean`

- any (converted to boolean)

##### `JSON`

- string (parsed as JSON if possible)
- any (returned as is)

##### `GroupIds`

- string (parsed from comma-separated IDs list and only if all entries are valid IDs)

## Aggregation Functions

Each aggregation function is combined with optional distinct modifier, which is false by default.

- `AVG`: Average the columns values
- `SUM`: Sum the columns values
- `COUNT`: Count how many values are in a specified column
- `MIN`: Find the minimum value of the column
- `MAX`: Find the maximum value of the column
- `GROUP_CONCAT`: Concatenate all values in the specified column
- `ANY_VALUE`: Accept any value
