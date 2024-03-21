<template>
  <router-view></router-view>
    <el-form :model="loginForm" class="login-container">
      <h3>系统登录</h3>
      <el-form-item>
        <el-input
          type="input"
          placeholder="请输入账号"
          v-model="loginForm.userID"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group  @change="onChange" v-model="loginForm.identity">
          <el-radio label="A" value="A" >管理员</el-radio>
          <el-radio label="T" value="T" >老师</el-radio>
          <el-radio label="S" value="S" >学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </template>
  <script>
  import { reactive } from "vue-demi";

  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { ref } from 'vue';
  import axios from 'axios'
 
  export default {
    setup() {
      const loginForm = reactive({
        userID: "",
        password: "",
        identity: ""
      });
    
      const store = useStore();
      const router = useRouter();
      const value = ref(3);
    // 登录方法 
      
    const login = async() => {
      // console.log(loginForm.identity)
      try {
        // 发送登录请求
        const response = await axios.post('http://121.36.23.117:3000/api/login', loginForm)
        
        // 处理成功响应 
        if(response.status === 200) {
          console.log(response.data)
          
          // store.commit("setMenu", response.menu);
         
      
          // 将数据存储到Pinia store
           
          if(loginForm.identity==="S")
          {
            const {Task, user, borrowRecords} = response.data.data;
            const users = response.data.data.user 
            const tasks = response.data.data.Task
            const records = response.data.data.borrowRecords
            store.commit('setUser', users)  
            store.commit('setTasks', tasks)
            store.commit('setRecords', records)
            // 提交 mutations
            console.log(users)
            console.log(tasks)
            console.log(records)
            router.push({
                        name: "home",
                      
                      });

          }

          else if(loginForm.identity==="T")
          {
            const {Task, user} = response.data.data;
            const users = response.data.data.user 
            const tasks = response.data.data.Task
            store.commit('setUser', users)  
            store.commit('setTasks', tasks)
            router.push({
              name:"teacher_index",
              params:{
                
              }
            })
          }
          else if(loginForm.identity==="A"){
            const{userID,username,work_unit,bookfuben}=response.data.data
            const userid =response.data.data.userID
            const userName =response.data.data.username
            const Work_unit =response.data.data.work_unit
            const Bookfuben =response.data.data.bookfuben
            store.commit('setUserName', userName)
            store.commit('setID', userID)
            store.commit('setWork_unit', Work_unit)
            store.commit('setBookfuben', Bookfuben)
            
            
            if(work_unit==="智慧图书")
            {
              const {userID, username, work_unit, books} = response.data.data;

              store.commit('setUserName', username);
              store.commit('setID', userID); 
              store.commit('setWork_unit', work_unit);
              store.commit('setBooks', books);
              router.push({
                        name: "adminB_index",

                      });
            }
            else if(work_unit==="education")
            {
              const {userID, username, work_unit} = response.data.data;

              store.commit('setUserName', username);
              store.commit('setID', userID); 
              store.commit('setWork_unit', work_unit);
             
            try{
            const response =await axios.get(`http://121.36.23.117:3000/api/book_type_stats`)
            if(response.status){
              console.log(response.data)
              const booktype = response.data
              store.commit('setbooktype', booktype)
            } 
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
          try{
                
                const response =await axios.get(`http://121.36.23.117:3000/api/school_book_type_stats`)
                if(response.status){
                  console.log(response.data)
                  const prefertype = response.data
                  store.commit('setprefertype', prefertype)
                } 
              }catch (error) {  
            // 请求错误处理
            console.log(error.message)
          }
          try{
            
            const response =await axios.get(`http://121.36.23.117:3000/api/school_average_read_time`)
            if(response.status){
              console.log(response.data)
              const readtime = response.data
              store.commit('setreadtime', readtime)
            } 
            router.push({
                        name: "adminC_index",
                      });
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
            }
            else 
            
            {router.push({
                         name: "adminA_index",
                       
                       });}
          }
          
        }
      } catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
    }
    
      return {
        loginForm,
        login,    
      };
    },
    methods:{
      onChange(value) {
       const identity = value // 选中的 label 值
      },

    },
      
  };
  </script>
  <style lang="less" scoped>
  .login-container {
    width: 350px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;
    h3 {
      text-align: center;
      margin-bottom: 20px;
      color: #505450;
    }
    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }
  </style>