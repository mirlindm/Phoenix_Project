<template>
<div class="border border-light">
    <h3 style="text-align: center">My Booking(s) History</h3>
    <table class="table">
        <thead>
            <tr>
                <th>S/n</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Payment Type</th>
                <th>Parking Place</th>
                <th>Status</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="booking in bookingList" :key="booking.id">
                <td>{{booking.id}}</td>
                <td>{{booking.start_time | formatDate}}</td>
                <td>{{booking.end_time | formatDate}}</td>
                <td>{{booking.calc_criteria | PaymentType}}</td>
                <td>{{booking.parking_id}}</td> <!-- get parking object with it, to show parking place name -->
                <td>{{booking.status}}</td>
                <td>
                    <!-- <button type="button" @click="btnExtendClick(booking.id)" class=" btn btn-sm btn-success">Extend</button> -->
                    <!-- <button type="button" @click="btnCancelClick(booking.id)" class=" btn btn-sm btn-danger">Cancel</button> -->
                    <button type="button" v-on:click="btnSelectBooking(booking)" class=" btn btn-sm btn-success">Extend</button>
                    <button type="button" v-on:click="btnCancelClick(booking)" class=" btn btn-sm btn-danger">Cancel</button>
                </td>
            </tr>
        </tbody>
    </table>
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

function formatDateFun(value){
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
}


export default {
  name: 'BookingList',
  data () {
    return {
        // bookingModel:{
        //     start_time: '',
        //     end_time: '',
        //     status: '',
        //     calc_criteria: 0,
        //     user_id: 0,
        //     parking_id: 0
        // },
        ExtendTime: new Date(),
        bookingList: [],
        selectedBooking: ''
    }
  },
  async created () {
      try {
          const {data} = await axios.get('http://localhost:4000/api/bookings/all', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          this.bookingList = data
      } catch (e) {
          console.log(e)
      }
  },
  methods: {
      btnSelectBooking (booking) {
          function diff_mins(dt2, dt1) {
              var diff =(dt2.getTime() - dt1.getTime()) / 1000;
              diff /= (60);
              return Math.round(diff);
          }
          var nd = new Date();
          var ed = new Date(booking.end_time);

          if(diff_mins(ed,nd) <= 2){
              alert('You cant extend time now');
          } else if (booking.status === 'CANCELLED'){
              alert('You cant extend time now');
          }
          else{
              this.$router.push({ name: 'ExtendBooking', params: { bk: booking } })
          }
          this.selectedBooking = booking;
      },
      async btnCancelClick(bookingObj){
          try {
              const {data} = await axios.post('http://localhost:4000/api/bookings/cancel', {id: bookingObj.id}, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
          } catch(e) {
              alert('Error:'+ e)
          }
          
          try {
              const {data} = await axios.get('http://localhost:4000/api/bookings/all', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
              this.bookingList = data
          } catch (e) {
              console.log(e)
          }
      }
  }
}
</script>
