import {getHeroBranding} from '@/api/heroBranding';


const state = {
    title: '',
    description:'',
    button_title: '',
    button_href:'',
    background_img: {
        data: ""
    }
}

const mutations = {
    UPDATE_HERO_BRANDING: (state, obj) => {
        state.title = obj.title
        state.description = obj.description
        state.button_title = obj.button_title
        state.button_href = obj.button_href
        state.background_img = obj.background_img
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
