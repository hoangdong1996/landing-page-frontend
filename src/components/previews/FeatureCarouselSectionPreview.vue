<template>
  <div class="feature-slider-area section-space--pt_60">
    <div class="feature-slider position-relative">
      <div class="feature-slider__container">
        <div class="feature-slider__wrapper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="item in featureCarouselSection.featureCarouselList" :key="item.id">
              <div class="feature-slider__single-slide">
                <div class="feature-slider__single-slide-wrapper">
                  <div class="row align-items-center">
                    <div class="col-md-6 wow move-up">
                      <div class="image">
                        <img v-if="item.image.data" :src="item.image.data" class="img-fluid style-feature-carousel-image" alt="">
                        <img v-else v-lazy="item.image.id" class="img-fluid style-feature-carousel-image" alt="">
                      </div>
                    </div>
                    <div class="col-md-6 wow move-up">
                      <div class="content">
                        <h4 class="title style-feature-carousel-title" >{{ item.title }}</h4>
                        <div class="text style-feature-carousel-description">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination swiper-pagination--vertical swiper-pagination-1" />
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureTwo',
  props: {
    featureCarouselSection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      swiperOption: {
        speed: 600,
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          768: {
            clickable: false
          }
        }
      }
    }
  },

  created() {
  }
}
</script>
