const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const yaml = require('js-yaml')
const Prism = require('prismjs')

// highlight page-query and static-query in html
Prism.languages.html.graphql = {
  pattern: /(<(page|static)-query[\s\S]*?>)[\s\S]*?(?=<\/(page|static)-query>)/i,
  inside: Prism.languages.graphql,
  lookbehind: true,
  greedy: true
}

module.exports = function (api) {
  api.loadSource(async ({ addMetadata, addCollection }) => {
    addMetadata('8baseVersion', '')

    // contributors
    const authorsPath = path.join(__dirname, 'contributors/contributors.yaml')
    const authorsRaw = await fs.readFile(authorsPath, 'utf8')
    const authorsJson = yaml.safeLoad(authorsRaw)
    const authors = addCollection('Contributor')

    authorsJson.forEach(({ id, name: title, ...fields }) => {
      authors.addNode({
        id,
        title,
        internal: {
          origin: authorsPath
        },
        ...fields
      })
    })
  })
}
