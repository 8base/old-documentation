<template>
  <Section class="works">
    <div class="grid-cols grid-cols--gap-large grid-cols--full-md">

      <Card title="Define a Data Model">
        <h4>Relational Data</h4>
        <p>Quickly build relation data models, migrated to Aurora MySQL (AWS).</p>
        
        <h4>Input</h4>
        <p>Add rows to the DB immediately in the 8base data console.</p>

        <h4>Import</h4>
        <p>Import existing data using the 8base CLI or a CSV file.</p>
        
        <template slot="outer">
          <Dots class="hide-for-small"/>
          <Dots class="dots--vertical show-for-small"/>
        </template>
      </Card>

      <Card title="Query" class="text-center flex-align-middle">

        <div class="works__logo">
          <eightBaseLogo />
          <div class="works__pulse-bg"></div>
          <div class="works__pulse-bg"></div>
        </div>

        <p class="works__powered-by">
          Powered by <br/><strong>GraphQL </strong>
          <eightBaseLogo width="15" height="18" />
        </p>

        <ul class="works__tools flex gap-15 text-center flex--center">
          <li>Instant GraphQL API</li>
        </ul>

        <template slot="outer">
          <Dots class="hide-for-small"/>
          <Dots class="dots--vertical show-for-small"/>
        </template>
      </Card>

      <Card title="Build">
        <h4>Framework Agnostic</h4>
        <p>
          Develop frontends using any framework you want! Simply query the 8base API to send and recieve your data.
        </p>

        <ul class="bullet-list mb">
          <li>• <g-link to="/docs/fast-by-default/#pre-rendered-html">Getting started</g-link></li>
          <li>• <g-link to="/docs/fast-by-default/#automatic-code-splitting">Connecting to the API</g-link></li>
          <li>• <g-link to="/docs/fast-by-default/#the-prpl-pattern">Using the Data Builder</g-link></li>
          <li>• <g-link to="/docs/fast-by-default/#smart-link-prefetching">Setting up authentication</g-link></li>
          <li>• <g-link to="/docs/fast-by-default/#progressive-images">Roles and permissions</g-link></li>
        </ul>
      </Card>

    </div>
  </Section>
</template>

<script>
import eightBaseLogo from '~/assets/images/8base-logo.svg'
import GraphQlLogo from '~/assets/images/graphql-logo.svg'
import VueLogo from '~/assets/images/vue-logo.svg'
import WebpackLogo from '~/assets/images/webpack-logo.svg'
import GridsomeLogo from '~/assets/images/gridsome-small-white.svg'
import Bullet from '~/assets/images/bullet.svg'
import Dots from '~/components/Dots.vue'

export default {
  components: {
    Bullet,
    VueLogo,
    GridsomeLogo,
    WebpackLogo,
    GraphQlLogo,
    eightBaseLogo,
    Dots
  }
}
</script>

<style lang="scss">
.works {

  .bullet-list li {
    margin-bottom: .3rem;
  }

  .card__inner {
    padding: 30px 40px;
  }

  @media screen and (max-width: 850px) {
    .card {
      margin-bottom: 40px;
    }
  }


  &__tools {
    font-weight: 500;
    border: 1px solid var(--border-color);
    max-width: 230px;
    border-radius: 4px;
    z-index: 9;
    margin: 0 auto!important;
    padding: 10px;

    li {
      margin-bottom: 0;
    }
  }

  &__logo {
    width: 100px;
    z-index: 1;
    position: relative;
    height: 100px;
    margin: 0 auto;
    margin-top: 18%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 100%;
    z-index: 0;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;

    svg {
      width: 70px;
      height: 70px;
    }
  }

  &__pulse-bg {
    animation: pulse 2s infinite;
    border: 3px solid var(--primary-color);
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 100%;
    opacity: .3;
    z-index: -1;

    + .works__pulse-bg {
      width: 95px;
      height: 95px;
      animation-delay: .3s;
    }
  }

  &__powered-by {
    opacity: .8;
    line-height: 1.3;
    padding-bottom: 1.2rem;
  }
}
</style>
