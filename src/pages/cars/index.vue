<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('CarsList')">
    <div class="text-h6 fit">Araçlar ve Kişi sayıları..  
      <q-btn
        color="primary text-white shadow-2"
        icon="map"
        label="Yeni Araç Tipi"
        to="/cars/create"
        v-if="CheckRole('CarsCreate')"
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
        row-key="car_id"
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
          <table-grid :veri="props" :columns="columns" @edited="tdEdit('',props.row)" wdth="2" roles="CarsUpdate"/>
        </template>
        <template v-slot:bottom>
          <table-footer sort-by="carname" label="Araç" :data="data.length"/>
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
  import {mapState} from "vuex";
  import TableFooter from "components/table/table-footer";
  import TableHeaderSearch from "components/table/table-header-search";
  import TableGrid from "components/table/table-grid";

  export default {
  name: 'Car-List',
    components: {TableFooter, TableHeaderSearch,TableGrid},
  data () {
    return {
      loading: false,
      lastIndex: null,
      selected: [],
      row: null,
      columns: [
        { name: 'car_name', label: 'Araç Tipi', field: 'car_name', align: 'left' },
        { name: 'car_min_people', label: 'Min. Kişi Sayısı', field: 'car_min_people', align: 'left' },
        { name: 'car_max_people', label: 'Max. Kişi Sayısı', field: 'car_max_people', align: 'left' },
      ],
      veri: [],
      data: []
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    getDataAPI () {
      this.$q.loading.show()
      this.$axios.get('cars/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
            if (key != "status") {

              value.edited = "/cars/update/" + value.car_id
              value.created = date.formatDate(value.created, 'DD.MM.YYYY HH:mm:ss')
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
      if(!this.CheckRole('CarsUpdate')) {
          return false
      }
      this.row = row;
      let edit = row.car_name
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
          this.$router.push({ name: "carUpdate", params: { id: row.car_id, car_name: row.car_name } })
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
