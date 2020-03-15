<template>
<div class="border border-light">
    <h3 style="text-align: center">Users List</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Full</th>
                <th>Username</th>
                <th>Age</th>
                <th>Account Type</th>
                <th>IsActive</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{user.full_name}}</td>
                <td>{{user.username}}</td>
                <td>{{user.email}}</td>
                <td>{{user.usertype}}</td>
                <td>{{user.is_active}}</td>
            </tr>
        </tbody>
    </table>   
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UsersList',
  data () {
    return {
        users: []
    }
  },
  async created () {
      try {
          const {data} = await axios.get('http://localhost:4000/api/users', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          this.users = data
      } catch (e) {
          console.log(e)
      }
  }
}
</script>
