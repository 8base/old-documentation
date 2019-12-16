<template>
  <div>
    <div :class="getClass" @click="toggleChildren">
      <g-link
        exact
        :to="entry.link"
        :class="['menu-item', 'menu-link']"
        :key="`link-${entry.link}-${entry.depth}`"
      >
        {{ entry.title }}
      </g-link>

      <!-- SVG for Caret transition -->
      <MenuCaret
        v-if="hasChildren"
        :rotate="showChildren"
      />
    </div>

    <!--If `entry.items` is undefined this will not render-->
    <template v-if="showChildren">
      <SidebarEntry
        :entry="item"
        :key="`link-${i}`"
        :order="item.order"
        :depth="item.depth"
        :currentIndex="currentIndex"
        v-for="(item, i) in entry.items"
      />
    </template>
  </div>
</template>

<script>
import MenuCaret from "./MenuCarret.vue";

export default {
  name: "SidebarEntry",
  components: {
    MenuCaret
  },
  props: ["entry", "order", "depth", "currentIndex"],
  data() {
    let showChildren;

    if (process.isClient) {
      showChildren = window.location.pathname.match(this.entry.link);
    } else {
      showChildren = false;
    }

    return {
      hasChildren: this.entry.items,
      showChildren: showChildren
    };
  },
  computed: {
    getClass() {
      return `sidebar-entry menu-item menu-link_depth_${this.depth}`;
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren;  
    }
  }
};
</script>
