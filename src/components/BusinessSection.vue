<template>
  <div v-if="businessSection">
    <div class="feature-icon-list-area section-space--pb_120">
      <div class="container">
        <div class="section-title-wrapper text-center section-space--mb_100">
          <h2 class="section-title mb-30">{{ businessSection.section_title }}</h2>
          <div class="video-button-container video-popup">
            <silentbox-single :src="businessSection.video_url">
              <div class="video-play">
                <i class="fa fa-play-circle" />
                <span class="video-text">{{ businessSection.video_title }}</span>
              </div>
            </silentbox-single>
          </div>
        </div>
      </div>
      <!-- feature list component -->
      <FeatureList :features="businessSection.businessFeatureList" :image="businessSection.image" />
    </div>
  </div>
</template>

<script>
import FeatureList from './FeatureList'

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
}
</script>

<style lang="scss" scoped>
</style>
