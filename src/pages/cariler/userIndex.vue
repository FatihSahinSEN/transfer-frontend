<template>
<cari-detail :details="details"/>
</template>

<script>
    import CariDetail from "components/CariDetials";
    import VueCryptojs from "vue-cryptojs"
    export default {
      name: "userIndex",
      components: {CariDetail},
      data(){
          return {
            details: {
              user_id: this.CryptoJS.AES.decrypt(sessionStorage.getItem("cVs984vasd5481!daw^sa&54511akghH!x"),"Fatihhh").toString(this.CryptoJS.enc.Utf8),
              role: this.CryptoJS.AES.decrypt(sessionStorage.getItem("Klamskwjn123LSkl2^a!awds++123dawd1"),"Fatihhh").toString(this.CryptoJS.enc.Utf8),
              user_fullname:this.CryptoJS.AES.decrypt(sessionStorage.getItem("cVs984vasd5481!daw^sa&54511akghH!w"),"Fatihhh").toString(this.CryptoJS.enc.Utf8),
            }
          }
      },
      methods: {

      },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
