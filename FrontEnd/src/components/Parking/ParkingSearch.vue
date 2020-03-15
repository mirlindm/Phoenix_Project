<template>
<div class="row">
  <div class="col-md-8">
    <div class="row">
      <fieldset>
        <legend>Search Parkings</legend>
        <form class="form-signin" @submit.prevent="parkingSearch">
          <div class="col-md-12">
            <div class="col-sm-3">
              <label id="firstLabel" for="inputLocation">Location</label>
              <input v-model="Location" type="text" id="inputLocation" class="form-control" placeholder="Location" required autofocus>
            </div>
            <div class="col-sm-3">
              <label for="inputStartTime">Start Time</label>
              <date-picker id="st" name="start_time" v-model="StartTime"></date-picker>
              <!--enddate <input v-model="StartTime" type="text" id="inputStartTime" class="form-control date" placeholder="StartTime" required> -->
            </div>
            <div class="col-sm-3">
              <label for="inputEndTime">EndTime</label>
              <date-picker id="et" name="end_time" v-model="EndTime"></date-picker>
              <!-- <input v-model="EndTime" type="text" id="inputEndTime" class="form-control date" placeholder="EndTime" required> -->
            </div>
            <div class="col-sm-3">
              <button class="btn btn-sm btn-primary" id="searchButton" type="submit">Search</button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
    <div class="row">
      <br />
      <fieldset id="first">
        <gmap-map v-bind:center = "center" v-bind:zoom= "12" class="gmap" style="height: 400px">
          <gmap-info-window v-bind:options="infoOptions" v-bind:position="infoWindowPos" v-bind:opened="infoWinOpen" @closeclick="infoWinOpen=false">
          </gmap-info-window>
          <gmap-marker
          v-bind:key= "index"
          v-for = "(m,index) in markers"
          v-bind:position = "m.position"
          v-bind:clickable = "true"
          @click="toggleInfoWindow(m,index)">
          </gmap-marker>
        </gmap-map>
      </fieldset>
    </div>
  </div>
  <div class="col-md-4">
    <div class="col-sm-12">
      <fieldset>
        <legend>Location Details</legend>
        <div class="col-sm-12">
          <label>Parking Slot: {{parkingObj.name}} </label>
        </div>
        <div class="col-sm-12">
          <label>Parking Zone: {{parkingObj.catname}} </label>
        </div>
        <div class="col-sm-12">
          <label>Free Minutes: {{parkingObj.freeminutes}} </label>
        </div>
        <div class="col-sm-12">
          <label>Hourly Rate: {{parkingObj.ratehour}} </label>
        </div>
        <div class="col-sm-12">
          <label>Real Time Rate: {{parkingObj.raterealtime}} </label>
        </div>  
        <div class="col-sm-6">
          <label for="extHourly">Estimated Hourly Rate:</label>
          <input v-model="HourlyPrice" type="text" class="form-control" readonly>
        </div>
        <div class="col-sm-6">
          <label for="estRealTime">Estimated RealTime Rate:</label>
          <input v-model="RealTimePrice" type="text" class="form-control" readonly>
        </div>
      </fieldset>
    </div>
    <div class="col-sm-12">
      <br />
      <fieldset>
        <legend>Booking Confirmation</legend>
        <form class="form" @submit.prevent="parkingConfirmation">
          <div class="col-md-12">
            <input v-model="FinalLocation" type="text" id="inputLocation" class="form-control" placeholder="Location" required readonly style="display: none">
            <input v-model="FinalStartDate" type="text" id="inputLocation" class="form-control" placeholder="Location" required readonly style="display: none">
            <input v-model="FinalEndDate" type="text" id="inputLocation" class="form-control" placeholder="Location" required readonly style="display: none">
            <div class="col-sm-12">
              <label for="inputEndTime">Payment Type</label>
              <!-- <input v-model="FinalPaymentType" type="text" id="inputEndTime" class="form-control date" placeholder="EndTime" required> -->
              <select v-model="FinalPaymentType" class="form-control">
                <option value="1" selected>Hourly</option>
                <option value="2">Real Time</option>
              </select>
            </div>
            <div class="col-sm-12">
              <br />
              <button class="btn btn-sm btn-success btn-block" type="submit">Confirm</button>
            </div>
            
          </div>
        </form>
      </fieldset>
    </div>
    
  </div>
  <!--<div class="row">
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
  </div>-->

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
  name: 'ParkingSearch',
  data () {
    return {
        Location: '',
        StartTime: new Date(),
        EndTime: new Date(),
        parkings: [],
        parkingObj: {},
        center: {
          lat:58.3826467, 
          lng: 26.7321937
        },
        infoWindowPos: null,
        infoWinOpen: false,
        currentMidx: null,
        infoOptions: {
        content: '',
          //optional: offset infowindow so it visually sits nicely on top of our marker
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        markers: [
          {
            position: {lat:58.3826467, lng: 26.7321937}
          }
        ],
        
        //Confirmation DataFields
        FinalLocation: '',
        FinalStartDate:'',
        FinalEndDate:  '',
        FinalPaymentType: '1',
        // Price Calculation
        HourlyPrice: '0',
        RealTimePrice: '0'
    }
  },
  components:{
    datePicker
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
      this.parkingObj = this.parkings[idx];
      
      //Setting Final Confirmation Details
      this.FinalLocation = this.parkingObj.id;
      this.FinalStartDate = this.StartTime;
      this.FinalEndDate = this.EndTime;

      //Calculating Price using time
      if(this.EndTime != String.empty && this.StartTime != String.empty) {
        function diff_hours(dt2, dt1) 
        {
          var diff =(dt2.getTime() - dt1.getTime()) / 1000;
          diff /= (60 * 60);
          return Math.abs(Math.round(diff));
        }
        function diff_mins(dt2, dt1) 
        {
          var diff =(dt2.getTime() - dt1.getTime()) / 1000;
          diff /= (60);
          return Math.abs(Math.round(diff));
        }
        var timeStart = new Date(this.StartTime);
        var timeEnd = new Date(this.EndTime);
        this.HourlyPrice = this.parkingObj.ratehour * diff_hours(timeStart,timeEnd)
        this.RealTimePrice = this.parkingObj.raterealtime * Math.abs(Math.ceil((diff_mins(timeStart,timeEnd)/5)))
      }
    },
    async parkingSearch() {
      try{
        const {data} = await axios.post('http://localhost:4000/api/search/', {destination: this.Location, starttime: this.StartTime, endtime: this.EndTime}, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        this.parkings = data
        
        this.markers = []
        
        data.forEach(item => {
          var temp = {
            position: {
              lat:item['latitude'], 
              lng: item['longitude']
            },
            infoText: '<strong>'+ item['name'] +'</strong>',
            catname: item["catname"] 
          }
          this.markers.push(temp)            
        });

      } catch(e) {
        console.log(e)
      }
    },
    async parkingConfirmation (){
      try{
        const {data} = await axios.post('http://localhost:4000/api/bookings/new', {start_time: this.FinalStartDate, end_time: this.FinalEndDate, parking_id: this.FinalLocation, calc_criteria: this.FinalPaymentType}, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        this.parkings = data
        alert('Booking Created')
        this.$router.push('/BookingList')
      } catch(e) {
        console.log(e)
        alert('Error:'+ e)
      }
    }
  },
  async created () {
    this.markers = []
    try {
      // $('.date').datetimepicker();
      const {data} = await axios.get('http://localhost:4000/api/search/index', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
      this.parkings = data
      data.forEach(item => {
          var temp = {
            position: {
              lat:item['latitude'], 
              lng: item['longitude']
            },
            infoText: '<strong>'+ item["name"] + '</strong>'
          }
          this.markers.push(temp)            
        });
      } catch (e) {
        console.log(e)
    }
  }
}
</script>
