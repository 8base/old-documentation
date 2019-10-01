*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Subscribing to records
You can subscribe to records being created, updated, and deleted using 8base's auto-generated GraphQL subscriptiong operation.

##### Create subscription
Subscription for listening to table records being created.

{% code-tabs %}
{% code-tabs-item title="Subscription" %}
```javascript
subscription {
  Posts(filter: {
    mutation_in: [create]
  }) {
    node {
      title
      publishingDate
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "Nothing is Im-possumble",
        "publishingDate": "2020-01-18"
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Update subscription
Subscription for listening to table records being updated.

{% code-tabs %}
{% code-tabs-item title="Subscription" %}
```javascript
subscription {
  Posts(filter: {
    mutation_in: [update]
  }) {
    node {
      title
      body
      publishingDate
      updatedAt
    }
    previousValues {
      title
      body
    }
    updatedFields
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "Nothing is ever Im-possumble",
        "body": "Never let anyone tell you that something you want in life is impossumble.",
        "publishingDate": "2020-01-18",
        "updatedAt": "2019-10-01T17:50:18.621Z"
      },
      "previousValues": {
        "title": "Nothing is Im-possumble",
        "body": "Never let anyone tell you that something is impossumble."
      },
      "updatedFields": [
        "title",
        "body"
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Delete subscription
Subscription for listening to table records being deleted.

{% code-tabs %}
{% code-tabs-item title="Subscription" %}
```javascript
subscription {
  Posts(filter: {
    mutation_in: [delete]
  }) {
    node {
      title
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "Posts": {
      "node": {
        "title": "10 Types of Fruit Possums Love"
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
