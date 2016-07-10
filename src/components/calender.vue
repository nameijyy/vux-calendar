
<template>
  <div id="calendar">
    <inline-calendar
      v-ref:calendar
      only-month
      :select-close="true"
      :return-six-rows="false"
      :value.sync="listValue"
      :disable-past="true"
      :show-month-list=show_month_list
      :replace-text-list="{'TODAY':'今天'}"
      :show-last-month="false"
      :show-next-month="false"
      :selected-list="list"
      :default-pay = "default_pay"
      :render-on-value-change="true"></inline-calendar>
  </div>
</template>

<script>
  import inlineCalendar from './inline-calendar/index.vue'


  export default {
    components: {
      inlineCalendar,
    },
    data(){
      return{
        useCustomFn:true,
        cur_month:7,
        cur_year:2016,
        viewData:[2016,7],
        listValue: '',
        list:{},
        selDay:8,
        show_month_list:[],
        default_pay:"￥352"
      }
    },
    ready(){
      //处理可操作的月份
      var monthstr = 0;
      var monthshow = monthstr;
      for(var i=0;i<6;i++){
        monthstr = 7 + i;
        monthstr = monthstr>12 ? 1 : monthstr;
        monthshow = monthstr < 10 ? "0"+monthstr : monthstr;
        this.show_month_list.push(2016+"-"+monthshow);
      }
    },
    methods:{

    },
    route:{
      data(){
        var that = this;
        setTimeout(function(){
          that.list = {
            "2016-07-08":{"mate":"已租","class":"is_selected_day"},
            "2016-07-09":{"mate":"已租","class":"is_selected_day"},
            "2016-07-10":{"mate":"已租","class":"is_selected_day"},
            "2016-07-11":{"mate":"已租","class":"is_selected_day"},
            "2016-07-12":{"mate":"已租","class":"is_selected_day"},
            "2016-07-13":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-14":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-15":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-16":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-17":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-18":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-19":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-20":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-21":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-22":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-23":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-24":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-25":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-26":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-27":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-28":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-29":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-30":{"mate":"￥258","class":"no_selected_day"},
            "2016-07-31":{"mate":"￥258","class":"no_selected_day"},
            "2016-08-10":{"mate":"已租","class":"is_selected_day"},
            "2016-09-10":{"mate":"已租","class":"is_selected_day"},
            "2016-09-12":{"mate":"已租","class":"is_selected_day"},
          }
        },500);

      }
    },
  }
</script>

