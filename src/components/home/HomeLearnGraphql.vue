<template>
  <Section class="learn-gql">
    <h1 class="container text-center">
      Learn our powerful <span class="magenta">GraphQL</span> Engine
    </h1>

    <p class="lead text-center container-md">
      GraphQL enables front-end developers to move faster by freeing them up
      from dependencies on back-end teams.
    </p>

    <p class="callout magenta">
      A robust query language enabled through a single API
    </p>

    <div class="row text-center">
      <div class="col col-md-4 mb">
        <g-image src="~/assets/images/circle-check.svg"></g-image>
        <p>Auto-generate CRUD operations for all objects.</p>
      </div>
      <div class="col col-md-4 mb">
        <g-image src="~/assets/images/circle-check.svg"></g-image>
        <p>
          Advanced query syntac for CRUD operations, advanced filtering, full
          text search, pagination, grouping, and aggregations.
        </p>
      </div>
      <div class="col col-md-4 mb">
        <g-image src="~/assets/images/circle-check.svg"></g-image>
        <p>Use our API Explorer to rapidly iterate and test queries.</p>
      </div>
    </div>

    <div class="examples-container">
      <Examples />
    </div>
  </Section>
</template>

<script>
import Examples from "../Examples";
export default {
  components: {
    Examples
  }
};
</script>

<style lang="scss">
.learn-gql {
  max-width: 960px;
  margin: 80px auto 40px;

  .callout {
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
    margin: 80px 0 80px;
  }

  .magenta {
    color: var(--magenta-color);
  }

  .examples-container {
    margin-top: 80px;
  }
}
</style>
