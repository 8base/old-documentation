<template>
  <Section class="frontend-flex">
    <h1 class="container text-center">
      Front-end Flexibility
    </h1>

    <p class="lead text-center container-md">
      8base allows you to develop in your favorite front-end framework.
    </p>

    <div class="row text-center">
      <div class="col col-sm-3"></div>
      <div class="col col-sm-6">
        <div class="flex-content-between">
          <g-image
            src="~/assets/images/reactjs.png"
            width="75"
            height="75"
            fit="inside"
          ></g-image>

          <g-image
            src="~/assets/images/angularjs.png"
            width="75"
            height="75"
            fit="inside"
          ></g-image>

          <g-image
            src="~/assets/images/vuejs.png"
            width="75"
            height="75"
            fit="inside"
          ></g-image>

          <g-image
            src="~/assets/images/ios.png"
            width="75"
            height="75"
            fit="inside"
          ></g-image>

          <g-image
            src="~/assets/images/android.png"
            width="75"
            height="75"
            fit="inside"
          ></g-image>
        </div>
      </div>
      <div class="col col-sm-3"></div>
    </div>

    <p class="home-links text-center ">
      <g-link to="/docs/" class="button primary button--large">
        Get started for free

        <div class="chevron"></div>
      </g-link>
    </p>
  </Section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.frontend-flex {
  .flex-content-between {
    display: flex;
    margin: 10px 0 50px;
    justify-content: space-between;

    img {
      margin-bottom: 0;
      @media screen and (max-width: 960) {
        width: 40%;
      }
    }
  }

  .button.primary {
    font-size: 0.9em;
    border-radius: 25px;
    text-transform: uppercase;
    padding: 13px 20px 13px 25px;

    .chevron {
      width: 0;
      height: 0;
      margin-left: 35px;
      display: inline-block;
      border-left: 9px solid white;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
  }
}
</style>
