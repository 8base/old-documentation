<template>
  <Section class="intro" dots="true">
    <div class="container text-center ">

        <div class="intro__message mb" hidden></div>

        <h1 class="intro__title">
          <span>8base Docs</span>
        </h1>

        <p class="intro__lead lead post mb">
          Learn how to build and run web and mobile applications faster using JavaScript, GraphQL, and 8base.
        </p>

        <p class="intro__links">
          <g-link  to="/docs/" class="button primary button--large">
            <span>Read the Docs</span>
          </g-link>
        </p>
    </div>
  </Section>
</template>

<script>
export default {}
</script>

<style lang="scss">

.intro {
  padding: calc(2% + var(--space)) 0;

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

  &__info {
    font-size: .9rem;
  }
}
</style>
