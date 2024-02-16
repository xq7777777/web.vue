import { createStore } from 'vuex'
export default createStore({
  state: {
    
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    users:{},
    userID:{},
    user: {
      // className:"",
      // school:"",
      // useID:"",
      // username:"",
    },

    tasks: [
      {
        // endedAt:"",
        // startedAt:"",
        // task_title:"",
        // task_book:"",
      },
    ],
    records: [
      {
        // bookid:"",
        // borrowedAt:"",
        // returnedAt:"",
        // willreturn_At:"",
      },
    ],
    menu: [],
    user:{},
    userID:{}
  },
  mutations: {
    setUser(state, users) {
      state.users = users 
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setRecords(state, records) {
      state.records = records
    },
 
    setstudent(state,student){
      state.student = student
    },
    setUserName(state,userName)
    {
      state.username = userName
    },
    setWork_unit(state, Work_unit){
      state.Work_unit = Work_unit
    },
    setID(state,userID){
      state.userID = userID
    },
    setdata(state,data){
      state.data = data
    },
    setBookfuben(state,bookfuben){
      state.bookfuben = bookfuben
    },
    setBooks(state,books)
    {
      state.books = books
    },
    setbookshelfs(state,bookshelfs)
    {
      state.bookshelfs = bookshelfs
    },
    setbookshelves(state,bookshelves)
    {
      state.bookshelves = bookshelves
    },
    setempty(state,empty)
    {
      state.empty = empty
    },
    setmaintenance(state,maintenance)
    {
      state.maintenance = maintenance
    },
    setschooladmins(state,school_admins)
    {
      state.school_admins = school_admins
    },
    setcompanyadmins(state,company_admins)
    {
      state.company_admins = company_admins
    },
    setNewarr(state,Newarr)
    {
      state.Newarr = Newarr
    },
    setadmins(state,admins)
    {
      state.admins = admins
    },
    setteachers(state,teachers)
    {
      state.teachers = teachers
    },
    setstudents(state,students)
    {
      state.students = students
    },
    // updateIsCollapse(state, payload) {
    //   // console.log(payload);
    //   state.isCollapse = !state.isCollapse
    // },
    selectMenu(state, val) {
      // 判断
      // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)

      if (val.name == 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result == -1 ? state.tabsList.push(val) : ''
      }
    },
    closeTab(state, val) {
      let res = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(res, 1)

    },
    setMenu(state, val) {
      state.menu = val
      localStorage.setItem('menu', JSON.stringify(val))
    },
  
    cleanMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')
    },
  }
})