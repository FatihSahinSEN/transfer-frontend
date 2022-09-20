import api from 'src/boot/axios'
import alert from 'src/boot/alert'

/**
 * @API_URL/ + UrlPath
 * @type {string}
 */
const UrlPath = 'users'

/**
 * @ServiceName
 * @type {string}
 */
const Service = 'UserService'

export default {
  namespaced: true,
  state: {
    Title: 'Kullanıcılar', // Page Title
    CreateRoute: 'UserCreate', // Create Route for vue-router
    CreateAccess: 'UserCreate', // Create Access role for Backend
    UpdateRoute: 'UserUpdate', // Update Route for vue-router
    UpdateAccess: 'UserUpdate', // Update Access role for Backend
    ListAccess: 'UserList', // List Access role for Backend
    UniqueKey: 'user_id', // ID column for Backend and View
    StatusColumn: 'user_status', // Status column for Backend and View
    status: true, // Status column show or hide
    /**
     * Vue List Table Columns for backend to view
     */
    Columns: [
      { name: 'fullname', label: 'İsim', field: 'fullname', align: 'left' },
      { name: 'username', label: 'Kullanıcı adı', field: 'username', align: 'left' },
      { name: 'email', label: 'E-posta', field: 'email', align: 'left' },
      { name: 'phone', label: 'Telefon', field: 'phone', align: 'left' },
      { name: 'created', label: 'Kayıt Tarihi', field: 'created', align: 'left', sortable: true },
    ],
    /**
     * List Item Table data view
     */
    Items: [],
    /**
     * Sing Item
     */
    Item: [],
  },
  mutations: {
    setItems(state, data) {
      state.Items = data
    },
    setItem(state, data) {
      state.Item = data
    },
    InsertItems(state, data) {
      state.Items.push(data)
    },
    RemoveItems(state, index) {
      state.Items.splice(index, 1)
    },
    setStatus(state, data) {
      state.status = data
    },
  },
  actions: {
    Create({ commit }, data) {
      commit('LastTask', Service + '/Create', { root: true })
      api
        .post(UrlPath)
        .then(response => {})
        .catch(error => {})
        .finally(() => {})
    },
    Update({ commit }, data) {
      commit('LastTask', Service + '/Update', { root: true })
      api
        .patch(UrlPath)
        .then(response => {})
        .catch(error => {})
        .finally(() => {})
    },
    findAll({ commit }) {
      commit('LastTask', Service + '/findAll', { root: true })
      commit('setItems', [])
      api
        .get(UrlPath)
        .then(response => commit('setItems', response.data.result))
        .catch(error => alert('HATA', error.message))
    },
    findById({ commit }, id) {
      commit('LastTask', Service + '/findById', { root: true })
      commit('setItem', [])
      api
        .get(UrlPath)
        .then(response => response => commit('setItems', response.data.result))
        .catch(error => alert('HATA', error.message))
    },
    findByColumn({ commit }, data) {
      commit('LastTask', Service + '/findByColumn', { root: true })
      commit('setItems', [])
      api
        .get(UrlPath)
        .then(response => commit('setItems', response.data.result))
        .catch(error => alert('HATA', error.message))
    },
    Delete({ commit }, id) {
      commit('LastTask', Service + '/Delete', { root: true })
      api
        .delete(UrlPath)
        .then(response => {})
        .catch(error => {})
    },
  },
  getters: {},
}
