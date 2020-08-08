import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import VueAxios from "vue-axios";
import Api from '@/api/api'

Vue.use(Vuex);
Vue.use(VueAxios, axios)


export default new Vuex.Store({
    state: {
        navbarComponent: {
            srcLogoNavbar: "",
        },
        heroBranding: {
            title:"",
            description:"",
            buttonTitle: "",
            buttonHref: "",
            backgroundImg:"",
        },


    },
    mutations: {
        SET_LOGO_NAVBAR(state, srcLogoNavbar) {
            state.navbarComponent.srcLogoNavbar = srcLogoNavbar;
        },

    },
    actions: {
         async loadLogoNavbar({commit}) {
                let response = await Api().get('');
                commit('SET_LOGO_NAVBAR', response.data);
        }
    }

});
