<template>
  <div>
    <h1>Parking App</h1>
    <hr>
    <p>Welcome ( {{userData.full_name}} ) to Parking App</p>
    <h5>Name: {{userData.full_name}}</h5>
    <h5>Age: {{userData.age}}</h5>
    <h5>Email: {{userData.email}}</h5>
    <h5>Address: {{userData.address}}</h5>
    <h5>Username: {{userData.username}}</h5>
    <h5>User Type: {{userData.usertype}}</h5>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      userData:''
    }
  },
  async created () {
      try {
          const {data} = await axios.get('http://localhost:4000/api/my_account', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          this.userData = data
      } catch (e) {
          console.log(e)
      }
  }
}
</script>

