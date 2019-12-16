# Pagenated Queries

*For the sake of the following examples, let's consider a scenario where a table called `Posts` exists, having expected fields and relations like `title`, `body`, `author`, etc.*

## Using pagination in queries
The arguments `skip` and `first` get used for pagination.

`first` specifies the number of rows to pass from the result set and `skip` determines which slice to retain from the results.

<div class="code-sample">
<div>
<label>Request</label>

```javascript
query {
  /**
   * First consider 0 as the starting slice of paginated rcords. As this
   * number is increased, the prior results leave out previously fetched
   * records. (i.e., skip 0 -> skip 3 -> skip 6 -> skip 9...)
   */
  postsList(skip: 0, first: 3) {
    items {
      title
    }
  }
}

```

</div>
<div>
<label>Response</label>

```json
{
  "data": {
    "postsList": {
      "items": [
        {
          "title": "Awesome Possum"
        },
        {
          "title": "A Sunset and Waves"
        },
        {
          "title": "Vapor Distilled Water for All"
        }
      ]
    }
  }
}
```

</div>
</div>
