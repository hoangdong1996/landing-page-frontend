import { getFooter } from '@/api/footer'

const state = {
  footer: null
}

const mutations = {
  UPDATE_FOOTER: (state, footer) => {
    state.footer = footer
  }
}

const actions = {
  getFooter({ commit }) {
    return getFooter().then(response => {
      commit('UPDATE_FOOTER', response.data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
