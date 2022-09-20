<template>
    <q-route-tab dense :name="link" :icon="icon" :label="title" :to="link" />
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

  },
  data(){
    return {
      width:window.innerWidth
    }
  },
};
</script>
