<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="text-h6 fit">
      Bölge Oluştur! 
      <q-btn color="primary text-white shadow-2" icon="save" label="Kaydet" class="float-right" @click="regionSave" />
    </div>
    <q-separator inset />

    <q-form class="fit">
      <q-input
        v-for="region in columns"
        :key="region.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="region.data"
        :mask="region.mask"
        :label="region.label"
        :type="region.type"
        :tabIndex="region.tab"
        :autofocus="region.autofocus"
        :rules="region.rules"
      >
        <template v-slot:prepend>
          <q-icon :name="region.icon" />
        </template>

        <template v-slot:hint>
          {{ region.hint }}
        </template>
      </q-input>
      <q-select outlined v-model="model" :options="options" :dense="dense" :options-dense="denseOpts">
        <template v-slot:prepend>
          <q-icon name="flight_takeoff" />
        </template>
      </q-select>
      <hr />
      <div>
        <q-btn color="red text-white shadow-2" icon="cancel" label="İptal" class="float-left" @click="regionCancel" />
        <q-btn color="primary text-white shadow-2" icon="save" label="Kaydet" class="float-right" @click="regionSave" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'regionsCreate',
  data() {
    return {
      selectModel: null,
      model: null,
      options: ['Havalimanı', 'Bölge'],
      dense: true,
      denseOpts: false,
      select: [],
      loading: false,
      columns: [
        {
          name: 'area_name',
          data: '',
          label: 'Bölge Adı',
          icon: 'place',
          type: 'text',
          tab: 1,
          autofocus: 'autofocus',
          rules: [val => (val && val.length > 0) || 'Bölge alanı boş olamaz'],
        },
        { name: 'area_sort', data: '999', label: 'Sıra', icon: 'place', type: 'text', tab: 2 },
      ],
    }
  },
  methods: {
    regionSave() {
      if (this.model !== null) {
        if (this.model == 'Havalimanı') {
          this.selectModel = 1
        } else {
          this.selectModel = 0
        }
        let veri = this.columns
        var region_detail = {
          area_name: this.columns[0].data,
          area_sort: this.columns[1].data,
          area_is_airport: this.selectModel,
        }
        this.$q.loading.show()

        if (veri[0].data.length < 3) {
          this.$q.loading.hide()
          this.alert('Uyarı', 'Lütfen tüm alanları doğru doldurunuz.')
        } else {
          this.$axios
            .post('area/create', { region_detail })
            .then(result => {
              this.$q.loading.hide()
              this.$q
                .dialog({
                  title: 'İşlem başarılı.',
                  message: result.data.status.message,
                  persistent: true,
                })
                .onOk(() => {
                  this.$router.push({ name: 'regionList' })
                })
            })
            .catch(err => {
              this.$q.loading.hide()
              this.alert('HATA', err)
            })
        }
      } else {
        this.alert('Uyarı', 'Lütfen bölge durumunu seçiniz')
      }
    },
  },
}
</script>
