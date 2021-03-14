<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('PhoneBookUpdate')">

    <div class="text-h6 fit">Duyuru güncelle
      <q-btn
        color="primary text-white shadow-2"
        icon="save"
        label="Kaydet"
        class="float-right"
        @click="noticeSave"
      />
    </div>
    <q-separator inset />

    <q-form class="fit">
      <q-input
        v-for="notice in columns"
        :key="notice.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        color="orange-14"
        v-model="notice.data"
        :mask="notice.mask"
        :label="notice.label"
        :type="notice.type"
        :tabIndex="notice.tab"
        :autofocus="notice.autofocus"
        :rules="notice.rules"
      >
        <template v-slot:prepend>
          <q-icon :name="notice.icon" />
        </template>

        <template v-slot:hint>
          {{notice.hint}}
        </template>
      </q-input>
      <q-radio
        name="status"
        v-model="status"
        val="1"
        label="Aktif"
        color="primary"
      />
      <q-radio
        name="status"
        v-model="status"
        val="0"
        label="Devredışı"
        color="primary"
      />
      <div>

        <q-btn
          color="red text-white shadow-2"
          icon="cancel"
          label="İptal"
          class="float-left"
          @click="noticeCancel"
        />
        <q-btn
          color="primary text-white shadow-2"
          icon="save"
          label="Kaydet"
          style="margin-left: 15px"
          @click="noticeSave"
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
  name: 'NoticeUpdate',
  data () {
    return {
      status: 0,
      loading: false,
      notice_type: "1",
      id: null,
      columns: [
        { name: 'title', data: "", label: 'Başlık', icon: 'perm_identity', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'İsim alanı boş olamaz'] },
        { name: 'description', data: "", label: 'Mesaj', icon: 'chat', type: 'textarea' },
      ],
    }
  },
  methods: {
    noticeSave () {
      let veri = this.columns
      var notice = {
        title: this.columns[0].data,
        description: this.columns[1].data,
        status: this.status
      }
      this.$q.loading.show()
        if (veri[0].data.length < 3) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          var url="notice/update/" + this.id
          this.$axios.post(url, { notice })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "noticeList" })
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        }
    },
    noticeCancel () {
      this.$router.push({ name: "noticeList" })
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
      this.columns[0].data  =   params.title
      this.columns[1].data  =   params.description
      this.status  =   params.status
    }
  },
  mounted() {
    this.setModels()
  },
}
</script>
