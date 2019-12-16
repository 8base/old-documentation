<template>
  <Layout class="has-sidebar docs-page" :footer="false">
    <div class="container flex flex-align-top">
      <!-- Left Sidebar -->
      <LeftSidebar :links="links" :currentIndex="currentIndex" />

      <Section class="doc-content flex-fit" container="base">
        <slot />
        <p>
          <a :href="editLink" target="_blank" class="github-edit-link">
            <Github />
            <span>Edit this page on GitHub</span>
          </a>
        </p>
        <nav class="docs-nav">
          <div class="docs-nav__previous">
            <g-link v-if="previousPage" exact class="button  button--small docs-nav__link" :to="previousPage.link">
              &larr; {{ previousPage.title }}
            </g-link>
          </div>
          <div class="docs-nav__next">
            <g-link v-if="nextPage" exact class="button  button--small docs-nav__link" :to="nextPage.link">
              {{ nextPage.title }} &rarr;
            </g-link>
          </div>
        </nav>
      </Section>

      <RightSidebar :subtitles="subtitles" />
    </div>
  </Layout>
</template>

<script>
import Github from '~/assets/images/github-logo.svg'
import LeftSidebar from './partials/LeftSidebar.vue'
import RightSidebar from './partials/RightSidebar.vue'

export default {
  components: {
    Github,
    LeftSidebar,
    RightSidebar
  },
  props: {
    subtitles: { type: Array, default: () => [] },
    links: { type: Array, default: () => [] }
  },
  computed: {
    currentPath () {
      return this.$route.matched[0].path
    },
    editLink () {
      let path = this.currentPath
      if((path.match(new RegExp("/", "g")) || []).length == 1) path = path + '/README'
      return `https://github.com/gridsome/gridsome.org/blob/master${path}.md`
    },
    currentIndex () {
      return this.items.findIndex(item => {
        return item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
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
      let i = 0;
      let flatSummary = [];
      this.links.forEach(item => {
        item.items.forEach(item1 => {
          item1.order = i;
          item1.depth = 0;
          item1.relatives = []; 
          i++;        
          flatSummary.push(item1);
          if(item1.items){
            item1.items.forEach(item2 => {
              item2.order = i;
              item2.depth = 1;
              item1.relatives.push(i);   
              item2.relatives = [];            
              i++;                                                      
              flatSummary.push(item2);
              if(item2.items){
                item2.items.forEach(item3 => {
                  item3.order = i;
                  item3.depth = 2;
                  item1.relatives.push(i);
                  item2.relatives.push(i);   
                  item3.relatives = [];     
                  i++;                  
                  flatSummary.push(item3);
                });
              } 
            });
          } 
        });
      });
      return flatSummary;
    },   
    currentIndex () {
      return this.items.findIndex(item => {
        return item.link.replace(/\/$/, '') === this.$route.path.replace(/\/$/, '')
      })
    },
  }
}
</script>
