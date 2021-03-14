<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('AreaList')">
    <div class="text-h6 fit">Bölgeler..
      <q-btn
        color="primary text-white shadow-2"
        icon="map"
        label="Yeni Bölge"
        to="/regions/create"
        v-if="CheckRole('AreaCreate')"
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
        row-key="area_id"
        :pagination.sync="pagination"
        :filter="filter"
        :loading="loading"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
        @row-click="edited"
        :grid="grid"
        :hide-header="grid"
      >
        <template v-slot:item="props" v-if="grid">
          <table-grid :veri="props" :columns="columns" @edited="edited('',props.row)" wdth="3" roles="AreaUpdate"/>
        </template>

        <template v-slot:bottom>
            <table-footer sortBy="area_name" label="Bölge" :data="data.length"/>
        </template>
      </q-table>

    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>


</template>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
<script>
  import {date} from 'quasar'
  import { mapState } from 'vuex'
  import TableFooter from "components/table/table-footer";
  import TableHeaderSearch from "components/table/table-header-search";
  import TableGrid from "components/table/table-grid";

  export default {
  name: 'Regions',
    components: {TableGrid, TableHeaderSearch, TableFooter},
    data () {
    return {
      loading: false,
      lastIndex: null,
      selected: [],
      columns: [
        { name: 'area_name', label: 'Bölge Adı', field: 'area_name', align: 'left' },
        { name: 'area_sort', label: 'Sıra', field: 'area_sort', align: 'left', sortable: true },
        { name: 'area_is_airport', label: 'Airport', field: 'area_is_airport', align: 'left', },
        { name: 'created', label: 'Kayıt Tarihi', field: 'created', align: 'left', sortable: true }
      ],
      veri: [],
      data: []
    }
  },
  methods: {
    edited(event,row,index){
      if(this.CheckRole('AreaUpdate')==false){
        return false
      }
      var url= "/regions/update/" + row.area_id
      this.$router.push({path: url })
    },
    getDataAPI () {
      if(this.CheckRole('AreaList')==false){ return false }
      this.$q.loading.show()
      this.$axios.get('regions/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
            if (key != "status") {
              if (value.area_is_airport == 1) {
                value.area_is_airport = "Havalimanı"
              } else {
                value.area_is_airport = "Bölge"
              }

              value.edited = "/regions/update/" + value.area_id
              value.created = date.formatDate(value.created, 'DD.MM.YYYY HH:mm:ss')
              this.data.push(value)
            }
          });
          this.$q.loading.hide()
        }).catch((err) => {
          this.data = err.data;
          this.$q.loading.hide()
        });
    }
  },
    computed: {
      ...mapState(['grid','filter']),
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
