<template>
  <div id="app" dark>
    <Header />

    <main id="main" :class="mainClass">
      <slot />
    </main>
  </div>
</template>

<script>
import Header from "./partials/Header";
import LazyHydrate from "vue-lazy-hydration";

export default {
  props: ["footer", "primary-bg"],
  components: {
    Header,
    LazyHydrate
  },
  computed: {
    mainClass() {
      let classes = [];
      if (this.primaryBg) classes.push("main--bg-teritary");
      return classes;
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app main {
  flex: 1;
  margin-bottom: 80px;
}
.main--bg-teritary {
  background-color: var(--bg-teritary);
}
</style>
