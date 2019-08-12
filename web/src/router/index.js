import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: {
        name: 'list'
      }
    },
    {
      name: 'list',
      path: '/list',
      meta: {
        title: 'list'
      },
      component: () => import('pages/list.vue')
    }, {
      name: 'map',
      path: '/map',
      meta: {
        title: 'map'
      },
      component: () => import('pages/map.vue')
    }
  ]
})
