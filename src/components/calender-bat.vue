<style scoped>

</style>
<template>
  <div id="calendar">
    <div class="ui-text-center">
      <a @click="prev" class="vux-prev-icon" v-show="(viewData[0] == cur_year && viewData[1] > cur_month) || viewData[0] > cur_year"></a>
      {{viewData[0]}} - {{viewData[1]}}
     <a @click="next" class="vux-next-icon"></a>
    </div>
    <inline-calendar
      v-ref:calendar
      hide-header
      :return-six-rows="false"
      :value.sync="listValue"
      :disable-past="true"
      :weeks-list="week_list"
      :custom-slot-fn="buildSlotFn"
      :replace-text-list="{'TODAY':'今天'}"
      :show-last-month="false"
      :show-next-month="false"
      :render-on-value-change="true"></inline-calendar>
  </div>
</template>

<script>
  import inlineCalendar from 'vux/src/components/inline-calendar'


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
        week_list:['日', '一', '二', '三', '四', '五', '六'],
        buildSlotFn:function () { return '' },
        list:[
          ['2016','07','07'],
          ['2016','07','08'],
          ['2016','07','09'],
          ['2016','07','10'],
          ['2016','07','11']
        ],
        selDay:8,
      }
    },
    methods:{

      next:function () {
        var calendar = this.$refs.calendar;
        calendar.next();
        this.viewData.$set(1,calendar.months[calendar.month]);
        this.viewData.$set(0,calendar.year);

      },
      prev :function () {
        var calendar = this.$refs.calendar;
        calendar.prev ();
        this.viewData.$set(1,calendar.months[calendar.month]);
        this.viewData.$set(0,calendar.year);
      }
    },
    route:{
      data(){
        var myDate = new Date();
        var month = myDate.getMonth()>9?(myDate.getMonth()+1).toString():'0' + (myDate.getMonth()+1);
        this.viewData.$set(0,myDate.getFullYear());    //获取完整的年份(4位,1970-????)
        this.viewData.$set(1,month);    //获取当前月份(0-11,0代表1月)
        this.cur_month = month;
        this.cur_year = myDate.getFullYear();
        var _xy_arrray =[];
        var that = this;
        var timer;
        function useCustomFn(line, index, data) {
//          console.log(JSON.stringify(data))
         // clearTimeout(timer)
          data.disabled =false;
          if(data.month_str == this.$data.month+1){
            timer = setTimeout(function () {
//            console.log(that.cur_month);
              var td = document.querySelectorAll('.active');
              for(var i in td){
                var parent = td[i].parentNode;
                if(parent){
                  parent.className = 'td-active'
//                  data.disabled =true;
                }
              }
            },500)

            if(/8/.test(data.day)){
              return '<span class="active">已租</span>';
            }else {
              return '<span class="em">￥358</span>';
            }
          }

        }
        this.buildSlotFn = useCustomFn;
//        setTimeout(function () {
//          var td = document.querySelectorAll('.active');
//          for(var i in td){
//            var parent = td[i].parentNode;
//            if(parent){
//              parent.className = 'td-active'
//
//            }
//          }
//
//        },500)

      }
    },
/*    watch: {
      useCustomFn (val) {
        this.buildSlotFn = val ? (line, index, data) => {
          return /8/.test(data.day) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : ''
        } : () => ''
      },
    },*/
  }
</script>

