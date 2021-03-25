<template>
  <q-layout>
    <q-page-container>
      <router-view  />
    </q-page-container>
    <install-app />
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
  }
}
</script>

<style>
</style>
