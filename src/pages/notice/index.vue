<template>
<div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('NoticeList')">
    <div class="text-h6 fit">Duyurular
      <q-btn
        color="primary text-white shadow-2"
        icon="record_voice_over"
        label="Duyuru Oluştur"
        to="/notice/create"
        v-if="CheckRole('NoticeCreate')"
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
        row-key="id"
        :pagination.sync="pagination"
        :filter="filter"
        :loading="loading"
        no-data-label="Liste boş."
        no-results-label="Arama sonucu bulunamadı.."
        :grid="grid"
        :hide-header="grid"
      >
        <template v-slot:item="props" v-if="grid">
          <table-grid :veri="props" :columns="columns" @edited="tdEdit('',props.row)" wdth="2" roles="NoticeUpdate"/>
        </template>
        <template v-slot:body="props" v-else>
          <q-tr :props="props"  @click="tdEdit('',props.row)">
            <q-td key="title">{{ props.row.title }}</q-td>
            <q-td key="description">{{ TableSubstr(props.row.description) }}</q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <table-footer sort-by="fullname" label="Duyuru" :data="data.length"/>
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
  name: 'NoticeIndex',
    components: {TableFooter, TableHeaderSearch,TableGrid},
    data () {
    return {
      loading: false,
      row: null,
      columns: [
        { name: 'title', label: 'Başlık', field: 'title', align: 'left' },
        { name: 'description', label: 'Açıklama', field: 'description', align: 'left' }
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
    TableSubstr(str){
        return str.substr(0,120) + "..."
    },
    getDataAPI () {
      if(this.CheckRole('NoticeList')==false){
        return false
      }
      this.$q.loading.show()
      this.$axios.get('notice/list')
        .then((result) => {
          Object.entries(result.data.return).forEach(entry => {
            const [key, value] = entry;
              this.data.push(value)
          });
          this.$q.loading.hide()
        }).catch((err) => {
          this.data = err.data;
          this.$q.loading.hide()
        });
    },
    tdEdit (evt, row, index) {
      if(this.CheckRole('NoticeUpdate')==false){
        return false
      }
      this.row = row;
      let edit = row.title
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

          {},{
            label: "Sil",
            icon: 'remove',
            id: 'remove',

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
          this.$router.push({ name: "noticeUpdate", params: { id: row.id, title: row.title, description: row.description, status: row.status } })
        }
        if (action.id == "remove") {
          this.$q.loading.show()
          var url="notice/delete/" + row.id
          this.$axios.post(url, { })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                let search = this.data.findIndex(notice => notice.id == row.id)
                this.data.splice(search,1)
                this.$store.commit('setNotice',this.data)
                return this.data
              })
            }).catch((err) => {
            this.$q.loading.hide()
            this.alert("HATA", err);
          });
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
