import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {LocalStorage} from "quasar";

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      title:"",
      isim: "Fatih ŞEN",
      token: null,
      role: 0,
      user: [],
      scopes:[],
      reservationList:[],
      reservationDate:[],
      reservationLastUpdate:null,
      drivers:[],
      ReservationRefresh:false,
      StatusRefresh:false,
      StatusTimer:null,
      Pagen:null,
      filter:null,
      grid: false,
      notice: null,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 50,
        list: [5, 10, 15, 20, 30, 40, 50, 100, 500,0]
      },
      CariList:[],
      parameters: []
    },
    mutations:{
      setParameters(state,val){
        state.parameters=val;
      },
      setTitle(state,val){
        state.title=val
      },
      setCariList(state,val){
        state.CariList=val
      },
      setTekon(state,val) {
        state.token = val
      },
      setNotice(state,val) {
        state.notice = val
      },
      setScopes(state,val) {
        state.scopes = val
      },
      setReservationList(state,val){
        state.reservationList = val
      },
      setFilterDate(state,val){
        state.reservationDate = val
      },
      setDrivers(state,val){
        state.drivers = val
      },
      newDrivers(state,val){
        state.drivers.push(val)
      },
      setReservationRefresh(state,val){
        state.ReservationRefresh = val
      },
      setReservationLastUpdate(state,val){
        state.reservationLastUpdate = val
      },
      setPagen(state,val){
        state.Pagen = val
      },
      setPagination(state,val){
        state.pagination.sortBy = val.sortBy
        state.pagination.page = 1
        state.pagination.rowsPerPage = val.rowsPerPage
        state.pagination.descending = val.descending
        state.pagination.list = [5, 10, 15, 20, 30, 40, 50, 100, 500]
      },
      setPaginationSort(state,val){
        state.pagination.sortBy = val
      },
      setPaginationPage(state,val){
        state.pagination.page = val
      },
      setSearchTable(state,val){
        state.filter = val
      },
      setGrid(state,val){
        state.grid = val
      }
    },
    getters: {
      getReservationList: (state) => {
        return  state.reservationList.filter(reservation => reservation.transfer_status == 1)
      }
    },
    actions: {

    }


  })

  return Store
}
