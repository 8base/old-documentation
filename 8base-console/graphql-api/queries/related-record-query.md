*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Fetching related table records
Query a single record and return data from related tables in the response.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(title: "Awesome Possum") {
    title
    author {
      name
      avatar {
        downloadUrl
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
    "post": {
      "title": "Awesome Possum",
      "author": {
        "name": "Huxley",
        "avatar": {
          "downloadUrl": "https://linktomy.downloadUrl/forA/amazingAvatar.jpg"
        }
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}