<template>
  <div id="calendar-sel" v-show="showCalendar">
    <div class="cal-title">
      <div class="title-cancel" v-on:click="btnDo(1)">取消</div>
      <div class="title-text" v-show="sel_in">选择入住日期</div>
      <div class="title-text" v-show="!sel_in">选择离开日期</div>
      <div class="title-btn" v-on:click="btnDo(2)">确定</div>
    </div>
    <div class="sel-content">
      入住：<span v-show="in_date">{{in_date}}</span><span v-show="!in_date">--</span>
      离开：<span v-show="out_date">{{out_date}}</span><span v-show="!out_date">--</span>
      总共：<span v-show="in_total">{{in_total}}{{in_toatal_p}}</span><span v-show="!in_total">--</span>
    </div>
    <div id="inline-calendar">
      <div class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}" v-for="(k3,all_con) in allDays">
        <div class="calendar-header" v-show="!hideHeader">

          <div class="calendar-month flex-warp">
            <!--<div class="calendar-btn" @click="prev" v-show="!showMonth[0] || showMonth[0] && showMonth[0]< months[month]" ><a class="month-prev vux-prev-icon"  href="javascript:"></a></div>-->
            <div class="calendar-month-txt flex-item cal-list-title">{{all_con.year}} - {{months[all_con.month]}}</div>
            <!--<div class="calendar-btn" @click="next" v-show="!showMonth[1] || showMonth[1] && showMonth[1]> months[month]"><a  class="month-next vux-next-icon"  href="javascript:"></a></div>-->
          </div>

        </div>

        <table>
          <thead v-show="!hideWeekList">
          <tr>
            <th v-for="(index, week) in weeksList" class="week is-week-list-{{index}}">{{week}}</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="(k1,day) in all_con.days">

            <td
              :data-date="formatDate(all_con.year, all_con.month, child)"
              :data-current="value"
              v-for="(k2,child) in day"
              :class="buildClass(k2, child, all_con.year,all_con.month)"
              @click="select(k1,k2,k3,$event)">
              <span
                v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)"
                :class="buildClass3(k2, child,formatDate(all_con.year, all_con.month, child))" >
                <i class="calendar-day">{{replaceText(child.day, formatDate(year, month, child))}}</i>
                <i class="calendar-mate">{{child.mate}}</i>
              </span>
              {{{customSlotFn(k1, k2, child)}}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import format from './format'
  import { getDays, zero } from './util'
  import props from './props'

  export default {
    props: props(),
    data () {
      return {
        year: 0,
        month: 0,
        days: [],
        allDays:{},
        current: [],
        today: format(new Date(), 'YYYY-MM-DD'),
        months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        newSelectedDays:[],
        showNext:false,
        showPrev:false,
        special_val:'',
        in_date:'',
        out_date:'',
        in_total:'',
        in_toatal_p:"晚",
        sel_in:true
      }
    },
    ready () {
      this.value = this.convertDate(this.value);
      this.allDays = {};

      //处理可操作的月份
      var monthstr,yearstr;
      var new_date = new Date();
      var cur_month = new_date.getMonth();
      var cur_year = new_date.getFullYear();
      for(var i=0;i<this.showMonthLen;i++){
        monthstr = cur_month + i;
        yearstr = cur_year;
        if(monthstr > 11){
          monthstr = monthstr-12;
          yearstr = cur_year + 1;
        }
        this.render(yearstr,monthstr);
      }

    },
    computed: {
      _replaceTextList () {
        const rs = {}
        for (let i in this.replaceTextList) {
          rs[this.convertDate(i)] = this.replaceTextList[i]
        }
        return rs
      }
    },
    watch: {
      value (val) {
        this.value = this.convertDate(val)
        if (this.renderOnValueChange) {
          this.render(null, null, val)
        } else {
//          this.render(this.year, this.month, this.value)
        }
        this.$emit('on-change', val)
      },
      returnSixRows (val) {
        this.render(this.year, this.month, this.value)
      },
      disablePast () {
        this.render(this.year, this.month, this.value)
      },
      newSelectedDays(){
//        this.render(this.year,this.month,this.value)
      },
      showCalendar(val){

      }
    },
    methods: {
      get_datas(){
        this.allDays = {};
        var monthstr,yearstr;
        var new_date = new Date();
        var cur_month = new_date.getMonth();
        var cur_year = new_date.getFullYear();
        for(var i=0;i<this.showMonthLen;i++){
          monthstr = cur_month + i;
          yearstr = cur_year;
          if(monthstr > 11){
            monthstr = monthstr-12;
            yearstr = cur_year + 1;
          }
          this.render(yearstr,monthstr);
        }
      },
      btnDo(type){
        if(type == 1){

        }else if(type == 2){
          if(this.newSelectedDays.length==1){
            $Y.alert("请选择离开日期");
            return false;
          }else if(this.newSelectedDays.length<1){
            $Y.alert("请选择入住日期");
            return false;
          }
          this.allSelectedDays = JSON.parse(JSON.stringify(this.newSelectedDays));
        }

        this.newSelectedDays = [];
        this.get_datas();
        this.showCalendar = false;
      },
      replaceText (day, formatDay) {
        return this._replaceTextList[formatDay] || day
      },
      convertDate (date) {
        return date === 'TODAY' ? this.today : date
      },
      buildClass (index, child, year, month) {
        if(child.isLastMonth || child.isNextMonth){
          return '';
        }
        var date_index = this.formatDate(year, month, child);
        if(date_index == this.special_val){
          child.disabled = false;
        }else if(this.selectedList[date_index] && this.selectedList[date_index].type==1){
          child.disabled = true;
        }
//console.log(year,month,child.day,child.disabled,child.select_disabled,child,'********');
        const className = {
//        current: child.current || isCurrent,
          'is-disabled': child.disabled,
          'select_disabled': child.select_disabled,
//        'is-today': child.isToday
        }
        className[`is-week-${index}`] = true;
        return className
      },
      buildClass3 (index, child, date_index) {
        const className = {}
        //处理选中情况
        if(this.selectedList[date_index]){
          if(date_index == this.special_val){
            className["no_selected_day2"] = true;
          }else{
            className[this.selectedList[date_index].class] = true;
          }
          child.mate = this.selectedList[date_index].mate;
        }else if(!child.disabled){
          className["no_selected_day2"] = true;
          child.mate = this.defaultPay;
        }
        var new_sel_len = this.newSelectedDays.length;
        for(var i in this.newSelectedDays){
          if(this.newSelectedDays[i] == date_index){
            className['new_selected_day_center'] = true;
            if(new_sel_len == 1){
              className['new_selected_day_start'] = true;
              child.mate = "入住";
            }else if(new_sel_len > 1){
              if(i == 0){
                className['new_selected_day_start'] = true;
                child.mate = "入住";
              }else if(i == this.newSelectedDays.length -1){
                className['new_selected_day_end'] = true;
                child.mate = "离开";
              }
            }
          }
        }
        return className
      },
      render (year, month) {
        let data = getDays({
          year: year,
          month: month,
          value: this.value,
          rangeBegin: this.startDate,
          rangeEnd: this.endDate,
          returnSixRows: this.returnSixRows,
          disablePast: this.disablePast
        })
        this.days = data.days
        this.year = data.year
        this.month = data.month
        var dt = year+'-'+zero(month+1);
        this.allDays[dt] = {'days':this.days,"year":this.year,"month":this.month}
      },
      formatDate: (year, month, child) => {
      return [year, zero(month + 1), zero(child.day)].join('-')
    },
    prev () {
      if (this.month === 0) {
        this.month = 11
        this.year = this.year - 1
      } else {
        this.month = this.month - 1
      }
      this.render(this.year, this.month)
    },
    next () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.render(this.year, this.month)
    },
    go (year, month) {
      this.render(year, month)
    },
    GetDateDiff(startDate,endDate){
      var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
      var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
      var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
      return  dates;
    },
    select (k1, k2, k3) {
      var cur_value = [this.allDays[k3].year, zero(this.allDays[k3].month + 1), zero(this.allDays[k3].days[k1][k2].day)].join('-');
      var sel_len = this.newSelectedDays.length;
      var one_day = {},lin_days,lin_days2;
      var in_date_add,out_date_add,for_date_add,is_cancel=false;

      if(sel_len == 1){
        var in_date_arr = this.newSelectedDays[0].split("-");
        in_date_add = parseInt(in_date_arr[0].toString()+in_date_arr[1].toString() + in_date_arr[2].toString());
        out_date_add = parseInt(this.allDays[k3].year.toString()+zero(this.allDays[k3].days[k1][k2].month_str).toString() + zero(this.allDays[k3].days[k1][k2].day).toString());
        this.in_date = in_date_arr[1]+"月"+in_date_arr[2]+"日";
        this.out_date = zero(this.allDays[k3].days[k1][k2].month_str)+"月"+zero(this.allDays[k3].days[k1][k2].day)+"日";
        this.in_total = this.GetDateDiff(in_date_arr[0]+"-"+in_date_arr[1]+"-"+in_date_arr[2],k3+"-"+zero(this.allDays[k3].days[k1][k2].day));
      }else{
        in_date_add = parseInt(this.allDays[k3].year.toString()+zero(this.allDays[k3].days[k1][k2].month_str).toString() + zero(this.allDays[k3].days[k1][k2].day).toString());
        var sel_date_arr = [],sel_date_add,sel_open_largest,sel_open_largest_date;
        for( var si in this.selectedList){
          if(this.selectedList[si].type == 1){
            sel_date_arr = si.split("-");
            sel_date_add = parseInt(sel_date_arr[0].toString()+sel_date_arr[1].toString()+sel_date_arr[2].toString());
            if(sel_date_add>in_date_add){
              sel_open_largest = sel_date_add;
              sel_open_largest_date = [sel_date_arr[0], sel_date_arr[1], sel_date_arr[2]].join('-');
              this.special_val = sel_open_largest_date;
              break;
            }
          }
        }
      }

      if(sel_len == 1){//选择离开时间
        this.sel_in = true;
        this.special_val = "";
        if(in_date_add == out_date_add){
          this.newSelectedDays = [];
          is_cancel = true;
        }
        for(var i in this.allDays){
          for(var j in this.allDays[i].days){
            for(var k in this.allDays[i].days[j]){
              if(!this.allDays[i].days[j][k].disabled && !this.allDays[i].days[j][k].isNextMonth && !this.allDays[i].days[j][k].isLastMonth) {
                if (!is_cancel) {
                  for_date_add = parseInt(this.allDays[i].year.toString() + zero(this.allDays[i].days[j][k].month_str).toString() + zero(this.allDays[i].days[j][k].day).toString());
                  if (for_date_add > in_date_add && for_date_add < out_date_add) {
                    this.newSelectedDays.push([this.allDays[i].year, zero(this.allDays[i].month + 1), zero(this.allDays[i].days[j][k].day)].join('-'));
                  }
                }
//                if(!this.allDays[i].days[j][k].disabled) {//取消不可选控制
                  one_day = JSON.parse(JSON.stringify(this.allDays[i].days[j][k]));
                  one_day.select_disabled = false;
                  this.allDays[i].days[j].$set(k, one_day);
//                }
              }
            }
          }
        }
      }else {//选择入住时间
        this.sel_in = false;
        if(sel_len > 1){//取消选择
          this.newSelectedDays = [];
        }
        //之前的日期全部不能选
        for(var i in this.allDays){
          for(var j in this.allDays[i].days){
            for(var k in this.allDays[i].days[j]){
              if(!this.allDays[i].days[j][k].disabled && !this.allDays[i].days[j][k].isNextMonth && !this.allDays[i].days[j][k].isLastMonth) {
                for_date_add = parseInt(this.allDays[i].year.toString() + zero(this.allDays[i].days[j][k].month + 1).toString() + zero(this.allDays[i].days[j][k].day).toString());
                if (for_date_add < in_date_add && !this.allDays[i].days[j][k].disabled || sel_open_largest && for_date_add > sel_open_largest) {
                  one_day = JSON.parse(JSON.stringify(this.allDays[i].days[j][k]));
                  one_day.select_disabled = true;

                  lin_days2 = JSON.parse(JSON.stringify(this.allDays[i].days[j]));
                  lin_days2[k] = one_day;
                  lin_days = JSON.parse(JSON.stringify(this.allDays[i]));
                  lin_days.days = lin_days2;console.log(lin_days);
//                  this.allDays[i].days[j].$set(k, one_day);
//                  this.allDays[i].days.$set(j, lin_days2);
//                  this.allDays.$set(i, lin_days);


                }
              }
            }
          }
        }
      }

//      this.value = cur_value
      if(!is_cancel){
        this.newSelectedDays.push(cur_value);
      }
    }
  }
  }
</script>
