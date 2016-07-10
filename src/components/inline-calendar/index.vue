<template>
  <div id="inline-calendar">
    <div v-if="!showAllMonth" class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}">
      <div class="calendar-header" v-show="!hideHeader">
        <template  v-if="!onlyMonth">
          <div class="calendar-year">
            <a class="year-prev vux-prev-icon" href="javascript:" @click="go(year - 1, month)"></a>
            <a class="calendar-year-txt calendar-title" href="javascript:">{{year}}</a>
            <a class="year-next vux-next-icon" href="javascript:" @click="go(year + 1, month)"></a>
          </div>

          <div class="calendar-month">
            <a @click="prev" class="month-prev vux-prev-icon" href="javascript:"></a>
            <a class="calendar-month-txt calendar-title" href="javascript:">{{months[month]}}</a>
            <a @click="next" class="month-next vux-next-icon" href="javascript:"></a>
          </div>
        </template>
        <template v-else>
          <div class="calendar-month flex-warp">
            <div class="calendar-btn" @click="prev" v-show="showPrev" ><a class="month-prev vux-prev-icon"  href="javascript:"></a></div>
            <div class="calendar-month-txt flex-item">{{year}} - {{months[month]}}</div>
            <div class="calendar-btn" @click="next" v-show="showNext"><a  class="month-next vux-next-icon"  href="javascript:"></a></div>
          </div>
        </template>

      </div>

      <table>
        <thead v-show="!hideWeekList">
        <tr>
          <th v-for="(index, week) in weeksList" class="week is-week-list-{{index}}">{{week}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(k1,day) in days">
          <td
            :data-date="formatDate(year, month, child)"
            :data-current="value"
            v-for="(k2,child) in day"
            :class="buildClass(k2, child, formatDate(year, month, child) === value && !child.isLastMonth && !child.isNextMonth)"
            @click="select(k1,k2,$event)">
            <span
              v-show="(!child.isLastMonth && !child.isNextMonth ) || (child.isLastMonth && showLastMonth) || (child.isNextMonth && showNextMonth)"
              :class="buildClass2(k2, child)" >
              <i class="calendar-day">{{replaceText(child.day, formatDate(year, month, child))}}</i>
              <i class="calendar-mate">{{child.mate}}</i>
            </span>
            {{{customSlotFn(k1, k2, child)}}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showAllMonth" class="inline-calendar" :class="{'is-weekend-highlight': highlightWeekend}" v-for="(k3,all_con) in allDays">
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
            :data-date="formatDate(year, month, child)"
            :data-current="value"
            v-for="(k2,child) in day"
            :class="buildClass(k2, child, formatDate(year, month, child) === value && !child.isLastMonth && !child.isNextMonth)"
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
      showPrev:true
    }
  },
  ready () {
    this.value = this.convertDate(this.value)
    if(this.showAllMonth){
      this.allDays = {};
      var months_list = [6,7,8,9];
      for(var i in months_list){
        this.render(2016,months_list[i]);
      }
    }else{
      this.render(this.renderMonth[0], this.renderMonth[1] - 1)
    }

  },
  computed: {
    _replaceTextList () {

      //是否显示上一个月，下一个月
      if(this.showMonthList.length){
        var newstr = this.showMonthList.toString();
        var nextmonth = this.month>10 ? 1 : this.month+2;
        var prevmonth = this.month;
        nextmonth = nextmonth < 10 ? "0"+nextmonth : nextmonth;
        prevmonth = prevmonth < 10 ? "0"+prevmonth : prevmonth;
        if(newstr.indexOf(this.year+"-"+nextmonth)>-1){
          this.showNext = true;
        }else{
          this.showNext = false;
        }
        if(newstr.indexOf(this.year+"-"+prevmonth)>-1){
          this.showPrev = true;
        }else{
          this.showPrev = false;
        }
      }

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
    buildClass (index, child, isCurrent) {
      const className = {
//        current: child.current || isCurrent,
        'is-disabled': child.disabled,
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
      }else if(!child.disabled){
        className["no_selected_day"] = true;
        child.mate = this.defaultPay;
      }
      return className
    },
    buildClass3 (index, child, date_index) {
      const className = {}
      //处理选中情况
      if(this.selectedList[date_index]){
        className[this.selectedList[date_index].class] = true;
        child.mate = this.selectedList[date_index].mate;
      }
      if(this.newSelectedDays.toString().indexOf(date_index) > -1){
        className['new_selected_day_center'] = true;
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
      if(this.selectClose){
        return false;
      }
      if (this.current.length > 0) {
        this.days[this.current[0]][this.current[1]].isCurrent = false
      }console.log(this.days);
      this.days[k1][k2].current = true
      this.current = [k1, k2]
      this.value = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
    }
  }
}
</script>
