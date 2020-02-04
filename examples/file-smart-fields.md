---
title: File and Smart Fields
filepath: file-and-smart-fields.graphql
filetype: graphql
order: 5
---

### Request

```graphql
# Query employee picture and address
# ‘address’ is a Smart Field that has sub-fields
{
  employee(id: "cjvy7mp8e001401pbczhi1ry2") {
    name
    picture {
      downloadUrl
    }
    address {
      country
      zip
    }
  }
}
```

### Response

```json
{
  "data": {
    "employee": {
      "name": "Isabel Fisher",
      "picture": {
        "downloadUrl": "https://..."
      },
      "address": {
        "country": "United States",
        "zip": "56301"
      }
    }
  }
}
```
