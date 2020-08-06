<template>
  <div class="newsletter-section section-space--ptb_120 default-bg" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 ml-auto mr-auto">
          <div class="section-title-wrapper text-center section-space--mb_50 wow move-up">
            <h3 class="section-title text-white" v-html="title"></h3>
          </div>
          <!-- newsletter form -->
          <div class="newsletter-form--one section-space--mb_20 text-center wow move-up">
            <form action="#">
              <input type="text" placeholder="Your name" />
              <input type="email" placeholder="Email" />
              <button class="btn btn--white btn-text-theme">Subscribe</button>
            </form>
          </div>
          <!-- newsletter text -->
          <h6 class="text-white text-center wow move-up">
            {{text}}
            <a
              v-bind:href="textHref"
              class="hover-style-link hover-style-link--green"
            >{{buttonTitle}}</a>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newsletter",
  data() {
    return {
      title: "493 businesses signed up <br/> last week. Join them!",
      text: "What’s next in AeroLand?",
      textHref: "#",
      buttonTitle: "Learn more",
    };
  },
};
</script>