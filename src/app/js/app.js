import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import {domain, fromNow} from '_filters'
import AppView from '_components/App.vue'
import {configRouter} from '_router/router.config.js'
import '_sass/main.scss'
import '../index.html'
require('es6-promise').polyfill()

Vue.use(Router)
Vue.use(Resource)
Vue.http.options.xhr = {
    withCredentials: true
};

Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

const router = new Router({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    linkActiveClass: 'v-link-active'
})

configRouter(router)

const App = Vue.extend(AppView)
router.start(App, '#app')

window.router = router
