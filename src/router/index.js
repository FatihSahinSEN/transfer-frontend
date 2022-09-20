import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './routes'

let routes

routes = route
Vue.use(VueRouter)

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
  Router.beforeEach(async (to, from, next) => {
    let roles = (await store.state.AuthService.Roles) || []
    let Service = to?.meta?.service || null
    store.commit('SetService', Service)
    let urlRole = await to.meta.role
    let roleStatus = false
    if (roles.hasOwnProperty(urlRole)) {
      if (roles[urlRole].role_status == '1') {
        roleStatus = true
      } else {
        roleStatus = false
      }
    } else {
      roleStatus = false
    }
    if (!store.state.isAuthenticated && to.name !== 'login') next({ name: 'login' })
    else if (!roleStatus && to.name !== 'login') next({ name: 'login' })
    else next()
  })
  return Router
}
