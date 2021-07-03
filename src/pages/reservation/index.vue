<template>
  <div class="arka" v-if="CheckRole('ReservationList')" :style="ArkaPlan">
    <div class="q-pa-md row items-start q-gutter-md">
      <div class="text-h6 fit">Rezervasyonlar
          <q-icon name="fact_check" class="text-primary" style="font-size: 2em;">
        <q-menu ref="menu">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <q-toggle v-model="durum.onaylandi" checked-icon="check" label="Onaylandı" unchecked-icon="clear" />
            <q-toggle v-model="durum.beklemede" checked-icon="check" label="Beklemede" unchecked-icon="clear" />
            <q-toggle v-model="durum.gerceklesti" checked-icon="check" label="Gerçekleşti/Yapıldı" unchecked-icon="clear" />
            <q-toggle v-model="durum.iptal" checked-icon="check" label="İptal" unchecked-icon="clear" />
            <q-toggle v-model="durum.noshow" checked-icon="check" label="No Show" unchecked-icon="clear" />
            <q-separator />
            <q-input dense v-model="FilterDate" type="date" label="Tarih" mask="##.##.####" class="text-center" style="margin-top: 10px" />

            <q-separator />
            <q-toggle v-model="autorefresh_status" checked-icon="check" label="Otomatik Güncelleme" unchecked-icon="clear" @input="autoRefreshData" />
            <q-select
              dense
              options-dense
              emit-value
              v-model="autorefresh_model"
              label="Yenileme Süresi"
              :options="autorefresh"
              option-label="name"
              option-value="id"
              v-show="autorefresh_status"
              @input="autoRefreshData"
              :display-value="`${autorefresh_model ? autorefresh.find(item => item.id==autorefresh_model).name : 'Süre belirtin'}`"
            />

          <q-btn label="KAYDET" color="primary" @click="getDataAPI(true)" style="margin-top: 10px"></q-btn>
          </div>
        </div>
        </q-menu>
          </q-icon>
        <q-icon name="refresh" v-if="refresh" class="text-primary" style="font-size: 2em;" @click="getDataUpdate" />
      </div>
      <q-separator inset/>
      <div class="fit">
        <div class="doc-note doc-note--tip" v-for="not in notices">
          <p class="doc-note__title">{{ not.title }} <q-btn rounded dense flat icon="close" class="float-right" @click="CloseNotice(not)" /></p>
          <p> {{ not.description }}</p>
        </div>
      </div>
      <div class="fit">
        <table-header-search  />
        <q-table
          title=""
          dense
          :data="rezervasyon"
          :columns="columns"
          :pagination.sync="pagens"
          :filter="filter"
          :filter-method="filtod"
          row-key="id"
          :loading="loading"
          no-data-label="Liste boş."
          no-results-label="Arama sonucu bulunamadı.."
          :grid="grid"
          :hide-header="grid"
        >
          <template v-slot:item="props" v-if="grid">
            <reservation-grid :veri="props" :columns="columns" v-if="ShowTransferStatus(props.row.transfer_status)" :renk="RowColors(props.row.departure_date)" @edited="TransferDetail('',props.row)" wdth="3" roles="UserUpdate"/>
          </template>
          <template v-slot:body="props" v-else>
            <q-tr :props="props" @click="TransferDetail('',props.row,props.rowIndex)" v-if="ShowTransferStatus(props.row.transfer_status)" :style="RowColors(props.row.departure_date)">
              <q-td key="id" :props="props" v-if="props.row.update_id > 0">
                #{{ props.row.id }} <q-icon name="history" style="font-size: 1.2em" /> <q-tooltip content-style="font-size:1.2em;">#{{ props.row.update_id }} -> #{{ props.row.id }}</q-tooltip>
              </q-td>
              <q-td key="id" :props="props" v-else>
                #{{ props.row.id }}
              </q-td>
              <q-td key="hotel_name" :props="props" v-if="width<1599">
                <b>{{ props.row.hotel_name.substr(0,15) }}</b>
              </q-td>
              <q-td key="hotel_name" :props="props" v-else>
                <b>{{ props.row.hotel_name }}</b>
              </q-td>
              <q-td key="transfer_status_text" :props="props" v-if="props.row.transfer_status=='1'">
                <q-badge style="background-color:#1976D2;color:#fff">
                  {{ props.row.transfer_status_text }}
                </q-badge>
              </q-td>
              <q-td key="transfer_status_text" :props="props" v-else-if="props.row.transfer_status=='2'">
                <q-badge style="background-color:#F2FD02;color:#000">
                  {{ props.row.transfer_status_text }}
                </q-badge>
              </q-td>
              <q-td key="transfer_status_text" :props="props" v-else-if="props.row.transfer_status==='3'">
                <q-badge style="background-color:#4DF718;color:#000">
                  Yapıldı
                </q-badge>
              </q-td>
              <q-td key="transfer_status_text" :props="props" v-else-if="props.row.transfer_status=='4' ||props.row.transfer_status=='5'">
                <q-badge style="background-color:#FF0000;color:#fff">
                  {{ props.row.transfer_status_text }}
                </q-badge>

              </q-td>

              <q-td key="transfer_status_text" :props="props" v-else-if="props.row.transfer_status==='6'">
                <q-badge style="background-color:#b477d2;color:#fff">
                  {{ props.row.transfer_status_text }}
                </q-badge>
              </q-td>
              <q-td key="departure_date" :props="props">
                {{ props.row.tarih }}
              </q-td>
              <q-td key="flight_or_room" :props="props">
                {{ props.row.flight_or_room.substr(0,6) }}
              </q-td>
              <q-td key="transfer_type_text" :props="props">
                {{ props.row.transfer_type_text }}
              </q-td>
              <q-td key="departure_area_name" :props="props">
                <q-tooltip v-if="width<1599">{{ props.row.departure_area_name }}</q-tooltip>
                {{ TableSubstr(props.row.departure_area_name) }}
              </q-td>
              <q-td key="arrival_area_name" :props="props">
                <q-tooltip v-if="width<1599">{{ props.row.arrival_area_name }}</q-tooltip>
                {{ TableSubstr(props.row.arrival_area_name) }}
              </q-td>
              <q-td key="passengers_name" :props="props">
                <q-tooltip v-if="width<1599">{{ props.row.passengers_name }}</q-tooltip>
                {{ TableSubstr(PassengerSplit(props.row.passengers_name)) }}
              </q-td>
              <q-td key="passenger_size" :props="props">
                {{ props.row.passenger_size }}
              </q-td>
              <q-td key="car_name" :props="props">
                {{ props.row.car_name }}
              </q-td>
              <q-td key="plaka" :props="props">
                {{ props.row.plaka }}
              </q-td>
              <q-td key="driver_name" :props="props">
                {{ DriverSplit(props.row.driver_name) }}
              </q-td>
              <q-td key="ucret" :props="props" v-if="CheckRole('ReservationPrice')">
                {{ props.row.ucret }}
              </q-td>
              <q-td key="ucret" :props="props" v-else>
                -
              </q-td>
            </q-tr>
          </template>
          <template v-slot:bottom-row>
          <q-tr>
            <q-td colspan="12"><b>Transfer:</b> {{ totalValue.count }}</q-td>
            <q-td colspan="1"><b>Toplam</b></q-td>
            <q-td colspan="1"> {{ priceFormat.format(totalValue.price) }}</q-td>
          </q-tr>
          </template>
          <template v-slot:bottom>
          </template>
        </q-table>
        <q-dialog maximized ref="reservationdetail" v-if="this.$q.platform.is.mobile">
          <reservation-detail :rd="detialData" :drivers="drivers" :oldData="oldData"
                              v-on:UpdateStatusTransfer="UpdateStatusTransfer"
                              v-on:UpdateDriverTransfer="UpdateDriverTransfer"
          />
        </q-dialog>
        <q-dialog medium ref="reservationdetail" v-else>
          <reservation-detail :rd="detialData" :drivers="drivers" :oldData="oldData"
                              v-on:UpdateStatusTransfer="UpdateStatusTransfer"
                              v-on:UpdateDriverTransfer="UpdateDriverTransfer"
          />
        </q-dialog>
      </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="fit">

    </div>
  </div>

  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Transfer Yönetim Sistemine hoşgeldiniz.</h6>
  </div>
</template>

<script>

  import ReservationDetail from 'components/ReservationDetail.vue'
  import {mapState,mapGetters} from "vuex";
  import TableFooter from "components/table/table-footer";
  import TableHeaderSearch from "components/table/table-header-search";
  import TableGrid from "components/table/table-grid";
  import ReservationGrid from "components/table/reservation-grid";
  export default {
    name: 'reservationList',
    components: {ReservationGrid, "reservation-detail": ReservationDetail,TableFooter, TableHeaderSearch,TableGrid},
    data() {
      return {
        ArkaPlan:"background-image: url(/assets/upload/" +  this.$store.state.parameters.SYSTEM_BACKGROUND_PHOTO +");",
        oldData:null,
        priceFormat: new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'try',
          currencyDisplay:'symbol'
        }),
        width:window.innerWidth,
        search:'',
        detialData: Object,
        rezIndex: null,
        loading: false,
        drivers:this.$store.state.drivers,
        row: null,
        tarih: null,
        notices: this.$store.state.notice,
        FilterDate: this.$store.state.reservationDate,
        rezervasyon: this.$store.state.reservationList,
        selected:null,
        pagens: {
          sortBy: "departure_date",
          descending: false,
          page: 1,
          rowsPerPage: 0
        },
        columns: [
          {name: 'id', label: 'RezNO', field: 'id', align: 'left'},
          {name: 'hotel_name', label: 'Hotel', field: 'hotel_name', align: 'left'},
          {name: 'transfer_status_text', label: 'Durum', field: 'transfer_status_text', align: 'left'},
          {name: 'departure_date', label: 'Tarih Saat', field: 'departure_date', align: 'left', sortable: true},
          {name: 'flight_or_room', label: 'Uçuş/Oda No', field: 'flight_or_room', align: 'left'},
          {name: 'transfer_type_text', label: 'Transfer Tipi', field: 'transfer_type_text', align: 'left'},
          {name: 'departure_area_name', label: 'Nereden', field: 'departure_area_name', align: 'left'},
          {name: 'arrival_area_name', label: 'Nereye', field: 'arrival_area_name', align: 'left',},
          {name: 'passengers_name', label: 'Yolcu', field: 'passengers_name', align: 'left',},
          {name: 'passenger_size', label: 'Kişi', field: 'passenger_size', align: 'left',},
          {name: 'car_name', label: 'Araç', field: 'car_name', align: 'left',},
          {name: 'plaka', label: 'Plaka', field: 'plaka', align: 'left',},
          {name: 'driver_name', label: 'Şöför', field: 'driver_name', align: 'left',},
          {name: 'ucret', label: 'Ücret', field: 'ucret', align: 'left',},
        ],
        veri: [],
        data: [],
        durum: {
          beklemede : true,
          onaylandi : true,
          gerceklesti : false,
          iptal : false,
          noshow : false,
        },
        autorefresh: [
          {
            id:0,
            name: "Süre Belirtin"
          },
          {
            id: 1,
            name: "1 Dakika",
          },
          {
            id: 5,
            name: "5 Dakika",
          },
          {
            id: 10,
            name: "10 Dakika",
          },
          {
            id: 15,
            name: "15 Dakika",
          },
          {
            id: 20,
            name: "20 Dakika",
          },
          {
            id: 25,
            name: "25 Dakika",
          },
          {
            id: 30,
            name: "30 Dakika",
          }
        ],
        autorefresh_status:false,
        autorefresh_model:0,
        refresh:true
      }
    },
    methods: {
        CloseNotice(row){
          var search=this.notices.find(notice => notice.id == row.id)
          this.notices.splice(search,1)
          this.$store.commit('setNotice',this.notices)
          return this.notices
        },
        filtod(rows, terms, cols, cellValue){
          const lowerTerms = terms ? terms.toLowerCase() : ''
          return rows.filter(
            row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
          )
        },
        RowColors(tarih){
        var rezDate= new Date(tarih)
        var simdi=new Date()
        if(this.UnixDateDiff(rezDate,simdi)<0){
            var color = 'background-color: #f1dbdb'
        }else if(this.UnixDateDiff(rezDate,simdi)<1){
          var color = 'background-color: #c1f5c1'
        }else if(this.UnixDateDiff(rezDate,simdi)<2){
          var color = 'background-color: #feffe0'
        }else if(this.UnixDateDiff(rezDate,simdi)<3){
          var color = 'background-color: #b4e4f5'
        }else{
          var color = 'background-color: #ffffff'
        }
        return color

      },
      UnixDateDiff(t1,t2){
        var tarih1 = Math.round(t1 / 1000)
        var tarih2 = Math.round(t2 / 1000)
        var fark = tarih1 - tarih2
        var sonuc =fark/60/60/24
        return sonuc
      },
      TableSubstr(str){
        var width=window.innerWidth
        if(width<1599){
          return str.substr(0,15) + "..."
        }else{
          return str.substr(0,45)
        }

      },
      PassengerSplit(names){
          return names.split(',')[0]
      },
      DriverSplit(names){
          var spaceSearch = names.indexOf(' ')
          if(spaceSearch>0){
            return names.substr(0,spaceSearch+2) + "."
          }

      },
      GetTotalDays(firstDate, lastDate) {
        return Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24));
      },
      playSound () {
          var audio = new Audio("https://www.gobyvip.com/assets/notify.mp3");
          audio.play();
      },
      autoRefreshData(){
        if(this.autorefresh_status && this.autorefresh_model>0){
          var time = this.MinToMls(this.autorefresh_model)
          clearInterval(this.$store.state.ReservationRefresh)
          this.$store.state.ReservationRefresh=false
          localStorage.setItem("autorefresh", this.autorefresh_status);
          localStorage.setItem("autorefreshtime", this.autorefresh_model);
          this.$store.state.ReservationRefresh = setInterval( () => {
            this.getDataUpdate()
          }, time)

        }else{
          clearInterval(this.$store.state.ReservationRefresh)
          this.$store.state.ReservationRefresh=false
          localStorage.setItem("autorefresh", false);
          localStorage.setItem("autorefreshtime", 0);
        }
      },
      getDataUpdate(){
        this.refresh=false
        var ss=this.$store.state.reservationLastUpdate
        var filter={ FilterDate : ss }
        if (this.CheckRole('ReservationListAll')) {
          filter.ListType = 1
        } else {
          filter.ListType = 2
        }
        this.$q.notify({
          spinner: true,
          color: 'primary',
          message: 'Rezervasyonlar güncelleniyor....',
          timeout: 3000
        })
        this.$axios.post("/list", {filter})
          .then((result) => {
            if(result.data.return.rezervasyon.length>0){
              Object.entries(result.data.return.rezervasyon).forEach(entry => {
                const [key, value] = entry;
                if (key != "status") {
                  this.rezervasyon.push(value)
                  var title=value.departure_area_name + " > " + value.arrival_area_name
                  var caption=value.hotel_name + " : #" + value.id
                  this.$q.notify({
                    position:"top-right",
                    icon: 'airport_shuttle',
                    color: 'green-7',
                    message: title,
                    caption: caption,
                    timeout: 5000
                  })
                }
              });
              var lastInsert = this.rezervasyon[this.rezervasyon.length - 1].created
              this.$store.commit("setReservationLastUpdate", lastInsert)
              this.$store.commit("setReservationList", this.rezervasyon)
              this.playSound()


            }
            this.refresh=true
          }).catch((err) => {
          this.refresh=true
        });
      },
      CheckReservationStatusTimer(){
        if(!this.$store.state.StatusRefresh) {
          this.$store.state.StatusRefresh=true
          this.$store.state.StatusTimer=false
          clearInterval(this.$store.state.StatusTimer)
          this.$store.state.StatusTimer = setInterval(() => {
            this.CheckReservationStatus()
          },70000)
        }
      },
      CheckReservationStatus(){
        var ss=this.$store.state.reservationLastUpdate
        var filter={ FilterDate : ss }
        if (this.CheckRole('ReservationListAll')) {
          filter.ListType = 1
        } else {
          filter.ListType = 2
        }
        this.$axios.post("/status", {filter})
          .then((result) => {
            var vv=this.rezervasyon
            if(result.data.return.rezervasyon.length>0){
              Object.entries(result.data.return.rezervasyon).forEach(entry => {
                const [key, value] = entry;
                if (key != "status") {
                  var ff = vv.findIndex(item => {
                    if(item.id == value.id) {
                      return value
                    }
                  })
                  vv.splice(ff,1)
                  vv.splice(ff,0,value)
                }
              });
              this.$store.commit("setReservationList", vv)
            }
          }).catch((err) => {
            console.log(err)
        });
      },
      MinToMls( minutes ) {
        var saniye = parseInt( minutes * 60 ); // Saniye buluyoruz.
        var milisaniye = saniye * 1000;
        return parseInt(Math.floor(milisaniye))
      },
      UpdateDriverTransfer(val){
        this.rezervasyon[this.rezIndex].driver_name = val.fullname
        this.rezervasyon[this.rezIndex].plaka = val.plaka
        this.rezervasyon[this.rezIndex].driver_id = val.id
        this.rezervasyon[this.rezIndex].driver_phone = val.gsm
      },
      changePaginationTransfer(){

      },
      NewDriverTransfer(val){
        this.$store.commit("newDrivers", val)
      },
      UpdateStatusTransfer(val) {
        if (val == 1) {
          var stext = "Onaylandı"
        } else if (val == 2) {
          var stext = "Beklemede"
        } else if (val == 3) {
          var stext = "Gerçekleşti/Yapıldı"
        } else if (val == 4) {
          var stext = "İptal(Firma)"
        } else if (val == 5) {
          var stext = "İptal(Hotel)"
        } else if (val == 6) {
          var stext = "No Show"
        }
        this.rezervasyon[this.rezIndex].transfer_status_text = stext
        this.rezervasyon[this.rezIndex].transfer_status = val
      },
      TransferDetail(event,row) {
        let ReservationIndex=null
        this.rezervasyon.filter(function(rezervasyon,index) {
          if(rezervasyon.id == row.id){
            ReservationIndex = index
          }
        });
        if(row.update_id && row.update_id > 0){
          let olddata=this.rezervasyon.findIndex(item => (item.id == row.update_id))
          this.oldData=this.rezervasyon[olddata]
        }else{
          this.oldData=row
        }

        this.detialData = row;
        this.rezIndex = ReservationIndex;
        this.$refs.reservationdetail.show()
      },
      changePaginationTransfer() {
        localStorage.setItem("pagination", this.pagination.rowsPerPage);
      },
      getDataAPI(bypass=false) {
        if(this.CheckRole('ReservationList')==false){
          return false
        }

          if(this.rezervasyon.length>0 && bypass==false) {
            return false
          }
          this.$q.loading.show()
          if(this.FilterDate.length==0){ this.FilterDate=null }
          var filter = {FilterDate: this.FilterDate}
          if (this.CheckRole('ReservationListAll')) {
            filter.ListType = 1
          } else {
            filter.ListType = 2
          }
          this.$axios.post('reservation/list', {filter})
            .then((result) => {
              this.drivers = []
              this.rezervasyon = []
              Object.entries(result.data.return.rezervasyon).forEach(entry => {
                const [key, value] = entry;
                if (key != "status") {
                  this.rezervasyon.push(value)
                }
              });

              Object.entries(result.data.return.drivers).forEach(entry => {
                const [key, value] = entry;
                if (key != "status") {
                  this.drivers.push(value)
                }
              });
              this.FilterDate=result.data.return.FilterDate

              var lastInsert=this.rezervasyon[this.rezervasyon.length-1].created
              this.$store.commit("setReservationLastUpdate",lastInsert)
              this.$store.commit("setFilterDate", this.FilterDate)
              this.$store.commit("setReservationList", this.rezervasyon)
              this.$store.commit("setDrivers", this.drivers)
              this.$q.loading.hide()
            }).catch((err) => {
            this.data = err.data;
            this.$q.loading.hide()
          });

      },
      ShowTransferStatus(durum){

        if(durum==1){
          return this.durum.onaylandi;
        }else if(durum==2){
          return this.durum.beklemede;
        }else if(durum==3){
          return this.durum.gerceklesti;
        }else if(durum==4){
          return this.durum.iptal;
        }else if(durum==5){
          return this.durum.iptal;
        }else if(durum==6){
          return this.durum.noshow;
        }

      },
      TimerControl(){
        if(this.$route.params.new){
          this.getDataUpdate()
        }
        if(localStorage.getItem("autorefresh")==="true"){ var status = true } else { var status = false }
        this.autorefresh_status=status
        this.autorefresh_model=parseInt(localStorage.getItem("autorefreshtime"))
        if(!this.$store.state.ReservationRefresh>0){
          if(status){
            this.autoRefreshData()
          }
        }
      },
      getDataNotice(){
          if(this.notices===null){
            this.$axios.get('/notice/list')
            .then((res)=> {
              this.notices=res.data.return
            }).catch((e)=>{
              console.log(e)
            })
          }
      },
    },
    computed: {
      ...mapGetters(['getReservationList']),
      ...mapState(['filter','grid','parameters']),
      rezervasyons: {
        get() {
          return this.$store.state.reservationList
        },
        set() {
          this.$store.commit('setReservationList', this.rezervasyon)
        },
      },
      totalValue() {
        var sum = 0;
        var count = 0;
        let veri = this.rezervasyon;
        veri.forEach(e => {
          if(this.filter!=null){
            const lowerTerms = this.filter ? this.filter.toLowerCase() : ''
            console.log(e)
            veri = veri.filter((row) => {
             console.log(row)
            })
            // return e.filter(
            //   row => cols.some(col => (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
            // )
          }
          if(e.transfer_status==2 && this.durum.beklemede) {
            sum += parseInt(e.price);
            count++;
          }
          if(e.transfer_status==1 && this.durum.onaylandi) {
            sum += parseInt(e.price);
            count++;
          }
          if(e.transfer_status==3 && this.durum.gerceklesti) {
            sum += parseInt(e.price);
            count++;
          }
          if((e.transfer_status==4 || e.transfer_status==5) && this.durum.iptal) {
            sum += parseInt(e.price);
            count++;
          }
          if(e.transfer_status==6 && this.durum.noshow) {
            sum += parseInt(e.price);
            count++;
          }

        });
        var total = {
          price: sum,
          count: count
        }
        return total
      },
    },
    events: {},
    mounted() {
      this.getDataAPI()
      this.getDataNotice()
    },
    created() {
      this.TimerControl()
      this.CheckReservationStatusTimer()
      // this.$store.commit("setPaginationrowsPerPage",0)
    }
  }
</script>
<style>
  .arka {
    min-height: calc(100vh - 34px);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: bottom center;
    background-size: 400px 400px;
  }
  .FilterInput {
    text-align: center;
    font-size: 1.3em;
    padding: 0;
    margin: 0px;
    width: 7em;
  }

  .ReservationTextColor {
    background-color: var(--q-color-primary);
    color: #ffffff;
    font-size: 1.1em;
    text-align: center;
  }
  .doc-page>div, .doc-page>pre {
    margin-bottom: 22px;
  }
  .doc-note {
    background-color: #eee;
    border-radius: 4px;
    margin: 16px 0;
    padding: 16px 24px;
    font-size: 1em;
    border-width: 0 5px;
    border-style: solid;
    border-color: #9e9e9e;
    letter-spacing: 0.5px;
  }
  .doc-note--tip {
    background-color: #c1f4cd;
    border-color: #21ba45;
  }

  .doc-page {
    padding: 16px 46px;
    font-weight: 300;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  .doc-note>p, .doc-note>ul {
    margin-bottom: 0;
  }
  .doc-note__title {
    font-weight: 500;
  }
  p {
    margin: 0 0 16px;
  }

</style>
