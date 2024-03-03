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
            <el-input v-model="search" placeholder="请输入账户、姓名或id" style="width: 240px"/>
            <el-button type="info" @click="goback">返回</el-button>
            <!-- <el-button @click="onSearch">搜索</el-button>  -->
          </el-header>
          <el-main>
            <el-button
        key="primary"
        type="primary"
        text
        bg
        @click=" showModal = true "
         >{{ "添加用户" }}</el-button
      >
      <el-button
        key="primary"
        type="primary"
        text
        bg
        @click=" ShowModal = true "
         >{{ "上传文件" }}</el-button
      >
          <br><br>
            <el-table :data="tableData" style="width: 100%"  @row-dblclick="handleRowDblClick">
                <el-table-column fixed prop="userID" label="管理员账户" width=auto />
                <el-table-column prop="username" label="管理员姓名" width=auto />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                      <el-button  link type="primary" size="small" @click=" showmodal = true " 
                        >修改密码</el-button>
                      <el-button  link type="primary" size="small" @click="Delete(scope.row)" 
                        >删除用户</el-button>
                    </template>
                  </el-table-column>
            </el-table>
           
            <teleport to="body">
              <el-dialog v-if="showModal" v-model="showModal" title="添加用户" font-size="32px">
                <el-form v-model="addForm" label-width="80px">
                  <el-form-item label="用户账户">
                    <el-input v-model="addForm.userID"></el-input>
                  </el-form-item>
                  <el-form-item label="用户密码">
                    <el-input v-model="addForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <el-input v-model="addForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位">
                    <el-input v-model="addForm.work_unit"></el-input>
                  </el-form-item>
                  <el-form-item label="管理账户">
                    <el-input v-model="addForm.adminID"></el-input>
                  </el-form-item>
                  <el-form-item label="管理密码">
                    <el-input v-model="addForm.company_password"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="adduser">确定修改</el-button>
                </el-form>
              </el-dialog>
            </teleport>
            <teleport to="body">
              <el-dialog v-if="showmodal" v-model="showmodal" title="修改密码" font-size="32px">
                <el-form v-model="addForm" label-width="80px">
                  <el-form-item label="用户账户">
                    <el-input v-model="addForm.userID"></el-input>
                  </el-form-item>
                  <el-form-item label="用户密码">
                    <el-input v-model="addForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <el-input v-model="addForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位">
                    <el-input v-model="addForm.work_unit"></el-input>
                  </el-form-item>
                  <el-form-item label="管理账户">
                    <el-input v-model="addForm.adminID"></el-input>
                  </el-form-item>
                  <el-form-item label="管理密码">
                    <el-input v-model="addForm.company_password"></el-input>
                  </el-form-item>
                  <el-button type="primary" @click="changepass">确定修改</el-button>
                </el-form>
              </el-dialog>
        </teleport>
        <teleport to="body">
          <el-dialog v-if="ShowModal" v-model="ShowModal" title="上传文件" font-size="32px">
            <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" 
              multiple
              accept=".xlsx,.xls"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  <!-- jpg/png files with a size less than 500kb -->
                </div>
              </template>
            </el-upload>
          </el-dialog>
        </teleport>
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
  
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
    import { useRouter } from "vue-router";
    import { useRoute } from "vue-router";
    import { computed ,toRaw} from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
  
    export default defineComponent({
      setup() {
  
  
        const store = useStore();
        const router = useRouter()
        const route = useRoute()
        const search = ref('') 
        const admins = computed(() => store.state.Newarr);
        console.log(admins)
        const originData = []
        const showModal = ref(false);
        const showmodal = ref(false);
        const ShowModal = ref(false);      
        const addForm = ref({
          userID: "",       //检查是否存在，不存在则创建，存在则修改
          password: "",
          username:"",
          identity:"A",           
          work_unit:"",               //此处非智慧图书时，company_password均可为空或者任意
          adminID:"",
          company_password:""
            })
      const changeForm = ref({
          userID: "",       //检查是否存在，不存在则创建，存在则修改
          password: "",
          username:"",
          identity:"A",           
          work_unit:"",               //此处非智慧图书时，company_password均可为空或者任意
          adminID:"",
          company_password:""
            })

        for (let item of admins.value) {
  originData.push({
    userID: item.userID,
    username: item.username,
  });
  }
        const goback =()=>{
            router.back() 
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
        const Delete =()=>{
          router.push({
            name:'adminB_person'
          }) 
        }
        const adduser =async()=>{
          try{
              const response =await axios.post(`http://139.9.118.223:3000/api/admin/users/company`,addForm.value)
              if(response.status){
                console.log(response.data)
               
              } 
  
            }catch (error) {  
          // 请求错误处理
          console.log(error)
        }
        }
        const changepass =async()=>{
          try{
              const response =await axios.post(`http://139.9.118.223:3000/api/admin/users/company`,changeForm.value)
              if(response.status){
                console.log(response.data)
               
              } 
  
            }catch (error) {  
          // 请求错误处理
          console.log(error)
        }
        }
        const checkpeople_s =async()=>{
          try{
              
              const response =await axios.get(`http://139.9.118.223:3000/api/admin/R_application`)
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
        //查看书架申请
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
        const handleRowDblClick =async(row)=> {
          
          const bookid = row.bookid;
          const Bookid =reactive({
                  bookid,
                })
                console.log(Bookid)
          try{
            const response =await axios.post(`http://139.9.118.223:3000/api/admin/bookid`,Bookid)
            if(response.status){
              console.log(response.data.Books)
              const  Data = response.data.Books
              
              store.commit('setdata', Data)
              
            } 
            router.push({
             path:"/adminB_checkschool",
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
        return item.userID.includes(search.value) || 
           item.username.includes(search.value) 
        
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
            goback,
            bookshelf,
            checkrequire,
            bookchange,
            handleRowDblClick,
            Delete,
            adduser,
            changepass,
            showModal,
            showmodal,
            ShowModal,
            addForm,
            changeForm,
            search,
            originData,
            tableData,
            admins,
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
  
  
  