
<script>
  import EssentialLink from "components/EssentialLink.vue";
  import MenuDropdown from "components/MenuDropdown.vue";
  import JwtDecode from "vue-jwt-decode"
  import MobilMenu from "components/MobileMenu";
  import {mapState} from "vuex";

  if (!sessionStorage.hasOwnProperty('x79wAdsc5848!52asd6plk2^a&acs33649')) {
    window.location = "/login"
  }
  const adminLink = [

    {
      title: "Rezervasyonlar",
      caption: "Rezervasyon Listesi",
      icon: "book_online",
      link: "/reservation",
      dropdown: false,
      role: "ReservationList"
    },
    {
      title: "Yeni Rezervasyon",
      caption: "Yeni veya geçmiş rezervasyonlar",
      icon: "book_online",
      link: "/reservation/create",
      dropdown: false,
      role: "ReservationCreate"
    },

    {
      title: "Kullanıcılar",
      caption: "Kullanıcı işlemleri",
      icon: "people",
      link: "/users",
      dropdown: true,
      role: "UserList"
    },
    {
      title: "İşletmeler",
      caption: "Otel ve acenta listesi",
      icon: "apartment",
      link: "/hotels",
      dropdown: true,
      role: "HotelList"
    },
    {
      title: "Finans",
      caption: "Hesap kitap işlemleri",
      icon: "menu_book",
      link: "/finans",
      dropdown: false,
      role: "FinansList"
    },
    {
      title: "Cariler",
      caption: "Hesap kitap işlemleri",
      icon: "menu_book",
      link: "/cariler",
      dropdown: true,
      role: "CariList"
    },
    {
      title: "Fiyatlar",
      caption: "Fiyat Yönetimi",
      icon: "local_atm",
      link: "/prices",
      dropdown: true,
      role: "PriceList"
    },
    {
      title: "Bölgeler",
      caption: "Bölge Yönetimi",
      icon: "map",
      link: "/regions",
      dropdown: true,
      role: "AreaList"
    },


    {
      title: "Araçlar",
      caption: "Araç Yönetimi",
      icon: "directions_car",
      link: "/cars",
      dropdown: true,
      role: "CarsList"
    },
    {
      title: "Duyurular",
      caption: "İşletmeler için Mesaj",
      icon: "record_voice_over",
      link: "/notice",
      dropdown: true,
      role: "PhoneBookList"
    },
    // {
    //   title: "Kasa",
    //   caption: "Gelirler giderler",
    //   icon: "attach_money",
    //   link: "/kasa",
    //   dropdown: true,
    //   role: "PhoneBookList"
    // },
    {
      title: "Telefon Defteri",
      caption: "Telefon Defteri",
      icon: "perm_phone_msg",
      link: "/phone-book",
      dropdown: true,
      role: "PhoneBookList"
    },
    {
      title: "Sistem Ayarları",
      caption: "Telefon Defteri",
      icon: "perm_data_setting",
      link: "/system-settings",
      dropdown: true,
      role: "PhoneBookList"
    },

    ]
  export default {
    name: "MainLayout",
    components: {MobilMenu, EssentialLink,MenuDropdown },
    data () {
      return {
        leftDrawerOpen: false,
        essentialLinks: null,
        fullname: this.CryptoJS.AES.decrypt(sessionStorage.getItem("cVs984vasd5481!daw^sa&54511akghH!w"),"Fatihhh").toString(this.CryptoJS.enc.Utf8),
        role: this.CryptoJS.AES.decrypt(sessionStorage.getItem("Klamskwjn123LSkl2^a!awds++123dawd1"),"Fatihhh").toString(this.CryptoJS.enc.Utf8),
        tab: "",
        width: 0,
        user_id: null,
        profile_edit: null,
        bizeUlasin:true,
        mobile:this.$q.platform.is.mobile,
        link:[],
        left:false,
        windowWidth: window.innerWidth - 35,
        thumbStyle: {
          right: '4px',
          borderRadius: '5px',
          backgroundColor: '#027be3',
          width: '5px',
          opacity: 0.75
        },
        Yukseklik: window.innerHeight,
        barStyle: {
          right: '2px',
          borderRadius: '9px',
          backgroundColor: '#027be3',
          width: '9px',
          opacity: 0.2
        }

      };
    },
    methods: {
      OpenWebSite(){
        window.open('https://turizmhosting.com', '_blank');
      },
      setRole(){
        this.essentialLinks=adminLink;
      }
    },
    computed: {
      ...mapState(["parameters"]),
      whatsappAPI() { return "https://wa.me/" + this.$store.state.parameters.SYSTEM_CONTACT_WHATSAPP + "?text=Merhabalar" },
      phoneLink() { return "tel:+" + this.$store.state.parameters.SYSTEM_CONTACT_PHONE },
      emailLink() { return "mailto:" + this.$store.state.parameters.SYSTEM_CONTACT_MAIL },
      widthData() {
        return "width:" + this.windowWidth + "px";
      }
    },
    mounted() {
      this.setRole()
      window.addEventListener('resize', () => {
        this.windowWidth = (window.innerWidth - 35)
      })
    },
    beforeMount() {
      this.CheckToken()
      this.getParameters()
    }
  };
</script>
<template>
  <q-layout view="hHh Lpr lff">
    <div v-if="windowWidth>740">
      <q-header elevated>
        <q-toolbar class="shadow-1">
          <q-tabs inline-label  outside-arrows mobile-arrows v-model="tab" class="MobileMenu" :style="widthData">
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" v-if="link.dropdown==false" />
            <q-btn-dropdown auto-close stretch flat icon="more" label="Yönetim Menü" v-if="role==0" >
              <q-scroll-area
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                style="height: 55vh;"
              >
              <q-list>
                <MenuDropdown v-for="link in essentialLinks" :key="link.title" v-bind="link" v-if="link.dropdown==true" />
              </q-list>
              </q-scroll-area>
            </q-btn-dropdown>
            <q-btn-dropdown dense stretch flat :label="fullname" dropdown-icon="person">
              <q-list>
                <q-item-label header>Kullanıcı İşlemleri</q-item-label>
                <q-item clickable v-close-popup tabindex="0" :to="{ name: 'myaccount', params: { id: user_id }}">
                  <q-item-section avatar>
                    <q-avatar icon="settings" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Ayarlar</q-item-label>
                    <q-item-label caption>Kullanıcı ayarlar..</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup tabindex="0" to="/logout">
                  <q-item-section avatar>
                    <q-avatar icon="exit_to_app" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Oturumu Kapat</q-item-label>
                    <q-item-label caption>Güvenli Çıkış</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </q-toolbar>
      </q-header>
    </div>

    <div v-if="windowWidth<750">
      <q-header class="bg-primary text-white">
        <q-toolbar class="shadow-1">

            <q-btn dense flat round icon="menu" @click="left = !left" />
            <q-separator vertical />
            <q-btn dense flat label="Yeni Rezervasyon" icon="book_online" to="/reservation/create" style="margin: 0 auto" />
            <q-separator vertical />
          <q-btn-dropdown flat dense round dropdown-icon="person">
            <q-list>
              <q-item-label header>Kullanıcı İşlemleri</q-item-label>
              <q-item clickable v-close-popup tabindex="0" :to="{ name: 'myaccount', params: { id: user_id }}">
                <q-item-section avatar>
                  <q-avatar icon="settings" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Ayarlar</q-item-label>
                  <q-item-label caption>Kullanıcı ayarlar..</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup tabindex="0" to="/logout">
                <q-item-section avatar>
                  <q-avatar icon="exit_to_app" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Oturumu Kapat</q-item-label>
                  <q-item-label caption>Güvenli Çıkış</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
      <q-drawer v-model="left" side="left" behavior="mobile" elevated>
        <q-card class="bg-grey-2">
          <q-card-section>
            <div class="text-h6 text-center">{{ parameters.SYSTEM_SHORTNAME }}</div>
            <div class="text-center">{{ fullname }}</div>
          </q-card-section>
        </q-card>
          <q-list bordered class="rounded-borders" expand-icon-class="primary">
          <mobil-menu v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-drawer>

    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-btn
      class="absolute-bottom-right q-ma-md"
      fab
      color="primary"
      size="lg"
      label="İLETİŞİM"
      @click="bizeUlasin=!bizeUlasin"
      v-if="role==1"

    />
    <q-card
      class="absolute-bottom-right q-ma-md bg-primary text-white"
      style="width: 300px; border-bottom-left-radius: 2em"
      v-if="bizeUlasin"
    >
      <q-card-section class="text-h6">
        {{parameters.SYSTEM_CONTACT_TITLE}}
      </q-card-section>

      <q-card-section class="text-subtitle1">
        {{parameters.SYSTEM_CONTACT_TEXT}}
        <br />
        <br />
        <br />
        Telefon : <a :href="phoneLink" style="color: #fff;text-decoration: none;">+{{ parameters.SYSTEM_CONTACT_PHONE }}</a><br />
        WhatsApp : <a :href="whatsappAPI" target="_blank" style="color: #fff;text-decoration: none;">+{{ parameters.SYSTEM_CONTACT_WHATSAPP }}</a><br />
        Eposta : <a :href="emailLink" style="color: #fff;text-decoration: none;"> {{ parameters.SYSTEM_CONTACT_MAIL }}</a>
      </q-card-section>

      <q-card-actions align="left" class="flex justify-between">
        <div class="column" @click="OpenWebSite" style="cursor: pointer">
          <div class="row">
            <q-icon name="img:icon/turizmhosting.png" class="column" style="font-size: 18px;margin-top:5px;margin-right: 3px" />
            <div class="column">
              <span style="font-size: 8px;">powered by</span>
              <span style="font-size: 10px;">Turizm Hosting</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <q-btn  color="white" text-color="black" label="KAPAT" @click="bizeUlasin=!bizeUlasin" />
          </div>
        </div>
      </q-card-actions>

    </q-card>

  </q-layout>
</template>
<style>
::-moz-selection {
  background:none;
}
::selection {
  background:none;
}
input::selection, .q-editor__content::selection, .q-editor__content *::selection  {
  background: #dd3933;
  color: #ffffff;
}
input::-moz-selection,.q-editor__content::-moz-selection, .q-editor__content *::-moz-selection {
  background: #dd3933;
  color: #ffffff;
}
</style>
