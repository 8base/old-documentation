# GraphQL API

All workspaces in 8base are assigned a unique API endpoints. These endpoints handle GraphQL queries, mutations and subscriptions for every data table (covering all Create, Read, Update, Delete operations, plus some...) out-of-the-box. Additionally, API comes with filtering, pagination, full-text search and many other advanced features, to put the best tools possible in the front-end developer's hands.

*Note: Using [Custom Functions](../custom-functions/README.md), these GraphQL resources can be extend and added to in anyway seen fit.*

There are several way of retrieving an API endpoint for your workspace. The most straightforward is to login to the [8base Management Console](https://app.8base.com), select a workspace and copy the `API Endpoint` displayed on the dashboard.

![Where to find a workspace API endpoint](../.gitbook/assets/workspace-api-endpoint.png)