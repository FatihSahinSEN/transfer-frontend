<template>
  <q-dialog ref="InstallApp" position="bottom" persistent>
    <q-card style="width: 100%">
        <q-card-section class="row items-center no-wrap">
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar  rounded size="48px">
                <img :src="parameters.SYSTEM_ICON">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ parameters.SYSTEM_SHORTNAME }}</q-item-label>
              <q-item-label>Uygulamasını Ana Ekrana Eklemek istermisiniz?</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-space />
        <q-btn flat label="Hayır" @click="HideInstall" />
        <q-btn color="primary" style="margin-left: 15px" label="Evet" @click="Install" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "InstallApp",
      data() {
        return {
          deferredPrompt:null
        }
      },
      methods : {
        ShowInstall(){
          this.$refs.InstallApp.show()
        },
        HideInstall(){
          this.$refs.InstallApp.hide()
        },
        async Install(){
          this.deferredPrompt.prompt();
          const { outcome } = await this.deferredPrompt.userChoice;
          // console.log(`User response to the install prompt: ${outcome}`);
          this.deferredPrompt = null;
          this.HideInstall();
        }
      },
      mounted() {
        window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          this.deferredPrompt = e;
          this.ShowInstall();
        });
      },
      computed: {
        ...mapState(["parameters"]),
      }

    }

</script>

<style scoped>

</style>
