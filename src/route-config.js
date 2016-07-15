export function configRouter (router) {

  router.map({
    '/calender': { //日历
      component: require('./components/calender.vue'),
    },
    '/calender2': { //日历
      component: require('./components/calender2.vue'),
    },
    '/discover': { //发现
      component: require('./components/discover.vue'),
    },
    '/index': { //花雨间
      component: require('./components/index.vue'),
    },



    // not found handler
    '*': {
      component: require('./components/not-found.vue')
    },


  })

  // redirect
  router.redirect({
    '': '/calender',
  })
}
