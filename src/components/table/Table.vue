<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="ListAccess">
    <div class="text-h6 fit">
      {{ Title }}
      <q-btn
        color="primary text-white shadow-2"
        round
        size="sm"
        icon="add"
        :to="{ name: CreateRoute }"
        v-if="CreateAccess"
      />
      <q-toggle size="xl" v-model="status" checked-icon="check" unchecked-icon="clear" />
    </div>
    <q-separator inset />
    <div class="fit">
      <table-header-search />
      <q-table
        title=""
        dense
        :data="Items"
        :columns="Columns"
        row-key="UniqueKey"
        :pagination.sync="pagination"
        :filter="filter"
        no-data-label="Items boş."
        no-results-label="Arama sonucu bulunamadı.."
        hide-pagination
        :grid="grid"
        :hide-header="grid"
      >
        <template v-slot:item="props" v-if="grid">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            v-if="props.row[StatusColumn] == status"
          >
            <q-card>
              <q-card-section>
                <div v-model="props.selected" class="text-h6" style="margin: 0; padding: 0">
                  {{ props.row.hotel_name }}
                </div>

                <q-btn
                  round
                  color="primary"
                  class="float-right"
                  size="sm"
                  icon="edit"
                  :to="props.row.edited"
                  v-if="UpdateAccess"
                />
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item v-for="col in props.cols" :key="col.hotel_name">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
        <template v-else v-slot:body="props">
          <q-tr :props="props" @click="Edit(props.row)" v-if="props.row[StatusColumn] == status">
            <q-td v-for="(col, index) in props.cols" :key="index">
              {{ props.row[col.field] }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <table-footer label="adet" :data="Items.length" />
        </template>
      </q-table>
    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center">Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TableHeaderSearch from 'components/table/table-header-search'
import TableFooter from 'components/table/table-footer'
import TableGrid from 'components/table/table-grid'

export default {
  name: 'Table',
  components: {
    TableHeaderSearch,
    TableFooter,
    TableGrid,
  },
  computed: {
    ...mapState(['filter', 'grid']),
    Service() {
      return this.$store.state.Service
    },
    pagination: {
      get() {
        return this.$store.state.pagination
      },
      set(value) {
        this.$store.commit('setPagination', value)
      },
    },
    Items() {
      return this.$store.state[`${this.Service}`].Items
    },
    Title() {
      return this.$store.state[`${this.Service}`].Title
    },
    CreateRoute() {
      let url = this.$store.state[`${this.Service}`].CreateRoute
      let routeUrl = this.$router.resolve({ name: url })
      return routeUrl.location.name
    },
    UpdateRoute() {
      return this.$store.state[`${this.Service}`].UpdateRoute
    },
    UniqueKey() {
      return this.$store.state[`${this.Service}`].UniqueKey
    },
    StatusColumn() {
      return this.$store.state[`${this.Service}`].StatusColumn
    },
    Columns() {
      return this.$store.state[`${this.Service}`].Columns
    },
    CreateAccess() {
      const CreateAcc = this.$store.state[`${this.Service}`].CreateAccess
      if (this.$store.state.AuthService.Roles[CreateAcc]?.role_status === '1') {
        return true
      }
      return false
    },
    ListAccess() {
      const ListAcc = this.$store.state[`${this.Service}`].ListAccess
      if (this.$store.state.AuthService.Roles[ListAcc].role_status === '1') {
        return true
      }
      return false
    },
    UpdateAccess() {
      const UpdateAcc = this.$store.state[`${this.Service}`].UpdateAccess
      if (this.$store.state.AuthService.Roles[UpdateAcc]?.role_status === '1') {
        return true
      }
      return false
    },
    status: {
      get() {
        return this.$store.state[`${this.Service}`].status
      },
      set(value) {
        this.$store.commit(`${this.Service}/setStatus`, value)
      },
    },
    Roles() {
      return this.$store.state.AuthService.Roles
    },
  },
  methods: {
    Edit(item) {
      this.$router.push({ name: this.UpdateRoute, params: { id: item[this.UniqueKey] } })
    },
  },
  mounted() {
    this.$store.dispatch(`${this.Service}/findAll`)
  },
  watch: {
    Service(NewService) {
      this.$store.dispatch(`${NewService}/findAll`)
    },
  },
}
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>
