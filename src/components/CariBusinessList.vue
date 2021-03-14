<template>
  <div>
  <table-header-search  />
  <q-table
    title=""
    dense
    :data="cariler"
    :columns="columns"
    :filter="filter"
    :pagination.sync="pagination"
    no-data-label="Liste boş."
    no-results-label="Arama sonucu bulunamadı.."
    @row-click="CariDetay"
    :grid="grid"
    :hide-header="grid"
  >
    <template v-slot:item="props" v-if="grid">
      <table-grid :veri="props" :columns="columns" @edited="CariDetay(props.row)" wdth="2" roles="UserUpdate"/>
    </template>
    <template v-slot:body="props" v-else>
      <q-tr :props="props" @click="CariDetay(props.row)">
        <q-td key="user_fullname" :props="props">
          {{ props.row.user_fullname }}
        </q-td>
        <q-td key="hotel_name" :props="props">
          <span v-if="props.row.hotel_name==null">Seçilmedi</span>
          <span v-else>{{ props.row.hotel_name }}</span>
        </q-td>
        <q-td key="area_name" :props="props">
          {{ props.row.area_name }}
        </q-td>
        <q-td key="hotel_phone" :props="props">
          {{ props.row.hotel_phone }}
        </q-td>
        <q-td key="hotel_email" :props="props">
          {{ props.row.hotel_email }}
        </q-td>
        <q-td key="current_balance" :props="props">
          <span v-if="props.row.current_balance==null">0 TL</span>
          <span v-else>{{ props.row.current_balance }}</span>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <q-tr>
        <q-td colspan="4"></q-td>
        <q-td style="text-align: right;font-size: 1.3em;font-weight: 700">Toplam : </q-td>
        <q-td style="font-size: 1.3em;font-weight: 700"> {{TotalAmount}} ₺</q-td>
      </q-tr>
    </template>
    <template v-slot:bottom>
      <table-footer sort-by="user_fullname" label="İşletme" :data="cariler.length"/>
    </template>
  </q-table>
  </div>
</template>

<script>
    import TableFooter from "components/table/table-footer";
    import TableHeaderSearch from "components/table/table-header-search";
    import TableGrid from "components/table/table-grid";
    import {mapState} from "vuex";

    export default {
      name: "CariBusinessList",
      components: {TableFooter, TableHeaderSearch,TableGrid},
      data() {
        return {
          cariler:this.$store.state.CariList,
          details:null,
          columns: [
            {name: 'user_fullname', label: 'İsim', field: 'user_fullname', align: 'left'},
            {name: 'hotel_name', label: 'İşletme', field: 'hotel_name', align: 'left'},
            {name: 'area_name', label: 'Bölge', field: 'area_name', align: 'left'},
            {name: 'hotel_phone', label: 'Telefon', field: 'hotel_phone', align: 'left'},
            {name: 'hotel_email', label: 'E-posta', field: 'hotel_email', align: 'left'},
            {name: 'current_balance', label: 'Bakiye', field: 'current_balance', align: 'left'}
          ],
        }
      },
      methods:{
        getDataAPI() {
          this.$q.loading.show()
          this.$axios.get('cariler/account/list')
            .then((result) => {
              this.cariler = []
              Object.entries(result.data.return).forEach(entry => {
                const [key, value] = entry;
                if (key != "status") {
                  this.cariler.push(value)
                }
              });
              this.$store.commit("setCariList",this.cariler)
              this.$q.loading.hide()
            }).catch((err) => {
            this.$q.loading.hide()
          });
        },
        CariDetay(row){
          this.details=row
          this.$emit("CariDetay",row)
        },
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

      TotalAmount(){
        var total=0
        for (var i=0;i<this.cariler.length;i++){
          if(this.cariler[i].current_balance!==null){
            total=Math.ceil(parseInt(total) + parseInt(this.cariler[i].current_balance))
          }
        }
        return total
      }
    },
    mounted() {
      this.getDataAPI();
    }
    }
</script>

<style scoped>

</style>
