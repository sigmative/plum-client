import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Activity from '@/components/Activity'
import Messages from '@/components/Messages'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/activity',
      name: 'Activity',
      component: Activity
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition
  }
})
