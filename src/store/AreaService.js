import api from 'src/boot/axios'
import alert from 'src/boot/alert'

/**
 * @API_URL/ + UrlPath
 * @type {string}
 */
const UrlPath = 'area'

/**
 * @ServiceName
 * @type {string}
 */
const Service = 'AreaService'

export default {
  namespaced: true,
  state: {
    Title: 'Bölgeler', // Page Title
    CreateRoute: 'AreaCreate', // Create Route for vue-router
    CreateAccess: 'AreaCreate', // Create Access role for Backend
    UpdateRoute: 'AreaUpdate', // Update Route for vue-router
    UpdateAccess: 'AreaUpdate', // Update Access role for Backend
    ListAccess: 'AreaList', // List Access role for Backend
    UniqueKey: 'area_id', // ID column for Backend and View
    StatusColumn: 'area_status', // Status column for Backend and View
    status: true, // Status column show or hide
    /**
     * Vue List Table Columns for backend to view
     */
    Columns: [
      { name: 'area_name', label: 'Bölge Adı', field: 'area_name', align: 'left' },
      { name: 'area_sort', label: 'Sıra', field: 'area_sort', align: 'left', sortable: true },
      { name: 'area_is_airport', label: 'Airport', field: 'area_is_airport', align: 'left' },
      { name: 'created', label: 'Kayıt Tarihi', field: 'created', align: 'left', sortable: true },
    ],
    /**
     * Create And Update Forms for View and Backend
     */
    Form: [
      {
        name: 'area_name',
        type: 'text',
        label: 'Bölge',
        icon: '',
        rules: [val => (val && val.length > 0) || 'Bölge alanı boş olamaz'],
        tab: 1,
        data: '',
        autofocus: true,
      },
      { name: 'area_sort', type: 'number', label: 'Sıra', icon: '', tab: 2, data: '', rules: '' },
      {
        name: 'area_is_airport',
        type: 'select',
        label: 'Bölge',
        icon: '',
        options: [
          { id: '1', name: 'Bölge' },
          { id: '2', name: 'Hava alanı' },
        ],
      },
      { name: 'area_status', type: 'checkbox', label: 'Durum', icon: '' },
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
