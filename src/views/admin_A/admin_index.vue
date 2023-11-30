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
            <el-input v-model="search" placeholder="请输入图书名称或书架编号" style="width: 240px"/>
            <!-- <el-button @click="onSearch">搜索</el-button>  -->
          </el-header>
          <el-main>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="title" label="图书名称" width=auto />
                <el-table-column prop="bookid" label="图书编号" width=auto />
                <el-table-column prop="Tquantity" label="图书总量" width=auto />
                <el-table-column prop="quantity" label="图书余量" width=auto />
                <el-table-column prop="pressmark" label="书架编号" width=auto />
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
        const bookfuben =computed(() => store.state.bookfuben)
        const originData= []  
        for (let item of bookfuben.value) {
        originData.push({
          title: item.title,
          bookid: item.bookid,
          Tquantity: item.Tquantity,
          quantity: item.quantity,
          pressmark: item.pressmark,
        });
      }
        const data = reactive(originData)

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
       
        const tableData = ref(originData) 
        const filterData = computed(() => {
      if (!search.value) {
        return originData
      }

      return originData.filter(item => {
        return item.title.includes(search.value) || 
           item.pressmark.includes(search.value) ||
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
            bookborrow,
            bookreturn,
            requirement,
            maintenance,
            adminperson,
            bookshelf,
            peolpe,
            checkrequire,
            shelfrequire,
            search,
            bookfuben,
            originData,
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
  
  
  