<template>
  <!-- <section class="hero-branding bg-cover" :style="bgImg" id="home"> -->
  <section
    id="home"
    v-if="heroBranding"
    class="hero-branding bg-cover"
    :style="{ 'background-image': 'url(data:image/png;base64,' + heroBranding.image.data +')' }"
  >
    <div class="container-fluid container-fluid--cp-150">
      <div class="hero-branding">
        <div class="hero-content">
          <h2 class="h1 hero-content-title">{{ heroBranding.title }}</h2>
          <h6 class="hero-content-subtitle mt-20">{{ heroBranding.description }}</h6>
          <div class="slider-button mt-30">
            <router-link :to="{ path: heroBranding.button_href }" class="ht-btn ht-btn-md">
              {{ heroBranding.button_title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    heroBranding: {
      type: Object,
      default: null
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variabls.scss";
@import "../assets/scss/elements/hero-branding.scss";
</style>
