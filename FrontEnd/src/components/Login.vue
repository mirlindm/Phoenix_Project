<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="userLogin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputUsername" class="sr-only">Username</label>
      <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <h4 class="err-message">{{err_message}}</h4>
      <button id="button1"  @click="signUp">signup ?</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      err_message: ''
    }
  },
  methods: {
    userLogin() {
      try{
        this.$store.dispatch('userLogin', {username: this.username, password: this.password})
        .then(() => this.$router.push("/Dashboard"))
        .catch(err => {
          console.log(err)
          this.err_message = 'Invalid Username or Password'
          })
      } catch(e) {
        console.log(e)
      }
    },
    signUp() {
      this.$router.push('/signup')
    }
  }
}
        
  

</script>

<style lang="css">

.err-message {
  text-align: center;
  color: red;
}

.login-wrapper {
  background: #D1D1D1;
  width: 60%;
  margin: 5% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
