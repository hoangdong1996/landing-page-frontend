<template>
  <div>
    <div class="brand-logo-area section-space--ptb_120" id="partner">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title-wrapper text-center section-space--mb_60">
              <h2 class="section-title mb-15 wow move-up">{{ partnerClientSection.title }}</h2>
              <span class="section-text wow move-up">{{ partnerClientSection.text }}</span>
            </div>
          </div>
        </div>
        <!-- brandLogo component -->
        <BrandLogo v-bind:brandLogoList = "partnerClientSection.brandLogoList" />
      </div>
    </div>
  </div>
</template>

<script>
import BrandLogo from './BrandLogo'
import {mapGetters} from 'vuex'

export default {
  components: {
    BrandLogo
  },
  computed: {
    ...mapGetters(['partnerClientSection'])
  },
  data() {
    return {
      sectionTitle: 'Trusted services from top-rated company',
      sectionText: 'It is about us being able to offer help with the branding campaign, product presentation, and advertisement running across social media.'
    }
  },
  mounted() {
    this.$store.dispatch('getPartnerClientSection')
  }

}
</script>

<style lang="scss" scoped>

</style>
