import Vue from "vue";
import axios from "axios";
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Accept: "json/application",
    "Content-Type": "json/application",
    "token": ""
  },
  timeout: 10000
});
export default ({
  Vue
}) => {
  Vue.prototype.$axios = axiosInstance;
};
export {
  axiosInstance
  };

