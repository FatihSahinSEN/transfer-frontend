import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCryptojs from 'vue-cryptojs'
import adminRoutes from './admin-routes'

Vue.use(VueCryptojs)
let routes;

routes = adminRoutes;
Vue.use(VueRouter)
export default function (/* { store, ssrContext } */) {

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
