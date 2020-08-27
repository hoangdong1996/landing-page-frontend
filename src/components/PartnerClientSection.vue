<template>
  <div v-if="partnerClientSection" v-show="partnerClientSection.showSection === true">
    <div class="brand-logo-area section-space--ptb_120" id="partner">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title-wrapper text-center section-space--mb_60">
              <h2 class="section-title mb-15 wow move-up style-partner-title">{{ partnerClientSection.title }}</h2>
              <span class="section-text wow move-up style-partner-description">{{ partnerClientSection.text }}</span>
            </div>
          </div>
        </div>
        <!-- brandLogo component -->
        <BrandLogo v-bind:brandLogoList="partnerClientSection.brandLogoList"/>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLogo from './BrandLogo'
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  props: {
    partnerClientSection: {
      type: Object,
      default: null
    }
  },
  components: {
    BrandLogo
  },
  data() {
    return {
      sectionTitle: 'Trusted services from top-rated company',
      sectionText: 'It is about us being able to offer help with the branding campaign, product presentation, and advertisement running across social media.'
    }
  },
  mounted() {
    getStyleById('stylePartnerClientSection').innerHTML = (addStyleInClass('style-partner-title', this.partnerClientSection.title_style) +
        addStyleInClass('style-partner-description', this.partnerClientSection.text_style) +
        addStyleInClass('style-partner-image', this.partnerClientSection.image_style))
  }
}
</script>
