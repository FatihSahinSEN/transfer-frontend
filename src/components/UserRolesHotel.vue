<template>
  <div>
    <q-list bordered v-for="group in roles" :key="group.id">
      <q-expansion-item
        header-class="HeaderTextColor"
        :label="group.name"
        default-opened
      >
        <q-card>
          <q-card-section>
            <q-checkbox
              v-model="role.status"
              :label="role.role_name"
              :val="role.role_scope"
              :true-value="role.role_scope"
              false-value="0"
              v-for="role in group.roles"
              :key="role.role_id"
              style="margin:0 20px"
              @input="setRole"
            >
              <q-tooltip content-class="bg-blue-12" content-style="font-size: 16px" :offset="[10, 10]">
                {{ role.role_desc }}
              </q-tooltip>
            </q-checkbox>
          </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </div>
</template>

<script>

    export default {
      name: "UserRolesHotel",
      props:["user_id","user_type"],
      data(){
          return {
            roles:[],
            usertype:this.$props.user_type,
            Selected:[]
          }
      },
      methods: {
        getUserRoles(){
          let url;
          if(this.$route.name=="userUpdate"){
              url="role/" + this.$props.user_id
          }else{
              url="roles/" + this.usertype
          }
          this.$q.loading.show()
          this.$axios.get(url)
            .then((result) => {
              this.roles=result.data.return
              this.$q.loading.hide()
              this.setRole()
            }).catch((err) => {
            this.data = err.data;
            this.$q.loading.hide()
          });
        },
        setRole(value,evt){
          this.$emit("setRoles",this.roles)
        },
      },
      mounted() {
        this.getUserRoles()
      }
    }
</script>

<style scoped>
  .HeaderTextColor {
    background-color: var(--q-color-primary);
    color: #ffffff;
    font-size: 1.2em;
  }
</style>
