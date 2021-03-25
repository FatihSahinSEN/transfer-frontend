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


      <div class="row">
        <div class="col" @click="selectOptions('GENERAL')">
          <q-card class="my-card">
            <q-card-section>
              <q-icon name="language" class="iconcn" color="primary" />
              <br />
              <span style="font-size: 1.3em">Genel Sistem Ayarları</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col" @click="selectOptions('NOTIFICATION')">
          <q-card class="my-card">
            <q-card-section>
              <q-icon name="circle_notifications" class="iconcn"  color="primary" />
              <br />
              <span style="font-size: 1.3em">Sistem Bildirim Ayarları</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col" @click="selectOptions('SMTP')">
          <q-card class="my-card">
            <q-card-section>
              <q-icon name="mail" class="iconcn" color="primary" />
              <br />
              <span style="font-size: 1.3em">Eposta SMTP Ayarları</span>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-table
        title=""
        dense
        :data="selectData"
        :columns="columns"
        row-key="id"
        :loading="loading"
        @row-click="tdEdit"
        no-data-label="Seçim yapınız.."
        :pagination="pagens"
        hide-header
        v-if="selectData.length>0"
      >
        <template v-slot:bottom>
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
        selectData:[],
        columns: [
          { name: 'parameter', label: 'Parametre', field: 'parameter', align: 'left' },
          { name: 'value', label: 'Değer', field: 'value', align: 'left' },
        ],
        pagens: {
          sortBy: "id",
          descending: false,
          page: 1,
          rowsPerPage: 0
        },
        veri: [],
        data: []
      }
    },
    methods: {
      selectOptions(val){
        this.selectData = [];
        this.selectData = this.data.filter((item) => item.grup == val)
      },
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
<style scoped>
  .my-card {
    margin-right: 25px;
    margin-bottom: 25px;
    text-align: center;
  }
  .iconcn {
    font-size: 5em;
    display: inline-block
  }
</style>
