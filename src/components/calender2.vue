
<template>

    <div>

      <div v-on:click="sel_calendar">选择日期</div>
      <inline-calendar
        only-month
        show-all-month
        :return-six-rows="false"
        :value.sync="listValue"
        :disable-past="true"
        :replace-text-list="{'TODAY':'今天'}"
        :show-last-month="false"
        :show-next-month="false"
        :selected-list="list"
        :default-pay = "default_pay"
        :show-calendar.sync="calendar_show"
        :show-month-list=show_month_list
        :show-month-len = 4
        :all-selected-days.sync="selected_days"
        :render-on-value-change="false">
      </inline-calendar>
    </div>
</template>

<script>
  import inlineCalendar from './inline-calendar/index2.vue'


  export default {
    components: {
      inlineCalendar,
    },
    data(){
      return{
        calendar_show:false,
        listValue: '2015-06-12',
        list:{},
        default_pay:"￥352",
        show_month_list:[],
        selected_days:[]
      }
    },
    ready(){

    },
    watch:{
      selected_days(){
        console.log(this.selected_days);
      }
    },
    methods:{
      sel_calendar(){
        this.calendar_show = true;
      }
    },
    route:{
      data(){
        var that = this;
        setTimeout(function(){
          that.list = {
//            "2016-07-08":{"mate":"已租","class":"is_selected_day2"},
//            "2016-07-09":{"mate":"已租","class":"is_selected_day2"},
            "2016-07-10":{"mate":"已租","class":"is_selected_day2","type":1},
            "2016-07-11":{"mate":"已租","class":"is_selected_day2","type":1},
            "2016-07-12":{"mate":"已租","class":"is_selected_day2","type":1},
//            "2016-07-13":{"mate":"￥258","class":"new_selected_day_center"},
//            "2016-07-14":{"mate":"￥258","class":"new_selected_day_center"},
//            "2016-07-15":{"mate":"￥258","class":"new_selected_day_center"},
            "2016-07-16":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-17":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-18":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-19":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-20":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-21":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-22":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-23":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-24":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-25":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-26":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-27":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-28":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-29":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-30":{"mate":"￥258","class":"no_selected_day2"},
            "2016-07-31":{"mate":"￥258","class":"no_selected_day2"},
            "2016-08-10":{"mate":"已租","class":"is_selected_day2","type":1},
            "2016-09-10":{"mate":"已租","class":"is_selected_day2","type":1},
            "2016-09-12":{"mate":"已租","class":"is_selected_day2","type":1},
          }
        },500);

      }
    },
  }
</script>

