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
        <h3>学校端</h3>
        <el-sub-menu  index="0">
          <template #title>
            <span >图书管理</span>
          </template>
          <el-menu-item @click="bookborrow">图书借阅</el-menu-item>
          <el-menu-item @click="bookreturn">图书归还</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="1">
        
            <span @click="peolpe" >用户管理</span>
          </el-menu-item>
          <el-sub-menu  index="3">
          <template #title>
            <span >图书申请</span>
          </template>
          <el-menu-item @click="checkrequire">申请查看</el-menu-item>
          <el-menu-item @click="requirement">提交申请</el-menu-item>
        </el-sub-menu>
        <el-sub-menu  index="4">
          <template #title>
            <span >书架管理</span>
          </template>
          <el-menu-item @click="bookshelf">查看书架</el-menu-item>
          <el-menu-item @click="shelfrequire">书架申请</el-menu-item>
        </el-sub-menu>
          <el-menu-item index="7">
            <el-icon><setting /></el-icon>
            <span @click="maintenance" >维修申请</span>
          </el-menu-item>
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
          </el-header>
          <el-main>
            
            <el-table :data="tableData" stripe style="width: 100%" >
              <el-table-column prop="school" label="申请学校" width=auto />
              <el-table-column prop="pressmark" label="书架编号" width=auto />
              
              <el-table-column prop="_id" label="申请编号" width=auto />
              <el-table-column prop="state" label="状态" width=auto  />
              <el-table-column fixed="right" label="操作" width="120">
                  <template #default="scope">
                    <el-button  link type="primary" size="small" @click="agree(scope.row)" 
                      >通过申请</el-button>
                    <el-button  link type="primary" size="small" @click="(scope.row)" 
                      >拒绝申请</el-button>
                  </template>
                </el-table-column>
            </el-table>
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
      reactive
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
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
  
    export default defineComponent({
      setup() {
        const store = useStore();
        const router = useRouter()
        const tableData =computed(() =>store.state.maintenance)
        const bookborrow =()=>{
          router.push({
            name:'adminA_borrow'
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
        const maintenance =()=>{
          router.push({
            name:'adminA_maintenance'
          }) 
        }
        const adminperson =()=>{
          router.push({
            name:'adminA_person'
          }) 
        }
        const peolpe =()=>{
          router.push({
            name:'adminA_peolpe'
          }) 
        }
        const shelfrequire =()=>{
          router.push({
            name:'adminA_shelfrequire'
          }) 
        }
        const goback =()=>{
          router.back() 
        }
        const checkrequire =async()=>{
          try{
                const userid =computed(() => store.state.userID)
                const res_userID = toRaw(userid.value)
                const Userid = reactive({
                res_userID,
               
            })
            const response =await axios.post(`http://139.9.118.223:3000/api/B_application/check/T`,Userid)
            if(response.status){
              console.log(response.data)
              const{data}=response.data
              const  Data = response.data.data
              store.commit('setdata', Data)
              
            } 
            router.push({
            name:'adminA_checkrequire'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
        }
        const bookshelf =async()=>{
            try{
                const School =computed(() => store.state.Work_unit)
                const school = toRaw(School.value)
                console.log(school)
                const schoolname = reactive({
                  school,
                })
            const response =await axios.post(`http://139.9.118.223:3000/api/bookshelf/school`,schoolname)
            if(response.status){
              console.log(response.data.bookshelfs)
              const{data}=response.data.bookshelfs
              const  Data = response.data.bookshelfs
              store.commit('setdata', Data)
              
            } 
            router.push({
            name:'adminA_bookshelf'
          }) 
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
         
        }

        const agree =async(row)=> {
          try{
            const _id = row._id;
                const schoolname = reactive({
                  _id,
                })
                console.log(schoolname)
            const response =await axios.post(`http://139.9.118.223:3000/api/bookshelf/school/application/Y`,schoolname)
            if(response.status){
              console.log(response.data)
              // const{bookshelfs}=response.data.bookshelfs
              // const  bookshelfs = response.data.bookshelfs
              // store.commit('setbookshelfs', bookshelfs)
              
            } 
          //   router.push({
          //    path:"/adminB_schoolshelves",
          //    query: {
          //     school,
          //     }
          //  })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }   
      }
      //   const handleRowDblClick =async(row)=> {
      //     try{
      //       const response =await axios.post(`http://139.9.118.223:3000/api/B_application/:YN`)
      //       if(response.status){
      //         console.log(response.data.Books)
      //         const  Data = response.data.Books
              
      //         store.commit('setdata', Data)
              
      //       } 
      //       router.push({
      //        path:"/adminB_bookofschool",
      //        query: {
      //         bookid:row.bookid,
      //         author:row.author,
      //           }
      //      })
      //     }catch (error) {  
      //   // 请求错误处理
      //   console.log(error.message)
      // }
          
      // }//请求信息不完整！
      
        return{
            bookborrow,
            bookreturn,
            requirement,
            maintenance,
            adminperson,
            bookshelf,
            peolpe,
            checkrequire,
            shelfrequire,
            goback,
            agree,
        
            tableData,
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
  
  
  