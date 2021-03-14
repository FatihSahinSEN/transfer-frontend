<template>
<div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookList')">
    <div class="text-h6 fit">Telefon Defteri  
      <q-btn
        color="primary text-white shadow-2"
        icon="people"
        label="Yeni Kişi ekle"
        to="/phone-book/create"
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
  name: 'PhonesIndex',
    components: {TableFooter, TableHeaderSearch,TableGrid},
    data () {
    return {
      loading: false,
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
