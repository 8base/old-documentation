<template>
  <Layout class="layout-homepage">
    <LazyHydrate when-idle>
      <home-intro-simple />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-how-it-work-simple />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-community />
    </LazyHydrate>
  </Layout>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
import HomeIntroSimple from "@/components/home/HomeIntroSimple.vue";
import HomeHowItWorkSimple from "@/components/home/HomeHowItWorkSimple.vue";
import HomeCommunity from "@/components/home/HomeCommunity.vue";

export default {
  components: {
    LazyHydrate,
    HomeCommunity,
    HomeIntroSimple,
    HomeHowItWorkSimple
  },

  metaInfo: {
    title:
      "Build and run web and mobile applications faster using JavaScript, GraphQL, and 8base."
  }
};
</script>

<style></style>
