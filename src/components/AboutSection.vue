<template>
  <div v-if="aboutSection" v-show="aboutSection.showSection === true">
    <div id="about" class="box-image-area section-space--ptb_120" >
      <div class="container">
        <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
          <h2 class="section-title mb-15">{{ aboutSection.title }}</h2>
          <span class="section-text">{{ aboutSection.text }}</span>
        </div>
        <!-- about component -->
        <AboutExpand :about-expand="aboutSection.aboutExpandList" />
      </div>
    </div>
  </div>
</template>

<script>
import AboutExpand from './AboutExpand'

export default {
  props: {
    aboutSection: {
      type: Object,
      default: null
    }
  },
  components: {
    AboutExpand
  },
}
</script>
