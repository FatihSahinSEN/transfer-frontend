<template>
  <div>
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
    :data="cariler"
    :columns="columns"
    :filter="filter"
    :pagination.sync="pagination"
    no-data-label="Liste boş."
    no-results-label="Arama sonucu bulunamadı.."
  >

    <template v-slot:body="props">
      <q-tr :props="props" @click="CariDetay(props.row)">
        <q-td key="driver_fullname" :props="props" v-if="props.row.driver_fullname===null">
          Şöför Seçilmemiş Transferler
        </q-td>
        <q-td key="driver_fullname" :props="props" v-else>
          {{ props.row.driver_fullname }}
        </q-td>
        <q-td key="driver_plaka" :props="props">
          {{ props.row.driver_plaka }}
        </q-td>
        <q-td key="driver_phone" :props="props">
          {{ props.row.driver_phone }}
        </q-td>
        <q-td key="total_transfer" :props="props">
          {{ props.row.total_transfer }} Adet
        </q-td>
        <q-td key="total_price" :props="props">
          {{ props.row.total_price }} ₺
        </q-td>
      </q-tr>
    </template>
  </q-table>
</div>
</template>

<script>
  export default {
    name: "CariDriverList",
    data() {
      return {
        cariler:[],
        filter:null,
        details:null,
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 30,
          list: [5, 10, 15, 20, 30, 40, 50, 100, 500]
          // rowsNumber: xx if getting data from a server
        },
        columns: [
          {name: 'driver_fullname', label: 'İsim', field: 'driver_fullname', align: 'left'},
          {name: 'driver_plaka', label: 'Plaka', field: 'driver_plaka', align: 'left'},
          {name: 'driver_phone', label: 'Telefon', field: 'driver_phone', align: 'left'},
          {name: 'total_transfer', label: 'Transfer Sayısı', field: 'total_transfer', align: 'left'},
          {name: 'total_price', label: 'Transfer Geliri', field: 'total_price', align: 'left'},
        ],
      }
    },
    methods:{
      getDataAPI() {
        this.$q.loading.show()
        this.$axios.get('cariler/driver/list')
          .then((result) => {
            this.cariler = []
            Object.entries(result.data.return).forEach(entry => {
              const [key, value] = entry;
              if (key != "status") {
                this.cariler.push(value)
              }
            });

            this.$q.loading.hide()
          }).catch((err) => {
          this.$q.loading.hide()
        });
      },
      CariDetay(row){
        this.details=row
        console.log(row)
        this.$emit("CariDetay",row,1)
      },
    },
    computed: {
      pagesNumber() {
        return Math.ceil(this.data.length / this.pagination.rowsPerPage)
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
