<template>
  <div v-if="aboutSection">
    <div id="about" class="box-image-area section-space--ptb_120">
      <div class="container">
        <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
          <h2 class="section-title mb-15">{{ aboutSection.title }}</h2>
          <span class="section-text">{{ aboutSection.text }}</span>
        </div>
        <!-- about component -->
        <div class="row box-image-wrapper">
          <div
              v-for="(about, index) in aboutSection.aboutExpandList"
              :key="index"
              class="col-md-4 box-image position-relative text-center wow move-up"
          >
            <div class="box-image__media">
              <img v-if="about.image" :src="about.image.data | pngSrc" class="img-fluid" alt="about icon">
            </div>
            <div class="box-image__content">
              <h6 class="box-image__title">
                <a class="stretched-link">{{ about.title }}</a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    aboutSection: {
      type: Object,
      default: null
    }
  },
}
</script>
