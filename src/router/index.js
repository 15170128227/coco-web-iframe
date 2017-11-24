import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import aboutUs from '@/pages/about-us/about-us'
import contactUs from '@/pages/contact-us/contact-us'
import login from '@/pages/login/login'
import document from '@/pages/document/document.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',  // 首页
    name: 'home',
    component: home
  },
  {
    path: '/aboutUs',  // 关于我们
    name: 'aboutUs',
    component: aboutUs
  },
  {
    path: '/contactUs',  // 联系我们
    name: 'contactUs',
    component: contactUs
  },
  {
    path: '/login',  // 登录
    name: 'login',
    component: login
  },
  {
    path: '/document', // 文档中心
    name: 'document',
    component: document
  }
]

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: routes
})
