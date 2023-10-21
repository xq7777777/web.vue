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
    setclassname(state,classname){
      state.classname = classname
    },
    setuserid(state,userid){
      state.userid = userid
    },
    setusername(state,userName){
      state.userName = userName
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