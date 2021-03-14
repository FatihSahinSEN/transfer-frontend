<template>
  <tr style="width:100%" v-if="CheckRole('ReservationStatus')">
    <td class="baslik" style="">  DURUM </td>
    <td v-if="role==0">
      <div v-if="rez.transfer_status==1 || rez.transfer_status==2 || rez.transfer_status==4 || rez.transfer_status==5">
      <q-select
        emit-value
        dense
        options-dense
        style="width:140px"
        v-model="status"
        :options="status_options"
        :display-value="`${status ? status_options[parseInt(status)-1].name : 'SEÇİNİZ'}`"
        :color="`${status ? status_options[parseInt(status)-1].color : 'primary'}`"
        @input="ChangeReservationStatusAdmin"
        option-value="id"
        option-label="name"
      />
      </div>
      <q-badge v-else :color="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].color : 'black'}`"> {{ rez.transfer_status_text }}</q-badge>
    </td>
    <td v-else-if="role==1">
      <div v-if="status=='4' || status=='5' || status=='3' || rez.gecmis==0">
        <q-badge :color="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].color : 'black'}`"> {{ rez.transfer_status_text }}</q-badge>
      </div>
      <div v-else >
        <q-radio
          keep-color
          v-model="status"
          @input="ChangeReservationStatus"
          :color="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].color : 'black'}`"
          :val="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].id : '2'}`"
          :disable="status_disable"
          :label="rez.transfer_status_text"
        />
        <q-radio keep-color v-model="status" label="İptal" :disable="status_disable" val="5" color="red" @input="ChangeReservationStatus" />
      </div>
    </td>

  </tr>
  <tr v-else>
    <td><b>Transfer Durumu:</b></td>
    <td v-if="status=='4' || status=='5' || status=='3' || rez.gecmis==0">
      <div>
        <q-badge :color="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].color : 'black'}`"> {{ rez.transfer_status_text }}</q-badge>
      </div>
    </td>
    <td v-else>
      <div>
        <q-radio
          keep-color
          v-model="status"
          @input="ChangeReservationStatus"
          :color="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].color : 'black'}`"
          :val="`${rez.transfer_status ? status_options[parseInt(rez.transfer_status)-1].id : '2'}`"
          :disable="status_disable"
          :label="rez.transfer_status_text"
        />
        <q-radio keep-color v-model="status" label="İptal" :disable="status_disable" val="5" color="red" @input="ChangeReservationStatus" />
      </div>
    </td>
  </tr>
</template>

<script>
    export default {
      name: "ReservationDetailStatus",
      props:['role','rez'],
      data(){
        return {
          status:this.$props.rez.transfer_status,
          status_disable:false,
          status_options: [
            {
              index:1,
              id: "1",
              name: "Onaylandı",
              color: "cyan"
            },
            {
              index:2,
              id: "2",
              name: "Beklemede",
              color:"orange"
            },
            {
              index:3,
              id: "3",
              name: "Yapıldı",
              color:"green"
            },
            {
              index:4,
              id: "4",
              name: "İptal(Firma)",
              color:"red"
            }
            ,
            {
              index:5,
              id: "5",
              name: "İptal(Hotel)",
              color:"red"
            },
            {
              index:6,
              id: "6",
              name: "No Show",
              color:"pink"
            }],
        }
      },
      methods: {
        ChangeReservationStatus(evt,val){
          if(this.status!=val){
            this.$q.dialog({
              title: "UYARI",
              message: "Rezervasyonu İptal Etmek istediğinize Eminmisiniz? Rezervasyon İptal Edildiğinde geri alınamaz",
              persistent: true,
              ok: {
                label:"Evet",
                push: true,
                color: 'green'
              },
              cancel: {
                label:"Hayır",
                push: true,
                color: 'red'
              }
            }).onOk(() => {
              this.$q.loading.show()
              var transfer_status = {
                id:this.rez.id,
                transfer_status:this.status,
                reservation:this.rez
              }
              this.$axios.post('reservation/status/update', { transfer_status })
                .then((result) => {
                  this.$q.loading.hide()
                  this.status_disable=true
                  this.$emit('tableUpdate',this.status)
                })
                .catch((err) => {
                  this.$q.loading.hide()
                  this.alert("HATA", err);
                });

            }).onCancel(() => {
              this.status = this.rez.transfer_status
            })
          }
        },
        ChangeReservationStatusAdmin(val){
          this.$q.dialog({
            title: "UYARI",
            message: "Rezervasyonu Durumunu Değiştirmek istediğinizden Eminmisiniz?",
            persistent: true,
            ok: {
              label:"Evet",
              push: true,
              color: 'green'
            },
            cancel: {
              label:"Hayır",
              push: true,
              color: 'red'
            }
          }).onOk(() => {
            this.$q.loading.show()
            var transfer_status = {
              id:this.rez.id,
              transfer_status:this.status,
              reservation:this.rez
            }
            this.$axios.post('reservation/status/update', { transfer_status })
              .then((result) => {
                this.$emit('tableUpdate',this.status)
                if(this.status==3 || this.status==6){
                  this.AddNewCurrentAccount()
                }
                this.$q.loading.hide()
              })
              .catch((err) => {
                console.log(err)
                this.$q.loading.hide()
                this.alert("HATA",  "Hata algılandı.");
              });

          }).onCancel(() => {
            this.status = this.rez.transfer_status
          })
        },
        AddNewCurrentAccount(){
          var add_balance = {
            cari_type: 1,
            cari_tutar: this.rez.price,
            hesap_id: this.status,
            hesap_text: "Transfer Ücreti",
            hotel_id: this.rez.hotel_id,
            user_id: this.rez.user_id,
            rez_id: this.rez.id,
            created_user: this.rez.user.user_id
          }
          if(this.rez.user.user_is_hotel==0){ // Kullanıcı Yönetici İse
            if(this.rez.hotel_id!=0){ //Hotel Varsa hotel kullanıcısına yaz
              add_balance.user_id = -1
            }
          }
          this.$axios.post('cariler/create', { add_balance })
            .then((result) => {
              return true
            })
            .catch((err) => {
              console.log(err)
              return false
            });

        },
        alert (title, message) {
          this.$q.dialog({
            title: title,
            message: message,
            persistent: true
          })
        },
      }
    }
</script>

<style scoped>
  .baslik {
    font-weight: 800;
  }
</style>
