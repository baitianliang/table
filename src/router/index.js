import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/Home',
      name: 'Home',
      component:() => import('@/components/pages/Home')
    },
    {
      path: '/',
      name: 'Blog',
      component:() => import('@/components/pages/Blog')
    }
  ]
})
