<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('UserList')">
    <div class="text-h6 fit">Kullanıcılar..  
      <q-btn
        color="primary text-white shadow-2"
        icon="people"
        label="Yeni Kullanıcı"
        to="/users/create"
        v-if="CheckRole('UserCreateHotel') || CheckRole('UserCreateAdmin')"
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
        row-key="user_id"
        :pagination.sync="pagination"
        :filter="filter"
        :loading="loading"
        label="user.fullname"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
        hide-pagination
        :grid="grid"
        :hide-header="grid"
        @row-click="edited"
      >
        <template v-slot:item="props" v-if="grid">
          <table-grid :veri="props" :columns="columns" @edited="edited('',props.row)" wdth="2" roles="UserUpdate"/>
        </template>
        <template v-else v-slot:body="props">
          <q-tr :props="props" @click="edited('',props.row)" v-if="props.row.user_status==status">
            <q-td v-for="col in props.cols" :key="col.name">
              {{ props.row[col.field] }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <table-footer  sortBy="fullname" label="Kişi" :data="data.length"/>
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
  name: 'UsersIndex',
    components: {TableFooter, TableHeaderSearch,TableGrid},
    data () {
    return {
      loading: false,
      lastIndex: null,
      selected: [],
      status:true,
      columns: [
        { name: 'fullname', label: 'İsim', field: 'fullname', align: 'left' },
        { name: 'username', label: 'Kullanıcı adı', field: 'username', align: 'left' },
        { name: 'email', label: 'E-posta', field: 'email', align: 'left' },
        { name: 'phone', label: 'Telefon', field: 'phone', align: 'left', },
        { name: 'created', label: 'Kayıt Tarihi', field: 'created', align: 'left', sortable: true }
      ],
      veri: [],
      data: []
    }
  },
  methods: {
    edited(event,veri){
      var url = "/users/update/" + veri.user_id
      this.$router.push({path:url})
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    getDataAPI () {
      if(this.CheckRole('UserList')==false){
        return false
      }
      this.$q.loading.show()
      this.$axios.get('users/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
            if (key != "status") {
              value.edited = "/users/update/" + value.user_id
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
