<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookUpdate')">

    <div class="text-h6 fit">Parametre Güncelle
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
        :readonly="user.readyonly"

      >
        <template v-slot:prepend>
          <q-icon :name="user.icon" />
        </template>

        <template v-slot:hint>
          {{user.hint}}
        </template>
      </q-input>

      <q-input outlined dense bottom-slots fill-mask lazy-rules color="orange-14" v-model="value"
          v-if='type=="input"'
      />
      <q-input outlined dense bottom-slots fill-mask lazy-rules type="password" color="orange-14" v-model="value"
        v-else-if='type=="input-password"'
      />
      <q-toggle v-model="value" checked-icon="check" color="green" unchecked-icon="clear"
        v-else-if='type=="input-bolean"'
      />

      <q-input outlined dense bottom-slots fill-mask lazy-rules type="number" min="1" max="55555" color="orange-14" v-model="value"
               v-else-if='type=="input-number"'
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
          style="margin-left: 15px"
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
  name: 'SettingUpdate',
  data () {
    return {
      loading: false,
      id: null,
      type:null,
      value:null,
      columns: [
        { name: 'grup', data: "0", label: 'Parametre Grubu', icon: 'settings', type: 'text', readyonly: true ,tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'Grup Alanı boş olamaz'] },
        { name: 'parameter', data: "1", label: 'Parametre', icon: 'settings', type: 'text',readyonly: true, tab: 2, rules: [val => val && val.length > 0 || 'Parametre alanı boş olamaz'] },
        { name: 'anahtar', data: "2", label: 'KEY', icon: 'settings', type: 'text', tab: 3,readyonly:true, rules: [val => val && val.length > 0 || 'Değer alanı boş olamaz'] },
      ],
    }
  },
  methods: {
    userSave () {
      let veri = this.columns
      var paramaters = {
        grup: this.columns[0].data,
        parameter: this.columns[1].data,
        anahtar: this.columns[2].data,
        value: this.value,
      }
      this.$q.loading.show()
        if (veri[0].data.length < 3) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          var url="paramater/update/" + this.id
          this.$axios.post(url, { paramaters })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "settingList" })
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        }
    },
    userCancel () {
      this.$router.push({ name: "settingList" })
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
      this.type             =   params.type
      this.columns[0].data  =   params.grup
      this.columns[1].data  =   params.parameter
      this.columns[2].data  =   params.anahtar
      if(params.value==="true") {
        this.value  =  true
      }else if(params.value==="false"){
        this.value  =  false
      }else {
        this.value=params.value
      }

    }
  },
  mounted() {
    this.setModels()
  },
}
</script>
