*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Using aggregators in queries
You can fetch aggregations on nodes using an aggregation query. Currently the available aggregation function is `count`. 

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  author(name: "Huxley") {
    name
    posts {
      count
      items {
        title
      }
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
      "name": "Huxley",
      "posts": {
        "count": 2,
        "items": [
          { "title": "10 things you never knew about Possums" },
          { "title": "3 things you never wanted to know about Possums" }
        ]
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
