import axios from "axios";
import { Loading } from 'quasar';
import alert from "boot/alert";
import store from "src/store"

const api = axios.create({
  baseURL: process.env.API_URL || "hardcoded backend app url",
  headers: {
    "Accept": "json/application",
    "Content-Type": "json/application",
  },
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    Loading.show();
    let token = store().state.AuthService.AccessToken || false;
    if (token){
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Loading.show();
    alert("HATA", error.message)
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    Loading.hide()
    return response;
  },
  async error => {
    Loading.hide()
    if (error.response.status === 401) {
      error.config.request = error.response.data.request

      store().dispatch("AuthService/AuthRefresh",error.config)
    }else{
      console.log("Buradaaaa")
      alert("HATA", error.message)
      return Promise.reject(error);
    }
  });

export default api
