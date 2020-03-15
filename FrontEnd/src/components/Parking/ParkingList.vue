<template>
<div class="border border-light">
    <h3 style="text-align: center">Parkings List</h3>
    <table class="table">
        <thead>
            <tr>
                <th>S/n</th>
                <th>Location</th>
                <th>Category</th>
                <th>Free Min</th>
                <th>Rate(Hourly)</th>
                <th>Rate(RealTime)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="parking in parkings" :key="parking.id">
                <td>{{parking.id}}</td>
                <td>{{parking.name}}</td>
                <td>{{parking.catname}}</td>
                <td>{{parking.freeminutes}}</td>
                <td>{{parking.ratehour}}</td>
                <td>{{parking.raterealtime}}</td>
                <td>{{parking.status}}</td>
            </tr>
        </tbody>
    </table>   
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ParkingList',
  data () {
    return {
        parkings: []
    }
  },
  async created () {
      try {
          const {data} = await axios.get('http://localhost:4000/api/search/index', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          this.parkings = data
      } catch (e) {
          console.log(e)
      }
  }
}
</script>
