import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/view/Page'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/demo' },
    {
      path: '/Login',
      name: 'Login',
      component:() => import('@/view/Login')
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Page,
      children: [
        {
          path: '/demo',
          redirect: '/demo/User'
        },
        { //用户列表
          path: 'User',
          name: 'User',
          component:() => import('@/view/pages/User')
        },
        { //每日计划
          path: 'DailyPlan',
          name: 'DailyPlan',
          component:() => import('@/view/pages/DailyPlan')
      }]
    }
  ]
})
