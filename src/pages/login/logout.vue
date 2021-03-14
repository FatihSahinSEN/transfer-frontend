<template>
 <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(135deg,  #EA5C54  0%,#bb6dec 100%);"
  >

   <p>{{ message }} </p>
  </q-page>
</template>

<script>
export default {
  name: 'Logout',
  data() {
    return {
      message:"Oturum Kapatılıyor.."
    }
  },
  methods: {
    logout(){
      sessionStorage.removeItem("x79wAdsc5848!52asd6plk2^a&acs33649");
      sessionStorage.removeItem("cVs984vasd5481!daw^sa&54511akghH!w");
      sessionStorage.removeItem("Klamskwjn123LSkl2^a!awds++123dawd1");
      sessionStorage.removeItem("cVs984vasd5481!daw^sa&54511akghH!x");
          window.location = "/login"
    },

  },
  mounted() {
      this.logout();
  },
}
</script>

<style>
</style>
