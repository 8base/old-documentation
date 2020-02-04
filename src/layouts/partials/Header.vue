<template>
  <header>
    <div class="header-inner flex gap-30">
      <Logo />

      <Nav class="flex-fit" />

      <SearchForm />

      <nav class="header-actions flex">
        <a
          aria-label="Twitter"
          href="//twitter.com/8base"
          rel="noopener noreferrer"
          target="_blank"
          title="Follow us on Twitter"
        >
          <twitter-logo />
        </a>

        <div class="has-dropdown">
          <a
            aria-label="github"
            href="https://github.com/8base"
            rel="noopener noreferrer"
            target="_blank"
            title="8base @ GitHub"
          >
            <github-logo height="20px" width="20px" />
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Logo from "./Logo";
import Nav from "./Nav";
import SearchForm from "@/components/SearchForm.vue";
import GithubLogo from "@/assets/images/github-logo.svg";
import TwitterLogo from "@/assets/images/twitter-logo.svg";
import LazyHydrate from "vue-lazy-hydration";

export default {
  components: {
    Logo,
    GithubLogo,
    TwitterLogo,
    SearchForm,
    Nav,
    LazyHydrate
  }
};
</script>

<style lang="scss">
header {
  z-index: 20;
  width: 100%;
  max-width: 90%;
  position: fixed;
  margin: 27px 5% 0;
  top: 0;
  flex-wrap: nowrap;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  border: 1px solid var(--border-color);
  background-color: var(--slate-color);
  transition: background-color 0.3s, border-color, 0.3s;

  .header-bar {
    background: linear-gradient(
      90deg,
      var(--primary-color) 0%,
      #8ed6fb 50%,
      #d32e9d 100%
    );
    padding: 2px;
    text-align: center;
    color: #fff;
    font-size: 1rem;

    a {
      color: currentColor;
    }
  }

  .header-inner {
    padding: 0 30px;
    min-height: var(--header-height);
  }

  .main-nav {
    flex-grow: inherit;
    padding-left: 30px;
    border-left: 2px solid;
    border-color: var(--bg);

    @media screen and (max-width: 990px) {
      border: none;
      padding-left: 0;
    }
  }
}
</style>
