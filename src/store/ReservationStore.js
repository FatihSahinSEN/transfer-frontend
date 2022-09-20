import api from "src/boot/axios"
import alert from "boot/alert";
import {evaAward} from "@quasar/extras/eva-icons";

export default {
  namespaced: true,
  state: {
    ReservationList:[],
    Filter:{
      from_date: false,
      to_date: false
    }
  },
  mutations: {
    setReservation(state,value){
      state.ReservationList = value
    }
  },
  actions: {
    async AllReservationUpdate({commit,dispatch, state}){
        let url = await dispatch("getReservationApiUrl");
        console.log(url)
        api.get(url)
          .then((response) => {
            commit("setReservation",response?.data?.result)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    async getReservationApiUrl({state}){
      let url = "/reservation";
      // Başlama tarihi seçildiyse
      if(state.Filter.from_date && !state.Filter.to_date){
        url = await url + '?departure_date=>' + state.Filter.from_date
      }
      if (state.Filter.from_date && state.Filter.to_date){
        url = await url + '?between=departure_date,' + state.Filter.from_date + ',' + state.Filter.to_date
      }
      // Tarih Seçilmediyse
      if (!state.Filter.from_date && !state.Filter.to_date){
        // Başlama ve bitiş tarihi seçildiyse
        let date = new Date().setDate(new Date().getDate() - 30);
        let year = new Date(date).getFullYear();
        let month = new Date(date).getUTCMonth();
        month = month +1;
        if(month<10) month = "0" + month;
        let day = new Date(date).getUTCDay();
        if(day<10) day = "0" + day;
        let monthago = year + '-' + month + '-' + day;
        url = await url + '?departure_date=>' + monthago
      }
      return url
    }
  },
  getters: {

  }
}
