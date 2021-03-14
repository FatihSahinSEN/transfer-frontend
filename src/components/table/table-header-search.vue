<template>
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
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-icon name="grid_on" color="black" @click="changeGrid()"/>
      </template>

    </q-input>
</template>

<script>
    export default {
        name: "table-header-search",
      data() {
          return {
            grid: this.$store.state.grid,
          }
      },
      methods: {
        changeGrid(){
          this.grid=!this.grid
          this.$store.commit("setGrid",this.grid)
          window.localStorage.setItem('grid',this.grid)
        },
      },
      computed: {
        filter:{
          get(){
            return this.$store.state.filter
          },
          set(val){
            this.$store.commit("setSearchTable",val)
          }
        }
      },
      created() {
        this.$store.commit("setSearchTable",null)
        this.$store.commit('setGrid', (localStorage.getItem('grid')=='true'))
      }
    }
</script>

<style scoped>

</style>
