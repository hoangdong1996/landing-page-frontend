<template>
  <div v-if="pricingSection" v-show="pricingSection.showSection === true">
    <div id="pricing" class="pricing-table-area bg-gray-2 pt-30">
      <div class="pricing-table-title-area position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title-wrapper text-center section-space--mb_60">
                <h2 class="section-title font-width-light mb-15 wow move-up style-pricing-title">{{ pricingSection.title }}</h2>
                <span class="section-text wow move-up style-pricing-description">{{ pricingSection.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-table-content-area section-space--pb_90">
        <div class="container">
          <!-- Pricing component -->
          <Pricing
              :pricing-table-list="pricingSection.pricingTableList"
              :popular-title="pricingSection.popularTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pricing from './Pricing'
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  props: {
    pricingSection: {
      type: Object,
      default: null
    }
  },
  components: {
    Pricing
  },
  mounted() {
    getStyleById('stylePricingSection').innerHTML = (addStyleInClass('style-pricing-title', this.pricingSection.title_style) +
        addStyleInClass('style-pricing-description', this.pricingSection.description_style) +
        addStyleInClass('style-pricing_table', this.pricingSection.pricing_stable_style) +
        addStyleInClass('style-pricing-table_title', this.pricingSection.table_title_style) +
        addStyleInClass('style-pricing-image', this.pricingSection.image_style) +
        addStyleInClass('style-pricing-value', this.pricingSection.price_style) +
        addStyleInClass('style-pricing-button', this.pricingSection.button_style) +
        addStyleInClass('style-pricing-price', this.pricingSection.value_style))
  }
}
</script>

<style lang="scss" scoped>

</style>
