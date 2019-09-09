*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Using multiple queries in a request

If multiple queries are combined into a single request, they get executed in parallel, the responses are collated and returned as a single response object. This lets you fetch objects of different and unrelated types in the same query.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  /* A profile about the author */
  author(name: "Huxley") {
    posts {
      count
      items {
        title
      }
    }
  }
  
  /* A list of posts from other authors */
  postsList(filter: {
    author: {
      name: {
        not_equals: "Huxley"
      }
    }
  }) {
    items {
      title
    }
  }
  
  /* A list of others other than the huxley */
  authorsList(filter: {
    name: {
      not_equals: "Huxley"
    }
  }) {
    count
    items {
      name
    }
  }
}
```
{% endcode-tabs-item %}
{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "author": {
      "posts": {
        "count": 2,
        "items": [
          {
            "title": "Awesome Possum"
          },
          {
            "title": "Abominable Snowman Found Dead in Miami Motel"
          }
        ]
      }
    },
    "postsList": {
      "items": [
        {
          "title": "A Sunset and Waves"
        },
        {
          "title": "Vapor Distilled Water for All"
        },
        {
          "title": "Everybody Loves Possum"
        }
      ]
    },
    "authorsList": {
      "count": 2,
      "items": [
        {
          "name": "Stevens"
        },
        {
          "name": "Vanderwall"
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
