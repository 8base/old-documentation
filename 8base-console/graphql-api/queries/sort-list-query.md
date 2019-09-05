*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Sorted list queries

Results from your query can be sorted by using the `sort` argument. The sort order (ascending vs. descending) gets set by specifying ASC or DESC for the field name.

Sorting a list of queried records.

**Query**
```javascript
query {
  postsList(sort: {
    createdAt: ASC
  }) {
    items {
      createdAt
      title
    }
  }
}
```

**Result**
```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "createdAt": "2019-09-04T22:11:18.493Z",
          "title": "Awesome Possum"
        },
        {
          "createdAt": "2019-09-04T22:22:51.846Z",
          "title": "A Sunset and Waves"
        },
        {
          "createdAt": "2019-09-04T22:23:22.710Z",
          "title": "Vapor Distilled Water for All"
        },
        {
          "createdAt": "2019-09-04T22:26:19.045Z",
          "title": "Everybody Loves Possum"
        },
        {
          "createdAt": "2019-09-04T22:32:50.430Z",
          "title": "Abominable Snowman Found Dead in Miami Motel"
        }
      ]
    }
  }
}
```

### Nested/multi-field sorting

Results from your query can be sorted by attributes on related tables, as well as using multiple sort objects. They're ranked in priority by the order they're recieved in.

```javascript
query {
  postsList(sort: [
    {
      author: {
        name: DESC
      }
    }, 
    {
      title: ASC
    }
  ]) {
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

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Vapor Distilled Water for All",
          "createdAt": "2019-09-04T22:23:22.710Z",
          "author": {
            "name": "Vanderwall"
          }
        },
        {
          "title": "A Sunset and Waves",
          "createdAt": "2019-09-04T22:22:51.846Z",
          "author": {
            "name": "Stevens"
          }
        },
        {
          "title": "Everybody Loves Possum",
          "createdAt": "2019-09-04T22:26:19.045Z",
          "author": {
            "name": "Stevens"
          }
        },
        {
          "title": "Abominable Snowman Found Dead in Miami Motel",
          "createdAt": "2019-09-04T22:32:50.430Z",
          "author": {
            "name": "Huxley"
          }
        },
        {
          "title": "Awesome Possum",
          "createdAt": "2019-09-04T22:11:18.493Z",
          "author": {
            "name": "Huxley"
          }
        }
      ]
    }
  }
}
```


