import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSilentbox from 'vue-silentbox'
import WOW from 'wow.js/dist/wow.js';
import store from './store/index'
import VueLazyload from "vue-lazyload";
import {routes} from './router/index'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1,
    silent: false,
    filter: {
        imgUrl (listener) {
            const src = listener.src
            const isId = Number.isInteger(src)
            if(isId) {
                listener.src = `${process.env.VUE_APP_BASE_API}image/${listener.src}`
            }
        },
    }
})
Vue.use(VueSilentbox)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)

import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/fontawesome-all.min.css'
import 'swiper/dist/css/swiper.css'
import 'animate.css/animate.min.css'
import '../src/assets/scss/style.scss'
import 'slick-carousel/slick/slick.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as filters from './filters'

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.config.productionSourceMap = false

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: "nav-item active"
})

new Vue({
    render: h => h(App),
    router,
    store,
    mounted() {
        new WOW().init();
    }
}).$mount('#app')
