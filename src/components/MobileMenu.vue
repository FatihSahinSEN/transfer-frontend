<template>
      <q-item clickable v-ripple v-if="ShowLinks(role) && title != 'Yeni Rezervasyon'" :to="link" active-class="text-red">
              <q-item-section avatar>
                <q-icon :name="icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{ title }}</q-item-label>
                <q-item-label caption>{{ caption }}</q-item-label>
              </q-item-section>
      </q-item>
</template>

<!--<template>-->
<!--    <q-route-tab :name="link" :icon="icon" :label="title" :to="link" v-if="ShowLinks(role)" />-->
<!--</template>-->

<script>
export default {
  name: "MobilMenu",
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: null
    }

  },
  data(){
    return {
      scoped: this.$store.state.scopes
    }
  },
  methods: {
    ShowLinks(value){
      return this.scoped.find((item) => item==value)
    }
  }
};
</script>
