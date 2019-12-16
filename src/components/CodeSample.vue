<template>
  <div id="tabs" class="container">
    <div class="tabs">
      <a
        :key="name"
        v-for="(_, name) in $slots"
        v-on:click="activetab = name"
        v-bind:class="[activetab === name ? 'active' : '']"
        >{{ name }}</a
      >
    </div>

    <div class="content">
      <template v-for="(ary, name) in $slots">
        <div :key="name" class="tab-content" v-if="activetab === name">
            <slot :name="name" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import marked from "~/utils/markdown.js";

export default {
  props: ["tabs"],
  data() {
      console.log(this.$slots)
    return {
      activetab: Object.keys(this.$slots)[0]
    };
  }
};
</script>

<style lang="scss" scoped>
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 620px;
  min-width: 420px;
  margin: 40px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px; // hide bottom border
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
