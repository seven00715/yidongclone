import Vue from 'vue'
import VueRouter from 'vue-router'
// import { Search } from 'vant'

// 路由的组件导入(按需导入)
const Layout = () => import ('../views/layout')
const Home = () => import ('../views/home')
const Question = () => import ('../views/question')
const Video = () => import ('../views/video')
const User = () => import ('../views/user')
const Profile = () => import('../views/user/profile.vue')
const Chat = () => import('../views/user/chat.vue')
const Login = () => import('../views/login')
const Search = () => import ('../views/search')
const Result = () => import ('../views/search/result.vue')
const Ariticle = () => import('../views/article')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/question',
        name: 'question',
        component: Question
      },
      {
        path: '/video',
        name: 'video',
        component: Video
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]

  }, {
    path: '/user/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/user/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/search/result',
    name: 'result',
    component: Result
  },
  {
    path: '/article',
    name: 'article',
    component: Ariticle
  }
]

const router = new VueRouter({
  routes
})

export default router
