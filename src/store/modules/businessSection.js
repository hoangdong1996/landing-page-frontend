import { getBusinessSection } from '@/api/businessSection'

const state = {
  businessSection: null
}

const mutations = {
  UPDATE_BUSINESS_SECTION: (state, obj) => {
    state.businessSection = obj
  }
}

const actions = {
  businessSection({ commit }) {
    return getBusinessSection().then(response => {
      commit('UPDATE_BUSINESS_SECTION', response.data.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

