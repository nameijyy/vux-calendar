<template>
  <div id="inline-calendar">

    <div class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}" v-for="(k3,all_con) in allDays">
      <div class="calendar-header" v-show="!hideHeader">

        <div class="calendar-month flex-warp">
          <!--<div class="calendar-btn" @click="prev" v-show="!showMonth[0] || showMonth[0] && showMonth[0]< months[month]" ><a class="month-prev vux-prev-icon"  href="javascript:"></a></div>-->
          <div class="calendar-month-txt flex-item">{{all_con.year}} - {{months[all_con.month]}}</div>
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
        showNext:true,
        showPrev:true,
        special_val:''
      }
    },
    ready () {
      this.value = this.convertDate(this.value)
      this.allDays = {};
      var months_list = [6,7,8,9];
      for(var i in months_list){
        this.render(2016,months_list[i]);
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
          this.render(this.year, this.month, this.value)
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
        this.render(this.year,this.month,this.value)
      }
    },
    methods: {
      replaceText (day, formatDay) {
        return this._replaceTextList[formatDay] || day
      },
      convertDate (date) {
        return date === 'TODAY' ? this.today : date
      },
      buildClass (index, child, year, month) {
        var date_index = this.formatDate(year, month, child);console.log(this.special_val,'------');
        if(date_index == this.special_val){
          child.disabled = false;
        }else if(this.selectedList[date_index] && this.selectedList[date_index].type==1){
          child.disabled = true;
        }

        const className = {
//        current: child.current || isCurrent,
          'is-disabled': child.disabled,
          'select_disabled': child.select_disabled,
//        'is-today': child.isToday
        }
        className[`is-week-${index}`] = true;
        return className
      },
      buildClass2 (index, child) {
        const className = {}
        //处理选中情况
        var date_index = this.formatDate(this.year, this.month, child);
        if(this.selectedList[date_index]){
          className[this.selectedList[date_index].class] = true;
          child.mate = this.selectedList[date_index].mate;
        }
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
//        console.log(this.newSelectedDays.toString().indexOf(date_index));
//        if(this.newSelectedDays.toString().indexOf(date_index) > -1){
//          className['new_selected_day_center'] = true;
//        }
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
        var dt = year+'-'+(month+1);
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
    select (k1, k2, k3) {
      var cur_value = [this.allDays[k3].year, zero(this.allDays[k3].month + 1), zero(this.allDays[k3].days[k1][k2].day)].join('-');
      var sel_len = this.newSelectedDays.length;
      var one_day = {};
      var in_date_add,out_date_add,for_date_add;

      if(sel_len == 1){
        var in_date_arr = this.newSelectedDays[0].split("-");
        in_date_add = parseInt(in_date_arr[0].toString()+in_date_arr[1].toString() + in_date_arr[2].toString());console.log(in_date_add);
        out_date_add = parseInt(this.allDays[k3].year.toString()+zero(this.allDays[k3].days[k1][k2].month_str).toString() + zero(this.allDays[k3].days[k1][k2].day).toString());
      }else{
        in_date_add = parseInt(this.allDays[k3].year.toString()+zero(this.allDays[k3].days[k1][k2].month_str).toString() + zero(this.allDays[k3].days[k1][k2].day).toString());
        var sel_date_arr = [],sel_date_add,sel_open_largest,sel_open_largest_date;
        for( var si in this.selectedList){
          if(this.selectedList[si].type == 1){
            sel_date_arr = si.split("-");
            sel_date_add = parseInt(sel_date_arr[0].toString()+sel_date_arr[1].toString()+sel_date_arr[2].toString());
            if(sel_date_add>in_date_add){
              sel_open_largest = sel_date_add;console.log(sel_open_largest,'sel_open_largest');
              sel_open_largest_date = [sel_date_arr[0], sel_date_arr[1], sel_date_arr[2]].join('-');
              this.special_val = sel_open_largest_date;
              break;
            }
          }
        }

//        for( var seli in this.selectedList){
//          if(this.selectedList[seli].type == 1){
//            if(seli == cur_value){
//              if(!sel_open_largest_date || sel_open_largest_date != cur_value)
//              return false;
//            }
//          }
//        }
      }

      if(sel_len == 1){//选择离开时间
        this.special_val = "";
        for(var i in this.allDays){
          for(var j in this.allDays[i].days){
            for(var k in this.allDays[i].days[j]){
              for_date_add = parseInt(this.allDays[i].year.toString()+zero(this.allDays[i].days[k1][k2].month_str).toString() + zero(this.allDays[i].days[j][k].day).toString());
              if(for_date_add > in_date_add && out_date_add > for_date_add){
                this.newSelectedDays.push([this.allDays[i].year, zero(this.allDays[i].month + 1), zero(this.allDays[i].days[j][k].day)].join('-'));
              }
              if(!this.allDays[i].days[j][k].disabled) {//取消不可选控制
                one_day = JSON.parse(JSON.stringify(this.allDays[i].days[j][k]));
                one_day.select_disabled = false;
                this.allDays[i].days[j].$set(k, one_day);
              }
            }
          }
        }
      }else {//选择入住时间
        if(sel_len > 1){//取消选择
          this.newSelectedDays = [];
        }
//        var in_date_add = parseInt(this.allDays[k3].year.toString()+zero(this.allDays[k3].days[k1][k2].month_str).toString() + zero(this.allDays[k3].days[k1][k2].day).toString());
//        var for_date_add;
//        if(sel_len > 1){//取消选择
//          this.newSelectedDays = [];
//        }
//        var sel_date_arr = [],sel_date_add,sel_open_largest;
//        for( var si in this.selectedList){
//          if(this.selectedList[si].type == 1){
//            sel_date_arr = si.split("-");
//            sel_date_add = parseInt(sel_date_arr[0].toString()+sel_date_arr[1].toString()+sel_date_arr[2].toString());
//            if(sel_date_add>in_date_add){
//              sel_open_largest = sel_date_add;
//              break;
//            }
//          }
//        }
        //之前的日期全部不能选
        for(var i in this.allDays){
          for(var j in this.allDays[i].days){
            for(var k in this.allDays[i].days[j]){
              for_date_add = parseInt(this.allDays[i].year.toString()+zero(this.allDays[i].days[k1][k2].month_str).toString() + zero(this.allDays[i].days[j][k].day).toString());
              if(for_date_add < in_date_add && !this.allDays[i].days[j][k].disabled){
                one_day = JSON.parse(JSON.stringify(this.allDays[i].days[j][k]));
                one_day.select_disabled = true;
                this.allDays[i].days[j].$set(k, one_day);
              }
              if(sel_open_largest && for_date_add > sel_open_largest){
                console.log(for_date_add,this.allDays[i].days[k1][k2].month_str,'for_date_add');
                one_day = JSON.parse(JSON.stringify(this.allDays[i].days[j][k]));
                one_day.select_disabled = true;
                this.allDays[i].days[j].$set(k, one_day);
              }
            }
          }
        }
      }


      this.value = cur_value
      this.newSelectedDays.push(this.value);
      console.log(this.newSelectedDays);
    }
  }
  }
</script>
