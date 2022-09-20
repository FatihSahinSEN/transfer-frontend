<template>
  <div class="q-pa-md" v-if="CheckRole('PriceUpdate')">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        :title="from_title"
        :done="step > 1"
      >
        <q-select
          filled
          emit-value
          v-model="from_model"
          option-label="area_name"
          label="Kalkış bölgesi seçiniz."
          color="teal"
          hint="Eklemek istediğiniz bölge mevcut değil ise Menü üzerindeki Bölgeler alanından oluşturabilirsiniz."
          options-selected-class="text-deep-green"
          :options="areas"
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
        :title="to_title"
        icon="directions_bus"
        :done="step > 2"
      >
        <q-select
          filled
          emit-value
          v-model="to_model"
          option-label="area_name"
          label="Varış bölgesi seçiniz."
          color="teal"
          options-selected-class="text-deep-green"
          hint="Eklemek istediğiniz bölge mevcut değil ise Menü üzerindeki Bölgeler alanından oluşturabilirsiniz."
          :options="areas"
        >
        </q-select>
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
        :title="price_model"
        icon="local_atm"
      >
        <q-input
          filled
          v-model="price_model"
          label="Ücreti giriniz Örnek: 150.75"
          mask="###.##"
          fill-mask="#"
        />
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Kaydet"
            @click="step3FN"
          />

          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Geri"
            class="q-ml-sm"
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
  name: 'priceUpdate',
  data () {
    return {
      loading: false,
      step: 1,
      from_title: "Araç Kalkış bölgesini seçiniz.",
      to_title: "Varış noktası seçin.",
      areas: [],
      from_model: null,
      to_model: null,
      price_model: "Ücretlendirme",
      search: null
    }
  },
  methods: {
    priceSave () {
      let price_detail = {
        price_from: this.from_model.area_id,
        price_to: this.to_model.area_id,
        price_total: this.price_model
      }
      let id = this.$route.params.id
      let url = 'prices/update/' + id
      this.$q.loading.show()
      this.$axios.post(url, { price_detail })
        .then((result) => {
          this.$q.loading.hide()
          if (result.data.status.code == 206) {
            this.$q.dialog({
              title: "Uyarı.",
              message: result.data.status.message.sonuc,
              persistent: true,
              ok: {
                push: true
              },
              cancel: {
                push: true,
                color: 'negative'
              }
            }).onOk(() => {
              this.$router.push({ name: "priceUpdate", params: { id: result.data.status.message.price_id } })
            }).onCancel(() => {
              this.$router.push({ name: "priceList" })
            })
          } else {
            this.$q.dialog({
              title: "İşlem başarılı.",
              message: result.data.status.message,
              persistent: true
            }).onOk(() => {
              this.$router.push({ name: "priceList" })
            })
          }
        }).catch((err) => {
          this.$q.loading.hide()
          this.alert("HATA", err);
        });
    },
    getAreas () {
      if(this.CheckRole('PriceUpdate')==false){
        return false
      }
      let params = this.$route.params;
      let from_ver;
      let to_ver;

      this.$axios.get('area/list')
        .then((result) => {
          this.$q.loading.hide()
          result.data.return.map(x => this.areas.push(x))
          this.areas.forEach(function (val) {
            if (params.price_from == val.area_id) {
              from_ver = val;
            }
            if (params.price_to == val.area_id) {
              to_ver = val;
            }
          })
          this.from_model = from_ver
          this.to_model = to_ver
          this.price_model = params.price_total
        }).catch((err) => {
          this.$q.loading.hide()
          this.alert("HATA", err);
        });
    },
    step1FN () {
      if (this.from_model) {
        this.step = this.step + 1
        this.from_title = "Kalkış Yeri :" + this.from_model.area_name
      } else {
        this.alert("Uyarı", "Devam etmek için Kalkış bölgesini seçin.")
      }
    },
    step2FN () {
      if (this.to_model) {
        this.step = this.step + 1
        this.to_title = "Varış  Yeri : " + this.to_model.area_name
      } else {
        this.alert("Uyarı", "Devam etmek için Varış bölgesini seçin.")
      }
    },
    step3FN () {
      if (this.price_model != "Ücretlendirme") {
        this.priceSave()
      } else {
        this.alert("Uyarı", "Devam etmek için Ücret bilgisini girin.")
      }
    },
    userCancel () {
      this.$router.push({ name: "priceList" })
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      })
    },
    qSelectInput (val) {
      alert(val)
    },
    myFilter (val, update) {
      console.log(val)
      if (val === "") {
        update(() => {
          this.areas = this.areas;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.areas = this.areas.filter(s =>
          console.log(s.area_name.toLowerCase())
        );
      });
    },
    filterComuni: function (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        let rx = new RegExp('^' + val, 'i')
        let comuni = this.areas
          .filter(e => rx.test(e.nome))
          .filter((_, i) => i < 10)
        this.areas = comuni
      })
    },
    async routeUpdate () {

    }
  },
  mounted () {
    this.getAreas()
  }
}
</script>
