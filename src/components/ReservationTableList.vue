<template>
  <q-tr :props="props" @click="TransferDetail('',props.row,props.rowIndex)" v-if="ShowTransferStatus(props.row.transfer_status)" :style="RowColors(props.row.departure_date)">
    <q-td key="id" :props="props" v-if="props.row.update_id > 0">
      #{{ props.row.id }} <q-icon name="history" style="font-size: 1.2em" /> <q-tooltip content-style="font-size:1.2em;">#{{ props.row.update_id }} -> #{{ props.row.id }}</q-tooltip>
    </q-td>
    <q-td key="id" :props="props" v-else>
      #{{ props.row.id }}
    </q-td>
    <q-td key="hotel_name" :props="props" v-if="width<1599">
      <b>{{ props.row.hotel_name }}</b>
    </q-td>
    <q-td key="hotel_name" :props="props" v-else>
      <b>{{ props.row.hotel_name }}</b>
    </q-td>
    <q-td key="transfer_status_text" :props="props">
      <q-badge :style="ReturnStatus(props.row.transfer_status).color">
        {{ ReturnStatus(props.row.transfer_status).text }}
      </q-badge>
    </q-td>
    <q-td key="departure_date" :props="props">
      {{ props.row.tarih }}
    </q-td>
    <q-td key="flight_or_room" :props="props">
      {{ props.row.flight_or_room }}
    </q-td>
    <q-td key="transfer_type_text" :props="props">
      {{ props.row.transfer_type_text }}
    </q-td>
    <q-td key="departure_area_name" :props="props">
      <q-tooltip v-if="width<1599">{{ props.row.departure_area_name }}</q-tooltip>
      {{ TableSubstr(props.row.departure_area_name) }}
    </q-td>
    <q-td key="arrival_area_name" :props="props">
      <q-tooltip v-if="width<1599">{{ props.row.arrival_area_name }}</q-tooltip>
      {{ TableSubstr(props.row.arrival_area_name) }}
    </q-td>
    <q-td key="passengers_name" :props="props">
      <q-tooltip v-if="width<1599">{{ props.row.passengers_name }}</q-tooltip>
      {{ props.row.passengers_name }}
    </q-td>
    <q-td key="passenger_size" :props="props">
      {{ props.row.passenger_size }}
    </q-td>
    <q-td key="car_name" :props="props">
      {{ props.row.car_name }}
    </q-td>
    <q-td key="plaka" :props="props">
      {{ props.row.plaka }}
    </q-td>
    <q-td key="driver_name" :props="props">
      {{ props.row.driver_name }}
    </q-td>
    <q-td key="ucret" :props="props" v-if="CheckRole('ReservationPrice')">
      {{ props.row.ucret }}
    </q-td>
    <q-td key="ucret" :props="props" v-else>
      -
    </q-td>
  </q-tr>
</template>

<script>
    export default {
        name: "ReservationTableList"
    }
</script>

<style scoped>

</style>
