<template>
  <div class="q-pa-md" v-if="CheckRole('ReservationCreate')">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        :title="transfer_type_title"
        active-color="primary"
        done-color="red-3"
        color="red-3"
        :done="step > 1"
      >
        <q-select
          filled
          emit-value
          v-model="transfer_type_model"
          option-label="name"
          label="Transfer Tipi"
          color="primary"
          style="margin-bottom:20px"
          :options="transfer_type"
        >
        </q-select>
        <q-select
          filled
          emit-value
          option-label="name"
          v-model="transfer_direction_model"
          label="Transfer Yönü"
          color="primary"

          :options="transfer_direction"
        >
        </q-select>

        <q-stepper-navigation>
          <q-btn
            @click="step1FN"
            color="primary"
            label="Devam"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        :title="nereden_nereye_title"
        icon="directions_bus"
        :done="step > 2"
        active-color="primary"
        done-color="red-3"
        color="red-3"
      >
        <q-select
          filled
          emit-value
          dense
          options-dense
          v-model="nereden_model"
          option-label="area_name"
          label="Kalkış bölgesi seçiniz."
          color="primary"
          style="margin-bottom:20px"
          @input="ChangeArea"
          :options="nereden"
        >
        </q-select>
        <q-select
          filled
          emit-value
          dense
          options-dense
          v-model="nereye_model"
          option-label="area_name"
          label="Varış bölgesi seçiniz."
          color="primary"
          style="margin-bottom:20px"
          @input="ChangeArea"
          :options="nereye"
        >
        </q-select>

        <q-select
          filled
          emit-value
          options-dense
          use-input
          use-chips
          dense
          ref="qselect"
          input-debounce="0"
          v-model="hotel_model"
          option-label="hotel_name"
          label="Otel seçiniz."
          color="primary"
          style="margin-bottom:20px"
          @input="hotelChange"
          @filter="hotelFiltre"
          @popup-show="clearHotelFilter"
          :options="ShowHotels"
        >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sonuç yok
            </q-item-section>
          </q-item>
        </template>
        </q-select>
        <q-input
          v-if="hotel_diger"
          v-model="hotel_address"
          option-label="hotel_name"
          label="Otel veya müşteri adresini giriniz.."
          filled
          type="textarea"
        />

        <q-stepper-navigation>
          <q-btn
            @click="step2FN"
            color="primary"
            label="Devam"
          />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Geri"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        :title="car_people_title"
        icon="directions_bus"
        :done="step > 3"
        active-color="primary"
        done-color="red-3"
        color="red-3"
      >
      <q-chip square color="red" text-color="white" icon="disabled_by_default" :label="price_uyari" v-if="price_uyari!=null"/>
      <q-select
          filled
          emit-value
          v-model="car_model"
          option-label="car_name"
          label="Araç Tipi"
          color="primary"
          style="margin-bottom:20px"
          @input="carChange"

          :options="cars"
        >
        </q-select>
        <q-select
          filled
          emit-value
          v-model="people_number"
          label="Yolcu Sayısı"
          color="primary"
          style="margin-bottom:20px"
          :options="people"
          @input="passengerChange"
        >
        </q-select>

        <q-input
          filled
          v-model="transfer_payment"
          label="Toplam Ücret"
          icon="₺"
          readonly
        />
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="DEVAM"
            v-if="price_uyari==null"
            @click="step3FN"
          />

          <q-btn
            flat
            @click="step = 2;price_uyari=null"
            color="primary"
            label="Geri"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
       <q-step
        :name="4"
        title="Yolcu Bilgisi"
        icon="people"
        :done="step > 4"
        active-color="primary"
        done-color="red-3"
        color="red-3"
      >
      <div v-if="passenger_total>0">
        <q-btn
          @click="step = 3"
          color="primary"
          label="Geri"
          class="q-ml-sm"
        />
          <p>Lütfen Yolcu Bilgilerini Eksiksiz Doldurunuz...</p>
        <div class="row">
          <q-card class="column" style="margin-bottom: 20px;margin-right: 20px;" v-for="n in this.passengers.length" :key="n">
            <q-card-section>
              <div class="text-h6">YOLCU {{ n }}</div>
            </q-card-section>

            <q-separator />

          <q-card-actions vertical style="margin-bottom:10px;">
                <q-select
                filled
                emit-value
                use-input
                dense
                options-dense
                v-model="passengers[n-1].country"
                option-label="name"
                label="Ülke seçiniz."
                color="primary"
                @filter="countryFilter"
                :rules="[v => v || 'Ülke Seçmediniz.']"
                :options="countries"
                style="max-width: 200px"
              >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-black">
                    Sonuç yok
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select
                filled
                emit-value
                dense
                v-model="passengers[n-1].gender"
                option-label="name"
                label="Cinsiyet"
                color="primary"
                style="margin-bottom:20px"

                :options="gender"
                :rules="[v => v || 'Cinsiyet Seçmediniz.']"
              >
            </q-select>
                <q-input
                  outlined
                  dense
                  bottom-slots
                  fill-mask
                  lazy-rules
                  v-model="passengers[n-1].identity"
                  label="Kimlik veya Pasaport No"
                  :rules="[v => v && v.length > 4 || 'Pasaport veya Kimlik NO Giriniz.']"
                ></q-input>
                <q-input
                  outlined
                  dense
                  bottom-slots
                  fill-mask
                  lazy-rules
                  v-model="passengers[n-1].firstname"
                  label="Yolcu Adı"
                  :rules="[v => v && v.length > 2 || 'Yolcu Adını girmeniz zorunludur.']"
                  required
                ></q-input>
                <q-input
                  outlined
                  dense
                  bottom-slots
                  fill-mask
                  lazy-rules
                  v-model="passengers[n-1].lastname"
                  label="Yolcu Soyadı"
                  :rules="[v => v && v.length > 2 || 'Yolcu Soyadını girmeniz zorunludur.']"
                  required
                ></q-input>
                <q-input
                  outlined
                  dense
                  bottom-slots
                  fill-mask
                  lazy-rules
                  v-model="passengers[n-1].phone"
                  label="Yolcu Telefon (isteğe bağlı)"
                ></q-input>
                  <q-input
                  outlined
                  dense
                  bottom-slots
                  fill-mask
                  lazy-rules
                  v-model="passengers[n-1].email"
                  label="Yolcu Eposta (isteğe bağlı)"
                ></q-input>
            </q-card-actions>
          </q-card>
        </div>
        </div>
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="DEVAM"
            @click="step4FN"
          />

          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Geri"
            class="q-ml-sm"
          />
        </q-stepper-navigation>


        </q-step>
        <div v-html="passengers_title" style="margin:0em 0em 0em 2em;color:#000 !important;font-weight:500"></div>
        <q-step
        :name="5"
        title="Tarih , Uçuş bilgileri, Ödeme, Not"
        icon="calendar_today"
        active-color="primary"
        done-color="red-3"
        color="red-3"
      >
       <q-stepper-navigation>
         <div style="display:flex;flex-flow:row wrap;flex-basis: 300px;">
         <div style="max-width: 320px;margin-right:5%;border-bottom:4px solid #ccc;margin-bottom:10px;width: 300px">
  <div style="margin-bottom:20px;display: flex;">

    <q-input dense filled v-model="departure" type="date" label="Gidiş Tarih" mask="##.##.####" label-color="primary" style="width: 200px;margin-right: 20px" :min="formatDate(new Date())"></q-input>
    <q-input dense filled v-model="departure_time" @input="CheckReservationTime" :rules="['time']" mask="time" label-color="primary" label="Saat" style="width: 100px;margin-top:20px">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" ref="timePick" transition-hide="scale">
            <q-time v-model="departure_time" :hour-options="departure_time_hour_limit" :minute-options="[0, 5,10,15,20,25,30,35,40,45,50,55]" color="primary" @input="() => $refs.timePick.hide()" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="KAPAT" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  <div v-if="transfer_direction_model !== null">
    <div v-if="transfer_direction_model !== null && transfer_direction_model.id==1 || transfer_direction_model.id == 3" >
      <q-input
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="flight_number_departure"
        label="Uçuş No"
      ></q-input>
    </div>
    <div v-else>
      <q-input
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="room_number_departure"
        label="Oda No"
      ></q-input>
    </div>
    <div style="margin-bottom:20px"><p>Ödeme Kimden Alınacak?</p>
    <q-radio v-model="payment_person_departure" val="musteri" color="primary" label="Yolcu" />
    <q-radio v-model="payment_person_departure" val="hotel" color="primary" label="Hotel" />
    </div>
    <div v-if="payment_person_departure=='musteri'" style="display:flex">
      <q-input
          outlined
          dense
          bottom-slots
          fill-mask
          lazy-rules
          v-model="payment_costumer_departure"
          label="Ödeme Miktarını Giriniz"
          style="width:50%;margin-right:2%"
        ></q-input>
        <q-select
            filled
            emit-value
            dense
            v-model="payment_currency_departure"
            label="Para Birimi"
            color="primary"
            style="margin-bottom:20px;width:45%"

            :options="['EURO','TL','USD','POUND']"
          >
        </q-select>
    </div>
    <div v-else></div>
  </div>
         </div>
  <div v-if="transfer_direction_model !== null">
  <div v-if="transfer_type_model.id==2" style="max-width: 300px;border-bottom:4px solid #ccc;margin-bottom:10px;">
          <div style="margin-bottom:20px;display: flex">
            <q-input dense filled v-model="arrival" type="date" label="Gidiş Tarih" mask="##.##.####" label-color="primary" style="width: 200px;margin-right: 20px" :min="departure"></q-input>
            <q-input dense filled v-model="arrival_time" :rules="['time']" mask="time" label-color="primary" label="Saat" style="width: 100px;margin-top:20px">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" ref="timePick" transition-hide="scale">
                    <q-time v-model="arrival_time" color="primary" @input="() => $refs.timePick.hide()" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="KAPAT" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
        </div>
<div v-if="transfer_direction_model.id==2 || transfer_direction_model.id == 4" >
      <q-input
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="flight_number_arrival"
        label="Uçuş No"
      ></q-input>
    </div>
    <div v-else>
      <q-input
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="room_number_arrival"
        label="Oda No"
      ></q-input>
    </div>
    <div style="margin-bottom:20px"><p>Ödeme Kimden Alınacak?</p>
    <q-radio v-model="payment_person_arrival" val="musteri" color="primary" label="Yolcu" />
    <q-radio v-model="payment_person_arrival" val="hotel" color="primary" label="Hotel" />
    </div>
    <div v-if="payment_person_arrival=='musteri'" style="display:flex">
      <q-input
          outlined
          dense
          bottom-slots
          fill-mask
          lazy-rules
          v-model="payment_costumer_arrival"
          label="Ödeme Miktarını Giriniz"
          style="width:50%;margin-right:2%"
        ></q-input>
        <q-select
            filled
            emit-value
            dense
            v-model="payment_currency_arrival"
            label="Para Birimi"
            color="primary"
            style="margin-bottom:20px;width:45%"
            :options="['EURO','TL','USD','POUND']"
          >
        </q-select>
    </div>

  </div>
  </div>

  </div>
        <q-input
      v-model="reservation_note"
      filled
      label="Transfer Notları"
      label-color="primary"
      type="textarea"
      style="margin-bottom:25px;"
    />

          <q-btn
            flat
            @click="step = 4"
            color="primary"
            label="Geri"
            class="q-ml-sm"
          />
          <q-btn
            color="primary"
            label="REZERVASYON KAYDET"
            @click="reservationSave"
          />

        </q-stepper-navigation>


        </q-step>
    </q-stepper>
  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>
</template>


<script>

export default {
  name: 'reservationCreate',
  data () {
    return {
      departure_time_hour_limit:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      nereden_nereye_title: "Nereden > Nereye",
      transfer_type_title: "Transfer Yönü *",
      car_people_title: "Araç, Kişi sayısı Ücret",
      transfer_tarih:null,
      departure_time:'',
      arrival_time:'',
      transfer_direction: [
        {
          id: 1,
          name: "Havalimanı > Bölge",
        },
        {
          id: 2,
          name: "Bölge > Havalimanı"
        }, {
          id: 3,
          name: "Havalimanı > Havalimanı"
        }, {
          id: 4,
          name: "Bölge > Bölge"
        }],
      transfer_direction_model: null,
      transfer_type_model: null,
      transfer_type: [
        {
          id: 1,
          name: "Tek Yön"
        }, {
          id: 2,
          name: "Çift Yön"
        }
      ],
      nereden: null,
      nereye: null,
      hotel: null,
      nereden_model: null,
      nereye_model: null,
      hotel_model: null,
      hotel_diger: false,
      hotel_address: null,
      hotel_options:null,
      car_model: null,
      cars: null,
      transfer_payment: 0,
      loading: false,
      step: 1,
      price_uyari: null,
      min_people:1,
      max_people:10,
      people:[],
      people_number:0,
      passengers: [],
      passenger_total:0,
      countries_options:null,
      countries: [
        {"id":"1","sortname":"AF","name":"Afganistan","phonecode":"93"},
        {"id":"2","sortname":"AL","name":"Arnavutluk","phonecode":"355"},
        {"id":"3","sortname":"DZ","name":"Cezayir","phonecode":"213"},
        {"id":"4","sortname":"AS","name":"Amerikan Samoası","phonecode":"1684"},
        {"id":"5","sortname":"AD","name":"Andora","phonecode":"376"},
        {"id":"6","sortname":"AO","name":"Angola","phonecode":"244"},
        {"id":"7","sortname":"AI","name":"Anguilla","phonecode":"1264"},
        {"id":"8","sortname":"AQ","name":"Antarktika","phonecode":"0"},
        {"id":"9","sortname":"AG","name":"Antigua ve Barbuda","phonecode":"1268"},
        {"id":"10","sortname":"AR","name":"Arjantin","phonecode":"54"},
        {"id":"11","sortname":"AM","name":"Ermenistan","phonecode":"374"},
        {"id":"12","sortname":"AW","name":"Aruba","phonecode":"297"},
        {"id":"13","sortname":"AU","name":"Avustralya","phonecode":"61"},
        {"id":"14","sortname":"AT","name":"Avusturya","phonecode":"43"},
        {"id":"15","sortname":"AZ","name":"Azerbaycan","phonecode":"994"},
        {"id":"16","sortname":"BS","name":"Bahamalar","phonecode":"1242"},
        {"id":"17","sortname":"BH","name":"Bahreyn","phonecode":"973"},
        {"id":"18","sortname":"BD","name":"Bangladeş","phonecode":"880"},
        {"id":"19","sortname":"BB","name":"Barbados","phonecode":"1246"},
        {"id":"20","sortname":"BY","name":"Beyaz Rusya","phonecode":"375"},
        {"id":"21","sortname":"BE","name":"Belçika","phonecode":"32"},
        {"id":"22","sortname":"BZ","name":"Belize","phonecode":"501"},
        {"id":"23","sortname":"BJ","name":"Benin","phonecode":"229"},
        {"id":"24","sortname":"BM","name":"Bermuda","phonecode":"1441"},
        {"id":"25","sortname":"BT","name":"Bhutan","phonecode":"975"},
        {"id":"26","sortname":"BO","name":"Bolivya","phonecode":"591"},
        {"id":"27","sortname":"BA","name":"Bosna Hersek","phonecode":"387"},
        {"id":"28","sortname":"BW","name":"Botsvana","phonecode":"267"},
        {"id":"29","sortname":"BV","name":"Bouvet Adası","phonecode":"0"},
        {"id":"30","sortname":"BR","name":"Brezilya","phonecode":"55"},
        {"id":"31","sortname":"IO","name":"Hint Okyanusu İngiliz Bölgesi","phonecode":"246"},
        {"id":"32","sortname":"BN","name":"Brunei","phonecode":"673"},
        {"id":"33","sortname":"BG","name":"Bulgaristan","phonecode":"359"},
        {"id":"34","sortname":"BF","name":"Burkina Faso","phonecode":"226"},
        {"id":"35","sortname":"BI","name":"Burundi","phonecode":"257"},
        {"id":"36","sortname":"KH","name":"Kamboçya","phonecode":"855"},
        {"id":"37","sortname":"CM","name":"Kamerun","phonecode":"237"},
        {"id":"38","sortname":"CA","name":"Kanada","phonecode":"1"},
        {"id":"39","sortname":"CV","name":"Cape Verde","phonecode":"238"},
        {"id":"40","sortname":"KY","name":"Kayman Adaları","phonecode":"1345"},
        {"id":"41","sortname":"CF","name":"Orta Afrika Cumhuriyeti","phonecode":"236"},
        {"id":"42","sortname":"TD","name":"Çad","phonecode":"235"},
        {"id":"43","sortname":"CL","name":"Şili","phonecode":"56"},
        {"id":"44","sortname":"CN","name":"Çin","phonecode":"86"},
        {"id":"45","sortname":"CX","name":"Christmas Adası","phonecode":"61"},
        {"id":"46","sortname":"CC","name":"Cocos Adaları","phonecode":"672"},
        {"id":"47","sortname":"CO","name":"Kolombiya","phonecode":"57"},
        {"id":"48","sortname":"KM","name":"Komorlar","phonecode":"269"},
        {"id":"49","sortname":"CG","name":"Kongo","phonecode":"242"},
        {"id":"50","sortname":"CD","name":"Kongo Demokratik Cumhuriyeti","phonecode":"242"},
        {"id":"51","sortname":"CK","name":"Cook Adaları","phonecode":"682"},
        {"id":"52","sortname":"CR","name":"Kosta Rika","phonecode":"506"},
        {"id":"53","sortname":"CI","name":"Fildişi Sahilleri","phonecode":"225"},
        {"id":"54","sortname":"HR","name":"Hırvatistan","phonecode":"385"},
        {"id":"55","sortname":"CU","name":"Küba","phonecode":"53"},
        {"id":"56","sortname":"CY","name":"Güney Kıbrıs Rum Kesimi","phonecode":"357"},
        {"id":"57","sortname":"CZ","name":"Çek Cumhuriyeti","phonecode":"420"},
        {"id":"58","sortname":"DK","name":"Danimarka","phonecode":"45"},
        {"id":"59","sortname":"DJ","name":"Cibuti","phonecode":"253"},
        {"id":"60","sortname":"DM","name":"Dominik","phonecode":"1767"},
        {"id":"61","sortname":"DO","name":"Dominik Cumhuriyeti","phonecode":"1809"},
        {"id":"62","sortname":"TP","name":"East Timor","phonecode":"670"},
        {"id":"63","sortname":"EC","name":"Ekvator","phonecode":"593"},
        {"id":"64","sortname":"EG","name":"Mısır","phonecode":"20"},
        {"id":"65","sortname":"SV","name":"El Salvador","phonecode":"503"},
        {"id":"66","sortname":"GQ","name":"Ekvator Ginesi","phonecode":"240"},
        {"id":"67","sortname":"ER","name":"Eritre","phonecode":"291"},
        {"id":"68","sortname":"EE","name":"Estonya","phonecode":"372"},
        {"id":"69","sortname":"ET","name":"Etiyopya","phonecode":"251"},
        {"id":"70","sortname":"XA","name":"External Territories of Australia","phonecode":"61"},
        {"id":"71","sortname":"FK","name":"Falkland Adaları (Malvinalar)","phonecode":"500"},
        {"id":"72","sortname":"FO","name":"Faroe Adaları","phonecode":"298"},
        {"id":"73","sortname":"FJ","name":"Fiji","phonecode":"679"},
        {"id":"74","sortname":"FI","name":"Finlandiya","phonecode":"358"},
        {"id":"75","sortname":"FR","name":"Fransa","phonecode":"33"},
        {"id":"76","sortname":"GF","name":"Fransız Guyanası","phonecode":"594"},
        {"id":"77","sortname":"PF","name":"Fransız Polinezyası","phonecode":"689"},
        {"id":"78","sortname":"TF","name":"Fransız Güney Bölgeleri","phonecode":"0"},
        {"id":"79","sortname":"GA","name":"Gabon","phonecode":"241"},
        {"id":"80","sortname":"GM","name":"Gambia","phonecode":"220"},
        {"id":"81","sortname":"GE","name":"Gürcistan","phonecode":"995"},
        {"id":"82","sortname":"DE","name":"Almanya","phonecode":"49"},
        {"id":"83","sortname":"GH","name":"Gana","phonecode":"233"},
        {"id":"84","sortname":"GI","name":"Cebelitarık","phonecode":"350"},
        {"id":"85","sortname":"GR","name":"Yunanistan","phonecode":"30"},
        {"id":"86","sortname":"GL","name":"Grönland","phonecode":"299"},
        {"id":"87","sortname":"GD","name":"Granada","phonecode":"1473"},
        {"id":"88","sortname":"GP","name":"Guadeloupe","phonecode":"590"},
        {"id":"89","sortname":"GU","name":"Guam","phonecode":"1671"},
        {"id":"90","sortname":"GT","name":"Guatemala","phonecode":"502"},
        {"id":"91","sortname":"XU","name":"Guernsey and Alderney","phonecode":"44"},
        {"id":"92","sortname":"GN","name":"Gine","phonecode":"224"},
        {"id":"93","sortname":"GW","name":"Gine-Bissau","phonecode":"245"},
        {"id":"94","sortname":"GY","name":"Guyana","phonecode":"592"},
        {"id":"95","sortname":"HT","name":"Haiti","phonecode":"509"},
        {"id":"96","sortname":"HM","name":"Heard Adası ve McDonald Adaları","phonecode":"0"},
        {"id":"97","sortname":"HN","name":"Honduras","phonecode":"504"},
        {"id":"98","sortname":"HK","name":"Hong Kong SAR - Çin","phonecode":"852"},
        {"id":"99","sortname":"HU","name":"Macaristan","phonecode":"36"},
        {"id":"100","sortname":"IS","name":"İzlanda","phonecode":"354"},
        {"id":"101","sortname":"IN","name":"Hindistan","phonecode":"91"},
        {"id":"102","sortname":"ID","name":"Endonezya","phonecode":"62"},
        {"id":"103","sortname":"IR","name":"İran","phonecode":"98"},
        {"id":"104","sortname":"IQ","name":"Irak","phonecode":"964"},
        {"id":"105","sortname":"IE","name":"İrlanda","phonecode":"353"},
        {"id":"106","sortname":"IL","name":"İsrail","phonecode":"972"},
        {"id":"107","sortname":"IT","name":"İtalya","phonecode":"39"},
        {"id":"108","sortname":"JM","name":"Jamaika","phonecode":"1876"},
        {"id":"109","sortname":"JP","name":"Japonya","phonecode":"81"},
        {"id":"110","sortname":"XJ","name":"Jersey","phonecode":"44"},
        {"id":"111","sortname":"JO","name":"Ürdün","phonecode":"962"},
        {"id":"112","sortname":"KZ","name":"Kazakistan","phonecode":"7"},
        {"id":"113","sortname":"KE","name":"Kenya","phonecode":"254"},
        {"id":"114","sortname":"KI","name":"Kiribati","phonecode":"686"},
        {"id":"115","sortname":"KP","name":"Kuzey Kore","phonecode":"850"},
        {"id":"116","sortname":"KR","name":"Güney Kore","phonecode":"82"},
        {"id":"117","sortname":"KW","name":"Kuveyt","phonecode":"965"},
        {"id":"118","sortname":"KG","name":"Kırgızistan","phonecode":"996"},
        {"id":"119","sortname":"LA","name":"Laos","phonecode":"856"},
        {"id":"120","sortname":"LV","name":"Letonya","phonecode":"371"},
        {"id":"121","sortname":"LB","name":"Lübnan","phonecode":"961"},
        {"id":"122","sortname":"LS","name":"Lesotho","phonecode":"266"},
        {"id":"123","sortname":"LR","name":"Liberya","phonecode":"231"},
        {"id":"124","sortname":"LY","name":"Libya","phonecode":"218"},
        {"id":"125","sortname":"LI","name":"Liechtenstein","phonecode":"423"},
        {"id":"126","sortname":"LT","name":"Litvanya","phonecode":"370"},
        {"id":"127","sortname":"LU","name":"Lüksemburg","phonecode":"352"},
        {"id":"128","sortname":"MO","name":"Makao S.A.R. Çin","phonecode":"853"},
        {"id":"129","sortname":"MK","name":"Makedonya","phonecode":"389"},
        {"id":"130","sortname":"MG","name":"Madagaskar","phonecode":"261"},
        {"id":"131","sortname":"MW","name":"Malavi","phonecode":"265"},
        {"id":"132","sortname":"MY","name":"Malezya","phonecode":"60"},
        {"id":"133","sortname":"MV","name":"Maldivler","phonecode":"960"},
        {"id":"134","sortname":"ML","name":"Mali","phonecode":"223"},
        {"id":"135","sortname":"MT","name":"Malta","phonecode":"356"},
        {"id":"136","sortname":"XM","name":"Man (Isle of)","phonecode":"44"},
        {"id":"137","sortname":"MH","name":"Marshall Adaları","phonecode":"692"},
        {"id":"138","sortname":"MQ","name":"Martinik","phonecode":"596"},
        {"id":"139","sortname":"MR","name":"Moritanya","phonecode":"222"},
        {"id":"140","sortname":"MU","name":"Mauritius","phonecode":"230"},
        {"id":"141","sortname":"YT","name":"Mayotte","phonecode":"269"},
        {"id":"142","sortname":"MX","name":"Meksika","phonecode":"52"},
        {"id":"143","sortname":"FM","name":"Mikronezya Federal Eyaletleri","phonecode":"691"},
        {"id":"144","sortname":"MD","name":"Moldovya Cumhuriyeti","phonecode":"373"},
        {"id":"145","sortname":"MC","name":"Monako","phonecode":"377"},
        {"id":"146","sortname":"MN","name":"Moğolistan","phonecode":"976"},
        {"id":"147","sortname":"MS","name":"Montserrat","phonecode":"1664"},
        {"id":"148","sortname":"MA","name":"Fas","phonecode":"212"},
        {"id":"149","sortname":"MZ","name":"Mozambik","phonecode":"258"},
        {"id":"150","sortname":"MM","name":"Myanmar","phonecode":"95"},
        {"id":"151","sortname":"NA","name":"Namibya","phonecode":"264"},
        {"id":"152","sortname":"NR","name":"Nauru","phonecode":"674"},
        {"id":"153","sortname":"NP","name":"Nepal","phonecode":"977"},
        {"id":"154","sortname":"AN","name":"Hollanda Antilleri","phonecode":"599"},
        {"id":"155","sortname":"NL","name":"Hollanda","phonecode":"31"},
        {"id":"156","sortname":"NC","name":"Yeni Kaledonya","phonecode":"687"},
        {"id":"157","sortname":"NZ","name":"Yeni Zelanda","phonecode":"64"},
        {"id":"158","sortname":"NI","name":"Nikaragua","phonecode":"505"},
        {"id":"159","sortname":"NE","name":"Nijer","phonecode":"227"},
        {"id":"160","sortname":"NG","name":"Nijerya","phonecode":"234"},
        {"id":"161","sortname":"NU","name":"Niue","phonecode":"683"},
        {"id":"162","sortname":"NF","name":"Norfolk Adası","phonecode":"672"},
        {"id":"163","sortname":"MP","name":"Kuzey Mariana Adaları","phonecode":"1670"},
        {"id":"164","sortname":"NO","name":"Norveç","phonecode":"47"},
        {"id":"165","sortname":"OM","name":"Umman","phonecode":"968"},
        {"id":"166","sortname":"PK","name":"Pakistan","phonecode":"92"},
        {"id":"167","sortname":"PW","name":"Palau","phonecode":"680"},
        {"id":"168","sortname":"PS","name":"Filistin Bölgesi","phonecode":"970"},
        {"id":"169","sortname":"PA","name":"Panama","phonecode":"507"},
        {"id":"170","sortname":"PG","name":"Papua Yeni Gine","phonecode":"675"},
        {"id":"171","sortname":"PY","name":"Paraguay","phonecode":"595"},
        {"id":"172","sortname":"PE","name":"Peru","phonecode":"51"},
        {"id":"173","sortname":"PH","name":"Filipinler","phonecode":"63"},
        {"id":"174","sortname":"PN","name":"Pitcairn","phonecode":"0"},
        {"id":"175","sortname":"PL","name":"Polonya","phonecode":"48"},
        {"id":"176","sortname":"PT","name":"Portekiz","phonecode":"351"},
        {"id":"177","sortname":"PR","name":"Porto Riko","phonecode":"1787"},
        {"id":"178","sortname":"QA","name":"Katar","phonecode":"974"},
        {"id":"179","sortname":"RE","name":"Reunion","phonecode":"262"},
        {"id":"180","sortname":"RO","name":"Romanya","phonecode":"40"},
        {"id":"181","sortname":"RU","name":"Rusya Federasyonu","phonecode":"70"},
        {"id":"182","sortname":"RW","name":"Ruanda","phonecode":"250"},
        {"id":"183","sortname":"SH","name":"Saint Helena","phonecode":"290"},
        {"id":"184","sortname":"KN","name":"Saint Kitts ve Nevis","phonecode":"1869"},
        {"id":"185","sortname":"LC","name":"Saint Lucia","phonecode":"1758"},
        {"id":"186","sortname":"PM","name":"Saint Pierre ve Miquelon","phonecode":"508"},
        {"id":"187","sortname":"VC","name":"Saint Vincent ve Grenadinler","phonecode":"1784"},
        {"id":"188","sortname":"WS","name":"Samoa","phonecode":"684"},
        {"id":"189","sortname":"SM","name":"San Marino","phonecode":"378"},
        {"id":"190","sortname":"ST","name":"Sao Tome ve Principe","phonecode":"239"},
        {"id":"191","sortname":"SA","name":"Suudi Arabistan","phonecode":"966"},
        {"id":"192","sortname":"SN","name":"Senegal","phonecode":"221"},
        {"id":"193","sortname":"RS","name":"Sırbistan","phonecode":"381"},
        {"id":"194","sortname":"SC","name":"Seyşeller","phonecode":"248"},
        {"id":"195","sortname":"SL","name":"Sierra Leone","phonecode":"232"},
        {"id":"196","sortname":"SG","name":"Singapur","phonecode":"65"},
        {"id":"197","sortname":"SK","name":"Slovakya","phonecode":"421"},
        {"id":"198","sortname":"SI","name":"Slovenya","phonecode":"386"},
        {"id":"199","sortname":"XG","name":"Smaller Territories of the UK","phonecode":"44"},
        {"id":"200","sortname":"SB","name":"Solomon Adaları","phonecode":"677"},
        {"id":"201","sortname":"SO","name":"Somali","phonecode":"252"},
        {"id":"202","sortname":"ZA","name":"Güney Afrika","phonecode":"27"},
        {"id":"203","sortname":"GS","name":"Güney Georgia ve Güney Sandwich Adaları","phonecode":"0"},
        {"id":"204","sortname":"SS","name":"South Sudan","phonecode":"211"},
        {"id":"205","sortname":"ES","name":"İspanya","phonecode":"34"},
        {"id":"206","sortname":"LK","name":"Sri Lanka","phonecode":"94"},
        {"id":"207","sortname":"SD","name":"Sudan","phonecode":"249"},
        {"id":"208","sortname":"SR","name":"Surinam","phonecode":"597"},
        {"id":"209","sortname":"SJ","name":"Svalbard ve Jan Mayen","phonecode":"47"},
        {"id":"210","sortname":"SZ","name":"Svaziland","phonecode":"268"},
        {"id":"211","sortname":"SE","name":"İsveç","phonecode":"46"},
        {"id":"212","sortname":"CH","name":"İsviçre","phonecode":"41"},
        {"id":"213","sortname":"SY","name":"Suriye","phonecode":"963"},
        {"id":"214","sortname":"TW","name":"Tayvan","phonecode":"886"},
        {"id":"215","sortname":"TJ","name":"Tacikistan","phonecode":"992"},
        {"id":"216","sortname":"TZ","name":"Tanzanya","phonecode":"255"},
        {"id":"217","sortname":"TH","name":"Tayland","phonecode":"66"},
        {"id":"218","sortname":"TG","name":"Togo","phonecode":"228"},
        {"id":"219","sortname":"TK","name":"Tokelau","phonecode":"690"},
        {"id":"220","sortname":"TO","name":"Tonga","phonecode":"676"},
        {"id":"221","sortname":"TT","name":"Trinidad ve Tobago","phonecode":"1868"},
        {"id":"222","sortname":"TN","name":"Tunus","phonecode":"216"},
        {"id":"223","sortname":"TR","name":"Türkiye","phonecode":"90"},
        {"id":"224","sortname":"TM","name":"Türkmenistan","phonecode":"7370"},
        {"id":"225","sortname":"TC","name":"Turks ve Caicos Adaları","phonecode":"1649"},
        {"id":"226","sortname":"TV","name":"Tuvalu","phonecode":"688"},
        {"id":"227","sortname":"UG","name":"Uganda","phonecode":"256"},
        {"id":"228","sortname":"UA","name":"Ukrayna","phonecode":"380"},
        {"id":"229","sortname":"AE","name":"Birleşik Arap Emirlikleri","phonecode":"971"},
        {"id":"230","sortname":"GB","name":"Birleşik Krallık","phonecode":"44"},
        {"id":"231","sortname":"US","name":"Amerika Birleşik Devletleri","phonecode":"1"},
        {"id":"232","sortname":"UM","name":"Amerika Birleşik Devletleri Küçük Dış Adaları","phonecode":"1"},
        {"id":"233","sortname":"UY","name":"Uruguay","phonecode":"598"},
        {"id":"234","sortname":"UZ","name":"Özbekistan","phonecode":"998"},
        {"id":"235","sortname":"VU","name":"Vanuatu","phonecode":"678"},
        {"id":"236","sortname":"VA","name":"Vatikan","phonecode":"39"},
        {"id":"237","sortname":"VE","name":"Venezuela","phonecode":"58"},
        {"id":"238","sortname":"VN","name":"Vietnam","phonecode":"84"},
        {"id":"239","sortname":"VG","name":"İngiliz Virgin Adaları","phonecode":"1284"},
        {"id":"240","sortname":"VI","name":"ABD Virgin Adaları","phonecode":"1340"},
        {"id":"241","sortname":"WF","name":"Wallis ve Futuna","phonecode":"681"},
        {"id":"242","sortname":"EH","name":"Batı Sahara","phonecode":"212"},
        {"id":"243","sortname":"YE","name":"Yemen","phonecode":"967"},
        {"id":"244","sortname":"YU","name":"Yugoslavia","phonecode":"38"},
        {"id":"245","sortname":"ZM","name":"Zambiya","phonecode":"260"},
        {"id":"246","sortname":"ZW","name":"Zimbabve","phonecode":"263"},
        {"id":"247","sortname":"GB","name":"İngiltere","phonecode":"44"},
        {"id":"248","sortname":"GB","name":"Ingiltere","phonecode":"44"},
        {"id":"249","sortname":"RKS","name":"Kosovo","phonecode":"383"}
      ],
      ShowHotels:[],
      gender:[
        {
          id:1,
          name: "Kadın",
        },
        {
          id:2,
          name:"Erkek"
        }
      ],
      date:'',
      room_number_departure:null,
      payment_person_departure: "hotel",
      flight_number_departure:null,
      payment_currency_departure:'EURO',
      payment_costumer_departure:null,
      room_number_arrival:null,
      payment_person_arrival: "hotel",
      flight_number_arrival:null,
      payment_currency_arrival:'EURO',
      payment_costumer_arrival:null,
      reservation_note:"",
      departure:this.formatDate(new Date()),
      arrival:null,
      passengers_title: ""
    }
  },
  methods: {
    CheckReservationTime(){
      console.log( this.departure + " " + this.departure_time)
    },
    reservationSave() {
      if(this.CheckRole('ReservationCreate')==false){
        return false
      }
      if(this.departure_time==''){
        this.alert("Uyarı","Lütfen Hareket saatini seçiniz...")
        return false
      }
      this.$q.loading.show()
        var NewReservation = {
          //Step Page 1
          transfer_type              :   this.transfer_type_model,
          transfer_direction         :   this.transfer_direction_model,
          //Step Page 2
          transfer_departure         :   this.nereden_model,
          transfer_arrival           :   this.nereye_model,
          transfer_hotel             :   this.hotel_model,
          transfer_hotel_other       :   this.hotel_address,
          //Step Page 3
          transfer_car               :   this.car_model,
          transfer_passenger_size    :   this.people_number,
          transfer_price             :   this.transfer_payment,
          //Step Page 4
          transfer_passengers        :   this.passengers,
          //Step Page 5 Departure
          departure_date             :   this.departure + " " + this.departure_time,
          departure_flight_number    :   this.flight_number_departure,
          departure_room_number      :   this.room_number_departure,
          departure_paying           :   this.payment_person_departure,
          departure_pay_price        :   this.payment_costumer_departure,
          departure_pay_currency     :   this.payment_currency_departure,
          //Step Page 5 Arrival
          arrival_date               :   this.arrival + " " + this.arrival_time,
          arrival_flight_number      :   this.flight_number_arrival,
          arrival_room_number        :   this.room_number_arrival,
          arrival_paying             :   this.payment_person_arrival,
          arrival_pay_price          :   this.payment_costumer_arrival,
          arrival_pay_currency       :   this.payment_currency_arrival,
          reservation_note           :   this.reservation_note
        }
          this.$axios.post('reservation/create', { NewReservation })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "reservationList" , params: { "new": true }})
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
    },
    step1FN () {
      this.step = this.step + 1
      this.transfer_type_title = "Transfer Yönü :" + this.transfer_type_model.name + " > " + this.transfer_direction_model.name
      this.getAreas()

    },
    step2FN () {
      if (this.hotel_model) {
        this.getCars()
        if (this.hotel_model.hotel_id == 0) {
          if (this.hotel_address && this.hotel_address.length > 2) {
            this.step = this.step + 1
            this.nereden_nereye_title = this.nereden_model.area_name + " > " + this.nereye_model.area_name + " > Diğer"
          } else {
            this.alert("Uyarı", "Lütfen geçerli bir adres giriniz..")
          }
        } else {
          this.step = this.step + 1
          this.nereden_nereye_title = this.nereden_model.area_name + " > " + this.nereye_model.area_name + " > " + this.hotel_model.hotel_name
        }
      } else {
        this.alert("Uyarı", "Lütfen Hotel seçiniz...")
      }
    },
    step3FN () {
      if(this.people_number=="Seçiniz" || this.people_number==0){
        this.alert("Uyarı","Lütfen Yolcu Sayısı Seçiniz.")
        return false
      }
      this.passenger_total=this.people_number
      this.car_people_title = "Araç: " + this.car_model.car_name + " Kişi : " + this.people_number + " Ücret " + this.transfer_payment + " ₺"
      this.step = this.step + 1
    },
    step4FN(){
      if(this.passengerControl()){
          this.passengerTitleUpdate()
          this.step = this.step + 1
      }
    },
    tarihSaatSec(){
      this.$refs.qDateProxy.hide();
      this.$refs.timePicker.show()
    },
    passengerControl(){
        var YolcuKontrol = this.passengers
        var eksikalanlar=""
        var eksikler=[]
        var eksikkontrol=false
        Object.entries(YolcuKontrol).forEach(([key,passenger]) => {
          if(passenger.country     === null){
            eksikalanlar=eksikalanlar + "<br /><b >Ülke</b>"
            eksikkontrol=true
          }if(passenger.gender      === null){
            eksikalanlar=eksikalanlar + "<br /><b >Cinsiyet</b>"
            eksikkontrol=true
          }
          if(passenger.identity      === null){
            eksikalanlar=eksikalanlar + "<br /><b >Pasaport/Kimlik No</b>"
            eksikkontrol=true
          }
          if(passenger.firstname      === null){
            eksikalanlar=eksikalanlar + "<br /><b >İsim</b>"
            eksikkontrol=true
          }
          if(passenger.lastname      === null){
            eksikalanlar=eksikalanlar + "<br /><b >Soyisim</b>"
            eksikkontrol=true
          }
          if(eksikkontrol){
            eksikler.push({yolcu: (parseInt(key)+1), eksikler: eksikalanlar})
            eksikalanlar=""
          }else{
            eksikalanlar=""
          }
        });
        if(eksikkontrol){
            var mesaj=""
            for(var i=0;i<eksikler.length;i++){
                mesaj=mesaj + "<hr /><b style='color:red'>YOLCU : " + eksikler[i].yolcu + " Doldurulması gereken alanlar :</b>" + eksikler[i].eksikler
            }
            this.alert("UYARI","  Lütfen Aşşağıdaki bilgileri tamamlayınız. " + mesaj)

        }else{
          return true
        }
    },
    passengerTitleUpdate(){
        var title=""
        var YolcuKontrol = this.passengers
         Object.entries(YolcuKontrol).forEach(([key,passenger]) => {
            title=title + "<br /> <b style='color:#d50000 !important'>Yolcu " + (parseInt(key)+1) + ":</b><br /><b style='color:#d50000 !important'> Ülke :</b>"
             + passenger.country.name + " <b style='color:#d50000 !important'>Cinsiyet :</b>" + passenger.gender.name + "<b style='color:#d50000 !important'> Kimlik No :</b>"
             + passenger.identity + "<b style='color:#d50000 !important'> Adı :</b>" + passenger.firstname + "<b style='color:#d50000 !important'> Soyadı :</b>" + passenger.lastname
            if(passenger.phone!==null){
              title=title + " <b style='color:#d50000 !important'>Telefon :</b>" + passenger.phone
            }
          });
        this.passengers_title=title
    },
    passengerChange(){
      this.passengers=[]
      for(var i=0;i<this.people_number;i++){
        this.passengers.push({ country:null,gender:null,identity:null,firstname: null,lastname:null,phone:null,email:null});
      }
    },
    clearHotelFilter(){
      if (this.$refs.qselect !== void 0) {
        this.$refs.qselect.updateInputValue('')
      }
    },
    hotelChange () {
      if (this.hotel_model !== null) {
        this.ShowHotels = this.hotel_options
        if (this.hotel_model.hotel_id == 0) {
          this.hotel_diger = true
        } else {
          this.hotel_diger = false
        }
      }

    },
    carChange(){
        this.priceCalc()
    },
    getCars(){
       let car_url = "/cars/list"
      this.$axios.get(car_url).then((response => {
        this.car_model=response.data.return[0];
        this.cars = response.data.return
        this.priceCalc()
        return true
      })).catch((error) => {
        this.alert("HATA", "Araçlar yüklenirken beklenmeyen bir hata oluştu..")
        return false
      })
    },
    priceCalc(){
      var price_detail = {
        nereden: this.nereden_model.area_id,
        nereye: this.nereye_model.area_id,
        araba: this.car_model.car_id,
        discount: this.hotel_model.discount,
        hotel_id: this.hotel_model.hotel_id
      }
       this.$axios.post('prices/data', { price_detail })
      .then((response => {
        var gData=response.data;
        if(this.transfer_type_model.id==2){
            this.transfer_payment=(gData.return.price_total * 2)
        }else{
          this.transfer_payment=gData.return.price_total
        }
        this.min_people=parseInt(gData.return.car_min_people)
        this.max_people=parseInt(gData.return.car_max_people)
        this.people=['Seçiniz']
        this.people_number=['Seçiniz']
        for(var i = this.min_people; i <= this.max_people; i++){
            this.people.push(i);
        }
        return true
      })).catch((error) => {
        this.price_uyari="Seçilen Kişi Sayısı için Henüz fiyat belirtilmemiş lütfen telefon ile iletişim kurarak fiyat bilgisi alınız.."
        return false
      })
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true,
        html: true
      })
    },
    ChangeArea(){
      this.ShowHotels=[]
      this.hotel_options.filter((item)=> {
        if(this.nereden_model.area_id==item.hotel_area || this.nereye_model.area_id==item.hotel_area || item.hotel_id==0){
          this.ShowHotels.push(item)
        }else{
          return false
        }
      })
      if(this.CheckRole('ReservationListAll')=='ReservationListAll'){
        this.hotel_model = {"hotel_id":"0","hotel_name":"Diğer"}
      }else{
        this.hotel_model = this.ShowHotels[0]
      }

      if(this.hotel_model.hotel_id==0){
        this.hotel_diger=true
      }else{
        this.hotel_diger=false
      }
    },
    getAreas () {
      if(this.CheckRole('ReservationCreate')==false || this.step!=2){
        return false
      }
      let url = "/area/reservation/" + this.transfer_direction_model.id
      this.$axios.get(url).then((response => {
        this.nereden = response.data.return.nereden
        // this.nereden_model = response.data.return.nereden[0]
        this.nereye = response.data.return.nereye
        this.hotel = response.data.return.hotel
        this.hotel_options = response.data.return.hotel
        // this.nereye_model = response.data.return.nereye[0]

        if(this.transfer_direction_model.id==1 || this.transfer_direction_model.id==4){
          this.nereye_model= this.nereye.find(item=> item.area_id==response.data.return.hotel[0].hotel_area)
        }else{
          this.nereye_model=response.data.return.nereye[0]
        }
        if(this.transfer_direction_model.id==2 || this.transfer_direction_model.id==4){
          this.nereden_model = this.nereden.find(item=> item.area_id==response.data.return.hotel[0].hotel_area)
        }else{
          this.nereden_model = response.data.return.nereden[0]
        }
        if(this.transfer_direction_model.id==3){
          this.nereden_model = response.data.return.nereden[1]
        }
        this.ChangeArea()
        return true
      })).catch((error) => {
        this.CheckToken()
        this.alert("HATA", "Bölgeler yüklenirken beklenmeyen bir hata oluştu..")
        return false
      })
    },
    hotelFiltre (val, update) {
      if (val === '') {
        update(() => {
          this.ShowHotels = this.hotel_options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.ShowHotels = this.ShowHotels.filter((v) => {
            return v.hotel_name.toLowerCase().indexOf(needle) > -1
        })
      },
        ref => {
          ref.setOptionIndex(-1);
          ref.moveOptionSelection(1, true);
        });
    },
    countryFilter (val, update) {
      if (val === '') {
        update(() => {
          this.countries = this.countries_options
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.countries = this.countries.filter((v) => {
            return v.name.toLowerCase().indexOf(needle) > -1
        })
      })
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
  },

  mounted () {
    this.transfer_direction_model = this.transfer_direction[1];
    this.transfer_type_model = this.transfer_type[0];
    this.getAreas()
    this.countries_options=this.countries
  }
}
</script>
