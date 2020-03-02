<template>
  <Section>
    <h2 class="text-center mb-x2">Get Connected</h2>

    <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 mb">
          <Card class="sponsor">
            <g-image src="~/assets/images/8base-logo-white.svg" alt="8base" />
            <p>
              Hop on our
              <a
                href="https://community.8base.com/"
                rel="noopener"
                target="_blank"
                >Community</a
              >
              to get technical support and participate in forum topics.
            </p>
          </Card>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </Section>
</template>

<style lang="scss">
.sponsor {
  padding: 30px 30px 60px;
  border: 2px solid var(--bg-transparent);

  img {
    max-height: 35px;
    width: auto;
  }
}
</style>
