<template>
  <div class="border border-light">
    <form class="form" @submit.prevent="extendBooking">
      <h2 style="text-align: center">Enter new extended time</h2>
      <label for="inputId" >Id</label>
      <input v-model="bookingDetails.id" type="text" id="inputId" class="form-control" placeholder="Username" required readonly>
      <label for="inputstart_time" >Start Time</label>
      <input v-model="bookingDetails.start_time" type="text" id="inputstart_time" class="form-control" placeholder="Password" required readonly>
      <label for="inputend_time" >End Time</label>
      <input v-model="bookingDetails.end_time" type="text" id="inputend_time" class="form-control" placeholder="Password" required readonly>
      <label for="inputnew_end_time" >New End Time</label>
      <!-- <input v-model="new_end_time" type="text" id="inputnew_end_time" class="form-control" placeholder="Password" required autofocus> -->
      <date-picker v-model="newEndTime"></date-picker>
      <hr />
      <button class="btn btn-sm btn-default" type="button" @click="goBack()">Back</button>
      <button class="btn btn-sm btn-success" type="submit">Extend</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import datePicker from 'vue-bootstrap-datetimepicker';
// You have to add CSS yourself
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
// Bootstrap css  
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios'

export default {
  name: 'ExtendBooking',
  data () {
    return {
      newEndTime: new Date(),
      bookingDetails: ''
    }
  },
  created (){
      this.bookingDetails = this.$route.params.bk;
  },
  components:{
    datePicker
  },
  methods: {
    async extendBooking() {
      try{
        const {data} = await axios.post('http://localhost:4000/api/bookings/update', {id: this.bookingDetails.id, start_time: this.bookingDetails.start_time, end_time: this.newEndTime, calc_criteria: this.bookingDetails.calc_criteria}, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        this.parkings = data
        alert('Your booking No: '+ this.bookingDetails.id +' is extended');
        this.$router.push('/BookingList')
      } catch(e) {
        alert(e);
        console.log(e)
      }
    },
    goBack() {
      this.$router.push('/BookingList')
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
