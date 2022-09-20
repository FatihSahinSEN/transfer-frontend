import api from "src/boot/axios";
import alert from "src/boot/alert";

export default {
  namespaced: true,
  state: {
    Liste: [],
    Tek: [],
  },
  mutations: {
    setListe(state,data){
      state.Liste = data
    },
    setTek(state,data){
      state.Tek = data
    },
    InsertListe(state,data){
      state.Liste.push(data)
    },
    RemoveListe(state, index){
      state.Liste.splice(index,1)
    }
  },
  actions: {
    getData({commit}){
      api.get('cars')
        .then(response => {
          if(response.status){
            commit('setListe',response.data.result)
          }else{
            alert("HATA", response.data.message)
            commit('setListe',[])
          }
        })
    }
  },
  getters: {

  }
}
