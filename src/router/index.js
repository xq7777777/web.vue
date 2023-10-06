import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue'),
    name: 'login',
    // redirect: '/home',
    children: [
    ],
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    
  },
  {
    path: '/page1',
    name: 'page1',
    component: () => import('../views/Page1.vue'),
    props: true 
  },
  {
    path: '/page2',
    name: 'page2',
    component: () => import('../views/Page2.vue'),
  },
  {
    path:'/teacher_book',
    name:'teacher_home',
    component:() =>import('../views/teacher/teacher_book.vue')
  },
  {
    path:'/home_person',
    name:'student_person',
    component:()=>import('../views/home/home_person.vue')
  },

  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/Login.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router