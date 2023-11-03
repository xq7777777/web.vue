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
  {
    path:'/teacher_index',
    name:'teacher_index',
    component:()=>import('../views/teacher/teacher_index.vue')
  },
  {
    path:'/teacher_tasks',
    name:'teacher_tasks',
    component:()=>import('../views/teacher/teacher_tasks.vue')
  },
  {
    path:'/teacher_book',
    name:'teacher_book',
    component:()=>import('../views/teacher/teacher_book.vue')
  },
  {
    path:'/teacher_taskdetails',
    name:'teacher_taskdetails',
    component:()=>import('../views/teacher/teacher_taskdetails.vue')
  },
  {
    path:'/teacher_changetask',
    name:'teacher_changetask',
    component:()=>import('../views/teacher/teacher_changetask.vue')
  },
  {
    path:'/teacher_studentlist',
    name:'teacher_studentlist',
    component:()=>import('../views/teacher/teacher_studentlist.vue')
  },
  
  {
    path:'/teacher_requirement',
    name:'teacher_requirement',
    component:()=>import('../views/teacher/teacher_requirement.vue')
  },
  {
    path:'/teacher_borrow',
    name:'teacher_borrow',
    component:()=>import('../views/teacher/teacher_borrow.vue')
  },
  {
    path:'/teacher_person',
    name:'teacher_person',
    component:()=>import('../views/teacher/teacher_person.vue')
  },
  {
    path:'/teacher_classtask',
    name:'teacher_classtask',
    component:()=>import('../views/teacher/teacher_classtask.vue')
  },
  {
    path:'/teacher_studentdetails',
    name:'teacher_studentdetails',
    component:()=>import('../views/teacher/teacher_studentdetails.vue')
  },
  {
    path:'/admin_index',
    name:'adminA_index',
    component:()=>import('../views/admin_A/admin_index.vue')
  },
  {
    path:'/admin_borrow',
    name:'adminA_borrow',
    component:()=>import('../views/admin_A/admin_borrow.vue')
  },
  {
    path:'/admin_return',
    name:'adminA_return',
    component:()=>import('../views/admin_A/admin_return.vue')
  },
  {
    path:'/admin_requirement',
    name:'adminA_requirement',
    component:()=>import('../views/admin_A/admin_requirement.vue')
  },
  {
    path:'/admin_maintenance',
    name:'adminA_maintenance',
    component:()=>import('../views/admin_A/admin_maintenance.vue')
  },
  {
    path:'/admin_person',
    name:'adminA_person',
    component:()=>import('../views/admin_A/admin_person.vue')
  },
  {
    path:'/admin_bookshelf',
    name:'adminA_bookshelf',
    component:()=>import('../views/admin_A/admin_bookshelf.vue')
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