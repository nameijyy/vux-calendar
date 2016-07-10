export default () => ({
  value: {
    type: String,
    twoWay: true,
    default: ''
  },
  renderMonth: {
    type: Array, // [2018, 8]
    default () {
      return [null, null]
    }
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  showLastMonth: {
    type: Boolean,
    default: true
  },
  showNextMonth: {
    type: Boolean,
    default: true
  },
  highlightWeekend: {
    type: Boolean,
    default: false
  },
  returnSixRows: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  onlyMonth: {
    type: Boolean,
    default: false
  },
  showAllMonth: {
    type: Boolean,
    default: false
  },
  selectClose: {
    type: Boolean,
    default: false
  },
  hideWeekList: {
    type: Boolean,
    default: false
  },
  replaceTextList: {
    type: Object,
    default () {
      return {}
    }
  },
  weeksList: {
    type: Array,
    coerce (val) {
      return val && val.length ? val : ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  selectedList: {
    type: Object,
    default () {
      return {}
    }
  },
  defaultPay:{
    type:String
  },
  showMonth: {
    type: Array,
    coerce (val) {
      return val && val.length ? val : []
    }
  },
  showMonthList: {
    type: Array,
    coerce (val) {
      return val && val.length ? val : []
    }
  },
  customSlotFn: {
    type: Function,
    default: () => ''
  },
  renderOnValueChange: {
    type: Boolean,
    default: true
  },
  disablePast: {
    type: Boolean,
    default: false
  }
})
