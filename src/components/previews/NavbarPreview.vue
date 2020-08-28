<template>
  <b-navbar
      v-b-scrollspy:nav-scroller
      type="light"
      toggleable="xl"
      fixed="top"
      class="header-area"
      style="position: relative"
  >
    <div class="container-fluid container-fluid--cp-150">
      <b-navbar-toggle target="nav_collapse"/>
      <b-navbar-brand class="navbar-brand" to="/">
        <img v-if="navbar.image.data" v-lazy="navbar.image.data" alt="logo"/>
        <img v-else v-lazy="navbar.image.id">
      </b-navbar-brand>
      <b-btn-group class="header-config-wrapper">
        <b-btn class="header-config">
          <i class="far fa-search"/>
        </b-btn>
        <b-link class="ht-btn ht-btn--outline hire-btn d-none d-xl-block">Hire Us Now</b-link>
      </b-btn-group>
      <b-collapse id="nav_collapse" class="default-nav justify-content-center" is-nav>
        <b-navbar-nav class="navbar-nav main-menu">
          <b-nav-item>
            <span>LANDING</span>
          </b-nav-item>
          <b-nav-item class="scroll">
            <span>HOME</span>
          </b-nav-item>
          <b-nav-item class="scroll">
            <span>ABOUT</span>
          </b-nav-item>
          <b-nav-item class="scroll">
            <span>REQUIREMENTS</span>
          </b-nav-item>
          <b-nav-item class="scroll">
            <span>PRICING</span>
          </b-nav-item>
          <b-nav-item class="scroll">
            <span>PARTNERS</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    navbar: {
      type: Object,
      default: null,
      required: true
    },
  },
  data() {
    return {
      load: true,
      limitPosition: 200,
      scrolled: false,
      lastPosition: 500,
    };
  },
  mounted() {
    (function () {
      scrollTo();
    })();

    function scrollTo() {
      const links = document.querySelectorAll(".scroll > a");
      links.forEach((each) => (each.onclick = scrollAnchors));
    }

    function scrollAnchors(e, respond = null) {
      const distanceToTop = (el) => Math.floor(el.getBoundingClientRect().top);
      e.preventDefault();
      var targetID = respond
          ? respond.getAttribute("href")
          : this.getAttribute("href");
      const targetAnchor = document.querySelector(targetID);
      if (!targetAnchor) return;
      const originalTop = distanceToTop(targetAnchor);
      window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
      const checkIfDone = setInterval(function () {
        const atBottom =
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight - 190;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
          targetAnchor.tabIndex = "-1";
          targetAnchor.focus();
          clearInterval(checkIfDone);
        }
      }, 800);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    // sticky menu script
    handleScroll() {
      if (
          this.lastPosition < window.scrollY &&
          this.limitPosition < window.scrollY
      ) {
        this.scrolled = true;
        // move up!
      }
      if (this.lastPosition > window.scrollY) {
        this.scrolled = true;
        // move down
      }
      this.lastPosition = window.scrollY;
      this.scrolled = window.scrollY > 50;
    },

    // offcanvas searchbox
    toggleClass(addRemoveClass, className) {
      const el = document.querySelector("#search-overlay");
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
};
</script>
