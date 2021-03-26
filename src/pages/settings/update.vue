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

      <q-input outlined dense bottom-slots fill-mask lazy-rules type="text" mask="90##########" color="orange-14" v-model="value"
               v-else-if='type=="input-phone"'
      />
      <div v-else-if='type=="color"'>
        <q-btn label="SIFIRLA" @click="setDefaultColor" style="background-color: #133d67;width: 250px;color:#fff;margin-bottom: 25px"/>
        <q-color v-model="value" style="width: 250px;margin-bottom: 25px" @change="setPrimaryColor" />
      </div>

      <q-editor
        v-model="value"
        min-height="10rem"
        autofocus
        ref="editor"
        @keyup.enter.stop
        style="margin-bottom: 15px;"
        v-else-if='type=="textarea-html"'
        :toolbar="[
        ['editorData'],
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
        :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      >
        <template v-slot:editorData>
          <q-btn-dropdown
            dense no-caps
            ref="token"
            no-wrap
            unelevated
            color="white"
            text-color="black"
            label="DATA"
            icon="data_saver_on"
            size="sm"
          >
            <q-list dense>
              <q-item tag="label" clickable @click="add('YOLCU_ADI')">
                <q-item-section side>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Yolcu Adı</q-item-section>
              </q-item>
              <q-item tag="label" clickable @click="add('YOLCU_SOYADI')">
                <q-item-section side>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Yolcu Soyadı</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-editor>
      <div  v-else-if='type=="input-file"'>
      <q-uploader
        :url="uploadURI"
        style="margin-bottom:15px;"
        accept=".jpg, image/*"
        auto-upload
        field-name="file"
        @uploaded="changeUploadFile"
      />
      <q-input  outlined dense bottom-slots v-model="value" type="text" readonly />
      </div>


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
  import { colors } from 'quasar'
export default {
  name: 'SettingUpdate',
  data () {
    return {
      loading: false,
      id: null,
      type:null,
      value:null,
      uploadURI: process.env.API + "paramater/upload",
      columns: [
        { name: 'grup', data: "0", label: 'Parametre Grubu', icon: 'settings', type: 'text', readyonly: true ,tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'Grup Alanı boş olamaz'] },
        { name: 'parameter', data: "1", label: 'Parametre', icon: 'settings', type: 'text',readyonly: true, tab: 2, rules: [val => val && val.length > 0 || 'Parametre alanı boş olamaz'] },
        { name: 'anahtar', data: "2", label: 'KEY', icon: 'settings', type: 'text', tab: 3,readyonly:true, rules: [val => val && val.length > 0 || 'Değer alanı boş olamaz'] },
      ],
    }
  },
  methods: {
    setDefaultColor(){
      this.value='#133d67';
      this.setPrimaryColor()
    },
    setPrimaryColor(){
      colors.setBrand('primary', this.value)
    },
    changeUploadFile(file){
      // this.value="assets/upload/" + JSON.parse(file.xhr.response).result.file
      var file=JSON.parse(file.xhr.response);
      this.value=file.return.file
    },
    add (name) {
      const edit = this.$refs.editor
      this.$refs.token.hide()
      edit.caret.restore()
      edit.runCmd('insertHTML', `${name}`)
      edit.focus()
    },
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
      console.log(params)
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

