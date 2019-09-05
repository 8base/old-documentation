*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

### Related record queries
Query a single record and return data from related tables in the response.

**Query**
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

**Response**
```javascript
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