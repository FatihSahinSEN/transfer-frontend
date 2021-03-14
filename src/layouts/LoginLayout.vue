<template>
  <q-layout>
    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
 </template>

<script>
export default {
  name: 'Login',
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
