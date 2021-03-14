<template>
<div style="display: table-row-group" v-if="CheckRole('ReservationDriver')">
  <tr v-if="role=='0'">
    <td class="baslik" style="">
      <q-btn dense flat icon="save" label="Şöför Kaydet" @click="saveDriver" v-if="rez.transfer_status!=3 && rez.gecmis==1" />
      <p v-else>Şöför</p>
     </td>
    <td v-if="rez.transfer_status!=3 && rez.gecmis==1">
      <q-select
        dense
        options-dense
        use-input
        use-chips
        input-debounce="0"
        v-model="driverModel"
        color="primary"
        style="width: 250px"
        @input="ChangeDriver"
        @new-value="NewDriver"
        :options="drivers"
        option-value="id"
        option-label="fullname"
      >
        <template v-slot:selected-item="scope">
          <!-- Show scope for debugging: -->
          <!-- scope: {{scope}} -->
          <q-chip
            removable
            dense
            @remove="RemoveDriverNames"
            :tabindex="scope.tabindex"
            color="primary"

            text-color="white"
            v-if="scope.opt.fullname"
          >
                       <span >
                       {{ scope.opt.fullname }}
                         </span>
          </q-chip>
        </template>

      </q-select>
    </td>

    <td v-else>
      {{ driverModel.fullname }}
    </td>

  </tr>
  <tr v-if="driverModel.fullname && role=='0'">
    <td class="baslik">Plaka</td>
    <td>
      <q-input dense color="primary" v-model="driverModel.plaka" mask="34 XXXXXXXX" style="width:140px" v-if="rez.transfer_status!=3 && rez.gecmis==1"></q-input>
      <p v-else>{{ driverModel.plaka }}</p>
    </td>
  </tr>
  <tr v-if="driverModel.fullname && role=='0'">
    <td class="baslik">Şöför Tel</td>
    <td>

      <q-input dense color="primary" v-model="driverModel.gsm" mask="(###) ### - ####" style="width:140px"  v-if="rez.transfer_status!=3 && rez.gecmis==1" />

      <p v-else>{{ driverModel.gsm }}</p>

    </td>
  </tr>
</div>
</template>

<script>
    export default {
      name: "ReservationDetailDrivers",
      props:['rez','role','drivers'],
      data(){
        return {
          driverModel: {
            id: this.$props.rez.driver,
            fullname: this.$props.rez.driver_name,
            gsm: this.$props.rez.driver_phone,
            plaka: this.$props.rez.plaka,
          },
        }
      },
      methods: {
        saveDriver(){
          if(this.driverModel.id===null) {
            this.$q.dialog({
              title: "UYARI",
              message: "Yeni bir şöför oluşturmak istediğinize eminmisiniz?",
              persistent: true,
              ok: {
                label: "Evet",
                push: true,
                color: 'green'
              },
              cancel: {
                label: "Hayır",
                push: true,
                color: 'red'
              }
            }).onOk(() => {
              this.CreateNewDriver(this.driverModel)
              this.UpdateDriverDataForReservation()
            }).onCancel(() => {

            })
          }else if(this.driverModel.id == -1){
            this.$q.dialog({
              title: "UYARI",
              message: "Tanımlı şöför silinecektir onaylıyormunuz?",
              persistent: true,
              ok: {
                label: "Evet",
                push: true,
                color: 'green'
              },
              cancel: {
                label: "Hayır",
                push: true,
                color: 'red'
              }
            }).onOk(() => {
              this.UpdateDriverDataForReservation()
            })

          }else{
            this.$q.dialog({
              title: "UYARI",
              message: "Transfer'e ait Şöför bilgileri güncellenecektir onaylıyormusunuz",
              persistent: true,
              ok: {
                label: "Evet",
                push: true,
                color: 'green'
              },
              cancel: {
                label: "Hayır",
                push: true,
                color: 'red'
              }
            }).onOk(() => {
              this.UpdateDriverDataForReservation()
            })
          }
        },
        CreateNewDriver(user_detail){
          this.$axios.post('phones/create/fast', {user_detail})
            .then((result) => {
              this.$q.loading.hide()
              this.driverModel= {
                id: result.data.return.id,
                fullname: result.data.return.fullname,
                gsm: result.data.return.gsm,
                plaka: result.data.return.plaka,
              }
              this.$emit('NewDriverTransfer',this.driverModel)
            })
            .catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        },
        UpdateDriverDataForReservation(){
          this.$q.loading.show()
          var driver = {
            reservation_id :this.$props.rez.id,
            driver_id: this.driverModel.id,
            driver_name: this.driverModel.fullname,
            driver_phone: this.driverModel.gsm,
            plaka: this.driverModel.plaka
          }
          this.$axios.post('reservation/driver/update', { driver })
            .then((result) => {
              this.$q.loading.hide()
              this.ParentDriverUpdate()
            })
            .catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        },
        RemoveDriverNames(){
          this.driverModel = {
            id: -1,
            fullname: null,
            gsm: '',
            plaka: '',
          }
        },
        NewDriver(val, done){
          if (val.length > 2) {
            if (this.driverModel !== null) {
              var Mm = {
                id:null,
                fullname: val,
                gsm: null,
                plaka: null,
                status:0
              }
              this.$store.commit("newDrivers", Mm)
              this.driverModel=Mm
            }
          }

        },
        ChangeDriver(val){
          if(val!==null){

            this.ParentDriverUpdate()
          }else{
            this.RemoveDriverNames()
            return false
          }
        },
        ParentDriverUpdate(){
          this.$emit('driverUpdate',this.driverModel)
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
