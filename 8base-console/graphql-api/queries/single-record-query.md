*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Single record queries

You can fetch a single record using the record's `id`.

**Query**
```javascript
query {
  post(id: "<POST_ID>") {
    id
    title
    body
  }
}
```
**Response**
```javascript
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

### Single record queries using unique fields
You can fetch a single record using a unique field other than `id`. This field must be specified as *No Duplicate Values* in the table's field definition.

**Query**
```javascript
query {
  post(title: "Awesome Possum") {
    title
    body
  }
}
```

**Response**
```javascript
{
  "data": {
    "post": {
      "title": "Awesome Possum",
      "body": "This post is awesome, like a possum!"
    }
  }
}
```
