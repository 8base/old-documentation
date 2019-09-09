*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Variables
![Using Variables in GraphQL queries](../../../.gitbook/assets/api-explorer-variables-examples.png)

In order to make a query re-usable, it can be made dynamic by using variables.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query($filter: PostFilter) {
  postsList(filter: $filter) {
    count
    items {
      title
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Variables" %}
```json
{
  "filter": {
    "title": {
      "contains": "Possum"
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
      "count": 2,
      "items": [
        {
          "title": "Awesome Possum"
        },
        {
          "title": "Everybody Loves Possum"
        }
      ]
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}


### Aliases
Aliases get used to return objects having different names than their field names. This is needed when fetching the same type of objects with different arguments in a single query.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  hux: author(name: "Huxley") {
    name
    posts {
      count
    }
  }
  
  steve: author(name: "Stevens") {
    name
    posts {
      count
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "hux": {
      "name": "Huxley",
      "posts": {
        "count": 2
      }
    },
    "steve": {
      "name": "Stevens",
      "posts": {
        "count": 2
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Fragments
Queries can get verbose and unorganized. Fragment create a set of fields that can then be used to represent the defined set.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
query {
  hux: author(name: "Huxley") { ...authorFrag }
  steve: author(name: "Stevens") { ...authorFrag }
}

fragment authorFrag on Author {
  name
  posts {
    count
    items {
      title
      createdAt
      updatedAt
    }
  }
}
```
{% endcode-tabs-item %}

{% code-tabs-item title="Result" %}
```json
{
  "data": {
    "hux": {
      "name": "Huxley",
      "posts": {
        "count": 2,
        "items": [
          {
            "title": "Awesome Possum",
            "createdAt": "2019-09-04T22:11:18.493Z",
            "updatedAt": "2019-09-04T22:20:34.650Z"
          },
          {
            "title": "Abominable Snowman Found Dead in Miami Motel",
            "createdAt": "2019-09-04T22:32:50.430Z",
            "updatedAt": "2019-09-04T22:32:50.430Z"
          }
        ]
      }
    },
    "steve": {
      "name": "Stevens",
      "posts": {
        "count": 2,
        "items": [
          {
            "title": "A Sunset and Waves",
            "createdAt": "2019-09-04T22:22:51.846Z",
            "updatedAt": "2019-09-04T22:22:51.846Z"
          },
          {
            "title": "Everybody Loves Possum",
            "createdAt": "2019-09-04T22:26:19.045Z",
            "updatedAt": "2019-09-04T22:26:19.045Z"
          }
        ]
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
