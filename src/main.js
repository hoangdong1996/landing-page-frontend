import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSilentbox from 'vue-silentbox'
import WOW from 'wow.js/dist/wow.js';
import store from './store/index'

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


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.config.productionSourceMap = false

import {routes} from './router/index'


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
