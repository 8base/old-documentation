---
title: Mutations
filepath: create-mutation.graphql
filetype: graphql
order: 1
---

### Request

```graphql
# Create a new project, add two employees to it
# and attach a new ‘PDF’ tag in a single transaction

mutation {
  projectCreate(
    data: {
      title: "Sales Presentation v3.0"
      members: {
        connect: [
          { id: "cjvy7r28l00j701s4etrbfakq" }
          { id: "cjvy7rdoj00je01s48z3lg56n" }
        ]
      }
      tags: { create: { name: "PDF" } }
    }
  ) {
    title
    members {
      items {
        name
      }
    }
    tags {
      items {
        name
      }
    }
  }
}
```

### Response

```json
{
  "data": {
    "projectCreate": {
      "title": "Sales Presentation v3.0",
      "members": {
        "items": [
          {
            "name": "Bryan Rivas"
          },
          {
            "name": "Gabriela Patterson"
          }
        ]
      },
      "tags": {
        "items": [
          {
            "name": "PDF"
          }
        ]
      }
    }
  }
}
```
