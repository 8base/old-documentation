---
title: Related Objects
filepath: related-objects-query.graphql
filetype: graphql
order: 2
---

### Request

```graphql
# Select first 5 employees from 'technology' department
# and get projects they are working on
{
  department(name: "technology") {
    employees(first: ) {
      count
      items {
        name
        projects {
          items {
            title
          }
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
    "department": {
      "employees": {
        "count": ,
        "items": [
          {
            "name": "Isabel Fisher",
            "projects": {
              "items": [
                {
                  "title": "Dashboard v2.0"
                }
              ]
            }
          },
          {
            "name": "Cristen Adams",
            "projects": {
              "items": [
                {
                  "title": "Data migration"
                },
                {
                  "title": "New Login UI"
                }
              ]
            }
          },
          {
            "name": "Ellie Austin",
            "projects": {
              "items": [
                {
                  "title": "Dashboard v2.0"
                },
                {
                  "title": "Data migration"
                }
              ]
            }
          },
          {
            "name": "Naseem Carney",
            "projects": {
              "items": [
                {
                  "title": "New Login UI"
                }
              ]
            }
          },
          {
            "name": "Kaydan Harrell",
            "projects": {
              "items": []
            }
          }
        ]
      }
    }
  }
}
```
