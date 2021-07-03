<template>
  <q-layout>
    <q-toolbar class="bg-blue-grey-14 text-white yazdir">
      <q-btn flat round dense icon="keyboard_backspace" @click="geri"></q-btn>
      <q-toolbar-title>
      </q-toolbar-title>
      <q-btn flat round dense icon="print" @click="yazdir"></q-btn>
    </q-toolbar>
      <router-view />
  </q-layout>
</template>

<script>
    export default {
      name: "Print",
      data() {
        return {
          link:null
        }
      },
      methods: {
        yazdir() {
          window.print()
        },
        geri(){
          this.$router.go(-1)
        }

      },
      mounted() {
          this.link=this.$route.params
          document.title = "Print Voucher"
      }
    }
</script>

<style scoped>
  body {
    background: rgb(204,204,204);
    box-sizing: border-box;
    overflow: hidden;
    margin:0;
  }
  div + .page {
    background: white;
    display: block;
    margin: 2em auto;
    margin-bottom: 0.5cm;
    box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);

 }
  div[size="A4"], .page {
    width: 110%;
    max-width: 20.5cm;
    overflow: hidden;
  }
  div[size="A4L"] {
    width: 29.5cm;
  }
  div[size="A3"] , .page {
    width: 29.7cm;
  }
  div[size="A3"][layout="landscape"] , .page {
    width: 42cm;
  }
  div[size="A5"] , .page {
    width: 14.8cm;
  }
  div[size="A5"][layout="landscape"] , .page {
    width: 21cm;
  }
  @media print {
    body {
      background: none;
      box-shadow: none;
      overflow: hidden;
      margin:0px;
      padding: 0px;
    }
    .yazdir {
      display:none;
    }
    div + .page {
      background: white;
      display: block;
      margin: 0;
      box-shadow: none;

    }
    .page-break { display: block; page-break-before: always; }

  }




</style>
