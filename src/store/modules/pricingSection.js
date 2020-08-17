import {getPricingSection} from '@/api/pricingSection'

const state = {
    pricingComponent: {
        title: '',
        description: '',
        popularTitle: '',
        pricingTableList: [
        ]
    }
}

const mutations = {
    UPDATE_PRICING: (state, obj) => {
        state.pricingComponent = obj
    }
}

const actions = {
    updatePricingSection({commit}) {
        return getPricingSection().then(response => {
            commit('UPDATE_PRICING', response.data.data)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
