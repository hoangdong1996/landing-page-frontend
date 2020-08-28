<template>
  <div class="footer-area-wrapper" :class="FooterStyle" v-if="footer" >
    <div class="footer-area section-space--ptb_90">
      <div class="container">
        <div class="row footer-widget-wrapper">
          <div class="col-lg-4 col-md-6 footer-widget">
            <div class="footer-widget__logo mb-30">
              <router-link to="/">
                <img v-if="footer.image.data" :src="footer.image.data" class="img-fluid logo-dark style-footer-image" alt>
                <img v-else v-lazy="footer.image.id" class="img-fluid logo-dark style-footer-image" alt>
              </router-link>
            </div>

            <ul class="footer-widget__list">
              <li>{{ widgetList.title }}</li>
              <li v-for="(list,index) in widgetList.link" :key="index">
                <a :href="widgetList.href[index]" class="hover-style-link">{{ list }}</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-6 footer-widget">
            <h6 class="footer-widget__title mb-20 style-footer-title">{{ footer.title }}</h6>
            <ul class="footer-widget__list">
              <li class="style-footer-link-text" v-for="(footerLink,index) in footer.footerLinkList" :key="index">
                <a :href="footerLink.href" class="hover-style-link">{{ footerLink.title }}</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6 offset-lg-1 footer-widget">
            <div class="twitter-feed-slider">
              <div class="swiper-container twitter-feed-slider__container">
                <div class="swiper-wrapper twitter-feed-slider__wrapper">
                  <div class="swiper-slide twitter-feed-slider__single">
                    <div class="tweet">
                      <div class="tweet__text">
                        {{ tweet.text }}
                        <a :href="tweet.href" target="_blank">{{ tweet.info }}</a>
                        <a href="https://t.co/2iDReuyPMt" target="_blank">https://t.co/2iDReuyPMt</a>
                      </div>
                      <div class="tweet__info">
                        <h6 class="tweet__heading">Unsplash</h6>
                        <span class="tweet__date">{{ tweet.date }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-copyright-area border-top section-space--ptb_30">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-left">
            <span class="copyright-text">© 2020 AeroLand. All Rights Reserved.</span>
          </div>
          <div class="col-md-6 text-center text-md-right">
            <ul class="list ht-social-networks solid-rounded-icon">
              <li class="item">
                <a href="#" target="_blank" class="social-link">
                  <i class="fab fa-facebook social-link-icon"/>
                </a>
              </li>
              <li class="item">
                <a href="#" target="_blank" class="social-link">
                  <i class="fab fa-twitter social-link-icon"/>
                </a>
              </li>
              <li class="item">
                <a href="#" target="_blank" class="social-link">
                  <i class="fab fa-instagram social-link-icon"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMain',
  props: {
    k: Number,
    footer: {
      type: Object,
      default: null
    },
    FooterStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tweet: {
        text: ' "The ocean never ceases to amaze!" Feature: Ben Klea',
        href: 'https://t.co/jSRMsZAdPW',
        info: 'https://t.co/2iDReuyPMt',
        date: 'May 07, 2020'
      },
      widgetList: {
        title: '58 Howard Street #2 San Francisco, CA 941',
        link: ['contact@aeroland.com', '(+68)1221 09876', 'www.website.com'],
        href: ['#', '#', '#']
      }
    }
  },
}
</script>
<style>

</style>
