<template>
  <Section class="intro" dots="true">
    <div class="container">
      <div class="row">
        <!-- Zen Developer SVG -->
        <div class="col col-md-5 h-450px">
          <g-image
            src="~/assets/images/zen.svg"
            class="zen-dev"
            alt="Zen Developer"
          />
        </div>

        <div class="col col-md-7 h-450px">
          <div class="flex-vertical-center">
            <h1>
              <span
                >Built for <span class="primary-color">developers</span>, by
                <span class="primary-color">developers</span></span
              >
            </h1>

            <p class="lead post mb">
              Build and run web and mobile applications faster using JavaScript,
              GraphQL, and 8base.
            </p>

            <p class="intro__links">
              <g-link to="/docs/" class="button danger button--large">
                <span>
                  Read the Docs

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
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.intro {
  .h-450px {
    height: 450px;

    @media screen and (max-width: 990px) {
      height: auto;
    }
  }

  h1 {
    font-size: 48px;
    font-weight: 400;
  }

  .flex-vertical-center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    font-size: 3rem;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 850px) {
      & {
        font-size: 2rem;
      }
    }
  }

  &__lead {
    max-width: 610px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.3rem;

    @media screen and (max-width: 850px) {
      & {
        font-size: 1rem;
      }
    }
  }

  .button.danger {
    font-size: 0.9em;
    border-radius: 25px;
    text-transform: uppercase;
    padding: 13px 20px 13px 25px;
  }

  &__info {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 990px) {
    text-align: center;
    margin-bottom: 80px;

    & {
      padding-top: calc(15% + var(--header-height));
    }

    .zen-dev {
      width: 60%;
    }
  }
}
</style>
