import {getNavbar} from '@/api/navbar';


const state = {
    navbar : null
}

const mutations ={
    UPDATE_LOGO: (state, obj) => {
        state.navbar = obj;
    }
}

const actions ={
    getLogoNavbar({commit}) {
        return getNavbar().then(response => {
            commit('UPDATE_LOGO', response.data.data);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
