import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: require('@/pages/index.vue').default
    },
    {
      path: '/webpack',
      name: 'webpack',
      // component: () => import (/* webpackChunkName: "vue-webpack-ui" */ '@/pages/webpack.vue')
      component: resolve => require.ensure([], () => resolve(require('@/pages/webpack.vue').default), 'webpack')
    },
    {
      path: '/async',
      name: 'async',
      component: resolve => require.ensure([], () => resolve(require('@/pages/async-charts.vue').default), 'async-charts')
    }
  ]
})
