<template>
  <div v-if="businessSection" v-show="businessSection.showSection === true">
    <div class="feature-icon-list-area section-space--pb_120">
      <div class="container">
        <div class="section-title-wrapper text-center section-space--mb_100">
          <h2 class="section-title mb-30 style-business-title">{{ businessSection.section_title }}</h2>
          <div class="video-button-container video-popup">
            <silentbox-single :src="businessSection.video_url">
              <div class="video-play">
                <i class="fa fa-play-circle"/>
                <span class="video-text style-business-video-title">{{ businessSection.video_title }}</span>
              </div>
            </silentbox-single>
          </div>
        </div>
      </div>
      <!-- feature list component -->
      <FeatureList :features="businessSection.businessFeatureList" :image="businessSection.image"/>
    </div>
  </div>
</template>

<script>
import FeatureList from './FeatureList'
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  props: {
    businessSection: {
      type: Object,
      default: null
    },
  },
  components: {
    FeatureList
  },
  mounted() {
    getStyleById('styleBusinessSection').innerHTML = (addStyleInClass('style-business-title', this.businessSection.section_title_style) +
        addStyleInClass('style-business-video-title', this.businessSection.video_title_style) +
        addStyleInClass('style-business-image', this.businessSection.image_style) +
        addStyleInClass('style-feature-image', this.businessSection.feature_image_style) +
        addStyleInClass('style-feature-title', this.businessSection.feature_title_Style) +
        addStyleInClass('style-feature-description', this.businessSection.feature_description_style))
  }
}
</script>

<style lang="scss" scoped>
</style>
