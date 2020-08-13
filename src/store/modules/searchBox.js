import { getSearchBox } from '@/api/search-box'

const state = {
  searchBox: null
}

const mutations = {
  UPDATE_SEARCH_BOX: (state, obj) => {
    state.searchBox = obj
  }
}

const actions = {
  getSearchBox({ commit }) {
    getSearchBox().then(response => {
      commit('UPDATE_SEARCH_BOX', response.data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
