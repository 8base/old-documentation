<template>
  <nav class="main-nav flex gap-15">
    <g-link to="/docs/">
      <span class="main-nav__label">Docs</span>
    </g-link>

    <a href="https://community.8base.com" target="_blank">
      <span class="main-nav__label">Community</span>
    </a>

    <a href="https://app.8base.com" target="_blank">
      <span class="main-nav__label">8base&nbsp;Console</span>
    </a>
  </nav>
</template>

<style lang="scss">
.main-nav {
  height: 75px;
  flex-wrap: nowrap;

  &__label {
    font-weight: 500;
    text-transform: uppercase;
  }

  @media screen and (max-width: 980px) {
    height: auto;
    order: 10;
    min-width: 100%;
    a {
      padding-top: 5px;
      padding-bottom: 10px;
    }
  }
}
</style>
