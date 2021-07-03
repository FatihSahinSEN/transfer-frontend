<template>

    <q-card style="width:800px">
    <reservation-detail-toolbar
        :reservation="rez.id"
        @edited="editReservation"
        @printed="yazdir('',rez)"
    />
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 80vh;"
        v-if="Yukseklik<755"
      >
        <q-card-section>
          <table style="width:100%;" class="text-center">
            <reservation-detail-status
              :role="role"
              :rez="rez"
              @tableUpdate="ParentStatusUpdate"
            />
            <reservation-detail-drivers
              :role="role"
              :rez="rez"
              :drivers="drivers"
              @driverUpdate="ParentDriverUpdate"
            />
          </table>
          <detail-table :veri="rez" :EskiVeri="oldData" />


        </q-card-section>
      </q-scroll-area>

        <q-card-section v-else>
          <table style="width:100%;" class="text-center">
            <reservation-detail-status
              :role="role"
              :rez="rez"
              @tableUpdate="ParentStatusUpdate"
            />
            <reservation-detail-drivers
              :role="role"
              :rez="rez"
              :drivers="drivers"
              @driverUpdate="ParentDriverUpdate"
            />
          </table>
          <detail-table :veri="rez" :EskiVeri="oldData" />
        </q-card-section>
    </q-card>
</template>
<script>
  import TransferDetailTable from 'components/TransferDetailTable.vue'
  import VueCryptojs from  'vue-cryptojs'
  import ReservationDetailToolbar from "components/ReservationDetailToolbar";
  import ReservationDetailStatus from "components/ReservationDetailStatus";
  import ReservationDetailDrivers from "components/ReservationDetailDrivers";

  export default {
    name: "ReservationDetail",
    props: {
      rd: {
        type: Object,
        required: true
      },
      drivers: {
        type: Array,
        required: true
      },
      oldData:{
        type: Object,
        required: false
      }
    },
    components: {
      ReservationDetailDrivers,
      ReservationDetailStatus,
      ReservationDetailToolbar,
      "detail-table":TransferDetailTable,
    },

    data() {
        return {
            oldveri:this.$props.oldData,
            rez:this.$props.rd,
            role: this.CryptoJS.AES.decrypt(sessionStorage.getItem("Klamskwjn123LSkl2^a!awds++123dawd1"), "Fatihhh").toString(this.CryptoJS.enc.Utf8),
          thumbStyle: {
            right: '4px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
          },
          Yukseklik: window.innerHeight,
          barStyle: {
            right: '2px',
            borderRadius: '9px',
            backgroundColor: '#027be3',
            width: '9px',
            opacity: 0.2
          }
        }

    },
    methods: {
      editReservation(){
        if(this.rez.transfer_status!=3){
          if(this.rez.gecmis==1 && this.role!=0){
            if(this.rez.editable==0 && this.role!=0){
              this.alert("Uyarı","Rezervasyon Yapılmasına 30 dakika'dan az bir süre kaldığı için düzenlenemez. Lütfen telefon ile iletişime geçiniz.")
            }else{
              this.$router.push({ name: "ReservationEdit" , params: { reservation:this.rez }})
            }
          }else{
            if(this.role==0){
              this.$router.push({ name: "ReservationEdit" , params: { reservation:this.rez }})
            }else{
              this.alert("Uyarı","Rezervasyon Tarihi geçtiği için düzenlenemez. Lütfen telefon ile iletişime geçiniz.")
            }
          }
        }else{
          if(this.role==0){
            this.alert("Uyarı","Bu rezervasyon yapıldı olarak işaretlenmiş Yapacağınız değişiklikler CARI üzerinde geçerli olmayacak.\n\n Değişikliklerden sonra Rezervasyon Durumu beklemede olacak.")
            this.$router.push({ name: "ReservationEdit" , params: { reservation:this.rez }})
          }else{
            this.alert("Uyarı","Gerçekleşen Rezervasyonlar düzenlenemez.")
          }
        }
      },
      editReservation_old(){
        if(this.rez.gecmis==1){
          if(this.rez.editable==0){
            this.alert("Uyarı","Rezervasyon Yapılmasına 30 dakika'dan az bir süre kaldığı için düzenlenemez. Lütfen telefon ile iletişime geçiniz.")
          }else{
            // this.alert("Uyarı","Yapım aşamasında")
            this.$router.push({ name: "ReservationEdit" , params: { reservation:this.rez }})
          }
        }else{
          this.alert("Uyarı","Rezervasyon Tarihi Geçtiği için düzenleme yapılamaz..")
        }
      },

      yazdir(evt,row,data){
        var id=row.id
        let url = 'voucher/' + window.btoa("Reservation:" + id + ":Number")
        window.open(url,"_blank")
      },


      ParentStatusUpdate(val){
        this.$emit('UpdateStatusTransfer',val)
      },
      ParentDriverUpdate(val){
        this.$emit('UpdateDriverTransfer',val)
      },
      alert (title, message) {
      this.$q.dialog({
          title: title,
          message: message,
          persistent: true
      })
      },
    },
    mounted() {
        this.role=this.CryptoJS.AES.decrypt(sessionStorage.getItem("Klamskwjn123LSkl2^a!awds++123dawd1"),"Fatihhh").toString(this.CryptoJS.enc.Utf8)
    },
};

</script>

