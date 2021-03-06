import { setToken, getToken } from "@/utils/auth";
import { login } from "@/api/auth"

const state = {
    token: getToken(),
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
}

const actions = {
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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

