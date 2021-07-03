<template>
<div size="A4" class="page">
  <p class="title">{{ user_fullname }}</p>
  <q-table
    title=""
    dense
    :data="detay"
    :columns="columns"
    row-key="cari_id"
    hide-bottom
    rows-per-page-options="0"
    style="margin: 0;padding:0;border:none;overflow:hidden;border: none;"
  >
    <template v-slot:header="props">
      <tr><th colspan="10" class="report-header-top"> </th></tr>
      <tr class="page-header">
      <th colspan="7" class="report-info"><b>{{ changeDateFormat(start_date) }}</b> ve <b>{{ changeDateFormat(end_date) }}</b> arasındaki transferler ve ödemeler</th>
      <th colspan="3" class="report-date"><b>Tarih :</b> {{ bugun }}</th>
      </tr>
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" v-if="props.row.cari_status==1">
        <q-td key="tarih" :props="props">{{ props.row.tarih }}</q-td>
        <q-td key="hesap_text" :props="props">{{ props.row.hesap_text.slice(0,8) }}</q-td>
        <q-td key="aciklama" colspan="7" v-if="props.row.rez_id===null">{{ props.row.aciklama.slice(0,60) }}</q-td>
        <q-td key="transfer_type_text" :props="props" v-if="props.row.rez_id!==null">{{ props.row.transfer_type_text }}</q-td>
        <q-td key="passenger_fullname" :props="props" v-if="props.row.rez_id!==null">{{ props.row.passenger_fullname.slice(0,5) }}</q-td>
        <q-td key="departure_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.departure_area_name.slice(0,8) }}</q-td>
        <q-td key="arrival_area_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.arrival_area_name.slice(0,8) }}</q-td>
        <q-td key="hotel_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.hotel_name.slice(0,8) }}</q-td>
        <q-td key="rez_id" :props="props" v-if="props.row.rez_id!==null">#{{ props.row.rez_id }}</q-td>
        <q-td key="car_name" :props="props" v-if="props.row.rez_id!==null">{{ props.row.car_name.slice(0,8) }}</q-td>
        <q-td key="cari_tutar" :props="props">{{ props.row.cari_tutar }} ₺</q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <q-tr>
        <q-td colspan="9"></q-td>
        <q-td class="total"> {{TotalAmount}} ₺</q-td>
      </q-tr>
    </template>
  </q-table>
</div>
</template>

<script>
    export default {
        name: "extre",
      data(){
        return {
          start_date:null,
          bugun:new Date().toLocaleString('tr-TR'),
          end_date:null,
          user_fullname:null,
          filter: '',
          detay:[],
          pagination: {
            sortBy: 'desc',
            descending: false,
            page: 1,
            rowsPerPage: 5,
            list: [5, 10, 15, 20, 30, 40, 50, 100, 500]
            // rowsNumber: xx if getting data from a server
          },
          columns: [
            { name: 'tarih',label: 'Tarih Saat', field: 'tarih', align: 'left'},
            { name: 'hesap_text', label: 'İşlem', field: 'hesap_text', align: 'left'},
            { name: 'transfer_type_text', label: 'Tip', field: 'transfer_type_text', align: 'left'},
            { name: 'passenger_fullname', label: 'Ad Soyad', field: 'passenger_fullname', align: 'left'},
            { name: 'departure_area_name', label: 'Nereden', field: 'departure_area_name', align: 'left'},
            { name: 'arrival_area_name', label: 'Nereye', field: 'arrival_area_name', align: 'left'},
            { name: 'hotel_name', label: 'Hotel', field: 'hotel_name', align: 'left'},
            { name: 'rez_id', label: 'Rez NO', field: 'rez_id', align: 'left'},
            { name: 'car_name', label: 'Araç', field: 'car_name', align: 'left'},
            { name: 'cari_tutar', label: 'Bakiye', field: 'cari_tutar', align: 'right'},
          ],
        }
      },
      methods: {
        changeDateFormat(tarih){
          var datearray = tarih.split("-");
          var newdate = datearray[2] + '.' + datearray[1] + '.' + datearray[0];
          return newdate;
        }
      },
      mounted() {
          window.title = "Ekstre"
          this.detay=this.$route.params.details
          this.start_date=this.$route.params.start_date
          this.end_date=this.$route.params.end_date
          this.user_fullname=this.$route.params.user_fullname
          setTimeout(()=> window.print() , 250 )
      },
      computed: {
        TotalAmount(){
          let total=0
          for (var i=0;i<this.detay.length;i++){
            if(this.detay[i].cari_tutar!==null && this.detay[i].cari_status==1){
              total=Math.ceil(parseInt(total) + parseInt(this.detay[i].cari_tutar))
            }
          }
          return total
        },
      }
    }
</script>

<style scoped>
  .q-table-container {
    box-shadow: none;
  }
  .q-table__card {
    box-shadow: none;
  }
  .title {
    text-align: center;
    font-size: 1.5em;
  }
  .report-info {
    text-align: left;
    border-bottom: none;
    font-size: 0.8em;
    font-weight: normal;
  }
    .total {
      font-size: 1.1em;font-weight: 700;text-align: right;
    }

    .report-header-top {
      border:none;
    }
    @media print {
      .page {
        width: 21cm;
        padding-bottom: 10mm;
      }
      .page-header {
        page-break-before: auto;
        padding-top: 50px;
      }
      .report-header-top {
        border:5mm solid transparent;
      }
    }
    .report-date {
    text-align: right;
    border-bottom: none;
    font-size: 0.8em;
    font-weight: normal;
  }
</style>
