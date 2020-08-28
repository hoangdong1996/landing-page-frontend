<template>
  <div id="requirement"
       class="requirements-list-area bg-gray"
       v-show="requirementSection.showSection === true"
       v-if="requirementSection != null">
    <div class="row align-items-center">
      <div class="col-lg-6 order-2 order-xl-1">
        <div class="requirements-list">
          <h2
              class="requirements-list__title mb-15 wow move-up style-requirement-title"
          >{{ requirementSection.title }}</h2>
          <p
              class="requirements-list__text heading mb-30 wow move-u style-requirement-description"
          >{{ requirementSection.description }}</p>
          <ul class="check-list green-check-list section-space--mb_50 wow move-up ">
            <li v-for="item in requirementSection.requirementList" :key="item" class="list-item style-requirement-text">{{ item }}</li>
          </ul>
          <!-- <ul class="check-list green-check-list section-space--mb_50 wow move-up">
                        <li class="list-item">Customer First Content-focused Displaying Effects </li>
                        <li class="list-item">High Definition Full-screen Sliders & Backgrounds</li>
                        <li class="list-item">Fast Loading, Reader Friendly Navigation Style</li>
                    </ul> -->
          <div class="tab-button wow move-up">
            <router-link :to="{path: requirementSection.button_href}" class="ht-btn ht-btn-md style-requirement-button">
              {{ requirementSection.button_title }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 order-1 order-xl-2">
        <div class="requirements-list-image wow move-up" style="margin-left: auto !important; margin-top: auto">
          <img v-lazy="requirementSection.image.id"
            class="img-fluid style-requirement-image"
            alt
          >
          <!--          <img src="../assets/img/features/aeroland-branding-image-both-laptop.png" class="img-fluid" alt="">-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  name: 'RequireList',
  props: {
    requirementSection: {
      type: Object,
      default: null
    }
  },
  mounted() {
    getStyleById('styleRequirementSection').innerHTML = (addStyleInClass('style-requirement-title', this.requirementSection.title_style) +
        addStyleInClass('style-requirement-description', this.requirementSection.description_style) +
        addStyleInClass('style-requirement-button', this.requirementSection.button_style) +
        addStyleInClass('style-requirement-text', this.requirementSection.text_style) +
        addStyleInClass('style-requirement-image', this.requirementSection.image_style))
  }
}
</script>
