<template>
  <div>
    <!--        <div id="contact" class="newsletter-section section-space&#45;&#45;ptb_120 " v-if="newsletter" style="margin-top: 20px">-->
    <div id="contact" class="newsletter-section section-space--ptb_120 "
         v-if="newsletter"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 ml-auto mr-auto">
            <div class="section-title-wrapper text-center section-space--mb_50 wow move-up">
              <h3 class="section-title text-white" v-html="newsletter.title"/>
            </div>
            <!-- newsletter form -->
            <div class="newsletter-form--one section-space--mb_20 text-center wow move-up">
              <form action="#">
                <input type="text" placeholder="Your name">
                <input type="email" placeholder="Email">
                <button class="btn btn--white btn-text-theme" :href="newsletter.button_href">{{
                    newsletter.button_title
                  }}
                </button>
              </form>
            </div>
            <!-- newsletter text -->
            <h6 class="text-white text-center wow move-up">
              {{ newsletter.description }}
              <a :href="newsletter.description_button_href"
                 class="hover-style-link hover-style-link--green">{{ newsletter.description_button_title }}</a>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsletter: Object,
  },
  data() {
    return {
      styleNewsletter: {},
    }
  },
  // computed: {
  //   getStyle() {
  //     return JSON.parse(this.newsletter.style)
  //   }
  // },
  // watch: {
  //   newsletter() {
  //     if (this.newsletter.style) {
  //       this.styleNewsletter = JSON.parse(this.newsletter.style)
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
