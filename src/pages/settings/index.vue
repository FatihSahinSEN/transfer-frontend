<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookList')">
    <div class="text-h6 fit">Sistem Ayarları
      <q-btn
        color="primary text-white shadow-2"
        label="Yeni Parametre"
        to="/system-settings/create"
        v-if="CheckRole('PhoneBookCreate')"
      />
    </div>
    <q-separator inset />
    <div class="fit">
      <table-header-search  />
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
          <table-footer sort-by="fullname" label="Kişi" :data="data.length"/>
        </template>
      </q-table>

    </div>
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
    name: 'SystemSettings',
    components: {TableFooter, TableHeaderSearch,TableGrid},
    data () {
      return {
        loading: false,
        row: null,
        columns: [
          { name: 'id', label: '#ID', field: 'id', align: 'left' },
          { name: 'grup', label: 'GRUP KODU', field: 'grup', align: 'left' },
          { name: 'parameter', label: 'Parametre Adı', field: 'parameter', align: 'left' },
          { name: 'anahtar', label: 'Anahtar', field: 'anahtar', align: 'left' },
          { name: 'value', label: 'Parametre Değeri', field: 'value', align: 'left' },
        ],
        veri: [],
        data: []
      }
    },
    methods: {
      changeGrid(){
        this.grid=!this.grid
        window.localStorage.setItem('grid',this.grid)
      },
      getDataAPI () {
        if(this.CheckRole('PhoneBookList')==false){
          return false
        }
        this.$q.loading.show()
        this.$axios.get('/paramater/list')
          .then((result) => {
            Object.entries(result.data.return).forEach(entry => {
              const [key, value] = entry;
              if (key != "status") {
                this.data.push(value)
              }
            });
            this.$q.loading.hide()
          }).catch((err) => {
          this.data = err.data;
          this.$q.loading.hide()
        });
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
            this.$router.push({ name: "settingUpdate", params: { id: row.id, grup: row.grup, parameter: row.parameter,anahtar: row.anahtar,type: row.type, value: row.value } })
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
