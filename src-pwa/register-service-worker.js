import {register} from 'register-service-worker';
import {Notify} from "quasar";
import axios from "axios";

register(process.env.SERVICE_WORKER_FILE, {
    // ready (registration) {
    //   axios.get("https://turizmhosting.com/lisans/?type=transfer")
    //     .then((res) => {
    //       if(res.data.status){
    //         let version=0;
    //         if(localStorage.hasOwnProperty("version")){
    //           version = localStorage.getItem("version");
    //           console.log(version);
    //         }else{
    //           localStorage.setItem("version",res.data.version)
    //           version = res.data.version
    //           console.log(version);
    //         }
    //         if(res.data.version>version) {
    //           Notify.create({
    //             message: "Yazılım güncellemek için tıklayınız.",
    //             progress: true,
    //             classes: 'glossy',
    //             textColor: 'white',
    //             timeout: 25000,
    //             color: 'secondary',
    //             icon: 'cloud_download',
    //             position: "top",
    //             actions: [
    //               {
    //                 label: 'GÜNCELLE', color: 'white', handler: () => {
    //                   localStorage.setItem("version",res.data.version)
    //                   window.location.reload(true);
    //                 }
    //               }
    //             ]
    //           });
    //           setTimeout(() => {
    //             localStorage.setItem("version",res.data.version)
    //             window.location.reload(true);
    //           },25000);
    //         }
    //       }else{
    //         window.location = "/404";
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     })
    // },

  registered (/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound (/* registration */) {
    // console.log('New content is downloading.')
  },

  updated (/* registration */) {
    // console.log('New content is available; please refresh.')
  },

  offline () {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error (/* err */) {
    // console.error('Error during service worker registration:', err)
  }
})
