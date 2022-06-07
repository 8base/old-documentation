const nodeExternals = require('webpack-node-externals')

module.exports = {
  siteName: '8base Documentation',
  siteUrl: `https://docs.8base.com`,
  titleTemplate: '%s - 8base Documentation',
  siteDescription: 'Build and run web and mobile applications faster using JavaScript, GraphQL, and 8base 🚀.',

  chainWebpack(config, { isServer }) {
    config.mode('development')
  
    // Rule for SVG Loading
    config.module.rules.delete('svg')
    config.module.rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
        .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')

    // // Rule for GIF Loading
    config.module.rules.delete('gif')
    config.module.rule('gif')
      .test(/\.(gif)$/)
      .use('vue')
      .loader('url-loader')
      .options({ encoding: false })
      .end()

    if (isServer) {
      config.externals(nodeExternals({
        whitelist: [
          /\.css$/,
          /\?vue&type=style/,
          /vue-instantsearch/,
          /instantsearch.js/,
          /typeface-league-spartan/
         ]
      }))
    }
  },

  templates: {
    Example: node => node.path
  },

  plugins: [
    {
      use: '@gridsome/plugin-critical',
      options: {
        paths: ['/'],
        width: 1300,
        height: 900
      }
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        index: ['README'],
        baseDir: './docs',
        pathPrefix: '/docs',
        typeName: 'DocPage',
        template: './src/templates/DocPage.vue',
        plugins: [
          '@gridsome/remark-prismjs'
        ],
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#'
            }
          }
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'examples/*.md',
        typeName: 'Example',
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-KXDLMXJ',
        enabled: true,
        debug: true
      }
    }
  ]
}
