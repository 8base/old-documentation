# Overview

**8base** is a Backend-as-a-Service. It lets front-end developers focus more on what they love and backend developers expedite their workflow. As our CEO likes to say, "it's totally awesome!"

When using 8base, you're project benefits from having:

1. A fully scalable serverless API
2. A managed MySQL Database that's hosted on AWS
3. Ready-to-use app services, like Authentication, Authorization, and File Storage
4. 8base's rock-star team and [the Community](https://community.8base.com)
5. So, so, so much more!

## 8base Application Structure

Every 8base application consists of the following components:

1. Schema
It describes all of the project Tables and Custom Functions.
Simply put, Schema represents the shape of your application data, specifies what exactly clients can get from your application and how to manipulate with it.
2. System Data
Several data categories pre-defined by default for every 8base application, such as: [Team Members](/docs/8base-console/teams), Users, [Roles & Permissions](/docs/8base-console/roles-and-permissions)
3. User Data
All the unique data created directly by application users.
4. Authentication and Authorization System
It defines signing up, managing, and authorizing flow of your application.
[Authentication](/docs/8base-console/authentication) is implemented through Authentication Profiles
[Authorization](/docs/8base-console/roles-and-permissions) uses roles and permissions managing system
5. [Files](/docs/8base-console/handling-files)
6. Workspace Users
7. [Custom Logic (Custom Functions)](/docs/8base-console/custom-functions)
Easy way to build and extend your server-side application functionality.
8. Billing
9. Integrations**
Integration of data and functionalities from 3rd party sources.
10. [CI/CD](/docs/development-tools/cli/ci-cd)

## Workspaces

All the above mentioned parts of 8base application system become available to you through the **Workspace**.
You can represent it as your personal environment for application development. (see how to create and set it up in our [Quick Start Guide](/docs/getting-started/quick-start)

Based on this, structure of every Workspace follows the structure of whole application, described above, and generally can be divide into two parts:

### System Part

- Schema
- System Data
- Custom Logic (Functions)
- Authentication Data
- Authorization (Roles and Permission)
- Workspace Settings

### User Part

Application users and all the data created by them, contained in user data tables.

An awesome way to get more familiar with the true power of 8base is to complete [the quick start app](/docs/getting-started/quick-start) and watch some of the [8base Academy Videos](https://www.youtube.com/channel/UCQgTczr5z_O4SJ-3nkANOaw). That said, below is a list of great guides to help get you familiar with many key concepts.

## Useful Guides

> [Quick Start](/docs/getting-started/quick-start)  
> Learn 8base by building a React application.
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
