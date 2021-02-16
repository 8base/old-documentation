<style lang="scss">
.sidebar-left {
  .menu-item {
    display: flex;
    padding: 3px 0;
    justify-content: space-between;
  }
  .sidebar-entry.menu-link_depth_1 {
    padding-left: 10px;
  }
  .sidebar-entry.menu-link_depth_2 {
    padding-left: 20px;
  }
  .sidebar-entry.menu-link_depth_3 {
    padding-left: 30px;
  }
  .sidebar-entry.menu-link_depth_4 {
    padding-left: 40px;
  }
  .sidebar-entry-button {
    cursor: pointer;
  }
}
</style>

<template>
  <div class="sidebar sidebar-left">
    <template v-for="(group, i1) in links">
      <h3 class="menu-item" :key="`title-${i1}`">{{ group.title }}</h3>

      <template v-for="(item, i2) in group.items">
        <SidebarEntry
          :entry="item"
          :order="item.order"
          :depth="item.depth"
          :key="`link-${i1}-${i2}`"
          :currentIndex="currentIndex"
        />
      </template>
    </template>
  </div>
</template>

<script>
import SidebarEntry from "./SidebarEntry.vue";

export default {
  props: {
    currentIndex: { type: Number, default: 0 },
    links: { type: Array, default: () => [] }
  },
  components: {
    SidebarEntry
  }
};
</script>
