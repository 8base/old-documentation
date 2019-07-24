For VS Code users we recommend installing the <a href="https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo" target="_blank">Apollo GraphQL extension</a>. It significantly improve the development experience by providing schema-based GraphQL autocompletion, query validation, syntax highlighting and more.

Once you installed the plugin create file `apollo.config.js` in the root of the project:
[block:code]
{
  "codes": [
    {
      "code": "module.exports = {\n  client: {\n    service: {\n      name: '8base',\n      url: 'https://8BASE_API_URL',\n    },\n    includes: [\n      \"src/**/*.{ts,tsx,js,jsx}\"\n    ]\n  },\n};",
      "language": "javascript",
      "name": "apollo.config.js"
    }
  ]
}
[/block]
