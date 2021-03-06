const getters = {
  navbar: state => state.navbar.navbar,
  heroBranding: state => state.heroBranding.heroBranding,
  aboutSection: state => state.aboutSection.aboutSection,
  businessSection: state => state.businessSection.businessSection,
  requirementSection: state => state.requirementSection.requirementSection,
  featureCarouselSection: state => state.featureCarouselSection.featureCarouselSection,
  searchBox: state => state.searchBox.searchBox,
  newsletter: state => state.newsletter.newsletter,
  footer: state => state.footer.footer,
  progressCircle: state => state.progressCircle.progressCircleSection,
  pricingSection: state => state.pricingSection.pricingComponent,
  partnerClientSection: state => state.partnerClientSection.partnerClientSection,
  token: state => state.user.token
}
export default getters
