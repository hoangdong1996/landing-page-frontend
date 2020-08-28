<template>
  <div>
    <!--            <div id="contact" class="newsletter-section section-space&#45;&#45;ptb_120 " v-if="newsletter" style="margin-top: 20px">-->
    <div id="contact"
         :class="{'newsletter-section':true, 'section-space--ptb_120':true, 'style-newsletter':true, 'default-bg':isNewsletter}"
         v-if="newsletter"
         :key="render"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 ml-auto mr-auto">
            <div class="section-title-wrapper text-center section-space--mb_50 wow move-up">
              <h3 :class="{'section-title' : true, 'style-newsletter-title': true, 'text-white' : isTextWhite}"
                  v-html="newsletter.title"/>
            </div>
            <!-- newsletter form -->
            <div class="newsletter-form--one section-space--mb_20 text-center wow move-up">
              <form action="#">
                <input type="text" placeholder="Your name">
                <input type="email" placeholder="Email">
                <button class="btn btn--white btn-text-theme style-newsletter-button"
                        :href="newsletter.button_href">{{ newsletter.button_title }}
                </button>
              </form>
            </div>
            <!-- newsletter text -->
            <h6 class="text-center wow move-up style-newsletter-description" v-bind:class="{'text-white':isTextWhite}">
              {{ newsletter.description }}
              <a :href="newsletter.description_button_href"
                 class="hover-style-link hover-style-link--green ">{{ newsletter.description_button_title }}</a>
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
    default: null,
    render: Number
  },
  data() {
    return {
      isTextWhite: true,
      isNewsletter: true
    }
  },
  watch: {
    render() {
      this.init()
    }
  },
  methods: {
    init() {
      if (this.newsletter.title_style !== "" || this.newsletter.description_style !== "") {
        this.isTextWhite = false
      } else {
        this.isTextWhite = true
      }
      if (this.newsletter.newsletter_style !== '') {
        this.isNewsletter = false
      } else {
        this.isNewsletter = true
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
