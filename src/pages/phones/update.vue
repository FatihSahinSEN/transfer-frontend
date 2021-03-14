<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookUpdate')">

    <div class="text-h6 fit">Rehber'e Kişi Ekle
      <q-btn
        color="primary text-white shadow-2"
        icon="save"
        label="Kaydet"
        class="float-right"
        @click="userSave"
      />
    </div>
    <q-separator inset />

    <q-form class="fit">
      <q-input
        v-for="user in columns"
        :key="user.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        color="orange-14"
        v-model="user.data"
        :mask="user.mask"
        :label="user.label"
        :type="user.type"
        :tabIndex="user.tab"
        :autofocus="user.autofocus"
        :rules="user.rules"
      >
        <template v-slot:prepend>
          <q-icon :name="user.icon" />
        </template>

        <template v-slot:hint>
          {{user.hint}}
        </template>
      </q-input>
      <q-radio
        name="status"
        v-model="user_type"
        val="1"
        label="Kişi"
        color="primary"
      />
      <q-radio
        name="status"
        v-model="user_type"
        val="0"
        label="Şöför"
        color="primary"
      />
      <div>

        <q-btn
          color="red text-white shadow-2"
          icon="cancel"
          label="İptal"
          class="float-left"
          @click="userCancel"
        />
        <q-btn
          color="primary text-white shadow-2"
          icon="save"
          label="Kaydet"
          class="float-right"
          @click="userSave"
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
  name: 'PhonesCreate',
  data () {
    return {
      loading: false,
      user_type: "1",
      id: null,
      columns: [
        { name: 'fullname', data: "", label: 'Tam İsim', icon: 'perm_identity', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'İsim alanı boş olamaz'] },
        { name: 'gsm', data: "", label: 'Telefon 1', icon: 'phone', type: 'text',mask: "(###) ### - ####", tab: 2 },
        { name: 'mobile', data: "", label: 'Telefon 2:', icon: 'phone', type: 'text',mask: "(###) ### - ####", tab: 3 },
        { name: 'plaka', data: "", label: 'Plaka ( Opsiyonel ):', icon: 'phone', type: 'text', tab: 3 },
      ],
    }
  },
  methods: {
    userSave () {
      let veri = this.columns
      var user_detail = {
        fullname: this.columns[0].data,
        gsm: this.columns[1].data,
        mobile: this.columns[2].data,
        plaka: this.columns[3].data,
        status: this.user_type,
      }
      this.$q.loading.show()
        if (veri[0].data.length < 3) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          var url="phones/update/" + this.id
          this.$axios.post(url, { user_detail })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "phoneList" })
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        }
    },
    userCancel () {
      this.$router.push({ name: "phoneList" })
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      })
    },
    setModels(){
      let params = this.$route.params;
      this.id               =   params.id
      this.columns[0].data  =   params.fullname
      this.columns[1].data  =   params.gsm
      this.columns[2].data  =   params.mobile
      this.columns[3].data  =   params.plaka
      if(params.status=="Kişi"){
        this.user_type        =   "1"
      }else{
        this.user_type        =   "0"
      }

    }
  },
  mounted() {
    this.setModels()
  },
}
</script>
