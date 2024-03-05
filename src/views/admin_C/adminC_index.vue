<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" >
      <el-col :span="12" width="200px" height="913px">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        width="200px"
        height="913px"
      > 
      <h3>教育局端</h3>
      <el-sub-menu  index="0">
        <template #title>
          <span @click="bookshelf">图书类型</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span @click="prefer">阅读偏好</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span @click="readtime">阅读时长统计</span>
        </template>
      </el-sub-menu>
        <el-menu-item index="8">
          <el-icon><setting /></el-icon>
          <span @click="adminperson" >个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>

      </el-aside >
      <el-container>
        <el-header>
          <!-- <el-button @click="onSearch">搜索</el-button>  -->
        </el-header>
        <el-main>
          <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">

            <div class="user-info">
              <p class="name" >{{username}}</p>
              <br>
              <p class="role">教育局</p>
            </div>
          </div>
          <div class="login-info">
            <p>账户：<span>{{userID}}</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px" height="450px">
          </el-card> 
          </el-col></el-row>         
        </el-main>
      </el-container>
    </el-container>
  </div>
  </template>
  <script>
  import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    watch,
  } from "vue";
  import {
Check,
Delete,
Edit,
Message,
Search,
Star,
} from '@element-plus/icons-vue';
  import { useRouter } from "vue-router";
  import { computed ,toRaw} from 'vue'
  import { useStore } from 'vuex'
  import axios from 'axios'
  import * as echarts from 'echarts';
  export default defineComponent({
    setup() {
      const store = useStore();
      const router = useRouter()
      const search = ref('') 
      const username = computed(() => store.state.username)
      const userID = computed(() => store.state.userID)
      const bookshelf =async()=>{
        try{
            
            const response =await axios.get(`http://139.9.118.223:3000/api/book_type_stats`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_booktypepn'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }

      const prefer =async()=>{
        try{
            
            const response =await axios.get(`http://139.9.118.223:3000/api/school_book_type_stats`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_prefertype'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }
      
      const readtime =async()=>{
        try{
            
            const response =await axios.get(`http://139.9.118.223:3000/api/school_average_read_time`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_readtime'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }
      return{  
          username,
          userID,
          bookshelf,
          prefer,
          readtime,
          chartData: [
      { name: 'Category 1', value: 30 },
      { name: 'Category 2', value: 50 },
      { name: 'Category 3', value: 20 },
    ],
      }
    }
  })
  </script> 
  
  <style lang="less" scoped>
  .home {
    .user {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
    }
    .login-info {
      p {
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span {
          color: #666;
          margin-left: 60px;
          font-size: 15px;
        }
      }
    }
    .num {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card {
        width: 32%;
        margin-bottom: 20px;
      }
      .icons {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          color: #999;
        }
      }
    }
    .graph {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card {
        width: 48%;
      }
    }
  .icons {
    width: 18px;
    height: 18px;
  }
  
  .box-card {
width: 500px;
margin: 20px auto;
}

.user-info {
display: flex;
align-items: center;
padding-bottom: 20px;
border-bottom: 1px solid #ddd;
}

.user-info img {
width: 100px;
height: 100px;
border-radius: 50%;
margin-right: 50px;
}

.user-info .info p {
display: flex;
align-items: center; 
font-size: 14px;
color: #666;
padding: 5px 0;
}


.user-info .info i {
font-size: 18px;
margin-right: 10px;
}




  }
.el-menu-item {
  padding:30px;
font-size: 20px;
}



  
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
 
  background: #333;
}
.el-menu {
    position: fixed;
    height: 100%;
    border: none;
    width:200px;
     h3 {
       padding:10px;
       line-height: 48px;
       color: #fff;
       text-align: center;
       font-size: 30px;
     }
   }
html,body {
      margin: 0;
      height: 100%;
}

</style>


