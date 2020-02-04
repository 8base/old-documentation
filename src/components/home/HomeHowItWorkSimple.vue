<template>
  <Section class="works">
    <div class="grid-cols grid-cols--gap-large grid-cols--full-md">
      <Card title="Define a Data Model" class="c1">
        <h4>Relational Data</h4>
        <p>
          Quickly build relation data models, migrated to Aurora MySQL (AWS).
        </p>

        <h4>Input</h4>
        <p>Add rows to the DB immediately in the 8base data console.</p>

        <h4>Import</h4>
        <p>Import existing data using the 8base CLI or a CSV file.</p>

        <template slot="outer">
          <Dots class="hide-for-small" />
          <Dots class="dots--vertical show-for-small" />
        </template>
      </Card>

      <Card title="Query" class="c2 text-center flex-align-middle">
        <div class="works__logo">
          <eightBaseLogo />
          <div class="works__pulse-bg"></div>
          <div class="works__pulse-bg"></div>
        </div>

        <p class="works__powered-by">
          Powered by GraphQL
        </p>

        <g-image
          src="~/assets/images/graphql-logo.svg"
          style="width: 55px;"
        ></g-image>

        <ul class="works__tools flex gap-15 text-center flex--center iga">
          <li>Instant GraphQL API</li>
        </ul>

        <template slot="outer">
          <Dots class="hide-for-small" />
          <Dots class="dots--vertical show-for-small" />
        </template>
      </Card>

      <Card title="Build" class="c3">
        <h4>Framework Agnostic</h4>
        <p>
          Develop frontends using any framework you want! Simply query the 8base
          API to send and recieve your data.
        </p>

        <ul class="bullet-list mb">
          <li><g-link to="/docs/getting-started">Getting started</g-link></li>
          <li>
            <g-link to="/docs/getting-started/connecting-to-api"
              >Connecting to the API</g-link
            >
          </li>
          <li>
            <g-link to="/docs/8base-console/platform-tools/data-builder"
              >Using the Data Builder</g-link
            >
          </li>
          <li>
            <g-link to="/docs/8base-console/authentication"
              >Setting up authentication</g-link
            >
          </li>
          <li>
            <g-link to="/docs/8base-console/roles-and-permissions"
              >Roles and permissions</g-link
            >
          </li>
        </ul>
      </Card>
    </div>
  </Section>
</template>

<script>
import eightBaseLogo from "~/assets/images/8base-logo.svg";
import Bullet from "~/assets/images/bullet.svg";
import Dots from "~/components/Dots.vue";

export default {
  components: {
    Bullet,
    eightBaseLogo,
    Dots
  }
};
</script>

<style lang="scss">
.works {
  .card {
    border-radius: 15px;
    border: 2px solid var(--bg-transparent);

    p:not(:last-child) {
      margin-bottom: 2rem;
    }

    .iga {
      font-size: 1.2em;
      background-color: var(--inline-code-bg);
    }
  }

  .bullet-list li {
    margin-bottom: 0.3rem;

    a {
      text-decoration: underline;
    }
  }

  .card__inner {
    padding: 30px 40px;
  }

  .card__title span {
    width: 260px;
    font-size: 1.2em;
    padding: 15px 25px;
  }

  .c1 .card__title span {
    background-color: var(--primary-color) !important;
  }

  .c2 .card__title span {
    color: var(--bg-secondary);
    background-color: var(--warning-color) !important;
  }

  .c3 .card__title span {
    background-color: var(--success-color) !important;
  }

  @media screen and (max-width: 990px) {
    .card {
      margin-bottom: 80px;
    }
  }

  &__tools {
    font-weight: 500;
    border: 1px solid var(--border-color);
    max-width: 230px;
    border-radius: 4px;
    z-index: 9;
    margin: 0 auto !important;
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
    margin-top: 3%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 100%;
    z-index: 0;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;

    svg {
      width: 100px;
      height: 100px;
    }
  }

  &__pulse-bg {
    animation: pulse 2s infinite;
    border: 5px solid var(--danger-color);
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 100%;
    opacity: 0.3;
    z-index: -1;

    + .works__pulse-bg {
      width: 95px;
      height: 95px;
      animation-delay: 0.3s;
    }
  }

  &__powered-by {
    opacity: 0.8;
    line-height: 1.3;
  }
}
</style>
