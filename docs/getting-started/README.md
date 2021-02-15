# Overview

**8base** is a Backend-as-a-Service. It lets front-end developers focus more on what they love and backend developers expedite their workflow.

When using 8base, you're project benefits from having:

1. A fully scalable serverless GraphQL API.
2. A fully managed MySQL Database that's hosted on AWS ([Aurora MySQL](https://aws.amazon.com/rds/aurora/)).
3. Ready-to-use app services (Authentication, Authorization, File Storage, and more)
4. 8base's rock-star team and [the Community](https://community.8base.com)
5. So, so, so much more!

## 8base Application Structure

Every 8base Workspace contains of the following components:

1. **Schema**: A Schema represents the shape of your application data and specifies what data a client application can query from your API, as well as how to manipulate it.
2. **System Data**: Data resources that are pre-defined by default for every 8base application, such as: [Team Members](/docs/8base-console/teams), Users, [Roles & Permissions](/docs/8base-console/roles-and-permissions), and [Files](/docs/8base-console/handling-files).
3. **User Data**: All the unique data resources (tables, records, etc) that are specific to your application.
4. **Authentication and Authorization System**: Sign-up/Sign-in, manage, and authorizion flows of your application. [Authentication](/docs/8base-console/authentication) is implemented through [Authentication Profiles](/docs/8base-console/authentication#authentication-types) while [Authorization](/docs/8base-console/roles-and-permissions) uses the roles and permissions system.
5. **Workspace Users**: 8base users with access to your Workspace through the console.
6. [Custom Logic (Custom Functions)](/docs/8base-console/custom-functions): For building and extending your application's server-side functionality.
7. **Integrations**: Data and functionalities from 3rd party sources.
8. [CI/CD](/docs/development-tools/cli/ci-cd): The ability to create branched Workspace environments and a development pipeline.

## Workspaces

The structure of a Workspace can generally be divide into two parts:

### System Parts

- Schema
- System Data
- Custom Logic (Functions)
- Authentication Data
- Authorization (Roles and Permission)
- Workspace Settings

### User Parts

Application users and all the data created by them, contained in user data tables.

An awesome way to get more familiar with the true power of 8base is to complete [the quick start app](/docs/getting-started/quick-start) and watch some of the [8base Academy Videos](https://www.youtube.com/channel/UCQgTczr5z_O4SJ-3nkANOaw). That said, below is a list of great guides to help get you familiar with many key concepts.

## Useful Guides

> [Quick Start](/docs/getting-started/quick-start)
> Learn 8base by building a React or Vue application.
>
> [Management Console](/docs/8base-console)
> Read the high-level overview of 8base's management console.
>
> [Connect to your API](/docs/getting-started/connecting-to-api)
> Explore ways to connect to the 8base GraphQL API.
>
> [GraphQL API](/docs/8base-console/graphql-api)
> Dive deeper into API concepts like authentication, queries, mutations, subscriptions and files.
>
> [Custom Functions](/docs/8base-console/custom-functions)
> Learn how to deploy back-end functions in JavaScript/TypeScript using 8base CLI.
>
> [Client Tools](/docs/development-tools/sdk)
> Accelerate front-end development with the 8base SDK and Boost UI Kit.
