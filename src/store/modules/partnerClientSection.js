import {getPartnerClientSection} from "@/api/partnerClientSection";

const state = {
    partnerClientSection: {
        title: '',
        text: '',
        brandLogoList: []
    }
}

const mutations = {
    UPDATE_PARTNER_CLIENT_SECTION: (state, obj) => {
        state.partnerClientSection = obj
    }
}

const actions = {
    getPartnerClientSection({commit}) {
        getPartnerClientSection().then(response => {
            commit('UPDATE_PARTNER_CLIENT_SECTION', response.data.data)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
