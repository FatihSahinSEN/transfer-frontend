<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('HotelUpdate')">
    <div class="text-h6 fit">
      İşletme Güncelle!
      <q-btn
        color="primary text-white shadow-2"
        icon="save"
        label="Kaydet"
        class="float-right"
        @click="hotelSave"
      />
    </div>
    <q-separator inset />

    <q-form class="fit">
      <q-input
        v-for="hotel in columns"
        :key="hotel.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="hotel.data"
        :mask="hotel.mask"
        :label="hotel.label"
        :type="hotel.type"
        :tabIndex="hotel.tab"
        :autofocus="hotel.autofocus"
        :rules="hotel.rules"
      >
        <template v-slot:prepend>
          <q-icon :name="hotel.icon" />
        </template>

        <template v-slot:hint>
          {{ hotel.hint }}
        </template>
      </q-input>
      <q-select
        outlined
        dense
        bottom-slots
        use-chips
        fill-mask
        lazy-rules
        v-model="user.selected"
        use-input
        input-debounce="0"
        label="Kullanıcı Seçiniz."
        :options="user.options"
        option-label="username"
        option-value="user_id"
        @filter="filterFn2"
        behavior="menu"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sonuç bulunamadı
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:prepend>
          <q-icon name="person_search" />
        </template>
      </q-select>

      <q-select
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="area.selected"
        use-input
        use-chips
        input-debounce="0"
        label="Bölge Seçiniz."
        :options="area.options"
        option-value="area_id"
        option-label="area_name"
        behavior="menu"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-primary">
              Sonuç bulunamadı
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-select>
      <div>
        <q-toggle
          v-model="hotel_status"
          color="green"
          label="İşletme durumu"
        />
      </div>
      <hr />
      <div>
        <q-btn
          color="red text-white shadow-2"
          icon="cancel"
          label="İptal"
          class="float-left"
          @click="hotelCancel"
        />
        <q-btn
          color="primary text-white shadow-2"
          icon="save"
          label="Kaydet"
          class="float-right"
          @click="hotelSave"
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
  name: "hotelsUpdate",
  data () {
    return {
      area: { options: [], selected: null, select: null, search:[] },
      user: { options: [], selected: null, select: null, search:[] },
      hotel_status: null,
      loading: false,
      columns: [
        {
          name: "hotel_name",
          data: "",
          label: "İşletme Adı",
          icon: "apartment",
          type: "text",
          tab: 1,
          autofocus: "autofocus",
          rules: [val => (val && val.length > 0) || "İşletme adı alanı boş olamaz"]
        },
        {
          name: "hotel_phone",
          data: "",
          label: "Telefon 1:",
          icon: "phone",
          type: "text",
          mask: "(###) ### - ####",
          tab: 2
        },
        {
          name: "hotel_phone2",
          data: "",
          label: "Telefon 2:",
          icon: "phone",
          type: "text",
          mask: "(###) ### - ####",
          tab: 3
        },
        {
          name: "hotel_phone3",
          data: "",
          label: "Telefon 3:",
          icon: "phone",
          type: "text",
          mask: "(###) ### - ####",
          tab: 4
        },
        {
          name: "hotel_email",
          data: "",
          label: "E-posta :",
          icon: "mail",
          type: "text",
          tab: 5
        },
        {
          name: "hotel_address",
          data: "",
          label: "Address :",
          icon: "location_pin",
          type: "text",
          tab: 6
        },
        {
          name: "hotel_vkn",
          data: "",
          label: "Vergi No :",
          icon: "apartment",
          type: "text",
          tab: 7
        },
        {
          name: "hotel_vkd",
          data: "",
          label: "Vergi Dairesi :",
          icon: "apartment",
          type: "text",
          tab: 8
        },
        { name: 'discount', data: "", label: 'İndirim (Tutar)', icon: '₺',  type: 'number', tab: 9 }
      ]
    }
  },
  methods: {
    hotelSave () {
      if(this.user.selected===null){
        this.alert("Uyarı","Lütfen Kullanıcı Seçiniz")
        return false
      }
      if(this.area.selected===null){
        this.alert("Uyarı","Lütfen Bölge seçiniz")
        return false
      }
      var hotel_detail = {
        hotel_name: this.columns[0].data,
        hotel_user: this.user.selected.user_id,
        hotel_phone: this.columns[1].data,
        hotel_phone2: this.columns[2].data,
        hotel_phone3: this.columns[3].data,
        hotel_email: this.columns[4].data,
        hotel_address: this.columns[5].data,
        hotel_area: this.area.selected.area_id,
        hotel_vkn: this.columns[6].data,
        hotel_vkd: this.columns[7].data,
        discount: this.columns[8].data,
        hotel_status: this.hotel_status
      };
      this.$q.loading.show();

      if (this.columns[0].data.length < 3) {
        this.$q.loading.hide();
        this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
      } else {
        let id = this.$route.params.id
        let url = 'hotels/update/' + id
        this.$axios
          .post(url, { hotel_detail })
          .then(result => {
            this.$q.loading.hide();
            this.$q
              .dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              })
              .onOk(() => {
                this.$router.push({ name: "hotelList" });
              });
          })
          .catch(err => {
            this.$q.loading.hide();
            this.alert("HATA", err);
          });
      }
    },
    hotelCancel () {
      this.$router.push({ name: "hotelList" });
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      });
    },


    getUsers () {
      this.$axios
        .get("users/hotel/list")
        .then(result => {
          this.area.options=result.data.return.bolge
          this.area.search=result.data.return.bolge
          this.user.options=result.data.return.kullanici
          this.user.search=result.data.return.kullanici
        })
        .catch(err => {
          this.$q.loading.hide();
          this.alert("HATA", err);
        });
    },
    getHotels () {
      let id = this.$route.params.id
      this.$store.dispatch('HotelService/getDataById', id)
      // let url = 'hotels/' + id
      // this.$axios
      //   .get(url)
      //   .then(result => {
      //     this.getUsers();
      //     this.columns[0].data = result.data.return.hotel_name
      //     this.user.selected = result.data.return.hotel_user.username
      //     this.columns[1].data = result.data.return.hotel_phone
      //     this.columns[2].data = result.data.return.hotel_phone2
      //     this.columns[3].data = result.data.return.hotel_phone3
      //     this.columns[4].data = result.data.return.hotel_email
      //     this.columns[5].data = result.data.return.hotel_address
      //     this.area.selected = result.data.return.hotel_area.area_name
      //     this.columns[6].data = result.data.return.hotel_vkn
      //     this.columns[7].data = result.data.return.hotel_vkd
      //     this.columns[8].data = result.data.return.discount
      //     this.hotel_status = result.data.return.hotel_status
      //   })
      //   .catch(err => {
      //     this.$q.loading.hide();
      //     this.alert("HATA", err);
      //   });
    },

    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.area.options = this.area.search
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.area.options = this.area.search.filter(v => v.area_name.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterFn2 (val, update) {
      if (val === '') {
        update(() => {
          this.user.options = this.user.search
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.user.options = this.user.search.filter(v => v.username.toLowerCase().indexOf(needle) > -1)
      })
    },

  },

  mounted () {
    this.getHotels();
  }
};
</script>
