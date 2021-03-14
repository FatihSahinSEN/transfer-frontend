<template>
  <q-toolbar>
    <q-avatar>
      <q-icon name="departure_board" color="primary"></q-icon>
    </q-avatar>

    <q-toolbar-title v-if="this.$q.platform.is.mobile" style="font-size: 1em"><span class="text-weight-bold">Transfer No </span> #{{ reservation }}</q-toolbar-title>
    <q-toolbar-title v-if="!this.$q.platform.is.mobile"><span class="text-weight-bold">Transfer No </span> #{{ reservation }}</q-toolbar-title>

    <q-btn flat round dense icon="edit" @click="edit" v-if="CheckRole('ReservationUpdate')">
      <q-tooltip content-class="bg-red" :offset="[10, 10]">
        Düzenle
      </q-tooltip>
    </q-btn>
    <q-btn flat round dense @click="whatsapp('',reservation)" v-if="CheckRole('ReservationWhatsapp')">
      <q-tooltip content-class="bg-red" :offset="[10, 10]">
        WhatsApp İle Gönder
      </q-tooltip>
      <q-img class="whatsapp" src="assets/whasapp.png" />
    </q-btn>
    <q-btn flat round dense icon="print"  @click="print" v-if="CheckRole('ReservationPrint')">
      <q-tooltip content-class="bg-red" :offset="[10, 10]">
        Yazdır
      </q-tooltip>
    </q-btn>
    <q-btn flat round dense icon="close" v-close-popup>
      <q-tooltip content-class="bg-red" :offset="[10, 10]">
        Kapat
      </q-tooltip>
    </q-btn>
  </q-toolbar>
</template>

<script>
    export default {
        name: "ReservationDetailToolbar",
        props:['reservation'],
        methods: {
            edit(){
              this.$emit('edited')
            },
            print(){
              this.$emit('printed')
            },
          whatsapp(evt,id){
            let url = 'https://api.whatsapp.com/send?phone=&abid=&text=https://www.gobyvip.com/voucher/' + window.btoa("Reservation:" + id + ":Number")
            window.open(url,"_blank")
          }
        }
    }
</script>
<style scoped>
  .whatsapp {
    height: 24px; max-width: 24px
  }
</style>
