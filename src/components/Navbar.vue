<template>
  <b-navbar
      v-b-scrollspy:nav-scroller
      type="light"
      toggleable="xl"
      fixed="top"
      class="header-area"
      :class="{'is-sticky': scrolled}"
      v-if="navbar"
      v-show="navbar.showSection === true"
  >
    <div class="container-fluid container-fluid--cp-150" :style="styleNavbar">
      <b-navbar-toggle target="nav_collapse"/>
      <b-navbar-brand class="navbar-brand" to="/">
        <img v-if="navbar.image" :src="navbar.image.data | pngSrc" alt="logo"/>
      </b-navbar-brand>
      <b-btn-group class="header-config-wrapper">
        <b-btn class="header-config" @click="toggleClass('addClass', 'active')">
          <i class="far fa-search"/>
        </b-btn>
        <b-link class="ht-btn ht-btn--outline hire-btn d-none d-xl-block">Hire Us Now</b-link>
      </b-btn-group>
      <b-collapse id="nav_collapse" class="default-nav justify-content-center" is-nav>
        <b-navbar-nav class="navbar-nav main-menu">
          <b-nav-item to="/" >
            <span class="style-menu-navbar" >LANDING</span>
          </b-nav-item>
          <b-nav-item href="#home" class="scroll" v-if="heroBranding.showSection" >
            <span class="style-menu-navbar" >HOME</span>
          </b-nav-item>
          <b-nav-item href="#about" class="scroll" >
            <span class="style-menu-navbar">ABOUT</span>
          </b-nav-item>
          <b-nav-item href="#requirement" class="scroll" >
            <span class="style-menu-navbar">REQUIREMENTS</span>
          </b-nav-item>
          <b-nav-item href="#pricing" class="scroll">
            <span class="style-menu-navbar">PRICING</span>
          </b-nav-item>
          <b-nav-item href="#partner" class="scroll">
            <span class="style-menu-navbar">PARTNERS</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Navbar",
  computed: {
    ...mapGetters(['aboutSection','heroBranding','requirementSection','pricingSection','partnerClientSection'])
  },
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
      styleNavbar: null
    };
  },

  mounted() {
    if (this.navbar.styleSection.startsWith('{') && this.navbar.styleSection.endsWith('}')) {
      this.styleNavbar = JSON.parse(this.navbar.styleSection)
    } else {
      this.styleNavbar = {}
    }
    let navItemStyle = document.getElementById("styleNavbar")
    let string = ".style-menu-navbar {" + this.navbar.styleMenu + " !important" + "}";
    navItemStyle.innerHTML = string;

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
      window.scrollBy({top: originalTop, left: 0, behavior: "smooth"});
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
    }
  },
};
</script>
