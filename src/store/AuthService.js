import api from "src/boot/axios"
import alert from "boot/alert";

export default {
  namespaced: true,
  state: {
    AccessToken:"",
    RefreshToken:"",
    Roles:[]
  },
  mutations: {
    SetToken(state, tokens){
      state.AccessToken = tokens.access_token;
      state.RefreshToken = tokens.refresh_token;
    },
    SetRoles(state,roles){
      state.Roles = roles;
    },
  },
  actions: {
    LoginRequest({commit,dispatch}, request){
      api.post("login",{ ...request }).then((response)=> {
        if(!response.data.status){
          alert("HATA","Kullanıcı adı veya şifre geçersiz.");
          return false
        }
        else {
          let Tokens = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token
          }
          commit("SetToken", Tokens);
          commit("SetRoles",response.data.roles);
          commit("SetisAuthenticated",true , { root: true });
          this.$router.push({name: "ReservationList"});
          this.$router.push({ name: "ReservationList" })
        }
     }).catch((error) => {
        console.log(error)
        alert("HATA", "Yetkiler çekilemedi lütfen tekrar deneyiniz.");
        return false
      });
    },
    async AuthRefresh({state,commit,dispatch,rootState},config){
      let token = state.RefreshToken
      api.post("refresh" ,{ token })
        .then(async (response) => {
          if(!response.data?.status){
            alert("Uyarı","Oturumunuz sonlandı lütfen tekrar giriş yapınız.");
            this.$router.push({ name: "HotelCreate"})
            return false
          }else {
            let Tokens = {
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token
            }
            // api.defaults.headers.common['Authorization'] = 'Bearer ' + Tokens.access_token;
            commit("SetToken", Tokens);
            commit("SetRoles",response.data.roles);
            commit("SetisAuthenticated",true , { root: true });

            const LastAction = await rootState.Task

            if(config.request=== null){
              console.log("Request Yok",LastAction)
              dispatch(LastAction ,null, { root:true })

            }else{
              console.log("Request Var",LastAction)
              dispatch(LastAction , config.request, { root:true })
            }
          }
        })
    }
  },
}
