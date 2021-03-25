// more info on params: https://quasar.dev/quasar-cli/boot-files
import JwtDecode from "vue-jwt-decode";

export default async ({Vue}) => {
  Vue.mixin({
    methods: {
      CheckRole(value){
        var role=this.$store.state.scopes.find((item) => item==value)
        if(role){
          return role
        }
        return false
      },
      CheckToken(){
        var token = sessionStorage.getItem("x79wAdsc5848!52asd6plk2^a&acs33649")
        this.$store.commit("setTekon",token)
        this.$axios.defaults.headers.token=token
        var url = 'user/token'
        let dd=JwtDecode.decode(token)
        this.$store.commit("setScopes",dd.scopes)
        this.$axios.post(url,{token})
          .then((result) => {
            if(result.data.status.message!="success"){
              sessionStorage.removeItem('x79wAdsc5848!52asd6plk2^a&acs33649');
              sessionStorage.removeItem('cVs984vasd5481!daw^sa&54511akghH!w');
              sessionStorage.removeItem('Klamskwjn123LSkl2^a!awds++123dawd1');
              sessionStorage.removeItem('cVs984vasd5481!daw^sa&54511akghH!x');
              this.$router.push({ name: "login" })
            }else{

              this.user_id=result.data.return.id;
            }
          }).catch((err) => {
          sessionStorage.removeItem('x79wAdsc5848!52asd6plk2^a&acs33649');
          sessionStorage.removeItem('cVs984vasd5481!daw^sa&54511akghH!w');
          sessionStorage.removeItem('Klamskwjn123LSkl2^a!awds++123dawd1');
          sessionStorage.removeItem('cVs984vasd5481!daw^sa&54511akghH!x');
          this.$router.push({ name: "login" })
          this.essentialLinks=adminLink;
        });
      },
      getParameters(){
        if(this.$store.state.parameters.length>0) {
            return true;
            console.log("Parametre Mevcut..");
        }else {
          this.$axios.get("/paramaters")
            .then((res) => {
              // console.log(res.data);
              document.title = res.data.return.SYSTEM_TITLE;
              this.$store.commit("setParameters",res.data.return);
            })
            .catch((e) => {
              console.log(e);
            })
        }
      }
    }
  })
}
