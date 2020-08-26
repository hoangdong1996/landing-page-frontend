<template>
  <div id="requirement" class="requirements-list-area bg-gray" v-if="requirementSection != null">
    <div class="row align-items-center">
      <div class="col-lg-6 order-2 order-xl-1">
        <div class="requirements-list">
          <h2
              class="requirements-list__title mb-15 wow move-up style-requirement-title"
          >{{ requirementSection.title }}</h2>
          <p
              class="requirements-list__text heading mb-30 wow move-up style-requirement-description"
          >{{ requirementSection.description }}</p>
          <ul class="check-list green-check-list section-space--mb_50 wow move-up">
            <li v-for="item in requirementSection.requirementList" :key="item" class="list-item style-requirement-text">{{ item }}</li>
          </ul>
          <div class="tab-button wow move-up ">
            <router-link :to="{path: requirementSection.button_href}" class="ht-btn ht-btn-md style-requirement-button">
              {{ requirementSection.button_title }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 order-1 order-xl-2">
        <div class="requirements-list-image wow move-up style-requirement-image" style="margin-left: auto !important; margin-top: auto">
          <img
              :src="requirementSection.image.data | pngSrc"
              class="img-fluid"
              alt
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequireList',
  props: {
    requirementSection: {
      type: Object,
      default: null
    }
  }
}
</script>
