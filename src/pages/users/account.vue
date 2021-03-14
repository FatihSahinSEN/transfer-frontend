<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <div class="text-h6 fit">Hesap Ayarları!</div>
    <q-separator inset />
    <div v-if="usersecure">
      <h6>Bu kullanıcı Korumalı olduğu için işlem yapamazsınız..</h6>
      <q-btn
        color="red text-white shadow-2"
        icon="cancel"
        label="İptal"
        @click="userCancel"
      />
    </div>
    <q-form class="fit genel" v-else>
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
          :readonly="user.readyonly"
        >
          <template v-slot:prepend>
            <q-icon :name="user.icon" />
          </template>

          <template v-slot:hint>
            {{user.hint}}
          </template>
        </q-input>
        <hr />
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
      </div>

    </q-form>

  </div>

</template>


<script>

  import UserRoles from "components/UserRoles";
  import UserRolesHotel from "components/UserRolesHotel";
  export default {
    name: 'UsersUpdate',
    components: {UserRoles,UserRolesHotel},
    data () {

      return {
        userStatus: "",
        user_type: "",
        loading: false,
        usersecure:false,
        columns: [
          { name: 'fullname', data: "", label: 'Tam İsim', icon: 'perm_identity', type: 'text', tab: 1, autofocus: 'autofocus', rules: [val => val && val.length > 0 || 'İsim alanı boş olamaz'],readyonly:false },
          { name: 'username', data: "", label: 'Kullanıcı adı', icon: 'perm_identity', type: 'text', tab: 2, rules: [val => val && val.length > 0 || 'Kullanıcı adı alanı boş olamaz'],readyonly:true },
          { name: 'mail', data: "", label: 'E-posta', icon: 'mail', type: 'email', tab: 3,readyonly:false },
          { name: 'phone', data: "", label: 'Telefon', icon: 'phone', mask: "(###) ### - ####", type: 'text', tab: 4 ,readyonly:false},
          { name: 'password', data: "", label: 'Şifre', icon: 'vpn_key', type: 'password', tab: 5 ,readyonly:false},
          { name: 'password_match', data: "", label: 'Şifre (Tekrar)', icon: 'vpn_key', type: 'password', tab: 6 ,readyonly:false}
        ],
        selectedRols:[],
      }
    },
    methods: {
      setRoles(roles){
        this.selectedRols=roles
      },
      userSave () {
        let veri = this.columns
        var user_detail = {
          fullname: this.columns[0].data,
          username: this.columns[1].data,
          email: this.columns[2].data,
          phone: this.columns[3].data,
          password: this.columns[4].data,
          password_match: this.columns[5].data
        }
        this.$q.loading.show()
        if (veri[4].data == veri[5].data) {
          if (veri[0].data.length < 3 || veri[1].data.length < 4 || veri[3].data.length < 9) {
            this.$q.loading.hide()
            this.alert("Uyarı", "Lütfen tüm alanları doğru doldurunuz.");
          } else {
            let id = this.$route.params.id
            let url = 'account/update/' + id
            this.$axios.post(url, { user_detail })
              .then((result) => {
                this.$q.loading.hide()
                this.$q.dialog({
                  title: "İşlem başarılı.",
                  message: result.data.status.message,
                  persistent: true
                }).onOk(() => {
                  this.$router.push({ name: "ReservationList" })
                })
              }).catch((err) => {
              this.$q.loading.hide()
              this.alert("HATA", err);
            });
          }
        } else {
          this.$q.loading.hide()
          this.alert("Uyarı", "Girdiğiniz iki şifre eşleşmiyor.");
        }
      },
      userCancel () {
        this.$router.push({ name: "ReservationList" })
      },
      alert (title, message) {
        this.$q.dialog({
          title: title,
          message: message,
          persistent: true
        })
      },
      getUser () {
        let id = this.$route.params.id
        let url = 'users/get/' + id
        this.$axios.get(url)
          .then((result) => {
            this.$q.loading.hide()
            this.columns[0].data = result.data.return.fullname
            this.columns[1].data = result.data.return.username
            this.columns[2].data = result.data.return.email
            this.columns[3].data = result.data.return.phone
            this.selectedRols = result.data.return.scopes
            this.user_type = result.data.return.user_is_hotel
            if (result.data.return.user_status == 1) {
              this.userStatus = true
            } else {
              this.userStatus = false
            }
            //this.usersecure=this.checkUserSecure()

          }).catch((err) => {
          this.$q.loading.hide()
          this.alert("HATA", err);
        });
      },
      checkUserSecure(){
        var role=this.selectedRols.find((item) => item=="UserSecure")
        if(role){
          return true
        }
        return false
      }
    },
    mounted () {
      this.getUser();
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
