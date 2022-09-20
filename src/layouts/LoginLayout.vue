<template>
  <q-layout>
    <q-page-container>
      <router-view  />
    </q-page-container>
    <install-app v-if="DevMode" />
  </q-layout>
 </template>

<script>

import InstallApp from "components/InstallApp";
export default {
  name: 'Login',
  components: {InstallApp},
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {

  },
  computed: {
    DevMode() {
      if (process.env.DEV){
        return false
      }
      return true
    }
  }
}
</script>

<style>
</style>
