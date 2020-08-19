<template>
  <div class="feature-icon-list">
    <div class="row">
      <div class="col-lg-6">
        <div class="feature-icon-list__media wow move-up">
          <img v-if="image" :src="image.data | pngSrc" class="img-fluid" alt>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="feature-icon-list__content">
          <div class="feature-icon-list-wrapper">
            <div
              v-for="feature in features"
              :key="feature.id"
              class="single-feature-icon wow move-up"
            >
              <div class="single-feature-icon__media">
                <img v-if="feature.image" :src="feature.image.data | pngSrc" class="img-fluid" alt>
              </div>
              <div class="single-feature-icon__content">
                <h6 class="title">{{ feature.title }}</h6>
                <div class="text">{{ feature.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureList',
  props: {
    image: Object,
    features: Array
  },
  data() {
    return {}
  }
}
</script>
