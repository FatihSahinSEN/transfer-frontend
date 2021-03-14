<template>
  <div v-if="windowWidth<750" style="display: flex;flex-direction:column;width: 100%;overflow: hidden">
    <div style="display:flex;justify-content:center;align-items:center;width: 100%;text-align: center;margin-top: 15px" v-if="pagesNumber>1">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>

    <div style="display:flex;justify-content:center;align-items:center;width: 100%;text-align: center;margin-top: 10px">
      Toplam {{ data }} içerik
    </div>
  </div>
  <div v-else style="width: 100%">
  <div style="display: flex" class="fit"  v-if="!grid">
    <div style="display:flex;justify-content: flex-start;align-items:center;;width: 70%;padding-left: 1em">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        v-if="pagesNumber>1"
        size="sm"
      />
    </div>
    <div style="display:flex;flex: 1;width:100%;justify-content: flex-end;align-items:center">
      <span style="margin-right:15px;">{{ data }} {{ label }} içinden </span>
      <q-select borderless dense options-dense
                input-style="width:50px;"
                v-model="pagination.rowsPerPage"
                :options="pagination.list"
                color="primary">
      </q-select>
      <span> adet göster</span>
    </div>
  </div>
  <div v-else class="shadow-2" style="background: #efefef;display: flex;width:100%;border-bottom-left-radius: inherit;border-bottom-right-radius: inherit;">

    <div style="display:flex;justify-content: flex-start;align-items:center;;width: 40%;padding-left: 1em">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        v-if="pagesNumber>1"
        size="sm"
      />
    </div>
    <div style="display:flex;width:60%;justify-content: flex-end;align-items:center;padding-right: 1.3em">
      <span style="margin-right:15px;">{{ data }} {{ label }} içinden </span>
      <q-select borderless dense options-dense
                input-style="width:50px;"
                v-model="pagination.rowsPerPage"
                :options="pagination.list"
                color="primary">
      </q-select>
      <span> adet göster</span>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "table-footer",
      props:["sortBy","label","data"],
      data() { return { windowWidth:window.innerWidth }},
      computed: {
        pagination:{
          get(){
            return this.$store.state.pagination
          },
          set(value){
            this.$store.commit("setPagination", value)
          },
        },

        grid(){
          return this.$store.state.grid
        },
        pagesNumber () {
          return Math.ceil(this.data / this.pagination.rowsPerPage)
        },
      },
      mounted() {
        window.addEventListener('resize', () => {
          this.windowWidth = window.innerWidth
        })
      },
      created() {
        this.$store.commit("setPaginationSort", this.sortBy)

      }

    }
</script>

<style>
  .q-table__bottom {
    padding: 0px;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 10px;
  }
</style>
