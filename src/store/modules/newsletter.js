import {getNewsletter} from '@/api/newsletter'

const state = {
    newsletter: null
}

const mutations = {
    UPDATE_NEWSLETTER: (state, obj) => {
        state.newsletter = obj
    }
}

const actions = {
    getNewsletter({commit}) {
        return getNewsletter().then(response => {
            commit('UPDATE_NEWSLETTER', response.data.data)
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
