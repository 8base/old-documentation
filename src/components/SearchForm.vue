<style lang="scss" scoped>
.header-search {
  flex: 1;
  width: 100%;
  display: block;
  margin-bottom: 0;
  font-size: 0.9rem;
  @media screen and (min-width: 850px) {
    & {
      position: relative;
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .search-icon {
    margin-left: -1.66rem;
    width: 1rem;
    pointer-events: none;
    opacity: 0.6;
  }

  .search-dropdown-input {
    max-width: 400px;
    background-color: var(--slate-color);
    border: 2px solid rgba(69, 78, 85, 0.5);
  }

  .search-dropdown-content {
    position: absolute;
    background-color: var(--slate-color);
    border-radius: 15px;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
    overflow: auto;
    z-index: 1;
    right: -10px;
    max-height: 70vh;

    @media screen and (max-width: 850px) {
      & {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .search-dropdown-item {
      color: var(--body-color);
      font-size: 0.9em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;

      &:hover {
        background-color: var(--bg-transparent);
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
    p,
    hr,
    .search-highlight {
      margin: 2%;
    }
    p {
      color: var(--primary-color);
    }

    .search-highlight {
      display: block;
      margin: 2%;
      color: var(--body-color);
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
        v-on:click="seen = true"
        v-clickoutside="hideSearchModal"
        autocomplete="off"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="search-icon feather feather-search"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </label>

    <!-- Dropdown for Search Results -->
    <div class="search-dropdown-content" v-if="seen">
      <div
        class="search-dropdown-item"
        v-for="(item, index) in searchResults"
        :key="index"
        @click="searchTerm = ''"
      >
        <g-link
          :to="item.path"
          class="search-dropdown-link"
          :exact="item.path == '/docs/'"
          :key="`${index}-${item.title}`"
        >
          <p>{{ item.title }}</p>

          <hr />

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
import Highlighter from "vue-highlight-words";

export default {
  components: {
    Highlighter
  },
  data() {
    return {
      index: null,
      seen: false,
      searchTerm: ""
    };
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "id",
        field: ["title", "headings", "subtitles", "content"]
      }
    });

    let nodes = this.$static.docs.edges.map(e => e.node);

    nodes.forEach(n => {
      n.content = removeMd(n.content);
      /* Protect against mapping string value */
      if (typeof n.headings != "string") {
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
      });

      return results;
    }
  },
  methods: {
    truncateBySentence(content, word) {
      //match ".","!","?" - english ending sentence punctuation
      var sentences = content.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);
      for (var i = 0; i < sentences.length; i++) {
        if (sentences[i].toLowerCase().includes(word.toLowerCase()))
          return sentences[i];
      }
      //Or return the first sentence
      return sentences[0];
    },
    hideSearchModal() {
      this.seen = false;
    }
  },
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {

        el.eventSetDrag = function () {
            el.setAttribute('data-dragging', 'yes');
        }
        el.eventClearDrag = function () {
            el.removeAttribute('data-dragging');
        }
        el.eventOnClick = function (event) {
            var dragging = el.getAttribute('data-dragging');
            // Check that the click was outside the el and its children, and wasn't a drag
            if (!(el == event.target || el.contains(event.target)) && !dragging) {
                // call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.addEventListener('touchstart', el.eventClearDrag);
        document.addEventListener('touchmove', el.eventSetDrag);
        document.addEventListener('click', el.eventOnClick);
        document.addEventListener('touchend', el.eventOnClick);
      }, unbind: function (el) {
        document.removeEventListener('touchstart', el.eventClearDrag);
        document.removeEventListener('touchmove', el.eventSetDrag);
        document.removeEventListener('click', el.eventOnClick);
        document.removeEventListener('touchend', el.eventOnClick);
        el.removeAttribute('data-dragging');
      },
    }
  },
};
</script>
