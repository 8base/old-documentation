<template>
  <Layout class="layout-homepage">
    <LazyHydrate when-idle>
      <home-intro-simple />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-how-it-work-simple />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-front-end-flex />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-learn-graphql />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-extra-features />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <home-community />
    </LazyHydrate>
  </Layout>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
import HomeCommunity from "@/components/home/HomeCommunity.vue";
import HomeIntroSimple from "@/components/home/HomeIntroSimple.vue";
import HomeLearnGraphql from "~/components/home/HomeLearnGraphql.vue";
import HomeFrontEndFlex from "@/components/home/HomeFrontEndFlex.vue";
import HomeExtraFeatures from "@/components/home/HomeExtraFeatures.vue";
import HomeHowItWorkSimple from "@/components/home/HomeHowItWorkSimple.vue";

export default {
  components: {
    LazyHydrate,
    HomeCommunity,
    HomeIntroSimple,
    HomeFrontEndFlex,
    HomeLearnGraphql,
    HomeExtraFeatures,
    HomeHowItWorkSimple
  },

  metaInfo: {
    title:
      "Build and run web and mobile applications faster using JavaScript, GraphQL, and 8base."
  }
};
</script>

<style lang="scss">
.layout-homepage {
  padding-top: calc(8% + var(--header-height));
  padding-bottom: calc(3% + var(--space));
  background-size: 400px, auto;
  background-repeat: no-repeat, repeat;
  background-position: right -50px top 300px;
}
</style>
