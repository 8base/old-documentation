---
title: Filtering, Pagination, Sorting
filepath: using-arguments.graphql
filetype: graphql
order: 4
---

### Request

```graphql
# Get first 5 projects with ‘UI’ or ‘Integrations’
# tags and order them by creation date
{
  projectsList(
    filter: {tags: {some: {name: {in: ["UI", "Integrations"]}}}}
    first:
    orderBy: [createdAt_DESC]
  ) {
    items {
      title
      tags {
        items {
          name
        }
      }
    }
  }
}
```

### Response

```json
{
  "data": {
    "projectsList": {
      "items": [
        {
          "title": "Dashboard v2.0",
          "tags": {
            "items": [
              {
                "name": "ReactJS"
              },
              {
                "name": "UI"
              }
            ]
          }
        },
        {
          "title": "Data migration",
          "tags": {
            "items": [
              {
                "name": "Integrations"
              }
            ]
          }
        },
        {
          "title": "New Login UI",
          "tags": {
            "items": [
              {
                "name": "ReactJS"
              },
              {
                "name": "UI"
              }
            ]
          }
        }
      ]
    }
  }
}
```
