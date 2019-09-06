*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Fetching multiple table records
Query list of records from a single table. Note the `items` key that denotes an array of results will get returned.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  postsList {
    count
    items {
      title
      body
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "postsList": {
      "count": 3,
      "items": [
        {
          "title": "Awesome Possum",
          "body": "This post is awesome, like a possum!"
        },
        {
          "title": "A Sunset and Waves",
          "body": "There was once a beautiful sunset, and waves."
        },
        {
          "title": "Vapor Distilled Water for All",
          "body": "Everyone can have vapor distilled water."
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
