<template>
  <div class="row brand-logo-wrapper">
    <div
      v-for="(brand, index) in brandLogoList"
      :key="index"
      class="col-lg-2 col-md-3 col-sm-4 col-6 brand-logo wow move-up"
    >
      <div class="brand-logo__image">
        <img v-lazy="brand.image.id" class="img-fluid style-partner-image">
      </div>
      <!-- <div class="brand-logo__image-hover">
        <img :src="brand.logoHover.data | pngSrc " class="img-fluid" :alt="brand.alt">
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandLogo',
  props :{
    brandLogoList : Array
  },
  data() {
    return {
      brands: [
      ]
    }
  }
}
</script>
