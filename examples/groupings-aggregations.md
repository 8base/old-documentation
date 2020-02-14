---
title: Grouping and Aggregations
filepath: grouping-and-aggregations.graphql
filetype: graphql
order: 6
---

### Request

```graphql
# Group all usage by a project and then SUM the total
# values for each metric type tracked in the project,
# within a specified time period.
{
  metricTotalUsagesList(
    groupBy: {
      query: {
        projectId: { as: "ProjId" }
        limitMetric: { type: { as: "MetricType" } }
        value: { as: "MetricValue", fn: { aggregate: SUM } }
      }
    }
    filter: {
      createdAt: {
        gt: "2020-01-01T00:00:00.000Z"
        lt: "2020-02-01T00:00:00.000Z"
      }
    }
  ) {
    groups {
      ProjId: ID
      MetricValue: Int
      MetricType: String
    }
  }
}
```

### Response

```json
{
  "data": {
    "metricTotalUsagesList": {
      "groups": [
        {
          "ProjId": "qiuwegd8730201mnbxu8g637h",
          "MetricValue": 23871,
          "MetricType": "API_CALLS"
        },
        {
          "ProjId": "qiuwegd8730201mnbxu8g637h",
          "MetricValue": 17,
          "MetricType": "ACTIVE_PROJECTS"
        },
        {
          "ProjId": "cd9u37d3797201lc0zdeb0apih",
          "MetricValue": 1231,
          "MetricType": "API_CALLS"
        }
        // ... other results
      ]
    }
  }
}
```
