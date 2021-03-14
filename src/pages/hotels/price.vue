<template>
    <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PriceList')">
    <div class="text-h6 fit">{{ hotel_name }} Fiyatları
    </div>
    <q-separator inset />
    <div class="fit">
      <q-table
        title=""
        dense
        :data="showData"
        :columns="columns"
        row-key="price_id"
        :pagination.sync="pagination"
        :filter="filter"
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
                v-if="i==0 || i==1 || i==2 || i==5"
              >
                <template v-slot:append>
                  <q-icon name="close" @click.stop="columns[i].filtre = [];ClearFilter()" class="cursor-pointer" />
                </template>
              </q-select>
              <span v-else>{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :class="{'highlight': (props.row.price_id == selected)}" dense @dblclick="tdEdit(props.row)">
            <q-td key="from_name" :props="props">
              {{ props.row.from_name }}
            </q-td>
            <q-td key="to_name" :props="props">
              {{ props.row.to_name }}
            </q-td>
            <q-td key="car_name" :props="props">
              {{ props.row.car_name }}
            </q-td>
            <q-td key="hotel" :props="props" v-if="props.row.hotel>0">
              <span style="color: #dd3933">Özel Fiyat</span>
            </q-td>
            <q-td key="hotel" :props="props" v-else>
              Genel Fiyat
            </q-td>

            <q-td key="discount" :props="props">
              {{ discount }} ₺
            </q-td>
            <q-td key="price_total" :props="props" v-if="props.row.hotel>0">
              <q-input
                dense
                borderless
                reverse-fill-mask
                mask="#########.##"
                v-model="props.row.price_total"
                suffix=" ₺"
                style="height: 24px;overflow: hidden;width: 140px;float:right;"
                input-class="text-right he10"
                @change="ChangePrice(props.row)"
                @click="ChangeRow(props.row)"
                @blur="selected=null"
              />
            </q-td>
            <q-td key="price_total" :props="props" v-else>
              <q-input
                dense
                borderless
                reverse-fill-mask
                mask="#########.##"
                v-model="props.row.price_total"
                suffix=" ₺"
                style="height: 24px;overflow: hidden;width: 140px;float:right;"
                input-class="text-right he10"
                @change="NewPrice(props.row)"
                @click="ChangeRow(props.row)"
                @blur="selected=null"
              />
            </q-td>

            <q-td key="price_id" :props="props">
              {{ discountPrice(props.row.price_total) }}
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
  name: 'HotelPrices',

  data () {
    return {
      loading: false,
      filter: '',
      selected:null,
      row: null,
      areas: [],
      pagination: {
        page: 1,
        rowsPerPage: 18
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'from_name', label: 'Kalkış Bölgesi', field: 'from_name', align: 'left',filtre:[],opt:[] },
        { name: 'to_name', label: 'Varış Bölgesi', field: 'to_name', align: 'left',filtre:[],opt:[] },
        { name: 'car_name', label: 'Araç Tipi', field: 'car_name', align: 'left',filtre:[],opt:[] },
        { name: 'hotel', label: 'Özel Fiyat', field: 'hotel', align: 'center' },
        { name: 'discount', label: 'İndirim', field: 'discount', align: 'right' },
        { name: 'price_total', label: 'Ücret', field: 'price_total', align: 'right',filtre:[],opt:[] },
        { name: 'price_id', label: 'İndirimli Ücret', field: 'price_id', align: 'right' },

      ],
      veri: [],
      data: [],
      hotel_name:this.$route.params.hotel_name,
      hotel_id:this.$route.params.id,
      discount:this.$route.params.discount,
      showData:[]
    }
  },
  methods: {
    ClearFilter(){
      this.showData=[]
      this.FilterOptions()
    },

    FilterOptions(){
      let from=this.columns[0].filtre,
        to=this.columns[1].filtre,
        car=this.columns[2].filtre,
        price=this.columns[5].filtre
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
    ChangeRow(row){
      this.selected=row.price_id
    },
    NewPrice(row){
      var index=this.data.indexOf(row);
      let price_detail = {
        price_from: row.price_from,
        price_to: row.price_to,
        price_total: row.price_total,
        hotel_id:this.hotel_id,
        price_car:row.car_id
      }
      this.$q.loading.show()
      this.$axios.post("prices/hotel/create", { price_detail })
        .then((result) => {
          this.$q.loading.hide()
          if (result.data.status.code == 206) {
            this.$q.notify({
              type: 'negative',
              message: result.data.status.message.sonuc
            })
          } else {
            this.data.splice(index,1)
            this.data.splice(index,0,result.data.return)
            this.$q.notify({
              type: 'positive',
              message: result.data.status.message
            })
          }
        }).catch((err) => {
        this.$q.loading.hide()
      });
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
      });
    },
    discountPrice(price){
      return parseInt(price) - parseInt(this.discount) + " ₺"
    },
    getDataAPI () {
      if(this.CheckRole('PriceList')==false){
        return false
      }
      this.$q.loading.show()
      var url="prices/hotel/" + this.hotel_id
      this.$axios.get(url)
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
              if(!this.columns[5].opt.includes(value.price_total)) {
                this.columns[5].opt.push(value.price_total)
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
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
      console.log(data)
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
    font-weight: bold;
  }
  .highlight {
    background: #ffc7c7;
    transform: scale(1,1);
  }


</style>
