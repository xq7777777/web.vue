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
          <template #title>
            <span @click="peolpe" >用户管理</span>
          </template>
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
        @click=" showmodal = true "
         >{{ "上传文件" }}</el-button
      >
          <br><br>
              <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
              
                <el-tab-pane label="管理员" name="admins">
                  <el-table :data="Admins" style="width: 100%">
                <el-table-column fixed prop="userID" label="管理员账户" width=auto />
                <el-table-column prop="username" label="管理员姓名" width=auto />
                <el-table-column prop="_id" label="管理员编号" width=auto />

            </el-table>
                </el-tab-pane>
                <el-tab-pane label="老师" name="teachers">
                  <el-table :data="Teachers" style="width: 100%">
                <el-table-column fixed prop="userID" label="老师账户" width=auto />
                <el-table-column prop="username" label="老师姓名" width=auto />
                <el-table-column prop="className" label="管理班级" width=auto />
                <el-table-column prop="_id" label="老师编号" width=auto />

            </el-table>
                </el-tab-pane>
                <el-tab-pane label="学生" name="students">
                  <el-table :data="Students" style="width: 100%">
                <el-table-column fixed prop="userID" label="学生账户" width=auto />
                <el-table-column prop="username" label="学生姓名" width=auto />
                <el-table-column prop="className" label="所属班级" width=auto />
                <el-table-column prop="_id" label="学生编号" width=auto />

            </el-table>
                </el-tab-pane>
              </el-tabs>

              <teleport to="body">
                <el-dialog v-if="showModal" v-model="showModal" title="修改密码" font-size="32px">
                  <el-form :model="addForm" label-width="80px">
                    <el-form-item label="用户账户">
                      <el-input v-model="addForm.userID"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                      <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名">
                      <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户身份">
                      <el-select
                        v-model="addForm.identity"
                        class="m-2"
                        placeholder="Select"
                        style="width: 240px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="工作班级">
                      <el-input v-model="addForm.className"></el-input>
                    </el-form-item>
                    <el-form-item label="管理账户">
                      <el-input v-model="addForm.adminID"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="adduser">确定修改</el-button>
                  </el-form>
                </el-dialog>
              </teleport>
      
        
        <teleport to="body">
          <el-dialog v-if="showmodal" v-model="showmodal" title="上传文件" font-size="32px">
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
    import { UploadFilled } from '@element-plus/icons-vue'
    export default defineComponent({
      setup() {
        const store = useStore();
        const router = useRouter()
        const admins = computed(() => store.state.admins);
        const teachers = computed(() => store.state.teachers);
        const students = computed(() => store.state.students);
        const showModal = ref(false);
        const showmodal = ref(false);
        const options = [

    {
      value: 'T',
      label: '老师',
    },
    {
      value: 'S',
      label: '学生',
    },
  ]
        const addForm = reactive({
            userID:"",       //检查是否存在，不存在则创建，存在则修改
            password:"",
            username:"",
            identity:"",           
            school:"红星小学",               
            className:"", 
            adminID:"",
        })
        const Admins = admins.value
        const Teachers = teachers.value
        const Students = students.value
       
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
        const goback =()=>{
          router.back() 
        }
        const adduser =async()=>{
          try{
              const response =await axios.post(`http://139.9.118.223:3000/api/admin/users/school`,addForm.value)
              if(response.status){
                console.log(response.data)
               
              } 
  
            }catch (error) {  
          // 请求错误处理
          console.log(error)
        }
        }
        const handleClick=(tab)=> {
          
      }
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
            adduser,
            goback,
            handleClick,
            addForm ,
            showModal,
            showmodal,
            options,
            activeName: 'admins',
            Admins,
            Teachers,
            Students,
           
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
  
  
  