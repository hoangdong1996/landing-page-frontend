import { getAboutSection } from '@/api/aboutSection'

const state = {
  aboutSection: null
}

const mutations = {
  UPDATE_ABOUT_SECTION: (state, obj) => {
    state.aboutSection = obj
  }
}

const actions = {
  aboutSection({ commit }) {
    return getAboutSection().then(response => {
      commit('UPDATE_ABOUT_SECTION', response.data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

