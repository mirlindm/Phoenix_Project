<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject){
        if (err.status === 401 && err.status === 422 && err.config && !err.config.__isRetryRequest){
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  }
}
</script>
