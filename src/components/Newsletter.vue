<template>
  <div id="contact" class="newsletter-section section-space--ptb_120  style-newsletter default-bg"
       v-if="newsletter"
       v-show="newsletter.showSection ===true"
       style="background-color: dimgrey">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 ml-auto mr-auto">
          <div class="section-title-wrapper text-center section-space--mb_50 wow move-up">
            <h3 class="section-title text-white style-newsletter-title" v-html="newsletter.title"/>
          </div>
          <!-- newsletter form -->
          <div class="newsletter-form--one section-space--mb_20 text-center wow move-up">
            <form action="#">
              <input type="text" placeholder="Your name">
              <input type="email" placeholder="Email">
              <button class="btn btn--white btn-text-theme style-newsletter-button" :href="newsletter.button_href">{{
                  newsletter.button_title
                }}
              </button>
            </form>
          </div>
          <!-- newsletter text -->
          <h6 class="text-white text-center wow move-up style-newsletter-description">
            {{ newsletter.description }}
            <a :href="newsletter.description_button_href"
               class="hover-style-link hover-style-link--green">{{ newsletter.description_button_title }}</a>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {addStyleInClass, getStyleById} from "@/function/style";

export default {
  name: 'Newsletter',
  props: {
    newsletter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: '493 businesses signed up <br/> last week. Join them!',
      text: 'What’s next in AeroLand?',
      textHref: '#',
      buttonTitle: 'Learn more',
      textTitle: '',
      style: 'backgroundColor: gray ',
    }
  },
  mounted() {
    getStyleById('styleNewsletter').innerHTML = (addStyleInClass('style-newsletter-title', this.newsletter.title_style) +
        addStyleInClass('style-newsletter-description', this.newsletter.description_style) +
        addStyleInClass('style-newsletter', this.newsletter.newsletter_style) +
        addStyleInClass('style-newsletter-button', this.newsletter.button_style))
  }
}
</script>
<style>


</style>
