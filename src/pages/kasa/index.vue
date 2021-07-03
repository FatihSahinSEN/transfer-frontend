<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookList')">
    <div class="row justify-start fit">

      <div class="column">
        <q-btn color="primary" flat icon="note_add" @click="YeniFis=!YeniFis" label="YENİ FİŞ" />
      </div>
      <div class="column">
        <q-btn color="primary" flat icon="event" @click="dateModal=!dateModal" :label="kasa_tarihi" />
      </div>
      <q-space />
      <div class="column">
        <q-btn color="primary" flat icon="local_printshop" label="Raporlar">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="GunlukRapor=!GunlukRapor">
                <q-item-section>Günlük Kasa Raporu</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="AylikRapor=!AylikRapor">
                <q-item-section>Aylık Kasa Raporu</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <q-separator inset />
    <div class="fit">

      <q-table
        title=""
        dense
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :filter="filter"
        :loading="loading"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
        @row-click="tdEdit"
        :grid="grid"
        :hide-header="grid"
      >
        <template v-slot:item="props" v-if="grid">
          <table-grid :veri="props" :columns="columns" @edited="tdEdit('',props.row)" wdth="2" roles="UserUpdate"/>
        </template>
        <template v-slot:bottom>
        </template>
      </q-table>
      <q-drawer
        v-model="drawerLeft"
        show-if-above
        :width="300"
        :breakpoint="700"
        side="right"
        elevated
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm row justify-center">
            <div class="column">
              <div class="text-h6 row">
                <q-icon color="primary" name="post_add" style="font-size: 1.3em">
                  <q-tooltip>
                    Yeni Hesap Ekle
                  </q-tooltip>
                </q-icon>
                Kasa Özeti

              </div>
            </div>
          </div>
          <div class="q-pa-sm row">
            <table>
              <tr>
                <td>Kasa Nakit</td>
                <td>1300₺</td>
              </tr>
              <tr>
                <td>Kredi Kartı</td>
                <td>1300₺</td>
              </tr>
              <tr>
                <td>Transfer Ücreti</td>
                <td>1300₺</td>
              </tr>
              <tr>
                <td>Servis Bakım</td>
                <td>1300₺</td>
              </tr>
            </table>
          </div>


        </q-scroll-area>
      </q-drawer>
    </div>
    <q-dialog v-model="dateModal">
      <q-card class="my-card">
        <q-date v-model="kasa_tarihi" :locale="trLocal" @input="GunlukKasaBilgileri" mask="DD/MM/YYYY" :options="optionsFn" @change="ChangeDay">
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Kapat" color="primary" flat />
          </div>
        </q-date>
      </q-card>
    </q-dialog>
    <q-dialog v-model="YeniFis">
      <q-card>

      </q-card>
    </q-dialog>

    <q-dialog v-model="AylikRapor">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6">Aylık Kasa Raporu</div>
          <p>İki tarih seçerek görüntüle tıklayınız.</p>
        </q-card-section>
        <q-card-section>
        <q-input v-model="kasa_tarihi" filled dense type="date" label="Başlangıç Tarihi" style="margin-bottom: 20px"/>
        <q-input v-model="kasa_tarihi" filled dense type="date" label="Bitiş Tarihi" />
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn color="primary" label=" GÖRÜNTÜLE " icon="pageview" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="GunlukRapor">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">Günlük Kasa Raporu</div>
        <p>Rapor almak istediğiniz tarihi seçerek görüntüle tıklayınız.</p>
      </q-card-section>
      <q-card-section>
        <q-input v-model="kasa_tarihi" filled dense type="date" label="Tarih" style="margin-bottom: 20px"/>
      </q-card-section>
      <q-card-actions class="row justify-center">
        <q-btn color="primary" label=" GÖRÜNTÜLE " icon="pageview" />
      </q-card-actions>
    </q-card>
    </q-dialog>

  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TableFooter from "components/table/table-footer";
  import TableHeaderSearch from "components/table/table-header-search";
  import TableGrid from "components/table/table-grid";
  export default {
    name: 'KasaIndex',
    components: {TableFooter, TableHeaderSearch,TableGrid},
    data () {
      return {
        model: null,
        options: [
          {
            label: 'Nakit',
            id: 1,
            icon: 'radio_button_unchecked'
          },
          {
            label: 'Kredi Kartı',
            id: 2,
            icon: 'radio_button_unchecked'
          },
          {
            label: 'Transfer Ücreti',
            id: 3,
            icon: 'radio_button_unchecked'
          },
          {
            label: 'Servis Bakım',
            id: 4,
            icon: 'radio_button_unchecked'
          },
          {
            label: 'Sigorta',
            value: 5,
            icon: 'radio_button_unchecked'
          }
        ],

        AylikRapor: false,
        GunlukRapor: false,
        drawerLeft: false,
        loading: false,
        YeniFis: false,
        dateModal:false,
        trLocal: {
          days: 'Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi_Pazar'.split('_'),
          daysShort: 'Pts_Sal_Çar_Per_Cum_Cts_Pzr'.split('_'),
          months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Agustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
          monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Agu_Eyl_Eki_Kas_Ara'.split('_'),
          firstDayOfWeek: 1
        },
        kasa_tarihi:this.DateLimits(new Date()),
        row: null,
        columns: [
          { name: 'fullname', label: 'Tam İsim', field: 'fullname', align: 'left' },
          { name: 'gsm', label: 'Telefon 1', field: 'gsm', align: 'left' },
          { name: 'mobile', label: 'Telefon 2', field: 'mobile', align: 'left' },
          { name: 'plaka', label: 'Plaka', field: 'plaka', align: 'left' },
          { name: 'status', label: 'Durum', field: 'status', align: 'left', }
        ],
        veri: [],
        data: []
      }
    },
    methods: {
      ChangeDay(){
        let tarih = this.kasa_tarihi

      },
      SelectHesap(opt){
        var Index=this.options.findIndex((item) => item.id==opt.value.id)
        this.options[Index].icon = "check_circle_outline"
      },
      RemoveHesap(opt){
        var Index=this.options.findIndex((item) => item.id==opt.value.id)
        this.options[Index].icon = "radio_button_unchecked"
      },
      GunlukKasaBilgileri(){
        this.dateModal=false
        //this.$q.loading.show()

        //alert()
      },
      changeGrid(){
        this.grid=!this.grid
        window.localStorage.setItem('grid',this.grid)
      },
      getDataAPI () {
        if(this.CheckRole('PhoneBookList')==false){
          return false
        }
        this.$q.loading.show()
        this.$axios.get('phones/list')
          .then((result) => {
            Object.entries(result.data.return).forEach(entry => {
              const [key, value] = entry;

              if (key != "status") {
                if(value.status==1)  {
                  value.status="Kişi"
                }else{
                  value.status="Şöför"
                }
                this.data.push(value)
              }
            });
            this.$q.loading.hide()
          }).catch((err) => {
          this.data = err.data;
          this.$q.loading.hide()
        });
      },
      optionsFn (date) {
        return date <= this.DateLimits(new Date())
      },

      DateLimits(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }
        console.log("Day : " + day)
        console.log("Month : " + month)
        console.log("Year : " + year)
        return [year, month, day].join('/');
      },
      DateFormat(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      },
      tdEdit (evt, row, index) {
        if(this.CheckRole('PhoneBookList')==false){
          return false
        }
        this.row = row;
        let edit = row.fullname
        this.$q.bottomSheet({
          message: edit,
          persistent: false,
          actions: [
            {},
            {
              label: "Düzenle",
              icon: 'edit',
              id: 'edit',

            },

            {},
            {
              label: "Kapat",
              icon: "close",
              id: "close"
            }
          ]
        }).onOk(action => {
          if (action.id == "edit") {
            this.$router.push({ name: "phoneUpdate", params: { id: row.id, fullname: row.fullname, gsm: row.gsm, mobile: row.mobile,plaka: row.plaka,status: row.status } })
          }
        })

      }
    },
    computed: {
      ...mapState(['filter','grid']),

      pagination:{
        get(){
          return this.$store.state.pagination
        },
        set(value){
          this.$store.commit("setPagination", value)
        }
      },
    },
    mounted () {
      this.getDataAPI();
    }
  }
</script>
<style scope>
  table {
    border-collapse: collapse;
    width: 100%;
  }
td {
    border-width: 0;
    border-bottom-width: 2px;
    height: 40px;
    padding: 4px 8px;
    position: relative;
    font-size: 16px;
    border-color: var(--q-color-primary);
    white-space: nowrap;
    border-style: solid;
    display: table-cell;
    vertical-align: inherit;
  }
</style>
