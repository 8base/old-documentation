## Error: Cannot find module 'graphql/language/parser'
Install `graphql` package: `npm install graphql` and deploy your project again.

## Asynchronous operation works when running function locally, but not when deployed
This is due to the fact that the execution environment freezes immediately after your function returns. [Learn more](doc:context#section-what-happens-after-return).