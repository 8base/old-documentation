<template>
  <Section class="extra-features">
    <div class="row text-center">
      <div class="col col-sm-6 mb">
        <div class="col-card">
          <g-image
            src="~/assets/images/instantly-enable-graphql.svg"
            width="350px"
          ></g-image>

          <h3>Instantly enable GraphQL</h3>
          <p>
            8base allows you to connect your enterprise data sources and expose
            them through a unified GraphQL API.
          </p>
        </div>
      </div>
      <div class="col col-sm-6 mb">
        <div class="col-card">
          <g-image
            src="~/assets/images/real-time-capabilities.png"
            width="350px"
          ></g-image>

          <h3>Real-time capabilities</h3>
          <p>
            Easily build real-time features using
            <span class="primary-color">GraphQL subscriptions</span> powered by
            WebSockets.
          </p>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.extra-features {
  .col-card {
    margin: 0 auto;
    max-width: 400px;
  }
}
</style>
