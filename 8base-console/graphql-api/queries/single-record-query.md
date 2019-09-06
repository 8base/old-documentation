*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Fetching specific table records
You can fetch a single record using the record's `id`.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(id: "<POST_ID>") {
    id
    title
    body
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "post": {
      "id": "<POST_ID>",
      "title": "Awesome Possum",
      "body": "This post is awesome, like a possum!"
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Single record queries using unique fields
You can fetch a single record using a unique field other than `id`. This field must be specified as *No Duplicate Values* in the table's field definition.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  post(title: "Awesome Possum") {
    title
    body
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
      "body": "This post is awesome, like a possum!"
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
