<template>
  <div v-if="pricingSection">
    <div id="pricing" class="pricing-table-area bg-gray-2 pt-30">
      <div class="pricing-table-title-area position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title-wrapper text-center section-space--mb_60">
                <h2 class="section-title font-width-light mb-15 wow move-up">{{ pricingSection.title }}</h2>
                <span class="section-text wow move-up">{{ pricingSection.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-table-content-area section-space--pb_90">
        <div class="container">
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
import Pricing from "@/components/Pricing";
export default {
  components:{
    Pricing
  },
  props: {
    pricingSection: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
