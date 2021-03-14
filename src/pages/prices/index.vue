<template>
    <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PriceList')">
    <div class="text-h6 fit">Genel Fiyatlar..</div>
    <q-separator inset />
    <div class="fit">
<!--      <q-input-->
<!--        filled-->
<!--        rounded-->
<!--        outlined-->
<!--        dense-->
<!--        color="black"-->
<!--        label="Fiyat veya bölge ara.."-->
<!--        v-model="filter"-->
<!--      >-->
<!--        <template v-slot:prepend>-->
<!--          <q-icon name="search" />-->
<!--        </template>-->

<!--      </q-input>-->
      <q-table
        title=""
        dense
        :data="showData"
        :columns="columns"
        row-key="price_id"
        :pagination.sync="pagination"
        :loading="loading"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="(col,i) in props.cols"
              :key="col.name"
              :props="props"
            >
              <q-select
                filled
                outlined
                dense
                options-dense
                multiple
                v-model="columns[i].filtre"
                :options="columns[i].opt"
                :label="col.label"
                options-selected-class="bg-green-1"
                @remove="ClearFilter"
                @add="ClearFilter"
                @input="ClearFilter"
                style="max-width: 300px"
              >
                <template v-slot:append>
                  <q-icon name="close" @click.stop="columns[i].filtre = [];ClearFilter()" class="cursor-pointer" />
                </template>
              </q-select>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :class="{'highlight': (props.row.price_id == selected)}" dense >
            <q-td key="from_name" :props="props">
              {{ props.row.from_name }}
            </q-td>
            <q-td key="to_name" :props="props">
              {{ props.row.to_name }}
            </q-td>
            <q-td key="car_name" :props="props">
              {{ props.row.car_name }}
            </q-td>
            <q-td key="price_total" :props="props">
              <q-input
                dense
                borderless
                reverse-fill-mask
                mask="#########.##"
                v-model="props.row.price_total"
                suffix=" ₺"
                style="height: 24px;overflow: hidden;"
                input-class="text-right he10"
                @change="ChangePrice(props.row)"
                @click="ChangeRow(props.row)"
                @blur="selected=null"
              />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div style="display:flex;flex: 1;width:100%;justify-content: flex-end;align-items:center">
            <q-pagination
              v-model="pagination.page"
              color="grey-8"
              :max="pagesNumber"
              size="sm"
            />
          </div>
          <div style="display:flex;flex: 1;width:100%;justify-content: flex-end;align-items:center">
            <span style="margin-right:15px;">{{ showData.length }} Fiyat içinden </span>
            <q-select borderless dense options-dense
                      input-style="width:50px;"
                      v-model="pagination.rowsPerPage"
                      :options="pagination.list"
                      color="primary">
            </q-select>
            <span> adet göster</span>
          </div>
        </template>


      </q-table>

    </div>

  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>

</template>

<script>
  export default {
  name: 'PricesIndex',

  data () {
    return {
      model:null,
      loading: false,
      selected:null,
      row: null,
      areas: [],
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 18,
        list: [5, 10, 15, 20, 30, 40, 50, 100, 500]
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'from_name', label: 'Kalkış Bölgesi', field: 'from_name', align: 'left',filtre:[],opt:[] },
        { name: 'to_name', label: 'Varış Bölgesi', field: 'to_name', align: 'left',filtre:[],opt:[] },
        { name: 'car_name', label: 'Araç Tipi', field: 'car_name', align: 'left',filtre:[],opt:[] },
        { name: 'price_total', label: 'Ücret', field: 'price_total', align: 'center',filtre:[],opt:[] }
      ],
      veri: [],
      data: [],
      showData:[]
    }
  },
  methods: {
    ChangeRow(row){
      this.selected=row.price_id
    },
    ChangePrice(row){
      let price_detail = {
        price_from: row.price_from,
        price_to: row.price_to,
        price_total: row.price_total
      }
      let id = row.price_id
      let url = 'prices/update/' + id
      this.$q.loading.show()
      this.$axios.post(url, { price_detail })
        .then((result) => {
          this.$q.loading.hide()
          if (result.data.status.code == 206) {
            this.$q.notify({
              type: 'negative',
              message: result.data.status.message.sonuc
            })
          } else {
            this.$q.notify({
              type: 'positive',
              message: result.data.status.message
            })
          }
        }).catch((err) => {
        this.$q.loading.hide()
        this.alert("HATA", err);
      });
    },
    ChangePagination(){

    },
    ClearFilter(){
      this.showData=[]
      this.FilterOptions()
    },

    FilterOptions(){
      let from=this.columns[0].filtre,
        to=this.columns[1].filtre,
        car=this.columns[2].filtre,
        price=this.columns[3].filtre
    if(from.length===0 && to.length===0 && car.length===0 && price.length===0){
      this.showData=this.data
      return this.showData
    }
     this.data.filter(item => {
        if(
          from.includes(item.from_name) &&
          to.length===0 &&
          car.length===0 &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.includes(item.to_name) &&
          car.length===0 &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.length===0 &&
          car.includes(item.car_name) &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.includes(item.to_name) &&
          car.includes(item.car_name) &&
          price.length===0
        ) {
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.length===0 &&
          car.length===0 &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.length===0 &&
          car.includes(item.car_name) &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.includes(item.to_name) &&
          car.length===0 &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.includes(item.from_name) &&
          to.includes(item.to_name) &&
          car.includes(item.car_name) &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.includes(item.to_name) &&
          car.length===0 &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.includes(item.to_name) &&
          car.includes(item.car_name) &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.includes(item.to_name) &&
          car.includes(item.car_name) &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.includes(item.to_name) &&
          car.length===0 &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.length===0 &&
          car.includes(item.car_name) &&
          price.length===0
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.length===0 &&
          car.includes(item.car_name) &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }else if(
          from.length===0 &&
          to.length===0 &&
          car.length===0 &&
          price.includes(item.price_total)
        ){
          this.showData.push(item)
        }

      })

      return this.showData
    },
    getDataAPI () {
      if(this.CheckRole('PriceList')==false){
        return false
      }
      this.$q.loading.show()
      this.$axios.get('prices/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
            if (key != "status") {
              this.data.push(value)
              if(!this.columns[0].opt.includes(value.from_name)){
                this.columns[0].opt.push(value.from_name)
              }
              if(!this.columns[1].opt.includes(value.to_name)) {
                this.columns[1].opt.push(value.to_name)
              }
              if(!this.columns[2].opt.includes(value.car_name)) {
                this.columns[2].opt.push(value.car_name)
              }
              if(!this.columns[3].opt.includes(value.price_total)) {
                this.columns[3].opt.push(value.price_total)
              }
            }
          });
          this.FilterOptions()
          this.$q.loading.hide()
        }).catch((err) => {
          this.data = err.data;
          this.$q.loading.hide()
        });
    },
    tdEdit (row) {
      this.row = row;
      let edit = row.from_name + " > " + row.to_name + " " + row.price_total + "TL"
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
          this.$router.push({ name: "priceUpdate", params: { id: row.price_id, price_from: row.price_from, price_to: row.price_to, price_total: row.price_total } })
        }
      })

    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.showData.length / this.pagination.rowsPerPage)
    }
  },
  mounted () {
    this.getDataAPI();
  }
}
</script>
<style>
  .he10 {
    height: 24px;
    margin-top: 9px;
    width: 140px;
    cursor: pointer;
  }
  .highlight {
    background: #ffc7c7;
    transform: scale(1,1);
  }


</style>
