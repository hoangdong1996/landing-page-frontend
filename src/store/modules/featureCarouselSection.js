import { getFeatureCarouselSection } from '@/api/featureCarouselSection'

const state = {
  featureCarouselSection: null
}

const mutations = {
  UPDATE_FEATURE_CAROUSEL_SECTION: (state, obj) => {
    state.featureCarouselSection = obj
  }
}

const actions = {
  getFeatureCarouselSection({ commit }) {
    return getFeatureCarouselSection().then(response => {
      commit('UPDATE_FEATURE_CAROUSEL_SECTION', response.data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
