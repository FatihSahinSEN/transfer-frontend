<template>
  <div>
    <img class="wave" src="assets/wave.png">
    <div class="container">
      <div class="img">
        <img src="assets/bg.svg">
      </div>
      <div class="login-content">
        <form v-on:submit="login">
          <h2 class="title">GoByVIP</h2>
          <div class="input-div one">
            <div class="i">
              <q-icon name="person" />
            </div>
            <div class="div">
              <q-input borderless v-model="username" label="Kullanıcı adı" autofocus />
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <q-icon name="lock" />
            </div>
            <div class="div">
              <q-input :type="isPwd ? 'password' : 'text'" borderless v-model="password" label="Şifre">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;margin:20px 0">
            <q-toggle
              dense
              label="Beni Hatırla"
              v-model="rememberMe"
            />
            <a href="#" @click="Contact">İletişim</a>
            <a href="#" @click="Contact">Şifremi Unuttum?</a>

          </div>
          <input type="submit" class="btn" @click="login" value="Giriş Yap">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import SecureLS from 'secure-ls'
  import {mapState} from 'vuex'
  const localSecure = new SecureLS({
    isCompression: false,
    encodingType: 'des',
    encryptionSecret: '51f28b551f226d8dc3b9fc7098dc3b9a29d958f3a1fe'
  });
export default {
  name: 'Login',
  data() {
    return {
      isPwd: "password",
      rememberMe:true,
      username: 'fatih',
      password: '123456',
      beni_hatirla: false
    }
  },
  methods: {
    Contact(){
      event.preventDefault()
      this.$store.dispatch("AuthService/TimerStart");

    },
    async login() {
      event.preventDefault()
      let request={
        username:this.username.trim(),
        password:this.password.trim()
      }
      if(request.username.length>3 && request.password.length>5){
        await this.$store.dispatch("AuthService/LoginRequest", request);
      }else{
        this.alert("Uyarı","Geçersiz kullanıcı adı ve şifre girişi yaptınız.")
        return false
      }
    },
    alert(title, message) {
      this.$q.dialog({
        title: title,
        message: message,
        persistent: true
      })
    },
  },
  computed: {
    ...mapState(["parameters"]),
    ShortNAME(){
      return this.$store.state.title;
    },
    phoneLink(){
      return "tel:+90555555"
    }
  },
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body{
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
  }

  .wave{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
  }

  .container{
    background-color: rgba(0,0,0, .1);
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap :7rem;
    padding: 0 2rem;
  }

  .img{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  .img img{
    width: 500px;
  }

  form{
    width: 360px;
  }

  .login-content img{
    height: 100px;
  }
  .login-content h2:after{
    content: '';
    background: rgb(21,123,133);
    background: linear-gradient(81deg, rgba(21,123,133,0.17130602240896353) 0%, rgba(72,104,196,0.6306897759103641) 34%, rgb(51, 119, 221) 100%);
    border-radius: 5px;
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  .login-content h2{
    z-index: 2;
    position: relative;
    display: inline-block;
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;
    text-shadow: 1px 1px 6px rgba(222, 166, 26, 0.46);
  }

  .login-content .input-div{
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
  }

  .login-content .input-div.one{
    margin-top: 0;
  }

  .i{
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i i{
    transition: .3s;
    color: #133d67;
    font-size: 25px;
  }

  .input-div > div{
    position: relative;
    height: 45px;
  }

  .input-div > div > h5{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: .3s;
  }

  .input-div:before, .input-div:after{
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: #133d67;
    transition: .4s;
  }

  .input-div:before{
    right: 50%;
  }

  .input-div:after{
    left: 50%;
  }

  .input-div.focus:before, .input-div.focus:after{
    width: 50%;
  }

  .input-div.focus > div > h5{
    top: -5px;
    font-size: 15px;
  }

  .input-div.focus > .i > i{
    color: #4c8fd2;
  }

  .input-div > div > input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'poppins', sans-serif;
  }

  .input-div.pass{
    margin-bottom: 4px;
  }

  a{
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: .3s;
  }

  a:hover{
    color: #133d67;
  }

  .btn{
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #133d67, #3b70a4, #266aae);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: .5s;
  }
  .btn:hover{
    background-position: right;
  }


  @media screen and (max-width: 1050px){
    .container{
      background-color: rgba(0,0,0, .1);
      grid-gap: 5rem;
    }
  }

  @media screen and (max-width: 1000px){
    form{
      width: 290px;
    }

    .login-content h2{
      font-size: 2.4rem;
      margin: 8px 0;
    }

    .img img{
      width: 400px;
    }
  }

  @media screen and (max-width: 900px){
    .container{
      grid-template-columns: 1fr;
      background-color: rgba(0,0,0, .1);
    }
    .login-content {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: flex-start;
    }

    .img{
      position: absolute;
      bottom: -3.2vh;
      right: 0;
    }
    .img > img {
      height: 45vh;
      width: 86vw;
    }

    .wave{
      bottom: -50vh;
    }

    .login-content{
      justify-content: center;
    }
  }
</style>
