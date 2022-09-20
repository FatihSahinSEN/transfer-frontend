import Vue from 'vue'
import Vuex from 'vuex'
import SecureLS from 'secure-ls'
import VuexPersistence from 'vuex-persist'
import AuthService from 'src/store/AuthService'
import ReservationStore from 'src/store/ReservationStore'
import CarService from 'src/store/CarService'
import HotelService from 'src/store/HotelService'
import UserService from 'src/store/UserService'
import AreaService from 'src/store/AreaService'

const localSecure = new SecureLS({
  isCompression: false,
  encodingType: 'des',
  encryptionSecret: '51f28b551f226d8dc3b9fc7098dc3b9a29d958f3a1fe',
})

const vuexLocal = new VuexPersistence({
  key: 'PkasdpPOWDkPKASDKWO!saOWjdo',
  storage: {
    getItem: key => localStorage.getItem(key),
    setItem: (key, value) => localStorage.setItem(key, value),
    removeItem: key => localStorage.removeItem(key),
  },
  reducer: state => ({
    AuthService: {
      AccessToken: state.AuthService.AccessToken,
      RefreshToken: state.AuthService.RefreshToken,
      Roles: state.AuthService.Roles,
    },
    isAuthenticated: state.isAuthenticated,
    Task: state.Task,
  }),
})
Vue.use(Vuex)
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      Task: '',
      Service: '',
      isAuthenticated: false,
      title: '',
      isim: 'Fatih ŞEN',
      token: null,
      role: 0,
      user: [],
      scopes: [],
      reservationList: [],
      reservationDate: [],
      reservationLastUpdate: null,
      drivers: [],
      ReservationRefresh: false,
      StatusRefresh: false,
      StatusTimer: null,
      Pagen: null,
      filter: null,
      grid: false,
      notice: null,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 50,
        list: [5, 10, 15, 20, 30, 40, 50, 100, 500, 0],
      },
      CariList: [],
      parameters: [],
    },
    mutations: {
      SetService(state, val) {
        state.Service = val
      },
      LastTask(state, value) {
        state.Task = value
      },
      SetisAuthenticated(state, val) {
        state.isAuthenticated = val
      },
      setParameters(state, val) {
        state.parameters = val
      },
      setTitle(state, val) {
        state.title = val
      },
      setCariList(state, val) {
        state.CariList = val
      },
      setTekon(state, val) {
        state.token = val
      },
      setNotice(state, val) {
        state.notice = val
      },
      setScopes(state, val) {
        state.scopes = val
      },
      setReservationList(state, val) {
        state.reservationList = val
      },
      setFilterDate(state, val) {
        state.reservationDate = val
      },
      setDrivers(state, val) {
        state.drivers = val
      },
      newDrivers(state, val) {
        state.drivers.push(val)
      },
      setReservationRefresh(state, val) {
        state.ReservationRefresh = val
      },
      setReservationLastUpdate(state, val) {
        state.reservationLastUpdate = val
      },
      setPagen(state, val) {
        state.Pagen = val
      },
      setPagination(state, val) {
        state.pagination.sortBy = val.sortBy
        state.pagination.page = 1
        state.pagination.rowsPerPage = val.rowsPerPage
        state.pagination.descending = val.descending
        state.pagination.list = [5, 10, 15, 20, 30, 40, 50, 100, 500]
      },
      setPaginationSort(state, val) {
        state.pagination.sortBy = val
      },
      setPaginationPage(state, val) {
        state.pagination.page = val
      },
      setSearchTable(state, val) {
        state.filter = val
      },
      setGrid(state, val) {
        state.grid = val
      },
    },
    getters: {
      getReservationList: state => {
        return state.reservationList.filter(reservation => reservation.transfer_status == 1)
      },
    },
    actions: {},
    plugins: [vuexLocal.plugin],
    modules: {
      AuthService: AuthService,
      Reservation: ReservationStore,
      CarService,
      HotelService,
      UserService,
      AreaService,
    },
  })

  return Store
}
