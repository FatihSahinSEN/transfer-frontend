<template>
<div class="text-center">
   <table>
	<tr class="odd">
		<td class="baslik">Transfer Tipi </td>
		<td v-if="veri.where_text == EskiVeri.where_text">{{ veri.where_text }} / {{ veri.direction_text }}</td>
    <td v-else><span class="eski">{{ EskiVeri.where_text }}</span> {{ veri.where_text }} / {{ veri.direction_text }}</td>
	</tr>
	<tr>
		<td class="baslik">Transfer Tarihi  </td>
		<td v-if="veri.tarih == EskiVeri.tarih">{{ veri.tarih }}</td>
    <td v-else><span class="eski">{{ EskiVeri.tarih }}</span> > {{ veri.tarih }}</td>
	</tr>
    <tr class="odd" v-if="veri.departure_paying=='2'">
        <td style="color:white;background-color:red">Ücret </td>
		    <td style="color:white;background-color:red;font-size:1.4em" v-if="veri.departure_pay_price==EskiVeri.departure_pay_price && veri.departure_pay_currency==EskiVeri.departure_pay_currency">{{ veri.departure_pay_price }} {{ veri.departure_pay_currency }} (YOLCU ÖDEYECEK)</td>
		    <td style="color:white;background-color:red;font-size:1.4em" v-else><span class="eski">{{ EskiVeri.departure_pay_price }} {{ EskiVeri.departure_pay_currency }}</span>{{ veri.departure_pay_price }} {{ veri.departure_pay_currency }} (YOLCU ÖDEYECEK)</td>
    </tr>
    <tr class="odd" v-else>
      <td class="baslik">Ücret </td>
      <td v-if="CheckRole('ReservationPrice')">
          <span v-if="veri.price==EskiVeri.price">{{ veri.price }} TL</span>
        <span v-else><span class="eski">{{EskiVeri.price}} TL</span> {{ veri.price }} TL</span>
      </td>
      <td v-else>Gizli</td>
    </tr>
    <tr>
        <td class="baslik">Nereden </td>
		    <td v-if="veri.departure_area_name==EskiVeri.departure_area_name">{{ veri.departure_area_name }}</td>
		    <td v-else><span class="eski">{{ EskiVeri.departure_area_name.substr(0,20) }}</span>  {{ veri.departure_area_name }}</td>
    </tr>
    <tr class="odd">
        <td class="baslik">Nereye </td>
		    <td v-if="veri.arrival_area_name==EskiVeri.arrival_area_name">{{ veri.arrival_area_name }}</td>
		    <td v-else><span class="eski">{{ EskiVeri.arrival_area_name }}</span> {{ veri.arrival_area_name }}</td>
    </tr>
    <tr>
        <td class="baslik">Hotel </td>
		    <td v-if="veri.hotel_name==EskiVeri.hotel_name">{{ veri.hotel_name }}</td>
        <td v-else><span class="eski">{{EskiVeri.hotel_name}}</span>{{ veri.hotel_name }}</td>
    </tr>
    <tr class="odd">
        <td class="baslik">Kişi Sayısı </td>
		    <td v-if="veri.passenger_size==EskiVeri.passenger_size">{{ veri.passenger_size }} KİŞİ</td>
		    <td v-else><span class="eski">{{EskiVeri.passenger_size}}</span> {{ veri.passenger_size }} KİŞİ</td>
    </tr>
    <tr>
        <td class="baslik">Araç </td>
    		<td v-if="veri.car_name==EskiVeri.car_name">{{ veri.car_name }}</td>
    		<td v-else><span class="eski">{{EskiVeri.car_name}}</span>{{ veri.car_name }}</td>
    </tr>
    <tr class="odd" v-if="veri.departure_flight_number!==''">
        <td class="baslik">Uçuş No </td>
		    <td v-if="veri.departure_flight_number==EskiVeri.departure_flight_number">{{ veri.departure_flight_number }} </td>
		    <td v-else><span class="eski">{{EskiVeri.departure_flight_number}}</span> {{ veri.departure_flight_number }} </td>
    </tr>
    <tr class="odd" v-else>
        <td class="baslik">Oda No </td>
		    <td v-if="veri.departure_room_number==EskiVeri.departure_room_number">{{ veri.departure_room_number }} </td>
		    <td v-else><span class="eski">{{EskiVeri.departure_flight_number}}</span> {{ veri.departure_room_number }} </td>
    </tr>
    <tr>
        <td class="baslik">Şöför </td>
		    <td v-if="veri.driver_name!==''">{{ veri.driver_name }} - {{ veri.driver_phone }}</td>
        <td v-else>Henüz belirlenmedi</td>
    </tr>
        <tr class="odd">
        <td class="baslik">Plaka </td>
        <td v-if="veri.plaka!==null">{{ veri.plaka }}</td>
        <td v-else>Henüz belirlenmedi</td>
    </tr>
    <tr>
        <td class="baslik"> NOT:</td>
        <td v-if="veri.reservation_note==EskiVeri.reservation_note">{{veri.reservation_note}}</td>
        <td v-else><span class="eski">{{EskiVeri.reservation_note}}</span> {{veri.reservation_note}}</td>
    </tr>
</table>

<hr />
<table>
    <tr>
        <td colspan="5" class="baslik">YOLCULAR</td>
    </tr>
    <tr v-for="passenger in veri.passengers">
        <td>{{ passenger.country_name }}</td>
        <td>{{ passenger.identity }}</td>
        <td>{{ passenger.firstname }}</td>
        <td>{{ passenger.lastname }}</td>
        <td>{{ passenger.phone }}</td>
    </tr>
</table>
<hr />
			<b>Oluşturan : </b>{{ veri.created_user }} - {{ veri.created }}
</div>
</template>
<script>
export default {
    name: "TransferDetailTable",
    props: {
      veri: {
        type: Object,
        required: true
      },
      EskiVeri:{
        type: Object,
        required: true
      }
    },
}
</script>
<style scoped>
table {
    width: 100%;
    border:none;
}
.odd {
    background-color: rgb(255, 234, 234);
    border-bottom: 1px solid rgb(170, 28, 28);
}
.baslik {
    text-transform: uppercase;
    font-weight: 600;
}
  .eski {
    text-decoration:line-through;
    color:#9e9e9e;
  }
</style>
