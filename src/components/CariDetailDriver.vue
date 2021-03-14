<template>
  <q-card>

    <q-toolbar class="col-8 bg-primary text-white">
      <q-toolbar-title>{{ details.driver_fullname }}</q-toolbar-title>

      <q-btn stretch flat label="EKSTRE" icon="content_paste" class="q-mr-lg" @click="ekstre"></q-btn>
      <q-btn stretch flat label="FİLTRE" icon="event_note" class="q-mr-lg">
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <q-input v-model="start_date" type="date" :max="end_date" input-class="text-center" color="primary" label="Başlama Tarihi" autofocus />
              <q-input v-model="end_date" type="date" :min="start_date" input-class="text-center" color="primary" label="Bitiş Tarihi" />
              <q-btn push color="primary" label="LİSTELE" @click="getDataAPI"></q-btn>
            </div>
          </div>
        </q-menu>
      </q-btn>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-grey-4 text-primary">Kapat</q-tooltip>
      </q-btn>
    </q-toolbar>

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
            <q-tr :props="props" :class="(props.row.cari_type == 2) ? 'bg-pink-1' : 'bg-green-1'">
              <q-td key="cari_created" :props="props" style="width: 150px">{{ props.row.tarih }}</q-td>
              <q-td key="hesap_text" :props="props">{{ props.row.hesap_text }}</q-td>
              <q-td key="aciklama" colspan="7" v-if="props.row.rez_id===null" style="text-align: center"><b>{{ props.row.aciklama }}</b></q-td>
              <q-td key="transfer_type_text" :props="props" v-if="props.row.rez_id!==null">{{ props.row.transfer_type_text }}</q-td>
              <q-td key="passenger_fullname" :props="props" v-if="props.row.rez_id!==null">{{ props.row.passenger_fullname }}</q-td>
              <q-td key="departure_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.departure_area_name }}</q-td>
              <q-td key="arrival_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.arrival_area_name }}</q-td>
              <q-td key="hotel_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.hotel_name }}</q-td>
              <q-td key="rez_id" :props="props" v-if="props.row.rez_id!==null">{{ props.row.rez_id }}</q-td>
              <q-td key="car_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.car_name }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-card-section>
    <q-card-section v-else>
      <div class="text-center fit">
        <h6 class="text-primary">Bu işletme ile alakalı cari bir işlem bulunmamaktadır.</h6>
        <div>
          <q-icon name="done" class="text-green" style="font-size: 4rem;" v-close-popup></q-icon>
          <div class="text-primary" style="font-size: 3rem;" v-close-popup> KAPAT </div>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>
  export default {
    name: 'CariDetailDriver',
    props:['details'],

    data() {
      return {
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
          rowsPerPage: 25,
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
        ],
        start_date: null,
        end_date: null,
      }
    },
    methods: {
      getDataAPI() {
        var account_balance = {
          driver_id: this.details.driver_id,
          start_date: this.start_date,
          end_date: this.end_date,
        }
        console.log(this.details)
        this.$axios.post('cari/driver', { account_balance } )
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
          }).catch((err) => {
        });
      },

      AddAccountAmount(){
        var add_balance = {
          cari_type: this.hesap.type,
          cari_tutar: this.price,
          hesap_id: this.hesap.id,
          hesap_text: this.hesap.name,
          aciklama: this.aciklama,
          hotel_id: this.details.hotel_id,
          user_id: this.details.user_id,
          rez_id: 0,
          created_user: this.CryptoJS.AES.decrypt(localStorage.getItem("cVs984vasd5481!daw^sa&54511akghH!x"), "Fatihhh").toString(this.CryptoJS.enc.Utf8)
        }
        this.$axios.post('cariler/create', { add_balance })
          .then((result) => {
            console.log(result.data);
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
              cari_updated : zz.updated,
              passenger_fullname : null
            }
            this.detay.push(data)
            this.TotalAmount()
            return true
          })
          .catch((err) => {
            console.log(err)
            return false
          });

      },
      changeDateFormat(tarih){
        var datearray = tarih.split("-");
        var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
        return newdate;
      },

      ekstre(){
        this.$router.push({name: 'ekstre', params: { details:this.detay }});
      }
    },
    computed: {
      pagesNumber() {
        return Math.ceil(this.details.length / this.pagination.rowsPerPage)
      },
      TotalAmount(){
        let total=0
        for (var i=0;i<this.detay.length;i++){
          if(this.detay[i].cari_tutar!==null){
            total=Math.ceil(parseInt(total) + parseInt(this.detay[i].cari_tutar))
          }
        }
        return total
      },
    },
    events: {},
    mounted() {
      this.getDataAPI();
    }
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
