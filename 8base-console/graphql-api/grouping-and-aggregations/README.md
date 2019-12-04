# Grouping and Aggregations

In order to provide strong and flexible grouping and aggregation capabilities to the GraphQL API, 8base has implemented a "dynamic" approach that doesn't necessarily fit within the strict boundaries of a predefined static schema.

By taking that liberty, we're able to let users build powerful grouping and aggregation queries by manually assigning aliased names and a seperate structure with expected results - for which they explicitly declare the result types. All queries that get written closely follow a strict SQL group by semantics. This is why a column should be either a grouping or an aggregation.

## Groupings

A *group* can be defined by multiple fields, including relations. All the fields you want to see in the result set should have a unique alias specified in the `as` property. The alias should contain only alpha-numerical symbols, and `null` is a valid implicit grouping for an empty group.

Any *group* gets defined in the `groupBy` argument of any tables list query (for example, `tableNameList(groupBy: $groupOptions)`). The expected result set is described in the GraphQL results object in a form `<ALIAS>: <EXPECTED_TYPE>`. Some reasonable result type conversions will be applied automatically during the query execution, if necessary.

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
      postsIds: String
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
          "postsIds": "ck37jzw2f001b01l7dhm09gcu,ck37jzw2f001j01l77093d05d,ck37jzw2f001a01l73cnf8ax5,ck37jzw2f001i01l723258t3i,ck37jzw2f001h01l78n2hagxp,ck37jzw2f001g01l71wtk87kp,ck37jzw2f001o01l7hjp5ee4n,ck37jzw2f001f01l787o65uh7,ck37jzw2f001e01l76wbmgnrt,ck37jzw2f001m01l74cz49nb4,ck37jzw2f001l01l7f93be80q,ck37jzw2f001c01l78ga4brgb"
        },
        {
          "authorName": "Huckelberry Ben",
          "authorPosts": 7,
          "postsIds": "ck37jzw2g002l01l75799d0f4,ck37jzw2g002t01l75ehxgbyt,ck37jzw2g002501l73ol60z36,ck37jzw2g002c01l79r61banv,ck37jzw2h003g01l76rzaayho,ck37jzw2g002q01l77hg3hgz2,ck37jzw2g002801l7ha9w90ov"
        },
        {
          "authorName": "Stephen Begzz",
          "authorPosts": 10,
          "postsIds": "ck37jzw2o005z01l74727gcjl,ck37jzw2n005201l7d5aidgfv,ck37jzw2n004t01l7erv4fkom,ck37jzw2m003w01l7cafeag37,ck37jzw2p007701l7e0w5949g,ck37jzw2n004y01l714dicfap,ck37jzw2n005u01l7hg1u6yii,ck37jzw2n004p01l78w0qfm2i,ck37jzw2n005d01l78g7kd290,ck37jzw2o006801l7ghhs0gm8"
        },
        {
          "authorName": null,
          "authorPosts": 470,
          "postsIds": "ck37jzw2w00dr01l73zmzeuwy,ck37jzw2r009z01l7a9ith15n,ck37jzw2o006701l7azj9c9dz,ck37jzw2g002f01l76zjlh2ei,ck37jzw2w00dz01l72cgjdqem,ck37jzw2r00a701l7ht3q6pwn,ck37jzw2o006f01l738c63e52,ck37jzw2g002n01l7dtlzciym,ck37jzw2w00e701l7c0p9bsxo,ck37jzw2r00af01l74npifawf,ck37jzw2o006n01l7esb0h7f2,ck37jzw2g002v01l7g4wha0r2,ck37jzw2x00ef01l7fpu4df8q,ck37jzw2s00an01l72byv8n0p,ck37jzw2o006v01l71ybt9hiw,ck37jzw2g003301l78z531utv,ck37jzw2x00en01l78qot6942,ck37jzw2t00av01l7bkc8h200,ck37jzw2p007301l73lb27o8o,ck37jzw2h003b01l7e94c44bp,ck37jzw2x00ev01l7dxnf4piy,ck37jzw2u00b301l751c5d9iq,ck37jzw2p007b01l76ddx5vdn,ck37jzw2h003j01l77mr57kyn,ck37jzw2x00f301l7ecb0ai4n,ck37jzw2u00bb01l7bp5y1wig,ck37jzw2p007j01l75hux6jax,ck37jzw2m003r01l7177f6tho,ck37jzw2u00bj01l71xz8ec00,ck37jzw2p007r01l75nykac8k,ck37jzw2m003z01l7ebmf9pe7,ck37jzw2u00br01l7a85o5aqr,ck37jzw2p007z01l72g1lcoid,ck37jzw2m004701l794vg85p4,ck37jzw2u00bz01l78uf82vom,ck37jzw2p008701l7h8ze9y9k,ck37jzw2m004f01l789ul9y6d,ck37jzw2u00c701l75qpr7wsw,ck37jzw2q008f01l771fxbnvz,ck37jzw2m0"
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
Simple sorting can be achieved at the *groups* level using type detected ascending and descending order. By specifying the alias(es) by which the groups should be sorted, 8base will detect the result type and use the `ASC` or `DESC` argument.

**Group by sort is not the same as the sort and orderBy for the list queries** and gets specified inside the groupBy query definition object. Group sorting only applies to the result set of groups, not to the original records themselves.

**Example**
{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
/**
 * Group articles by their author's name, count how many articles belong to
 * each author, and sort by descending ording or the authorsPosts.
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
The `first` / `last` / `skip` pagination parameters are supported for groupings and **not related to the list query pagination parameters**. They work together with the group by sorting and also apply to the *group* level result set rather than the source records.

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
 * the having clause by groups (authors) with more than 10 authorPosts.
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
 * a compund having clause by groups (authors) with more than 5 authorPosts
 * yet less than 10.
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
 * a compund having clause by groups (authors) with less than 10 authorPosts
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
