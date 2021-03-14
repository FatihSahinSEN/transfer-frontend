<template>
  <div class="q-pa-md row items-start q-gutter-md" v-if="CheckRole('CariList')">
    <div class="text-h6 fit">Cariler
      <q-select
        style="width: 150px;display:inline-block;margin-left:20px"
        dense
        color="primary"
        v-model="listed"
        option-label="name"
        option-value="id"
        :options="listDetail"
        v-if="CheckRole('CariDrivers')"
      ></q-select>
    </div>
    <q-separator inset/>
    <div class="fit">

      <cari-driver-list v-if="listed.id==2" @CariDetay="CariDetay"/>
      <cari-business-list v-if="listed.id==1" @CariDetay="CariDetay" />
      <q-dialog maximized ref="caridetail" v-if="CheckRole('CariDetail')">
        <cari-detail :details="details" @AccountCalc="AccountCalc"></cari-detail>
      </q-dialog>
      <q-dialog maximized ref="caridetaildriver" v-if="CheckRole('CariDrivers')">
        <cari-detail-driver :details="details" ></cari-detail-driver>
      </q-dialog>
    </div>
  </div>
  <div class="q-pa-md row items-start q-gutter-md" v-else>
    <h6 class="text-center"> Sayfayı görüntüleme yetkiniz bulunmamaktadır.</h6>
  </div>
</template>

<script>
  import CariDetials from "components/CariDetials";
  import CariDriverList from "components/CariDriverList";
  import CariBusinessList from "components/CariBusinessList";
  import CariDetailDriver from "components/CariDetailDriver";
  import {mapState} from "vuex";

  export default {
    name: 'cariList',

    data() {
      return {
        details:null,
        listDetail:[
          {
            id:1,
            name:"Şirketler"
          },
          {
            id:2,
            name:"Şöförler"
          },
        ],
        listed:{
          id:1,
          name:"Şirketler"
        },

      }
    },
    components: {CariDetailDriver, CariBusinessList, CariDriverList, "cari-detail": CariDetials},
    methods: {
      CariDetay(row,type){
        if(type==1){
          if(this.CheckRole('CariDrivers')==false){
            return false
          }
          this.details=row
          this.$refs.caridetaildriver.show()
        }else{
          if(this.CheckRole('CariDetail')==false){
            return false
          }
          this.details=row
          this.$refs.caridetail.show()
        }
      },
      AccountCalc(islem,miktar){
        console.log(islem)
        console.log(miktar)
      },
    },
    computed: {
      ...mapState(['filter','grid']),

      pagination:{
        get(){
          return this.$store.state.pagination
        },
        set(value){
          this.$store.commit("setPagination", value)
        }
      },
    },
  }
</script>
<style>
  .FilterInput {
    text-align: center;
    font-size: 1.3em;
    padding: 0;
    margin: 0px;
    width: 7em;
  }

  .ReservationText {
    background-color: #dd3933;
    color: #ffffff;
    font-size: 1.4em;
    text-align: center;
  }
</style>
