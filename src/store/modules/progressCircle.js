import {getProgressCircle} from '@/api/progressCircle'

const state = {
    progressCircleSection: null
}
const mutations = {
    UPDATE_PROGRESS_CIRCLE: (state, obj) => {
        state.progressCircleSection = obj
    }
}

const actions = {
    updateProgressCircle({commit}) {
        return getProgressCircle().then(response => {
            commit('UPDATE_PROGRESS_CIRCLE', response.data.data)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
