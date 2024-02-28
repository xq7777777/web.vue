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
    path:'/admin_shelfrequire',
    name:'adminA_shelfrequire',
    component:()=>import('../views/admin_A/admin_shelfrequire.vue')
  },
  {
    path:'/admin_bookshelf',
    name:'adminA_bookshelf',
    component:()=>import('../views/admin_A/admin_bookshelf.vue')
  },
  {
    path:'/admin_checkrequire',
    name:'adminA_checkrequire',
    component:()=>import('../views/admin_A/admin_checkrequire.vue')
  },
  {
    path:'/admin_person',
    name:'adminA_person',
    component:()=>import('../views/admin_A/admin_person.vue')
  },
  {
    path:'/adminB_index',
    name:'adminB_index',
    component:()=>import('../views/admin_B/adminB_index.vue')
  },
  {
    path:'/adminA_peolpe',
    name:'adminA_peolpe',
    component:()=>import('../views/admin_A/admin_peolpe.vue')
  },
  {
    path:'/adminB_bookofschool',
    name:'adminB_bookofschool',
    component:()=>import('../views/admin_B/adminB_bookofschool.vue')
  },
  {
    path:'/adminB_bookchange',
    name:'adminB_bookchange',
    component:()=>import('../views/admin_B/adminB_bookchange.vue')
  },
  {
    path:'/adminB_checkrequire',
    name:'adminB_checkrequire',
    component:()=>import('../views/admin_B/adminB_checkrequire.vue')
  },
  {
    path:'/adminB_checkshelfrequire',
    name:'adminB_checkshelfrequire',
    component:()=>import('../views/admin_B/adminB_checkshelfrequire.vue')
  },
  {
    path:'/adminB_schoolshelves',
    name:'adminB_schoolshelves',
    component:()=>import('../views/admin_B/adminB_schoolshelves.vue')
  },
  {
    path:'/adminB_shelfrequire',
    name:'adminB_shelfrequire',
    component:()=>import('../views/admin_B/adminB_shelfrequire.vue')
  },
  {
    path:'/adminB_bookofshelf',
    name:'adminB_bookofshelf',
    component:()=>import('../views/admin_B/adminB_bookofshelf.vue')
  },
  {
    path:'/adminB_emptyshelf',
    name:'adminB_emptyshelf',
    component:()=>import('../views/admin_B/adminB_emptyshelf.vue')
  },
  {
    path:'/adminB_maintenance',
    name:'adminB_maintenance',
    component:()=>import('../views/admin_B/adminB_maintenance.vue')
  },
  {
    path:'/adminB_person',
    name:'adminB_person',
    component:()=>import('../views/admin_B/adminB_person.vue')
  },
  {
    path:'/adminB_addbook',
    name:'adminB_addbook',
    component:()=>import('../views/admin_B/adminB_addbook.vue')
  },
  {
    path:'/adminB_people_s',
    name:'adminB_people_s',
    component:()=>import('../views/admin_B/adminB_people_s.vue')
  },
  {
    path:'/adminB_people_a',
    name:'adminB_people_a',
    component:()=>import('../views/admin_B/adminB_people_a.vue')
  },
  {
    path:'/adminB_people_e',
    name:'adminB_people_e',
    component:()=>import('../views/admin_B/adminB_people_e.vue')
  },
  {
    path:'/adminB_checkschool',
    name:'adminB_checkschool',
    component:()=>import('../views/admin_B/adminB_checkschool.vue')
  },
  {
    path:'/adminB_schooladmins',
    name:'adminB_schooladmins',
    component:()=>import('../views/admin_B/adminB_schooladmins.vue')
  },
  {
    path:'/adminC_index',
    name:'adminC_index',
    component:()=>import('../views/admin_C/adminC_index.vue')
  },
  {
    path:'/adminC_booktypepn',
    name:'adminC_booktypepn',
    component:()=>import('../views/admin_C/adminC_booktypepn.vue')
  },
  {
    path:'/adminC_prefertype',
    name:'adminC_prefertype',
    component:()=>import('../views/admin_C/adminC_prefertype.vue')
  },
  {
    path:'/adminC_readtime',
    name:'adminC_readtime',
    component:()=>import('../views/admin_C/adminC_readtime.vue')
  },
  {
    path:'/adminC_test',
    name:'adminC_test',
    component:()=>import('../views/admin_C/adminC_test.vue')
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