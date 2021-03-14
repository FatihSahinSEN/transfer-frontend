<template>
  <div>
  <q-item clickable v-close-popup tabindex="0" :to="link" v-if="ShowLinks(role,dropdown)">
    <q-item-section avatar>
      <q-avatar :icon="icon" color="primary" text-color="white" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-separator />
  </div>
</template>

<script>
  export default {
    name: "EssentialLink",
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
      },
      dropdown: {
        type: Boolean,
        default: false
      }

    },
    data(){
      return {
        scoped: this.$store.state.scopes,
        width:window.innerWidth
      }
    },
    methods: {
      ShowLinks(value){
          return this.scoped.find((item) => item==value)
      }
    }
  };
</script>
