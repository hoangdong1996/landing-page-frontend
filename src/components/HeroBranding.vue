<template>
  <!-- <section class="hero-branding bg-cover" :style="bgImg" id="home"> -->
  <section
      id="home"
      v-if="heroBranding.image"
      class="hero-branding bg-cover"
      :style="style"
      v-show="heroBranding.showSection"
  >
    <div class="container-fluid container-fluid--cp-150">
      <div class="hero-branding">
        <div class="hero-content">
          <h2 class="h1 hero-content-title style-hero-branding-title">{{ heroBranding.title }}</h2>
          <h6 class="hero-content-subtitle mt-20 style-hero-branding-des">{{ heroBranding.description }}</h6>
          <div class="slider-button mt-30">
            <router-link :to="{ path: heroBranding.button_href }" class="ht-btn ht-btn-md style-hero-branding-button">
              {{ heroBranding.button_title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {getImageUrl} from "@/function/data";
import {addStyleInClass, getStyleById} from "@/function/style";
import {imgUrl} from "@/filters";
export default {
  data() {
    return {
      image: null,
      style: {backgroundImage: 'url(' + imgUrl(this.heroBranding.image.id) + ')'}
    }
  },
  props: {
    heroBranding: {
      type: Object,
      default: null
    },
  },
  methods: {},
  mounted() {
    this.image = getImageUrl(this.heroBranding.image)
    getStyleById('styleHeroBanding').innerHTML = (addStyleInClass('style-hero-branding-title', this.heroBranding.title_style)
        + addStyleInClass('style-hero-branding-des', this.heroBranding.description_style)
        + addStyleInClass('style-hero-branding-button', this.heroBranding.button_title_style))
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/scss/variabls.scss";
@import "../assets/scss/elements/hero-branding.scss";
</style>
