<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="text-h6 fit">Araçlar ve Kişi sayıları..  
      <q-btn
        color="primary text-white shadow-2"
        icon="map"
        label="Yeni Araç Tipi"
        to="/cars/create"
      />
    </div>
    <q-separator inset />
    <div class="fit">
      <q-table
        title=""
        dense
        :data="Liste"
        :columns="columns"
        row-key="car_id"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
      >
      </q-table>

    </div>
  </div>
</template>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
<script>
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
    }
  },
    computed: {
      Liste(){
        return this.$store.state.CarService.Liste
      }
    },
  mounted () {
    this.$store.dispatch('CarService/getData');
  }
}
</script>
