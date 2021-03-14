<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('UserCreate')">

    <div class="text-h6 fit">Kullanıcı Oluştur!  </div>
    <q-separator inset />
    <q-form class="fit genel">
      <div class="sol">
      <q-input
        v-for="user in columns"
        :key="user.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
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
        name="usertype"
        v-model="user_type"
        val="1"
        color="primary"
        label="Acenta & Hotel"
        v-if="CheckRole('UserCreateHotel')"
      />

      <q-radio
        name="usertype"
        v-model="user_type"
        val="0"
        color="primary"
        label="Yönetici"
        v-if="CheckRole('UserCreateAdmin')"
      />
        <hr />
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
    <div class="sag">
      <user-roles v-if="user_type==0" v-on:setRoles="setRoles" :user_type="user_type" />
      <user-roles-hotel v-if="user_type==1" v-on:setRoles="setRoles" :user_type="user_type" />
    </div>
    </q-form>

  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>


</template>


<script>

import UserRoles from "components/UserRoles";
import UserRolesHotel from "components/UserRolesHotel";
export default {
  name: 'UsersCreate',
  components: {UserRoles,UserRolesHotel},
  data () {
    return {
      loading: false,
      user_type: "1",
      columns: [
        { name: 'fullname', data: "", label: 'Tam İsim', icon: 'perm_identity', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'İsim alanı boş olamaz'] },
        { name: 'username', data: "", label: 'Kullanıcı adı', icon: 'perm_identity', type: 'text', tab: 2, rules: [val => val && val.length > 0 || 'Kullanıcı adı alanı boş olamaz'] },
        { name: 'mail', data: "", label: 'E-posta', icon: 'mail', type: 'email', tab: 3 },
        { name: 'phone', data: "", label: 'Telefon', icon: 'phone', mask: "(###) ### - ####", type: 'text', tab: 4 },
        { name: 'password', data: "", label: 'Şifre', icon: 'vpn_key', type: 'password', tab: 5 },
        { name: 'password_match', data: "", label: 'Şifre (Tekrar)', icon: 'vpn_key', type: 'password', tab: 6 }
      ],
      selectedRols:[],
    }
  },
  methods: {
    setRoles(roles){
      this.selectedRols=roles
    },
    getUserRoles(){
      if(this.CheckRole('UserCreate')==false){
        return false
      }
      this.$q.loading.show()
      this.$axios.get('roles')
        .then((result) => {
          this.roles=result.data.return
          this.$q.loading.hide()
        }).catch((err) => {
        this.data = err.data;
        this.$q.loading.hide()
      });
    },
    userSave () {
      if(this.CheckRole('UserCreate')==false){
        return false
      }
      let veri = this.columns
      var user_detail = {
        fullname: this.columns[0].data,
        username: this.columns[1].data,
        email: this.columns[2].data,
        phone: this.columns[3].data,
        password: this.columns[4].data,
        password_match: this.columns[5].data,
        user_is_hotel: this.user_type,
        roles: this.selectedRols
      }
      this.$q.loading.show()
      if (veri[4].data == veri[5].data) {
        if (veri[0].data.length < 3 || veri[1].data.length < 4 || veri[3].data.length < 9) {
          this.$q.loading.hide()
          this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
        } else {
          this.$axios.post('users/create', { user_detail })
            .then((result) => {
              this.$q.loading.hide()
              this.$q.dialog({
                title: "İşlem başarılı.",
                message: result.data.status.message,
                persistent: true
              }).onOk(() => {
                this.$router.push({ name: "userList" })
              })
            }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
        }
      } else {
        this.alert("Uyarı", "Girdiğiniz iki şifre eşleşmiyor.");
      }
    },
    userCancel () {
      this.$router.push({ name: "userList" })
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
<style>
  .genel {
    display: flex;

  }
  .sol {
    width: 30%;
    margin: 1%;
  }
  .sag {
    width: 70%;
    margin: 1%;
  }
  @media only screen and (max-width: 600px) {
    .genel {
      display: flex;
      flex-direction: column;
    }
    .sol {
      width: 100%;
    }
    .sag {
      width: 100%;
    }
  }
</style>
