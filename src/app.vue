<style lang="scss">
  @import '~vux/dist/vux.css';
  @import './assets/css/test.scss';
</style>
<template>
  <div id="app">
    <div id="main" :style="{minHeight:min_height+'px'}">
      <router-view class="view"  keep-alive></router-view>
    </div>
  </div>
</template>
<script>
  //  window.type = /127\.0||192\./.test(window.location.href)?'jsonp':'get';
  window.type = 'get';
  //  window.baseUrl = (type == 'jsonp')?'http://192.168.8.87:84':'';
  window.baseUrl = '';

  if(/Mac\sOS/.test(navigator.userAgent)){
    window.FastClick = require('assets/js/lib/fastclick.js');
    FastClick.attach(document.body);
  }
  window.$Y = require('assets/js/common.js');
  $Y.init();

  function get_win_hieght() {
    var w_height = window.innerHeight;
    return w_height- 11 - 8 - 24;
  }
  export default{
    data(){
      return{
        min_height:get_win_hieght()
      }
    }
  }
</script>
