<template>
    <q-route-tab dense :name="link" :icon="icon" :label="title" :to="link" v-if="ShowLinks(role)" />
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
