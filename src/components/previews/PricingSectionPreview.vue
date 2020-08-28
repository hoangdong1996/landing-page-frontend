<template>
  <div v-if="pricingSection">
    <div id="pricing" class="pricing-table-area bg-gray-2 pt-30">
      <div class="pricing-table-title-area position-relative">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title-wrapper text-center section-space--mb_60">
                <h2 class="section-title font-width-light mb-15 wow move-upc style-pricing-title">{{ pricingSection.title }}</h2>
                <span class="section-text wow move-up style-pricing-description">{{ pricingSection.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pricing-table-content-area section-space--pb_90">
        <div class="container">
          <div class="row pricing-table-one">
            <div v-for="(pricing, index) in pricingSection.pricingTableList" :key="index" class="col-md-6 col-xl-3 pricing-table wow move-up">
              <div class="pricing-table__inner style-pricing_table">
                <div v-if="pricing.isPopular" class="pricing-table__feature-mark">
                  <span>{{ pricingSection.popularTitle }}</span>
                </div>
                <div class="pricing-table__header">
                  <div class="pricing-table__image">
                    <img v-if="pricing.image.data" :src="pricing.image.data" class="img-fluid style-pricing-image" :alt="pricing.alt">
                    <img v-else v-lazy="pricing.image.id" class="img-fluid style-pricing-image" :alt="pricing.alt">
                  </div>
                  <h5 class="pricing-table__title style-pricing-table_title">{{ pricing.title }}</h5>
                  <div class="pricing-table__price-wrap">
                    <h6 class="currency">VNĐ</h6>
                    <h6 class="price style-pricing-value">{{ pricing.value }}</h6>
                    <h6 class="period">/{{ pricing.duration }}</h6>
                  </div>
                </div>
                <div class="pricing-table__body">
                  <ul class="pricing-table__list">
                    <li class="style-pricing-price" v-for="(list, index) in pricing.price" :key="index">{{ list }}</li>
                  </ul>
                </div>
                <div class="pricing-table__footer">
                  <a href="#" class="ht-btn ht-btn-default style-pricing-button" :class="{'ht-btn--outline': pricing.active}">Get started</a>
                </div>
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
