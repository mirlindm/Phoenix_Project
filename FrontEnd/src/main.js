// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Toasted from 'vue-toasted';
import App from './App'
import router from './router'

import store from './store'
import Axios from 'axios'

import * as VueGoogleMaps from 'vue2-google-maps'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})

Vue.filter('PaymentType', function(value) {
  if (value) {
    if (value == '1'){
      return 'Hourly'
    }
    else if (value == '2') {
      return 'Real Time'
    }
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDV_4kS5KvnmtEyWygXpGIe5GBDRv1k9Oc'
  }
})

Vue.use(Toasted)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  render: h => h(App)
})
