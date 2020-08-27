<template>
  <div class="feature-icon-list">
    <div class="row">
      <div class="col-lg-6">
        <div class="feature-icon-list__media wow move-up style-business-image">
          <img v-if="image" v-lazy="image.id | imgUrl" class="img-fluid" alt>
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
              <div class="single-feature-icon__media style-feature-image">
                <img v-if="feature.image" v-lazy="feature.image.id | imgUrl" class="img-fluid" alt>
              </div>
              <div class="single-feature-icon__content">
                <h6 class="title style-feature-title">{{ feature.title }}</h6>
                <div class="text style-feature-description">{{ feature.description }}</div>
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
