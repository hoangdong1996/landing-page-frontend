<template>
  <div class="row box-image-wrapper">
    <div
        v-for="(about, index) in aboutExpand"
        :key="index"
        class="col-md-4 box-image position-relative text-center wow move-up"
    >
      <div class="box-image__media style-about-expand-image">
        <img v-if="about.image" v-lazy="about.image.id" class="img-fluid" alt="about icon">
      </div>
      <div class="box-image__content">
        <h6 class="box-image__title style-about-expand-title">
          <a :href="about.href" class="stretched-link">{{ about.title }}</a>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutExpand',
  props: {
    aboutExpand: Array
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>
<style>

</style>
