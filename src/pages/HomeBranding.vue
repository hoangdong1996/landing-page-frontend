<template>
  <div class="main-container">
    <!-- Navbar section -->
    <Navbar v-if="navbar" :navbar="navbar"
    />

    <!-- hero section -->
    <HeroBranding v-if="heroBranding" :heroBranding="heroBranding"/>

    <!-- about section -->
    <AboutSection v-if="aboutSection" :aboutSection="aboutSection"/>

    <!-- business analytics start -->
    <BusinessSection v-if="businessSection" :businessSection="businessSection"/>

    <!-- requirement section-->
    <RequireList v-if="requirementSection" :requirementSection="requirementSection"/>

    <!-- feature carousel -->
    <FeatureTwo v-if="featureCarouselSection" :featureCarouselSection="featureCarouselSection"/>

    <!-- feature list progress bar -->
    <div class="feature-list-progress-area pb-30">
      <div class="container">
        <!-- progress feature component -->
        <!-- thiếu title, fill, class, class 2 trong model -->
        <ProgressCircle v-if="progressCircle" :progressCircle="progressCircle"/>
      </div>
    </div>
    <!-- feature list progress bar -->

    <!-- pricing section start-->
    <CurveShape>
      <template v-slot:bgcolor>
        <path
            style="fill: #f6f5f9;
                    stroke-miterlimit:10;"
            d="M3360.5,97.739c-242,0-480-48.375-480-48.375
                        S2647.5,0.5,2400.5,0.5s-480,48.375-480,48.375s-238,48.864-480,48.864s-480-48.375-480-48.375S727.5,0.5,480.5,0.5
                        S0.5,48.875,0.5,48.875V108h1920h1920V48.875C3840.5,48.875,3602.5,97.739,3360.5,97.739z"
        />
      </template>
    </CurveShape>
    <PricingSection v-if="pricingSection" :pricingSection="pricingSection"/>
    <!-- pricing section end-->

    <!-- partner client section -->
    <PartnerClientSection v-if="partnerClientSection" :partnerClientSection="partnerClientSection"/>

    <!-- newsletter section -->
    <Newsletter v-if="newsletter" :newsletter="newsletter"/>

    <!-- footer section -->
    <FooterMain :footer="footer"/>

    <!-- offcanvas search component -->
    <OffcanvasSearchBox :searchBox="searchBox"/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import HeroBranding from "../components/HeroBranding";
import RequireList from "../components/RequireList";
import FeatureTwo from "../components/FeatureTwo";
import ProgressCircle from "../components/ProgressCircle";
import CurveShape from "../components/CurveShape";
import Newsletter from "../components/Newsletter";
import FooterMain from "../components/FooterMain";
import OffcanvasSearchBox from "../components/OffcanvasSearchBox";
import AboutSection from "../components/AboutSection";
import BusinessSection from "../components/BusinessSection";
import PricingSection from "../components/PricingSection";
import PartnerClientSection from "../components/PartnerClientSection";

import {mapGetters} from "vuex";

export default {
  name: "app",
  components: {
    Navbar,
    HeroBranding,
    RequireList,
    FeatureTwo,
    ProgressCircle,
    CurveShape,
    Newsletter,
    FooterMain,
    OffcanvasSearchBox,

    AboutSection,
    BusinessSection,
    PricingSection,
    PartnerClientSection,
  },
  computed: {
    ...mapGetters([
      "navbar",
      "heroBranding",
      "aboutSection",
      "businessSection",
      "requirementSection",
      "progressCircle",
      "pricingSection",
      "partnerClientSection",
      "newsletter",
      "footer",
      "searchBox",
      "featureCarouselSection"
    ]),
  },
  mounted() {
    this.$store.dispatch("navbar/getLogoNavbar");
    this.$store.dispatch("heroBranding/getHeroBranding");
    this.$store.dispatch("aboutSection/aboutSection");
    this.$store.dispatch("businessSection/businessSection");
    this.$store.dispatch("requirementSection/requirementSection");
    this.$store.dispatch("featureCarouselSection/getFeatureCarouselSection");
    this.$store.dispatch("updateProgressCircle");
    this.$store.dispatch("updatePricingSection");
    this.$store.dispatch("getPartnerClientSection");
    this.$store.dispatch("newsletter/getNewsletter");
    this.$store.dispatch("footer/getFooter");
    this.$store.dispatch("searchBox/getSearchBox");
  },
};
</script>
