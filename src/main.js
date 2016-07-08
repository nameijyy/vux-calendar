// warning: vue-router requires Vue 0.12.10+
import Vue from 'vue'
import VueRouter from 'Vue-router'
import { configRouter } from './route-config'
require('es6-promise').polyfill()


// install router
Vue.use(VueRouter)
Vue.use(require('vue-resource'));
// create router
const router = new VueRouter({
  history: false,
  saveScrollPosition: false
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./app.vue') )
router.start(App, '#app')

// just for debugging
window.router = router;
window.App = App;
