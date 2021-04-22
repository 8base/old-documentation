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
            src="~/assets/images/front-end-framworks-8base.png"
            fit="inside"
          ></g-image>
        </div>
      </div>
      <div class="col col-sm-3"></div>
    </div>

    <p class="home-links text-center ">
      <g-link to="https://app.8base.com" class="button primary button--large">
        <span>
          Get started for free

          <g-image
            width="100"
            height="100"
            class="shadow"
            alt="right shadow"
            src="~/assets/images/right-shadow.svg"
          ></g-image>

          <g-image
            width="13"
            height="13"
            class="arrow"
            alt="right arrow"
            src="~/assets/images/right-arrow.svg"
          ></g-image>
        </span>
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
      object-fit: contain;
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
  }
}
</style>
