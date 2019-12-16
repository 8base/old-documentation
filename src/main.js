// Import global styles
import '~/assets/style/index.scss'

// Add global components
import Card from '~/components/Card'
import Layout from '~/layouts/Default.vue'
import DocsLayout from '~/layouts/Docs.vue'
import Section from '~/components/Section.vue'
import Feature from '~/components/Feature.vue'
import CodeSample from '~/components/CodeSample.vue'
import YoutubePlayer from '~/components/YoutubePlayer.vue'

import VueScrollTo from 'vue-scrollto'

import Typography from 'typography'

// Plugins
const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.6,
  scaleRatio: 1.9,
  headerFontFamily: ['Poppins', 'Helvetica','Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Poppins', 'Helvetica','Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
})

export default function (Vue, { head, router, isServer }) {
  Vue.component('Card', Card)
  Vue.component('Layout', Layout)
  Vue.component('Section', Section)
  Vue.component('Feature', Feature)
  Vue.component('DocsLayout', DocsLayout)
  Vue.component('CodeSample', CodeSample)
  Vue.component('YoutubePlayer', YoutubePlayer)

  Vue.use(VueScrollTo)

  head.style.push({
    type: 'text/css',
    cssText: typography.toString()
  })
}
