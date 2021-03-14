<template>
  <div :class="classe" >
    <q-card class="text-center">
        <table>
          <tr :style="renk">
            <td class="baslik" colspan="2" style="line-height: 30px">#{{ veri.row.id }} {{ veri.row.hotel_name }}
              <q-btn
                round
                color="primary"
                class="float-right"
                size="sm"
                icon="visibility"
                v-if="CheckRole(roles)"
                @click="$emit('edited','row')"
              /></td>
          </tr>
          <tr :style="renk">
            <td colspan="2" class="baslik">
            {{ veri.row.where_text }}
            </td>
          </tr>
          <tr>
            <td class="baslik">Tarih  </td>
            <td>{{ veri.row.tarih }}</td>
          </tr>
          <tr :style="renk" v-if="veri.row.departure_paying=='2'">
            <td style="color:white;background-color:red">Ücret </td>
            <td style="color:white;background-color:red;font-size:1.4em">{{ veri.row.departure_pay_price }} {{ veri.row.departure_pay_currency }} (YOLCU ÖDEYECEK)</td>
          </tr>
          <tr :style="renk" v-else>
            <td class="baslik">Ücret </td>
            <td v-if="CheckRole('ReservationPrice')">{{ veri.row.price }} TL</td>
            <td v-else>Gizli</td>
          </tr>
          <tr>
            <td class="baslik">Nereden </td>
            <td>{{ StringCut(veri.row.departure_area_name) }}</td>
          </tr>
          <tr :style="renk">
            <td class="baslik">Nereye </td>
            <td>{{ StringCut(veri.row.arrival_area_name) }}</td>
          </tr>
          <tr>
            <td class="baslik">Kişi </td>
            <td>{{ veri.row.passenger_size }} KİŞİ</td>
          </tr>
          <tr :style="renk">
            <td class="baslik">Araç </td>
            <td>{{ veri.row.car_name }}</td>
          </tr>
          <tr v-if="veri.row.departure_flight_number!==''">
            <td class="baslik">Uçuş No </td>
            <td>{{ veri.row.departure_flight_number }} </td>
          </tr>
          <tr v-else>
            <td class="baslik">Oda No </td>
            <td>{{ veri.row.departure_room_number }} </td>
          </tr>
          <tr :style="renk">
            <td class="baslik">Şöför </td>
            <td v-if="veri.row.driver_name!==''">{{ veri.row.driver_name }} - {{ veri.row.driver_phone }}</td>
            <td v-else>Henüz belirlenmedi</td>
          </tr>
          <tr>
            <td class="baslik">Plaka </td>
            <td v-if="veri.row.plaka!==null">{{ veri.row.plaka }}</td>
            <td v-else>Henüz belirlenmedi</td>
          </tr>
        </table>
    </q-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "reservation-grid",
    props:['veri','row','columns','roles','wdth','renk'],
    methods: {
      val(v){
        return this.veri.row.row[v.field]
      },
      StringCut(value){
        return value.substring(0,25)
      }
    },
    computed: {
      ...mapState(['grid']),
      classe(){
        return "q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition col-lg-" + this.wdth
      },
      title(){
        return "#" + this.veri.row.row[this.columns[0].field]
      },
    }
  }
</script>

<style scoped>
  table {
    width: 100%;
    border:none;
  }
  .odd {

  }
  .baslik {
    text-transform: uppercase;
    font-weight: 600;
  }
</style>
