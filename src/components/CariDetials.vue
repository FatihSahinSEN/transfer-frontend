<template>
  <div style="background: #fff">
  <q-card v-if="CheckRole('CariDetail')">
      <q-toolbar class="col-8 bg-primary text-white" v-if="details.user_status">
        <div style="width: 100%" v-if="mobile">
          <q-toolbar-title style="width: 100%;text-align: center">{{ details.user_fullname }} </q-toolbar-title>
          <q-separator inset />
          <q-btn stretch dense flat stack style="width: 20%" label="BORÇ" icon="add" class="bg-primary text-white" v-if="CheckRole('CariBorc')">
            <q-menu @before-show="hesap=borc_hesaplar[0]" ref="menu">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md text-center">Borç</div>
                  <q-input v-model="price" type="text" mask="#.##" fill-mask="0" prefix="+" suffix="₺" input-class="text-right" reverse-fill-mask color="primary" label="Miktar" autofocus />
                  <q-select
                    label="Hesap Seçiniz"
                    color="primary"
                    :options="borc_hesaplar"
                    option-label="name"
                    v-model="hesap"
                  ></q-select>
                  <q-input v-model="aciklama" color="primary" type="textarea" label="Açıklama"/>
                  <q-btn push color="primary" style="margin-top:25px" label="KAYDET" @click="AddAccountAmount"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn stretch dense flat stack style="width: 20%" label="ALACAK" icon="remove" class="bg-primary text-white"  v-if="CheckRole('CariAlacak')"  >
            <q-menu @before-show="hesap=alacak_hesaplar[0]" ref="menu">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md text-center">Alacak</div>
                  <q-input v-model="price" type="text" mask="#.##" fill-mask="0" suffix="₺" prefix="-" input-class="text-right" reverse-fill-mask color="primary" label="Miktar" autofocus />
                  <q-select
                    label="Hesap Seçiniz"
                    color="primary"
                    :options="alacak_hesaplar"
                    option-label="name"
                    v-model="hesap"
                  ></q-select>
                  <q-input v-model="aciklama" color="primary" type="textarea" label="Açıklama"/>
                  <q-btn push color="primary" style="margin-top:25px" label="KAYDET" @click="AddAccountAmount"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn stretch dense flat stack style="width: 20%" label="EKSTRE" icon="content_paste" class="" @click="ekstre" v-if="CheckRole('CariEkstre')"></q-btn>
          <q-btn stretch dense flat stack style="width: 20%" label="FİLTRE" icon="event_note" class="">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <q-toggle v-model="cari_iptaller.gecerli" checked-icon="check" label="Geçerli Cariler" unchecked-icon="clear" />
                  <q-toggle v-model="cari_iptaller.iptal" checked-icon="check" label="İptal Cariler" unchecked-icon="clear" />
                  <q-input v-model="start_date" type="date" :max="end_date" input-class="text-center" color="primary" label="Başlama Tarihi" autofocus @change="changeDate" />
                  <q-input v-model="end_date" type="date" :min="start_date" input-class="text-center" color="primary" label="Bitiş Tarihi" @change="changeDate" />
                  <q-btn push color="primary" label="LİSTELE" @click="getDataAPI"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn dense flat icon="close" style="width: 20%" stack label="KAPAT" v-close-popup>
            <q-tooltip content-class="bg-grey-4 text-primary">Kapat</q-tooltip>
          </q-btn>
        </div>
        <div v-else style="display: flex;width: 100%">
          <q-toolbar-title>{{ details.user_fullname }} </q-toolbar-title>
          <q-btn stretch flat label="BORÇ" icon="add" class="bg-primary text-white q-mr-lg" v-if="CheckRole('CariBorc')">
            <q-menu @before-show="hesap=borc_hesaplar[0]" ref="menu">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md text-center">Borç</div>
                  <q-input v-model="price" type="text" mask="#.##" fill-mask="0" prefix="+" suffix="₺" input-class="text-right" reverse-fill-mask color="primary" label="Miktar" autofocus />
                  <q-select
                    label="Hesap Seçiniz"
                    color="primary"
                    :options="borc_hesaplar"
                    option-label="name"
                    v-model="hesap"
                  ></q-select>
                  <q-input v-model="aciklama" color="primary" type="textarea" label="Açıklama"/>
                  <q-btn push color="primary" style="margin-top:25px" label="KAYDET" @click="AddAccountAmount"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn stretch flat label="ALACAK" icon="remove" class="bg-primary text-white q-mr-lg"  v-if="CheckRole('CariAlacak')"  >
            <q-menu @before-show="hesap=alacak_hesaplar[0]" ref="menu">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md text-center">Alacak</div>
                  <q-input v-model="price" type="text" mask="#.##" fill-mask="0" suffix="₺" prefix="-" input-class="text-right" reverse-fill-mask color="primary" label="Miktar" autofocus />
                  <q-select
                    label="Hesap Seçiniz"
                    color="primary"
                    :options="alacak_hesaplar"
                    option-label="name"
                    v-model="hesap"
                  ></q-select>
                  <q-input v-model="aciklama" color="primary" type="textarea" label="Açıklama"/>
                  <q-btn push color="primary" style="margin-top:25px" label="KAYDET" @click="AddAccountAmount"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn stretch flat label="EKSTRE" icon="content_paste" class="q-mr-lg" @click="ekstre" v-if="CheckRole('CariEkstre')"></q-btn>
          <q-btn stretch flat label="FİLTRE" icon="event_note" class="q-mr-lg">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <q-toggle v-model="cari_iptaller.gecerli" checked-icon="check" label="Geçerli Cariler" unchecked-icon="clear" />
                  <q-toggle v-model="cari_iptaller.iptal" checked-icon="check" label="İptal Cariler" unchecked-icon="clear" />
                  <q-input v-model="start_date" type="date" :max="end_date" input-class="text-center" color="primary" label="Başlama Tarihi" autofocus @change="changeDate" />
                  <q-input v-model="end_date" type="date" :min="start_date" input-class="text-center" color="primary" label="Bitiş Tarihi" @change="changeDate" />
                  <q-btn push color="primary" label="LİSTELE" @click="getDataAPI"></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-grey-4 text-primary">Kapat</q-tooltip>
          </q-btn>
        </div>

      </q-toolbar>
    <div class="q-pa-md row items-start q-gutter-md" v-else>
      <div class="text-h6 fit">Finans
        <q-btn stretch flat label="EKSTRE" icon="content_paste" class="q-mr-lg" @click="ekstre"></q-btn>
        <q-btn stretch flat label="FİLTRE" icon="event_note" class="q-mr-lg">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-input v-model="start_date" type="date" :max="end_date" input-class="text-center" color="primary" label="Başlama Tarihi" autofocus @change="changeDate" />
                <q-input v-model="end_date" type="date" :min="start_date" input-class="text-center" color="primary" label="Bitiş Tarihi" @change="changeDate" />
                <q-btn push color="primary" label="LİSTELE" @click="getDataAPI"></q-btn>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <q-separator inset />
    </div>
    <q-card-section v-if="detay.length>0">
        <div class="fit">
          <q-input
            filled
            rounded
            outlined
            dense
            color="black"
            label="Tabloda ara.."
            v-model="filter"
          >


            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-table
            title=""
            dense
            :data="detay"
            :columns="columns"
            row-key="cari_id"
            :pagination.sync="pagination"
            :filter="filter"
            no-data-label="Liste boş."
            no-results-label="Arama sonucu bulunamadı.."
          >
            <template v-slot:body="props">
              <q-tr :props="props" :class="SetColor(props.row.cari_type,props.row.cari_status)" :key="props.row.index" v-if="ShowCariStatus(props.row.cari_status)" @click="EditCari('',props.row)">
                <q-td key="cari_created" :props="props" style="width: 150px">{{ props.row.CurrentDate }}</q-td>
                <q-td key="hesap_text" :props="props">{{ props.row.hesap_text }}</q-td>
                <q-td key="aciklama" colspan="7" v-if="props.row.rez_id===null" style="text-align: center"><b>{{ props.row.aciklama }}</b></q-td>
                <q-td key="transfer_type_text" :props="props" v-if="props.row.rez_id!==null">{{ props.row.transfer_type_text }}</q-td>
                <q-td key="passenger_fullname" :props="props" v-if="props.row.rez_id!==null">{{ props.row.passenger_fullname }}</q-td>
                <q-td key="departure_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.departure_area_name.substr(0,20) }}</q-td>
                <q-td key="arrival_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.arrival_area_name.substr(0,20) }}</q-td>
                <q-td key="hotel_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.hotel_name }}</q-td>
                <q-td key="rez_id" :props="props" v-if="props.row.rez_id!==null">{{ props.row.rez_id }}</q-td>
                <q-td key="car_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.car_name }}</q-td>
                <q-td key="cari_tutar" :props="props">{{ props.row.cari_tutar }}</q-td>
              </q-tr>
            </template>
            <template v-slot:top-row>
              <q-tr>
                <q-td colspan="1" style="text-align: right;font-size: 1.3em;font-weight: 700">BORÇ : </q-td>
                <q-td style="font-size: 1.3em;font-weight: 700"> {{ totalValue }} ₺</q-td>
                <q-td colspan="1" style="text-align: right;font-size: 1.3em;font-weight: 700">ALACAK : </q-td>
                <q-td style="font-size: 1.3em;font-weight: 700"> {{ totalValue }} ₺</q-td>
                <q-td colspan="5" style="text-align: right;font-size: 1.3em;font-weight: 700">DEVİR : </q-td>
                <q-td style="font-size: 1.3em;font-weight: 700"> {{ totalValue }} ₺</q-td>

              </q-tr>
            </template>
            <template v-slot:bottom-row>
              <q-tr>
<!--                <q-td style="text-align: right;font-size: 1.3em;font-weight: 700">Tarih :</q-td>-->
<!--                <q-td style="font-size: 1.3em;font-weight: 700" v-text="changeDateFormat(start_date)"></q-td>-->
<!--                <q-td style="font-size: 1.3em;font-weight: 700" v-text="changeDateFormat(end_date)"></q-td>-->
<!--                <q-td colspan="5"></q-td>-->
                <q-td style="text-align: right;font-size: 1.3em;font-weight: 700">Toplam Borç :</q-td>
                <q-td style="font-size: 1.3em;font-weight: 700" v-text="changeDateFormat(start_date)"></q-td>
                <q-td style="text-align: right;font-size: 1.3em;font-weight: 700">Toplam Alacak</q-td>
                <q-td style="font-size: 1.3em;font-weight: 700" v-text="changeDateFormat(end_date)"></q-td>
                <q-td colspan="4"></q-td>
                <q-td style="text-align: right;font-size: 1.3em;font-weight: 700">Toplam : </q-td>
                <q-td style="font-size: 1.3em;font-weight: 700"> {{ totalValue }} ₺</q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
    </q-card-section>
  <q-card-section v-else>
      <div class="text-center fit" style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <h6>Seçili tarihler arasında kayıt bulunamadı.</h6>
        <div style="max-width: 200px;" class="center-block">
          <q-input v-model="start_date" type="date" :max="end_date" input-class="text-center" color="primary" label="Başlama Tarihi" autofocus @change="changeDate" />
          <q-input v-model="end_date" type="date" :min="start_date" input-class="text-center" color="primary" label="Bitiş Tarihi" @change="changeDate"  />
          <q-btn push color="primary" label="LİSTELE" @click="getDataAPI" style="margin-top: 15px"></q-btn>
        </div>
      </div>

  </q-card-section>

  </q-card>
    <q-dialog small ref="cariedit" @before-hide="CheckData">
      <q-card >
        <q-toolbar>
          <q-avatar>
            <q-icon name="departure_board" color="primary"></q-icon>
          </q-avatar>

          <q-toolbar-title style="font-size: 1em">Düzenle</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup>
            <q-tooltip content-class="bg-red" :offset="[10, 10]">
              Kapat
            </q-tooltip>
          </q-btn>
        </q-toolbar>
          <q-card-section>
            <q-input v-model="editData.cari_tutar" type="text" mask="#.##" suffix="₺" input-class="text-right" reverse-fill-mask color="primary" label="Miktar" autofocus />
            <q-input v-model="editData.aciklama" color="primary" type="textarea" label="Açıklama" v-if="editData.cari_rez_id==0"/>
            <q-btn push color="primary" style="margin-top:25px;width: 100%" icon="send" label="Voucher" @click="Voucher(editData.cari_rez_id)" v-if="editData.cari_rez_id!=0"></q-btn><br />
            <q-btn push color="red float-left" style="margin-top:25px;margin-bottom:25px;margin-right: 25px" label="Sil" icon="delete" @click="RemoveCari(editData)"></q-btn>
            <q-btn push color="primary float-right" style="margin-top:25px" icon="save" label="KAYDET" @click="UpdateCari(editData)"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
    export default {
    name: 'CariDetail',
    props:['details'],

    data() {
      return {
        mobile:this.$q.platform.is.mobile,
        editData: {
          cari_tutar:0,
        },
        OldData:null,
        filter: '',
        cariler:[],
        detay:[],
        price:null,
        aciklama:null,
        hesap:{
          id:1,
          name:"Nakit",
          type:1
        },
        alacak_hesaplar:[
          {
            id:1,
            name:"Nakit",
            type:2
          },{
            id:2,
            name:"Kredi Kartı",
            type:2
          },

        ],
        borc_hesaplar:[
          {
            id:3,
            name:"Transfer Ücreti",
            type:1
          },

        ],
        pagination: {
          sortBy: 'cari_created',
          descending: true,
          page: 1,
          rowsPerPage: 0,
          list: [5, 10, 15, 20, 30, 40, 50, 100, 500]
          // rowsNumber: xx if getting data from a server
        },

        columns: [
          { name: 'cari_created',label: 'Tarih Saat', field: 'cari_created', align: 'left',sortable: true},
          { name: 'hesap_text', label: 'İşlem', field: 'hesap_text', align: 'left',sortable: true},
          { name: 'transfer_type_text', label: 'Tip', field: 'transfer_type_text', align: 'left'},
          { name: 'passenger_fullname', label: 'Ad Soyad', field: 'passenger_fullname', align: 'left'},
          { name: 'departure_area_name', label: 'Nereden', field: 'departure_area_name', align: 'left'},
          { name: 'arrival_area_name', label: 'Nereye', field: 'arrival_area_name', align: 'left'},
          { name: 'hotel_name', label: 'Hotel', field: 'hotel_name', align: 'left'},
          { name: 'rez_id', label: 'Rez NO', field: 'rez_id', align: 'left'},
          { name: 'car_name', label: 'Araç', field: 'car_name', align: 'left'},
          { name: 'cari_tutar', label: 'Bakiye', field: 'cari_tutar', align: 'left',sortable: true},
        ],
        start_date: null,
        end_date: null,
        total_price:0,
        cari_iptaller: {
          iptal: false,
          gecerli: true
        },
        topla:[],
        OldPrice:0
      }
    },
    methods: {
      changeDate(){
        window.sessionStorage.setItem("CariStartDate",this.start_date)
        window.sessionStorage.setItem("CariEndDate",this.end_date)
      },
      EditCari(event,row){
        if(this.CheckRole('CariBorc')==false) {
            return false
        }
        this.editData = row
        this.OldPrice = row.cari_tutar
        this.$refs.cariedit.show()
      },
      CheckData(){

      },
      ShowCariStatus(val){
        if(val==1) {
          return this.cari_iptaller.gecerli
        }
        if(val==0) {
          return this.cari_iptaller.iptal
        }
      },
      SetColor(type,status){
        if(status==0) return "bg-pink-1";
        if(type==2) {
          return "bg-yellow-1";
        } else{
          return "bg-blue-1";
        }
      },
      UpdateCari(row){
        this.$q.dialog({
          title: "UYARI",
          message: "Cari'yi Güncellemek istediğinize Eminmisiniz?",
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
          var cari_status = {
            id:row.cari_id,
            aciklama:row.aciklama,
            cari_tutar:row.cari_tutar,
          }
          console.log(row)
          this.$axios.post('cari/edit', { cari_status })
            .then((result) => {
              this.$q.loading.hide()
              this.UpdateParentData(3,row.cari_tutar)
              this.$refs.cariedit.hide()
            })
            .catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });

        }).onCancel(() => {
         return false
        })

      },
      Voucher(row){
        var id=row
        let url = 'voucher/' + window.btoa("Reservation:" + id + ":Number")
        window.open(url,"_blank")
      },
      RemoveCari(row){
        this.$q.dialog({
          title: "UYARI",
          message: "Cari'yi Silmek istediğinize Eminmisiniz?",
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
          var cari_status = {
            id:row.cari_id,
            status:0,
          }
          this.$axios.post('cari/remove', { cari_status })
            .then((result) => {
              this.$q.loading.hide()
              this.UpdateParentData(4,row.cari_tutar)
              var data = this.detay.findIndex((item) => item.cari_id==row.cari_id);
              this.detay.splice(data,1)//Delete Array data
              this.$refs.cariedit.hide()
            })
            .catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });

        }).onCancel(() => {
         return false
        })

      },
      getDataAPI() {

        var account_balance = {
            user_id: this.details.user_id,
            start_date: this.start_date,
            end_date: this.end_date,
        }
        this.$axios.post('cari/account', { account_balance } )
          .then((result) => {
            this.detay=[]
            this.start_date=result.data.return.date.start_date
            this.end_date=result.data.return.date.end_date
            Object.entries(result.data.return).forEach(entry => {
              const [key, value] = entry;
              if (key != "status" && key != "date") {
                this.detay.push(value)
              }
            });
            this.TotalAmount()
          }).catch((err) => {
            this.CheckToken()
          });
      },
      AddAccountAmount(){
        if(this.price<1){
          this.alert("Uyarı","Lütfen ücret giriniz..")
          return false
        }
        var add_balance = {
          cari_type: this.hesap.type,
          cari_tutar: this.price,
          hesap_id: this.hesap.id,
          hesap_text: this.hesap.name,
          aciklama: this.aciklama,
          hotel_id: this.details.hotel_id,
          user_id: this.details.user_id,
          rez_id: 0,
          status:1,
          created_user: this.CryptoJS.AES.decrypt(sessionStorage.getItem("cVs984vasd5481!daw^sa&54511akghH!x"), "Fatihhh").toString(this.CryptoJS.enc.Utf8)
        }
        this.$axios.post('cariler/create', { add_balance })
          .then((result) => {
            // console.log(result.data);
            this.$refs.menu.hide()
            this.price = null
            this.aciklama = null
            var zz = result.data.return
            var data ={
              rez_id : null,
              transfer_type : null,
              transfer_direction : null,
              departure_area_name : null,
              arrival_area_name : null,
              hotel_name : null,
              car_name : null,
              passenger_size : null,
              departure_date : null,
              reservation_user_id : null,
              aciklama : zz.aciklama,
              cari_type : zz.cari_type,
              cari_tutar : zz.cari_tutar,
              hesap_id : zz.hesap_id,
              hesap_text : zz.hesap_text,
              cari_id : zz.id,
              cari_user_id : zz.user_id,
              cari_hotel_id : zz.hotel_id,
              cari_rez_id : zz.rez_id,
              cari_created_user : zz.created_user,
              cari_created : zz.created,
              cari_status : 1,
              tarih : zz.tarih,
              cari_updated : zz.updated,
              passenger_fullname : null
            }
            this.detay.push(data)
            this.UpdateParentData(this.hesap.type,add_balance.cari_tutar)
            return true
          })
          .catch((err) => {
            console.log(err)
            return false
          });

      },
      UpdateParentData(type,balance){
        let cariler=this.$store.state.CariList
        console.log("Type: ", type)
        let TotalIndex=cariler.findIndex(item => (item.user_id==this.details.user_id))
        var current=cariler[TotalIndex]
        if(type==1){        // Borç
          var current_balance = parseFloat(current.current_balance) + parseFloat(balance)
        }else if(type==2){  // Alacak
          var current_balance = parseFloat(current.current_balance) - parseFloat(balance)
        }else if(type==3){  //Update
          if(this.OldPrice>balance){
            var fark=this.OldPrice - balance
            var current_balance = parseFloat(current.current_balance) - parseFloat(fark)
          }else{
            var fark=this.OldPrice - balance
            var current_balance = parseFloat(current.current_balance) + parseFloat(fark)
          }
        }else if(type==4){
          var current_balance = parseFloat(current.current_balance) - parseFloat(balance)
        }
        cariler[TotalIndex].current_balance=current_balance.toFixed(2)
        this.$store.commit("setCariList",cariler)
        return true
      },
      changeDateFormat(tarih){
        var datearray = tarih.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
        return newdate;
      },
      ekstre(){
        this.$router.push({name: 'ekstre', params: { details:this.detay,start_date:this.start_date,end_date:this.end_date,user_fullname:this.details.user_fullname }});
      },
      alert (title, message) {
        this.$q.dialog({
          title: title,
          message: message,
          persistent: true
        })
      },
    },
    computed: {
      pagesNumber() {
        return Math.ceil(this.details.length / this.pagination.rowsPerPage)
      },
      totalValue() {
        var sum = 0;
        this.detay.forEach(e => {
          if(e.cari_status==1 && this.cari_iptaller.gecerli) {
            sum += parseInt(e.cari_tutar);
          }
          if(e.cari_status==0 && this.cari_iptaller.iptal) {
            sum += parseInt(e.cari_tutar);
          }
        });
        return sum
      }

      },
    mounted() {
      if(window.sessionStorage.hasOwnProperty("CariStartDate")){
        this.start_date=window.sessionStorage.getItem("CariStartDate")
        this.end_date=window.sessionStorage.getItem("CariEndDate")
      }
      this.getDataAPI();

    },
    }
</script>
<style>
  .FilterInput {
    text-align: center;
    font-size: 1.3em;
    padding: 0;
    margin: 0px;
    width: 7em;
  }

  .ReservationText {
    background-color: #dd3933;
    color: #ffffff;
    font-size: 1.4em;
    text-align: center;
  }
</style>
