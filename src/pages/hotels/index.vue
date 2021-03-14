<template>
<div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('HotelList')">
    <div class="text-h6 fit">İşletmeler..  
      <q-btn
        color="primary text-white shadow-2"
        icon="add"
        label="İşletme Oluştur"
        to="/hotels/create"
        v-if="CheckRole('HotelCreate')"
      />
      <q-toggle v-model="status" checked-icon="check" :label="status ? 'Aktif' : 'Devredışı'" unchecked-icon="clear" />
    </div>
    <q-separator inset />
    <div class="fit">
      <table-header-search  />
      <q-table
        title=""
        dense
        :data="data"
        :columns="columns"
        row-key="hotel_id"
        :pagination.sync="pagination"
        :filter="filter"
        :loading="loading"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
        hide-pagination
        :grid="grid"
        :hide-header="grid"
      >

        <template v-slot:item="props" v-if="grid">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" v-if="props.row.hotel_status==status">
            <q-card>
              <q-card-section>
                <div v-model="props.selected" class="text-h6" style="margin:0;padding: 0">
                  {{props.row.hotel_name}}
                </div>

                <q-btn
                  round
                  color="primary"
                  class="float-right"
                  size="sm"
                  icon="edit"
                  :to="props.row.edited"
                  v-if="CheckRole('HotelUpdate')"
                />
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item
                  v-for="col in props.cols.filter(col => col.hotel_name !== 'desc')"
                  :key="col.hotel_name"
                >
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator />
              <q-card-actions
                class="row"
                style="width:100%;
                justify-content:space-between;
                "
              >
                <q-btn
                  flat
                  icon="phone"
                  class="items-start"
                  @click="phone(props.row)"
                />
                <q-btn
                  flat
                  class="items-center"
                  icon="mail"
                  @click="mail(props.row)"
                />
                <q-btn
                  flat
                  class="items-end"
                  icon="map"
                  @click="address(props.row)"
                />

              </q-card-actions>
            </q-card>
          </div>
        </template>
        <template v-else v-slot:body="props">
          <q-tr :props="props" @click="AllDataShow(props.row)" v-if="props.row.hotel_status==status">
            <q-td v-for="col in props.cols" :key="col.name">
              {{ props.row[col.field] }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
            <table-footer sort-by="hotel_name" label="İşletme" :data="data.length"/>
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
  import TableFooter from "components/table/table-footer";
  import TableHeaderSearch from "components/table/table-header-search";
  import {mapState} from "vuex";

  export default {
  name: 'hotels',
    components: {TableFooter, TableHeaderSearch},
  data () {
    return {
      loading: false,
      lastIndex: null,
      selected: [],
      phoneData: [{}],
      mailData: [{}],
      status:true,
      columns: [
        { name: 'hotel_name', label: 'Otel', field: 'hotel_name', align: 'left' },
        { name: 'user_name', label: 'Kullanıcı', field: 'fullname', align: 'left' },
        { name: 'hotel_area', label: 'Bölge', field: 'area_name', align: 'left', },
        { name: 'hotel_vkn', label: 'Vergi N.', field: 'hotel_vkn', align: 'left', },
        { name: 'hotel_vkd', label: 'Vergi D.', field: 'hotel_vkd', align: 'left', },
        { name: 'created', label: 'Kayıt Tarihi', field: 'created', align: 'left', sortable: true },
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
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    getDataAPI () {
      if(this.CheckRole('HotelList')==false){
        return false
      }
      this.$q.loading.show()
      this.$axios.get('hotels/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
            if (key != "status") {
              value.edited = "/hotels/update/" + value.hotel_id
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
    AllDataShow (veri) {
      this.phoneData = [{}];
      if (veri.hotel_phone !== "") {
        this.phoneData.push({
          label: veri.hotel_phone,
          icon: 'phone',
          id: 'phone1',
        })
      }
      if (veri.hotel_phone2 !== "") {
        this.phoneData.push({
          label: veri.hotel_phone2,
          icon: 'phone',
          id: 'phone2',
        })
      }
      if (veri.hotel_phone3 !== "") {
        this.phoneData.push({
          label: veri.hotel_phone3,
          icon: 'phone',
          id: 'phone3',
        })
      }
      this.phoneData.push({})

      if (veri.hotel_email == "") {
        this.mailData.push({
          label: 'Kayıtlı eposta adresi yok.',
          icon: 'disabled_by_default',
          id: 'none',
        })
      } else {
        this.phoneData.push({
          label: veri.hotel_email,
          icon: 'mail',
          id: 'mail',
        })
      }

      this.phoneData.push(
        {},
        {
          label: veri.hotel_address,
          img: '/icon/google-map.png',
          id: 'google',
        },
        {},
        {
          label: "Düzenle",
          icon: "edit",
          id: 'edit',
        },
        {},
        {
          label: "Özel Fiyatlar",
          icon: "local_atm",
          id: 'prices',
        },
        {},
      )

      this.phoneData.push({
        label: "Kapat",
        icon: "close",
        id: "close"
      })
      this.$q.bottomSheet({
        message: veri.hotel_name,
        actions: this.phoneData
      }).onOk(action => {
        if (action.id == "phone1") {
          window.open("tel:+90" + veri.hotel_phone);
        } else if (action.id == "phone2") {
          window.open("tel:+90" + veri.hotel_phone2);
        } else if (action.id == "phone3") {
          window.open("tel:+90" + veri.hotel_phone3);
        } else if (action.id == "mail") {
          window.open("mailto:" + veri.hotel_email);
        } else if (action.id == "google") {
          window.open("https://maps.google.com/?q=" + veri.hotel_address);
        } else if (action.id == "edit") {
          console.log(veri)
          var hotel="/hotels/update/" + veri.hotel_id
          this.$router.push({path:hotel})
        } else if (action.id == "prices") {
          this.$router.push({name:"hotelPrice", params: { id:veri.hotel_id,hotel_name: veri.hotel_name,discount:veri.discount}})
        }
      })
    },
    phone (veri) {
      this.phoneData = [{}];
      if (veri.hotel_phone !== "") {
        this.phoneData.push({
          label: veri.hotel_phone,
          icon: 'phone',
          id: 'phone1',
        })
      }
      if (veri.hotel_phone2 !== "") {
        this.phoneData.push({
          label: veri.hotel_phone2,
          icon: 'phone',
          id: 'phone2',
        })
      }
      if (veri.hotel_phone3 !== "") {
        this.phoneData.push({
          label: veri.hotel_phone3,
          icon: 'phone',
          id: 'phone3',
        })
      }
      this.phoneData.push({})
      this.phoneData.push({
        label: "Kapat",
        icon: "close",
        id: "close"
      })
      this.$q.bottomSheet({
        message: veri.hotel_name,
        style: "font-size:2em",
        actions: this.phoneData
      }).onOk(action => {
        if (action.id == "phone1") {
          window.open("tel:+90" + veri.hotel_phone);
        } else if (action.id == "phone2") {
          window.open("tel:+90" + veri.hotel_phone2);
        } else if (action.id == "phone3") {
          window.open("tel:+90" + veri.hotel_phone3);
        }
      })
    },
    mail (veri) {
      this.mailData = [{}]
      if (veri.hotel_email == "") {
        this.mailData.push({
          label: 'Kayıtlı eposta adresi yok.',
          icon: 'disabled_by_default',
          id: 'none',
        })
      } else {
        this.mailData.push({
          label: veri.hotel_email,
          icon: 'mail',
          id: 'mail',
        })
      }
      this.mailData.push({})
      this.mailData.push({
        label: "Kapat",
        icon: "close",
        id: "close"
      })
      this.$q.bottomSheet({
        message: veri.hotel_name,
        actions: this.mailData
      }).onOk(action => {
        if (action.id == "mail") {
          window.open("mailto:" + veri.hotel_email);
        }
      })
    },
    address (veri) {
      this.$q.bottomSheet({
        message: veri.hotel_name,
        actions: [
          {},
          {
            label: veri.hotel_address,
            icon: 'location_on',
            id: 'address',

          },

          {
            label: "Google Haritalar",
            img: '/icon/google-map.png',
            id: 'google',

          },
          {},
          {
            label: "Kapat",
            icon: "close",
            id: "close"
          }
        ]
      }).onOk(action => {
        if (action.id == "google") {
          window.open("https://maps.google.com/?q=" + veri.hotel_address);
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
