<style lang="scss" scoped>
.header-search {
  flex: 1;
  width: 100%;
  display: block;
  margin-bottom: 0;
  font-size: 0.9rem;
  position: relative;

  label {
    display: flex;
    align-items: center;
  }

  .search-icon {
    margin-left: -1.66rem;
    width: 1rem;
    pointer-events: none;
    opacity: .6;
  }

  .search-dropdown-content {
    position: absolute;
    background-color: var(--bg);
    min-width: 348px;
    box-shadow: 0px -8px 34px 0px rgba(0,0,0,0.05);
    overflow: auto;
    z-index: 1;
    
    .search-dropdown-item {
      color: var(--body-color);
      font-size: .9em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: var(--bg-secondary)
      }

      a {
        text-decoration: none;   
      }
    }
  }
  
  .search-dropdown:hover .dropdowncontent {
    display: block;
  }

  .search-dropdown-link {
    p, hr, .search-highlight {
      margin: 2%;
    }
    p {
      color: var(--primary-color);
    }

    .search-highlight {
      margin: 2%;
      color: var(--body-color)
    }

    &:hover {
      p {
        color: var(--primary-color-dark);
      }
    }
  }
}
</style>


<template>
   <form class="header-search">
    <!-- Text Search Input -->
    <label>
      <input
        type="text"
        id="search"
        v-model="searchTerm"
        placeholder="Search..."
        class="search-dropdown-input"
      />

      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </label>
 
    <!-- Dropdown for Search Results -->
    <div class="search-dropdown-content">
      <div class="search-dropdown-item" v-for="(item, index) in searchResults" :key="index" @click="searchTerm = ''">
          <g-link 
            :to="item.path" 
            class="search-dropdown-link"
            :exact="item.path == '/docs/'" 
            :key="`${index}-${item.title}`" 
          >
            <p>{{ item.title }}</p>
            
            <hr>
            
            <Highlighter 
              class="search-highlight"
              highlightClassName="highlight"
              :searchWords="[searchTerm]"
              :autoEscape="true"
              :textToHighlight="item.extract"
            />
          </g-link>
      </div>
    </div>
  </form>
</template>

<static-query>
query Docs {
  docs: allDocPage {
    edges {
      node {
        id
        title
        headings (depth: h1) {
          value
        }
        subtitles: headings {
          depth
          value
          anchor
        }
        path
        content
      }
    }
  }
}
</static-query>

<script>
import Flexsearch from "flexsearch";
import removeMd from "remove-markdown";
import Highlighter from 'vue-highlight-words';

export default {
  components: {
    Highlighter
  },
  data() {
    return {
      index: null,
      searchTerm: ""
    };
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "id",
        field: [
          "title",
          "headings",
          "subtitles",
          "content"
        ]
      }
    });

    let nodes = this.$static.docs.edges.map(e => e.node);
    
    nodes.forEach(n => {
      n.content = removeMd(n.content);
      /* Protect against mapping string value */
      if (typeof n.headings != 'string') {
        n.headings = n.headings.map(h => h.value).toString();
        n.subtitles = n.subtitles.map(s => s.value).toString();
      }
    });

    this.index.add(nodes);
  },
  computed: {
    searchResults() {
      if (this.index === null || this.searchTerm.length < 1) return [];
      let results = this.index.search({
        query: this.searchTerm,
        limit: 20
      });

      results.forEach(r => {
        r.extract = this.truncateBySentence(r.content, this.searchTerm);
      })

      return results;
    }
  },
  methods: {
    truncateBySentence(content, word) {
      //match ".","!","?" - english ending sentence punctuation
      var sentences = content.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
      for(var i = 0; i < sentences.length;i++)
      {
        if (sentences[i].toLowerCase().includes(word.toLowerCase())) 
          return sentences[i];
      }
      //Or return the first sentence
      return sentences[0];
    }
  }
};
</script>
