<template>
 <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(135deg,  #EA5C54  0%,#bb6dec 100%);"
  >
    <div class="column">
      <div class="row">
        <q-card square dark class="q-pa-md q-ma-none no-shadow bg-grey-10" style="width:320px;">
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-weight-bolder text-grey text-center" style="font-size:2em">{{ parameters.SYSTEM_SHORTNAME }}</p>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input dark dense square filled v-model="username" type="text" label="Kullanıcı adı" @keyup.enter.native="login()" autofocus>
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input dark dense square filled v-model="password" type="password" label="Şifre" @keyup.enter.native="login()">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <div class="row full-width items-center">
              <div class="col-6">
                <q-btn outline rounded size="md" color="red-4" class="full-width text-white" label="Giriş Yap" @click="login" />
              </div>
              <div class="col-6">
                <p class="text-no-wrap text-grey text-caption text-right">
                <label>
                  <input type="checkbox" v-model="beni_hatirla" />
                  Beni Hatırla
                </label>
                </p>
              </div>
            </div>
          </q-card-actions>
          <q-card-section>
            <p class="text-caption text-weight-light text-grey">
                Yeni hesap açmak için veya giriş yaparken sorun yaşıyorsanız. Bize <a :href="phoneLink" style="color:#fff">+{{ parameters.SYSTEM_CONTACT_PHONE }}</a> Numaralı Telefondan Ulaşabilirsiniz.
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      beni_hatirla:false
    }
  },
  methods: {
      login() {
          let user={
            username:this.username,
            password:this.password
          }
          this.$axios.post('user/login', { user })
            .then((result) => {
              if(result.data.status.code==200){
                this.$store.commit("setTekon",result.data.return.token)
                this.$store.commit("setScopes",result.data.return.scopes)
                this.$axios.defaults.headers.token=result.data.return.token
                if(this.beni_hatirla){
                  localStorage.setItem("cVs984vasd5481!daw^sa&54511akghH!w", this.CryptoJS.AES.encrypt(result.data.return.name,"Fatihhh").toString());
                  localStorage.setItem("cVs984vasd5481!daw^sa&54511akghH!x", this.CryptoJS.AES.encrypt(result.data.return.user_id,"Fatihhh").toString());
                  localStorage.setItem("Klamskwjn123LSkl2^a!awds++123dawd1", this.CryptoJS.AES.encrypt(result.data.return.role,"Fatihhh").toString());
                  localStorage.setItem("x79wAdsc5848!52asd6plk2^a&acs33649",result.data.return.token)
                }else{
                  sessionStorage.setItem("x79wAdsc5848!52asd6plk2^a&acs33649", result.data.return.token);
                  sessionStorage.setItem("cVs984vasd5481!daw^sa&54511akghH!w", this.CryptoJS.AES.encrypt(result.data.return.name,"Fatihhh").toString());
                  sessionStorage.setItem("cVs984vasd5481!daw^sa&54511akghH!x", this.CryptoJS.AES.encrypt(result.data.return.user_id,"Fatihhh").toString());
                  sessionStorage.setItem("Klamskwjn123LSkl2^a!awds++123dawd1", this.CryptoJS.AES.encrypt(result.data.return.role,"Fatihhh").toString());
                }

                this.$router.push({ name: "ReservationList" })

              }else{
                  this.alert("HATA",result.data.status.message)
              }
            }).catch((err) => {

                if(!err.status){
                  this.alert("HATA", "Sunucuyla bağlantı sağlanamadı..");
                }
            });
      },
      alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      })
    },
    beniHatirlaControl(){
        if(localStorage.hasOwnProperty("x79wAdsc5848!52asd6plk2^a&acs33649")){
          token = localStorage.getItem("x79wAdsc5848!52asd6plk2^a&acs33649") || null;
          this.$store.commit("setTekon",result.data.return.token)
          this.$store.commit("setScopes",result.data.return.scopes)
          this.$axios.defaults.headers.token=result.data.return.token
          this.CheckToken();
          this.$router.push({ name: "ReservationList" })
        }
    }
  },
  mounted() {
    this.getParameters();
    this.beniHatirlaControl();
  },
  computed: {
    ...mapState(["parameters"]),
    phoneLink(){
      return "tel:+" + this.$store.state.parameters.SYSTEM_CONTACT_PHONE
    }
  }
}
</script>

<style>
</style>
