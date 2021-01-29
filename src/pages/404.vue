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
  computed: {
  	links () {
      return links
    },
    subtitles() {
      // Remove h1, h4, h5, h6 titles
      let subtitles = this.$page.doc.subtitles.filter(function(value, index, arr){
        return [2,3].includes(value.depth)
      })
      return subtitles
    },
    currentPath () {
      return this.$route.matched[0].path
    },
    editLink () {
      let path = this.currentPath
      if((path.match(new RegExp("/", "g")) || []).length == 1) path = path + '/README'
      return `https://github.com/8base/Documentation/blob/master${path}.md`
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
