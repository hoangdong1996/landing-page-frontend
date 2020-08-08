import {getNavbar} from '@/api/navbar';

const state = {
    logoSrc: ""
}

const mutations ={
    UPDATE_LOGO: (state, logoSrc) => {
        state.logoSrc = logoSrc;
    }
}

const actions ={
   getLogoNavbar({commit}) {
        let response = getNavbar()
        commit('UPDATE_LOGO', response.data);
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
