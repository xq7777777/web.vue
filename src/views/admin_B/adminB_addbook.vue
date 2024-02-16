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
        <h3>企业端</h3>
        <el-sub-menu  index="0">
          <template #title>
            <span >图书管理</span>
          </template>
          <el-menu-item @click="addbook">图书增减</el-menu-item>
          <el-menu-item @click="">图书修改</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>用户管理</span>
          </template>
          <el-menu-item >用户查看</el-menu-item>
          <el-menu-item >用户增减</el-menu-item>
        </el-sub-menu>
          <el-sub-menu  index="3">
          <template #title >
            <span >查看申请</span>
          </template>
          <el-menu-item @click="checkrequire">图书申请</el-menu-item>
          <el-menu-item @click="checkshelfrequire">书架申请</el-menu-item>
          <el-menu-item @click="maintenancerequire" >维修申请</el-menu-item>
          
        </el-sub-menu>
        <el-sub-menu  index="4">
          <template #title>
            <span >书架管理</span>
          </template>
          <el-menu-item @click="bookshelf">查看书架</el-menu-item>
          <el-menu-item @click="addbookshelf">书架增添</el-menu-item>
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
            <el-button type="info" @click="goback">返回</el-button>
            <!-- <el-button @click="onSearch">搜索</el-button>  -->
          </el-header>
          <el-main>
            <el-form
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
            >

           
                <el-form-item label="图书编号">
                <el-input v-model="formLabelAlign.bookid" />
                </el-form-item>
                <el-form-item label="图书名称">
                <el-input v-model="formLabelAlign.title" />
                </el-form-item>
                <el-form-item label="所属学校">
                <el-input v-model="formLabelAlign.school" />
                </el-form-item>
                <el-form-item label="所属书架号">
                <el-input v-model="formLabelAlign.pressmark" />
                </el-form-item>
                <el-form-item label="图书位置">
                <el-input v-model="formLabelAlign.locationID" />
                </el-form-item>
               
                
                
                <el-button type="success" round @click="submitbook">确认添加</el-button>
             
            </el-form>
            
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
    import { computed ,toRaw, } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
  
    export default defineComponent({
      setup() {
        const store = useStore();
        const router = useRouter()
        const search = ref('') 
        const formLabelAlign = reactive({
            bookid:"",               
            title:"", 
            school:"", 
            locationID:"",          
            pressmark:"",          
                
            })
    
        const addbook =()=>{
          router.push({
            name:'adminB_addbook'
          }) 
        }
        const bookreturn =()=>{
          router.push({
            name:'adminA_return'
          }) 
        }
        const requirement =()=>{
          router.push({
            name:'adminA_requirement'
          }) 
        }
        const maintenancerequire =async()=>{
          try{
              
              const response =await axios.get(`http://139.9.118.223:3000/api/admin/R_application`)
              if(response.status){
                console.log(response.data)
                const  maintenance = response.data
                store.commit('setmaintenance', maintenance)
                
              } 
              router.push({
              name:'adminB_maintenance'
            })
            }catch (error) {  
          // 请求错误处理
          console.log(error.message)
        }
         
        }
        const adminperson =()=>{
          router.push({
            name:'adminB_person'
          }) 
        }
      
        const goback =()=>{
          router.back() 
        }

        const checkshelfrequire =async()=>{
          try{
                
            const response =await axios.get(`http://139.9.118.223:3000/api/bookshelf/school/application_G`)
            if(response.status){
              console.log(response.data)
              const{data}=response.data
              const  Data = response.data.data
              store.commit('setdata', Data)
              
            } 
            router.push({
            name:'adminB_shelfrequire'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
        }
        const checkrequire =async()=>{
          try{
                const userid =computed(() => store.state.userID)
                console.log(userid.value)
                const res_userID = userid.value
                const Userid = reactive({
                res_userID,
            })
            console.log(Userid)
            const response =await axios.post(`http://139.9.118.223:3000/api/B_application/check/A`,Userid)
            if(response.status){
              console.log(response.data)
              const{data}=response.data
              const  Data = response.data.data
              store.commit('setdata', Data)
              
            } 
            router.push({
            name:'adminB_checkrequire'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
        }
        const bookshelf =async()=>{
          try{
              
              const response =await axios.get(`http://139.9.118.223:3000/api/bookshelves`)
              if(response.status){
                console.log(response.data.bookshelves)
                const{data}=response.data.bookshelves
                const  bookshelves = response.data.bookshelves
                store.commit('setbookshelves', bookshelves)
                
              } 
              router.push({
              name:'adminB_checkshelfrequire'
            })
            }catch (error) {  
          // 请求错误处理
          console.log(error.message)
        }
         
        }
        const submitbook =async()=>{
          try{
              console.log(formLabelAlign)
              const response =await axios.post(`http://139.9.118.223:3000/api/bookfuben`,formLabelAlign)
              if(response.status){
                console.log(response.data)
                alert('添加成功')
              } 
             
            }catch (error) {  
          // 请求错误处理
          console.log( error);
        }
         
        }
       
        return{
            addbook,
            bookreturn,
            requirement,
            checkshelfrequire,
            maintenancerequire,
            adminperson,
            bookshelf,
            checkrequire,
            goback,
            submitbook,
            formLabelAlign,
           
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
  
  
  