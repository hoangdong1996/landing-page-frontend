import {getRequirementSection} from '@/api/requirementSection'

const state = {
    requirementSection: null,
}

const mutations = {
    UPDATE_REQUIREMENT_SECTION: (state, obj) => {
        state.requirementSection = obj
    }
}

const actions = {
    requirementSection({commit}) {
        return getRequirementSection().then(response => {
            commit('UPDATE_REQUIREMENT_SECTION', response.data.data)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

