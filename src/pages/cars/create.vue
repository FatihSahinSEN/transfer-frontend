<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('CarsCreate')">

    <div class="text-h6 fit">Araç ve Kişi Sayısı! 
      <q-btn
        color="primary text-white shadow-2"
        icon="save"
        label="Kaydet"
        class="float-right"
        @click="carSave"
      />
    </div>
    <q-separator inset />

    <q-form class="fit">
      <q-input
        v-for="car in columns"
        :key="car.name"
        outlined
        bottom-slots
        fill-mask
        lazy-rules
        v-model="car.data"
        :mask="car.mask"
        :label="car.label"
        :type="car.type"
        :tabIndex="car.tab"
        :autofocus="car.autofocus"
        :rules="car.rules"
      >
        <template v-slot:prepend>
          <q-icon :name="car.icon" />
        </template>

        <template v-slot:hint>
          {{car.hint}}
        </template>
      </q-input>

      <hr />
      <div>

        <q-btn
          color="red text-white shadow-2"
          icon="cancel"
          label="İptal"
          class="float-left"
          @click="carCancel"
        />
        <q-btn
          color="primary text-white shadow-2"
          icon="save"
          label="Kaydet"
          class="float-right"
          @click="carSave"
        />
      </div>
    </q-form>

  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>

</template>


<script>

export default {
  name: 'carCreate',
  data () {
    return {
      dense: true,
      denseOpts: false,
      select: [],
      loading: false,
      columns: [
        { name: 'car_name', data: "", label: 'Araç Tipi ve Kişisi Örnek:( 1-6 Pax )', icon: 'directions_car', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'Bu alan boş olamaz'] },
        { name: 'car_min_people', data: "", label: 'Minumum Kişi Sayısı', icon: 'person_remove_alt_1', type: 'number', tab: 2, rules: [val => val && val.length > 0 || 'Bu alan boş olamaz'] },
        { name: 'car_max_people', data: "", label: 'Maksimum Kişi Sayısı', icon: 'person_add_alt_1', type: 'number', tab: 3, rules: [val => val && val.length > 0 || 'Bu alan boş olamaz'] },
      ],
    }
  },
  methods: {
    carSave () {
      if (this.model !== null) {
        let veri = this.columns
        var car_detail = {
          car_name: this.columns[0].data,
          car_min_people: this.columns[1].data,
          car_max_people: this.columns[2].data
        }
        this.$q.loading.show()

        if (this.model < 3) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          this.$axios.post('cars/create', { car_detail })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "carList" })
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        }

      } else {
        this.alert("Uyarı", "Lütfen Araç Tipi Giriniz.");
      }
    },
    carCancel () {
      this.$router.push({ name: "carList" })
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      })
    }
  }
}
</script>
