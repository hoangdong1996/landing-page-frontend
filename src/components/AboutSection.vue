<template>
  <div v-if="aboutSection" v-show="aboutSection.showSection === true">
    <div id="about" class="box-image-area section-space--ptb_120">
      <div class="container">
        <div class="section-title-wrapper text-center section-space--mb_60 wow move-up">
          <h2 class="section-title mb-15 style-about-section-title">{{ aboutSection.title }}</h2>
          <span class="section-text style-about-section-text">{{ aboutSection.text }}</span>
        </div>
        <!-- about component -->
        <AboutExpand :about-expand="aboutSection.aboutExpandList"/>
      </div>
    </div>
  </div>
</template>

<script>
import AboutExpand from './AboutExpand'
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  props: {
    aboutSection: {
      type: Object,
      default: null,
    }
  },
  components: {
    AboutExpand
  },
  mounted() {
    getStyleById('styleAboutSection').innerHTML = (addStyleInClass('style-about-section-title', this.aboutSection.title_style)
        + addStyleInClass('style-about-section-text', this.aboutSection.text_style)
        + addStyleInClass('style-about-expand-title', this.aboutSection.title_expand_style)
        + addStyleInClass('style-about-expand-image', this.aboutSection.image_expand_style))
  }
}
</script>
