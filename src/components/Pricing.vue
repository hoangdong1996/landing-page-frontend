<template>
  <div class="row pricing-table-one">
    <div v-for="(pricing, index) in pricingTableList" :key="index" class="col-md-6 col-xl-3 pricing-table wow move-up">
      <div class="pricing-table__inner style-pricing_table">
        <div v-if="pricing.isPopular" class="pricing-table__feature-mark">
          <span>{{ popularTitle }}</span>
        </div>
        <div class="pricing-table__header">
          <div class="pricing-table__image">
            <img v-lazy="pricing.image.id" class="img-fluid style-pricing-image" :alt="pricing.alt">
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
</template>

<script>
export default {
  name: 'Pricing',
  props: {
    pricingTableList: {
      type: Array
    },
    popularTitle: {
    }
  },
  data() {
    return {
      pricingTable: []
    }
  }
}
</script>
