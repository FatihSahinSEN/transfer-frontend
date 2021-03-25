<template>
  <div size="A4" class="page">
    <table style="width: 100%;" class="ust">
      <tr>
        <td style="font-size:2em;" colspan="3"  class="notranslate">
          <span translate="no">Go By VIP</span>
        </td>
        <td style="text-align: right;color: red" colspan="1">
        <b>Reservation Number :</b> # {{ veri.id  }}
      </td>
      </tr>
      <tr>
        <td style="font-size: 1.4em;text-align: center;border-bottom: 1px solid #ddd" colspan="4">
         Transfer Information
        </td>
      </tr>
      <tr>
        <td>
          <b>Name and Surname	:</b>
        </td>
        <td>{{ veri.passengers[0].firstname }} {{ veri.passengers[0].lastname }}</td>
        <td>
          <b>E-Mail :</b>
        </td>
        <td> {{ veri.passengers[0].email }}</td>
      </tr>
      <tr>
        <td>
          <b>Status :</b>
        </td>
        <td v-if="veri.transfer_status==4 || veri.transfer_status==5"> <b style="color:red">Canceled</b></td>
        <td v-else> Confirmed</td>
        <td>
          <b>Phone :</b>
        </td>
          <td>{{ veri.passengers[0].phone }}</td>
      </tr>
      <tr>
        <td><b>Booking Date	:</b></td>
        <td>{{ veri.created_en }}</td>
        <td><b>Pax	:</b></td>
        <td>{{ veri.passenger_size }} Pax</td>
      </tr>
      <tr>
        <td colspan="1">
          <b>Transfer Type	:</b></td>
        <td colspan="3"> {{ veri.direction_text_en }}</td>
      </tr>
      <tr>
        <td style="font-size: 1.4em;text-align: center;border-bottom: 1px solid #ddd;" colspan="4">
          Departure Information
        </td>
      </tr>
      <tr>
        <td><b>From : </b></td>
        <td>{{ veri.departure_area_name }}</td>
        <td><b>Pick Up Date	: </b></td>
        <td>{{ veri.tarih_en }}</td>
      </tr>
      <tr>
        <td><b>To : </b></td>
        <td>{{ veri.arrival_area_name }}</td>
        <td><b>Pick Up Time	: </b></td>
        <td>{{ veri.saat_en }}</td>
      </tr>
      <tr>
        <td><b>Cars	: </b></td>
        <td>{{ veri.car_name }}</td>
        <td v-if="veri.transfer_type==2 || veri.transfer_type==4"><b>Flight No	: </b></td>
        <td v-if="veri.transfer_type==1 || veri.transfer_type==3"><b>Room Number	: </b></td>
        <td>{{ veri.flight_or_room }}</td>
      </tr>
      <tr>
        <td colspan="1"><b>Hotel	: </b></td>
        <td colspan="3">{{ veri.hotel_name }} ({{ veri.hotel_address }})</td>
      </tr>
      <tr>
        <td><b>Plaka	: </b></td>
        <td>{{ veri.plaka }}</td>
        <td><b>Sofor :</b></td>
        <td>{{ veri.driver_name}} {{ veri.driver_phone}}</td>
      </tr>
      <tr>
        <td colspan="1"><b>Note:</b></td>
        <td colspan="3">{{ veri.reservation_note }}</td>

      </tr>
    </table>

    <div style="width: 100%;font-size:1.4em;text-align: center;margin-top: 20px"> Passengers</div>
    <table style="width: 100%;" class="alt">
      <th>Country</th>
      <th>Gender</th>
      <th>Passport No</th>
      <th>Name</th>
      <th>Phone</th>
      <tr v-for="yolcu in veri.passengers">
        <td>{{yolcu.country_sortname}}</td>
        <td v-if="yolcu.gender==1">Mrs. / Kadın</td>
        <td v-if="yolcu.gender==2">Mr. / Erkek</td>
        <td>{{yolcu.identity}}</td>
        <td>{{yolcu.firstname}} {{yolcu.lastname}}</td>
        <td>{{yolcu.phone}}</td>
      </tr>
    </table>

    <div class="info" >
      <p v-html="htmlData"></p>
      <div class="kase notranslation">
        <img :src="KaseIMG" />
      </div>
    </div>



  </div>
</template>

<script>
  import {mapState} from "vuex";
    export default {
        name: "VoucherPages",
      data() {
          return {
            veri:[],
            showData:true,
            htmlData:"",
            KaseIMG:"/assets/upload/" + this.parameters.SYSTEM_KASE
          }
      },
      methods: {
          getDataAPI(){
          this.$q.loading.show()
          if(this.$route.params.data){
                  var url ='reservation/get/'+ this.$route.params.data
                  this.$axios.get(url)
                    .then((result) => {
                      this.showData=true
                      this.$q.loading.hide()
                      this.veri=result.data.return[0]
                      this.htmlData=this.parameters.SYSTEM_VOUCHER_TEXT;
                      this.htmlData=this.htmlData.replace("YOLCU_ADI", this.veri.passengers[0].firstname)
                      this.htmlData=this.htmlData.replace("YOLCU_SOYADI", this.veri.passengers[0].lastname)
                    })
                    .catch((err) => {
                      this.$q.loading.hide()
                      this.showData=false
                      this.alert("HATA", err);
                    });
            }else{
                this.$q.loading.hide()
                this.showData=false
            }
          },
      },
      mounted() {
        this.getParameters()
        this.getDataAPI()
      },

      computed: {
        ...mapState(["parameters"]),
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
  .ust > tr > td, .alt > tr > td {
    border-bottom: 1px solid #ddd;
  }
  .alt > th {
    text-align:left;
    border-bottom: 1px solid #000;
  }
  .info {
    font-size: 1.1em;
    line-height: 1.8em;
    margin-top: 1em;
  }
  a {
    color: #e2041b;
    font-weight: 700;
  }
  .kase {
    border: 1px solid #000;
    width: 20%;
    float: right;
    margin-right: 6em;
    margin-top: 5em;
    text-align: center;
  }

</style>
