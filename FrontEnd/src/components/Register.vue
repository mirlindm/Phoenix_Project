<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="userRegister">
      <h2 class="form-signin-heading">Sign Up</h2>
      <label for="inputFullname" class="sr-only">Full Name</label>
      <input v-model="user.full_name" type="text" id="inputFullname" class="form-control" placeholder="Full Name" required autofocus>
      <label for="inputUsername" class="sr-only">Username</label>
      <input v-model="user.username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>      
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="user.password" type="text" id="inputPassword" class="form-control" placeholder="Password" required>
      <label for="inputEmail" class="sr-only">Email</label>
      <input v-model="user.email" type="text" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
      <label for="inputAge" class="sr-only">Age</label>
      <input v-model="user.age" type="text" id="inputAge" class="form-control" placeholder="Age" required autofocus>
      <label for="inputAddress" class="sr-only">Address</label>
      <input v-model="user.address" type="text" id="inputAddress" class="form-control" placeholder="Address" required autofocus>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <h4 class="err-message">{{err_message}}</h4>
      <button id="backToLogin"  @click="back">Login</button>
      
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
        user: {
            full_name: '',
            username: '',
            password: '',
            age: '',
            address: '',
            email: '',
            err_message: ''
        }
    }
  },
  methods: {
    userRegister() {
      try{
        this.$store.dispatch('register', this.user)
        .then(() => this.$router.push("/Dashboard"))
        .catch(err => {
          console.log(err)
          this.err_message = 'User Already Exists'
          })
      } catch(e) {
        console.log(e)

      }
    },
    back() {
      this.$router.push('/Home')
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
  margin: 4% auto;
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
