import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import { getToken, setToken } from "@/utils/auth";
import { login } from "@/api/auth"
export const store = new Vuex.Store({
    state: {
        token: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        login({ commit }, userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password }).then(response => {
                    const { data } = response
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
});
