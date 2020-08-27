<template>
  <div class="feature-slider-area section-space--pt_60">
    <div class="feature-slider position-relative">
      <div class="feature-slider__container">
        <div class="feature-slider__wrapper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) of featureCarouselSection.featureCarouselList" :key="index">
              <div class="feature-slider__single-slide">
                <div class="feature-slider__single-slide-wrapper">
                  <div class="row align-items-center">
                    <div class="col-md-6 wow move-up">
                      <div class="image">
                        <img :src="item.image.data | pngSrc " class="img-fluid style-feature-carousel-image" alt="">
                      </div>
                    </div>
                    <div class="col-md-6 wow move-up">
                      <div class="content">
                        <h4 class="title style-feature-carousel-title">{{ item.title }}</h4>
                        <div class="text style-feature-carousel-description">{{ item.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination swiper-pagination--vertical swiper-pagination-1"/>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  name: 'FeatureTwo',
  props: {
    featureCarouselSection: {
      type: Object,
      default: () => {
      }
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
  mounted() {
    getStyleById('styleFeatureCarouselSection').innerHTML = (addStyleInClass('style-feature-carousel-title', this.featureCarouselSection.title_style) +
        addStyleInClass('style-feature-carousel-description', this.featureCarouselSection.description_style) +
        addStyleInClass('style-feature-carousel-image', this.featureCarouselSection.image_style))
  },
}
</script>
