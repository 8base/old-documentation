*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Mutating related records
You can create, connect, reconnect, and disconnect related table records using 8base's auto-generated GraphQL mutation operations.

* **Create**: Create and relate child objects.
* **Connect**: Connect existing objects in addition to already connected objects.
* **Reconnect**: Replace old connected objects with a new set of connected objects (update mutation only).
* **Disconnect**: Disconnect connected object(s) (update mutation only).

***Note**: Some examples will use [aliases](../README.md) to show side by side the use of `data.id` versus `filter`. All examples work without aliases.*

##### Creating related records in nested mutation
Whether when creating or updating a parent record, one or more child records can be created using `create`.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
/**
 * The author record's bio is gets updated while 
 * a new Post is being created and associated.
 */
mutation {
  authorUpdate(filter: {
    name: "Huxley"
  },
  data: {
    bio: "Just a guy who loves possum.",
    posts: {
      create: [{
        title: "Can't stop the Possum",
        body: "Cause Possum is Awesome",
        publishingDate: "2019-09-22T03:45:33.432Z"
      }]
    }
  }) {
    posts(last: 1) {
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
    "authorUpdate": {
      "posts": {
        "items": [
          {
            "title": "Can't stop the Possum"
          }
        ]
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Connecting records in mutation
One or more records can be connected using a mutation that associates them - whether the relationship is *many-to-many*, *one-to-many*, or *one-to-one*.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
/**
 * The author gets changed to the author 
 * named "Stevens" using connect.
 */
mutation {
  postUpdate(filter: {
    title: "Can't stop the Possum"
  },
  data: {
    author: {
      connect: {
        name: "Stevens"
      }
    }
  }) {
    title
    author {
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
    "postUpdate": {
      "title": "Can't stop the Possum",
      "author": {
        "name": "Stevens"
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Re-connecting records in mutation
All related records can be *dissasociated* from a record, while *connecting* one or more in a specified set.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
/**
 * All posts belonging to the author Huxley are changed to the new set.
 */
mutation {
  authorUpdate(filter: {
    name: "Huxley"
  },
  data: {
    posts: {
      reconnect: [{
        id: "ck08eum6101qf01l9cn6v35v4"
      }, {
        id: "ck08eve7t01r701l9fsg9a4ow"
      }]
    }
  }) {
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
    "authorUpdate": {
      "name": "Huxley",
      "posts": {
        "count": 2,
        "items": [
          {
            "title": "Awesome Possum"
          },
          {
            "title": "Pt.2 of the Possum Trilogy"
          }
        ]
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

##### Disconnecting records in mutation
One or more records can be disconnected using a mutation - whether the relationship is *many-to-many*, *one-to-many*, or *one-to-one*. If the relationship is *mandatory*, an error will be raised.

{% code-tabs %}
{% code-tabs-item title="Query" %}
```javascript
/**
 * All posts belonging to the author 
 * Huxley are changed to the new set.
 */
mutation {
  authorUpdate(filter: {
    name: "Huxley"
  },
  data: {
    publications: {
      disconnect: [{
        id: "ck0d2peue00sg01l36w2q2gdo"
      }, {
        id: "ck0d2q07g00sx01l340mt7lh9"
      }]
    }
  }) {
    name
    publications {
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
    "authorUpdate": {
      "name": "Huxley",
      "publications": {
        "count": 0
      }
    }
  }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
