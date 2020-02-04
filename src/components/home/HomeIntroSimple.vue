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
            <h2>
              <span
                >Built for <span class="primary-color">developers</span>, by
                <span class="primary-color">developers</span></span
              >
            </h2>

            <p class="lead post mb">
              Build and run web and mobile applications faster using JavaScript,
              GraphQL, and 8base.
            </p>

            <p class="intro__links">
              <g-link to="/docs/" class="button danger button--large">
                <span
                  >Read the Docs
                  <div class="chevron"></div
                ></span>
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
