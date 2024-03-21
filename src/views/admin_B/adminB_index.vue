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
          <el-menu-item @click="bookchange">图书修改</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>用户查看</span>
          </template>
          <el-menu-item @click="checkpeople_s" >学校</el-menu-item>
          <el-menu-item @click="checkpeople_a">企业</el-menu-item>
          <el-menu-item @click="checkpeople_e" >教育局</el-menu-item>
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
            <el-input v-model="search" placeholder="请输入图书名称或书架编号" style="width: 240px"/>
            <!-- <el-button @click="onSearch">搜索</el-button>  -->
          </el-header>
          <el-main style="height: calc(100vh - 60px); overflow: auto;">
            <el-table :data="tableData" style="width: 100%"  @row-dblclick="handleRowDblClick">
                <el-table-column fixed prop="title" label="图书名称" width=auto />
                <el-table-column prop="bookid" label="图书编号" width=auto />
                <el-table-column prop="author" label="图书作者" width=auto />
                <el-table-column prop="publisher" label="出版社" width=auto />
                
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
  
    export default defineComponent({
      setup() {
        const store = useStore();
        const router = useRouter()
        const search = ref('') 
        const books =computed(() => store.state.books)
        const originData= []  
        for (let item of books.value) {
  originData.push({
    title: item.title,
    bookid: item.bookid,
    author: item.author,
    publisher: item.publisher,
  });
}
        const addbook =()=>{
          router.push({
            name:'adminB_addbook'
          }) 
        }

        const bookchange =()=>{
          router.push({
            name:'adminB_bookchange'
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
        //查看学校人员
        const checkpeople_s =async()=>{
          try{
            const userid =computed(() => store.state.userID)
                console.log(userid.value)
                const userID = userid.value
                const Userid = reactive({
                userID,
            })
            console.log(Userid)
              const response =await axios.post(`http://121.36.23.117:3000/api/admin/users/company/look`,Userid)
              if(response.status){
                console.log(response.data.school_admins)
                const  school_admins = response.data.school_admins
                store.commit('setschooladmins', school_admins)
               

                
              } 
              router.push({
              name:'adminB_people_s'
            })
            }catch (error) {  
          // 请求错误处理
          console.log(error)
        }
        }
        const checkpeople_a =async()=>{
          try{
            const userid =computed(() => store.state.userID)
                console.log(userid.value)
                const userID = userid.value
                const Userid = reactive({
                userID,
            })
            console.log(Userid)
              const response =await axios.post(`http://121.36.23.117:3000/api/admin/users/company/look`,Userid)
              if(response.status){
                console.log(response.data.company_admins)
                const  company_admins = response.data.company_admins
                store.commit('setcompanyadmins', company_admins)
              } 
              router.push({
              name:'adminB_people_a'
            })
            }catch (error) {  
          // 请求错误处理
          console.log(error)
        }
        }
        const checkpeople_e =async()=>{
          try{
              
              const response =await axios.get(`http://121.36.23.117:3000/api/admin/R_application`)
              if(response.status){
                console.log(response.data)
                const  maintenance = response.data
                store.commit('setmaintenance', maintenance)
                
              } 
              router.push({
              name:'adminB_people_s'
            })
            }catch (error) {  
          // 请求错误处理
          console.log(error.message)
        }
        }
        const maintenancerequire =async()=>{
          try{
              
              const response =await axios.get(`http://121.36.23.117:3000/api/admin/R_application`)
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
        //查看书架申请
        const checkshelfrequire =async()=>{
          try{
                
            const response =await axios.get(`http://121.36.23.117:3000/api/bookshelf/school/application_G`)
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
      }
        }
        
        const checkrequire =async()=>{
          try{
                const userid =computed(() => store.state.userID)
                console.log(userid.value)
                const userID = userid.value
                const Userid = reactive({
                userID,
            })
            console.log(Userid)
            const response =await axios.post(`http://121.36.23.117:3000/api/B_application/check/A`,Userid)
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
              
              const response =await axios.get(`http://121.36.23.117:3000/api/bookshelves`)
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
        const handleRowDblClick =async(row)=> {
          
          const bookid = row.bookid;
          const Bookid =reactive({
                  bookid,
                })
                console.log(Bookid)
          try{
            const response =await axios.post(`http://121.36.23.117:3000/api/admin/bookid`,Bookid)
            if(response.status){
              console.log(response.data.Books)
              const  Data = response.data.Books
              
              store.commit('setdata', Data)
              
            } 
            router.push({
             path:"/adminB_bookofschool",
             query: {
              bookid:row.bookid,
              author:row.author,
                }
           })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
          
      }
        const tableData = ref(originData) 
      
        const filterData = computed(() => {
      if (!search.value) {
        return originData
      }

      return originData.filter(item => {
        return item.title.includes(search.value) || 
           item.author.includes(search.value) ||
           item.bookid.includes(search.value)
      })
    })

    watch(search, (newVal) => {
      if (!newVal) {
        tableData.value = originData
      } else {
        tableData.value = filterData.value
      }
    })
        return{
            addbook,
            bookreturn,
            requirement,
            checkshelfrequire,
            maintenancerequire,
            adminperson,
            checkpeople_s,
            checkpeople_a,
            checkpeople_e,
            bookshelf,
            checkrequire,
            bookchange,
            // changebookshelf,
            handleRowDblClick,
            search,
            originData,
            tableData,
            books,
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
  
  
  