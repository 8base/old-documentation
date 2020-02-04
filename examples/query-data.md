---
title: Query Data
filepath: data-query.graphql
filetype: graphql
order: 3
---

### Request

```graphql
# Get data from connected Salesforce instance
# Query related tables in a single query
{
  salesforce {
    account(id: "001f400000f1DnZAAU") {
      Name
      Opportunities {
        items {
          Name
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
    "salesforce": {
      "account": {
        "Name": "GenePoint",
        "Opportunities": {
          "items": [
            {
              "Name": "GenePoint Standby Generator"
            },
            {
              "Name": "GenePoint Lab Generators"
            },
            {
              "Name": "GenePoint SLA"
            }
          ]
        }
      }
    }
  }
}
```
