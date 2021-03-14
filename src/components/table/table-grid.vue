<template>
  <div :class="classe" >
    <q-card>
      <q-card-section>
        <q-toolbar-title>{{ title }}</q-toolbar-title>
        <q-btn
          round
          color="primary"
          class="float-right"
          size="sm"
          icon="edit"
          v-if="CheckRole(roles)"
          @click="$emit('edited','row')"
        />
      </q-card-section>
      <q-separator />
      <q-list dense>
        <q-item
          v-for="col in columns"
          :key="col.index"
        >

          <q-item-section>
            <q-item-label>{{ col.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ val(col) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
        name: "table-grid",
      props:['veri','row','columns','roles','wdth','renk'],
      methods: {
        val(v){
          return this.veri.row[v.field]
        }
      },
      computed: {
          ...mapState(['grid']),
        classe(){
            return "q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition col-lg-" + this.wdth
        },
        title(){
            return this.veri.row[this.columns[0].field]
        },
      }
    }
</script>

<style scoped>

</style>
