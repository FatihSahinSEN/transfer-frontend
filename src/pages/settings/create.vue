<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookCreate')">

    <div class="text-h6 fit">Parametre Kaydı
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
  name: 'SettingsCreate',
  data () {
    return {
      loading: false,
      user_type: "1",
      columns: [
        { name: 'grup', data: "", label: 'Parametre Grubu', icon: 'settings', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'Grup Alanı boş olamaz'] },
        { name: 'parameter', data: "", label: 'Parametre', icon: 'settings', type: 'text', tab: 2, rules: [val => val && val.length > 0 || 'Parametre alanı boş olamaz'] },
        { name: 'anahtar', data: "", label: 'Key', icon: 'settings', type: 'text', tab: 2, rules: [val => val && val.length > 0 || 'Parametre alanı boş olamaz'] },
        { name: 'value', data: "", label: 'Değer', icon: 'settings', type: 'text', tab: 3, rules: [val => val && val.length > 0 || 'Değer alanı boş olamaz'] },
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
        value: this.columns[3].data,
      }
      this.$q.loading.show()
        if (veri[0].data.length < 3) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          this.$axios.post('paramater/create', { paramaters })
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
    }
  }
}
</script>
