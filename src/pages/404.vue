<template>
  <Layout class="has-sidebar docs-page" :footer="false">
    <div class="container flex flex-align-top">
      <!-- Left Sidebar -->
      <LeftSidebar :links="links" :currentIndex="currentIndex" />

      <Section class="doc-content flex-fit" container="base">
        <div class="post mb">
      		<h1>404 - Page not found</h1>
      		<p>If you need help getting started, just reach out to us at <a href="mailto:support@8base.com">support@8base.com</a>.</p>
      	</div>
      </Section>
    </div>
  </Layout>
</template>

<script>
import links from '@/data/doc-links.yaml'
import LeftSidebar from "~/layouts/partials/LeftSidebar.vue"

export default {
  components: {
    LeftSidebar,
  },
  data: () => ({ links }), 
  computed: {
    subtitles() {
      // Remove h1, h4, h5, h6 titles
      let subtitles = this.$page.doc.subtitles.filter((value, index, arr) =>
        [2, 3].includes(value.depth)
      )
      return subtitles
    },
    currentPath () {
      return this.$route.matched[0].path
    },
    editLink () {
      let path = this.currentPath
      let test = (path.match(new RegExp('/', 'g')) || []).length == 1
      
      if (test) path = path + '/README'
      
      return `https://github.com/8base/Documentation/blob/master${path}.md`
    },
    items () {
      return this.links.reduce((acc, group) => (acc.push(...group.items), acc), [])
    },
    nextPage () {
      return this.items[this.currentIndex + 1]
    },
    previousPage () {
      return this.items[this.currentIndex - 1]
    },
    items () {
      let index = 0
      let relatives = []

      const summarizeItem = (flatSummary, item, depth) => {
        item.order = index
        item.depth = depth
        item.relatives = []

        relatives.forEach(s => s.relatives.push(index))
        flatSummary.push(item)
        index++
        
        if (item.items) {
          item.items.forEach(
            next =>
              relatives.push(item) &&
              summarizeItem(flatSummary, next, depth + 1, relatives)
          )
        }

        relatives = []
      }

      return links.reduce((flatSummary, { items }) => {
        items.forEach(item => summarizeItem(flatSummary, item, 0))
        return flatSummary
      }, [])
    },   
    currentIndex () {
      return this.items.findIndex(
        item => item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      )
    },
  }
}
</script>
