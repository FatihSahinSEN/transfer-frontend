import api from 'src/boot/axios'
import alert from 'src/boot/alert'

/**
 * @API_URL/ + UrlPath
 * @type {string}
 */
const UrlPath = 'hotels'

/**
 * @ServiceName
 * @type {string}
 */
const Service = 'HotelService'

export default {
  namespaced: true,
  state: {
    Title: 'İşletmeler', // Page Title
    CreateRoute: 'hotelCreate', // Create Route for vue-router
    UpdateRoute: 'hotelUpdate', // Update Route for vue-router
    CreateAccess: 'HotelCreate', // Create Access role for Backend
    ListAccess: 'HotelList', // List Access role for Backend
    UpdateAccess: 'HotelUpdate', // Update Access role for Backend
    UniqueKey: 'hotel_id', // ID column for Backend and View
    StatusColumn: 'hotel_status', // Status column for Backend and View
    status: true, // Status column show or hide
    /**
     * Vue List Table Columns for backend to view
     */
    Columns: [
      { name: 'hotel_name', label: 'Otel', field: 'hotel_name', align: 'left' },
      { name: 'user_name', label: 'Kullanıcı', field: 'fullname', align: 'left' },
      { name: 'hotel_area', label: 'Bölge', field: 'area_name', align: 'left' },
      { name: 'hotel_vkn', label: 'Vergi N.', field: 'hotel_vkn', align: 'left' },
      { name: 'hotel_vkd', label: 'Vergi D.', field: 'hotel_vkd', align: 'left' },
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
    findAll({ commit }) {
      api
        .get(UrlPath)
        .then(response => {
          commit('LastTask', Service + '/getDataAll', { root: true })
          if (response.status) {
            commit('setItems', response.data.result)
          } else {
            alert('HATA', error.message)
            commit('setItems', [])
          }
        })
        .catch(error => {
          commit('LastTask', Service + '/getDataAll', { root: true })
          console.log('HATA', error)
        })
    },
    getDataById({ commit }, id) {
      api.get(UrlPath + '/' + id).then(response => {
        commit('LastTask', Service + '/getDataById', { root: true })
        if (response.status) {
          commit('setItem', response.data.result)
        } else {
          alert('HATA', response.data.message)
          commit('setItem', {})
        }
      })
    },
  },
  getters: {},
}
