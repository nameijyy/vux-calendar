
<template>

    <div>

      <div v-on:click="sel_calendar">选择日期</div>

      <div id="calendar-sel" v-show="calendar_show">
        <div class="cal-title">
          <div class="title-cancel" v-on:click="cancel_do">取消</div>
          <div class="title-text">选择入住日期</div>
          <div class="title-btn" v-on:click="do_sure">确定</div>
        </div>
        <div class="sel-content">
          入住：<span>7月12日</span> 离开：<span>7月22日</span> 总共：<span>10晚</span>
        </div>
        <!--<div v-for="i in [7,8,9]" v-if="i >= 7">-->
          <!--<div class="cal-list-title">2016 - {{i}}</div>-->
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
            :render-on-value-change="false"></inline-calendar>
        <!--</div>-->
      </div>
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
        calendar_show:true,
        listValue: '',
        list:{},
        default_pay:"￥352"
      }
    },
    methods:{
      sel_calendar(){
        this.calendar_show = true;
      },
      cancel_do(){
        this.calendar_show = false;
      },
      do_sure(){
        this.calendar_show = false;
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

