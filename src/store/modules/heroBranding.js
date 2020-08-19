import {getHeroBranding} from '@/api/heroBranding';


const state = {
    heroBranding: null
}

const mutations = {
    UPDATE_HERO_BRANDING: (state, obj) => {
        state.heroBranding = obj
    }
}

const actions = {
     getHeroBranding({commit}) {
        return getHeroBranding().then(response => {
            commit('UPDATE_HERO_BRANDING', response.data.data);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
