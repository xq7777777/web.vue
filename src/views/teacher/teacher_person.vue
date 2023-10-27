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
        <h3>老师端</h3>

        <el-sub-menu  index="0">
          <template #title>
            <span >作业情况</span>
          </template>
          <el-menu-item v-for="cls in className" @click = clicktask>{{ cls }}</el-menu-item>
            
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>阅读情况</span>
          </template>
          <el-menu-item v-for="cls in className"  @click = clickread(cls)>{{ cls }}</el-menu-item>
        </el-sub-menu>
          <el-menu-item index="6">
            <el-icon><setting /></el-icon>
            <span @click = clickteacherperson>图书申请</span>
          </el-menu-item>
          <el-menu-item index="7">
            <el-icon><setting /></el-icon>
            <span @click = clickbookborrow>图书借阅</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon><setting /></el-icon>
            <span @click = person>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-col>

        </el-aside >
        <el-container>
          <el-header>
            <el-button type="info" @click="goback">返回</el-button>
          </el-header>
          <el-main>
           
            <div class="user-profile">

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                        <br><br><br>
                    </div>
                    <div class="user-info">
                        <div class="info" font-size="32px">
                            <span>姓名:{{users.username}}</span>
                            <br><br><br>
                            <span>学号:{{users.userID}}</span>
                            <br><br><br>
                            <span>手机号:{{}}</span>
                            <br><br><br>
                            <el-button @click=" showModal = true ">修改密码</el-button>
                        </div>
                    </div>
                </el-card>
                <teleport to="body">
                    <el-dialog v-if="showModal" :model-value="showModal" title="修改密码" font-size="32px">
                    <el-form v-model="passwordForm" label-width="80px">
                    <el-form-item label="旧密码">
                    <el-input v-model="passwordForm.oldPass"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                    <el-input v-model="passwordForm.newPass"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                    <el-input v-model="passwordForm.confirmPass"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="change">确定修改</el-button>
                    </el-form>
                    <el-button @click="showModal = false">关闭</el-button>
                    </el-dialog>
                </teleport>


            </div>

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
        // const className = ref([

        // ])
        const showModal = ref(false)
        const cls = ref('')
       const users = computed(() => store.state.users)
       const tasks = computed(() => store.state.tasks)
       const className = ref(users.value.className)
     
        const clicktask =()=>{
          router.push({
            name:""
          })
        };
        const passwordForm = ref({
      oldPass: '',
      newPass: '',
      confirmPass: '' 
    })
      
        const clickread =async(className)=>{
          try{
            cls.value = className
            const school = users.value.school
            const a ={
              className,
              school
            }
            console.log(a)
            const response =await axios.get('http://139.9.118.223:3000/api/class', JSON.stringify(a))
            if(response.status){
              console.log(response.data)
              const { students} = response.data;
              const student = response.data.students
              store.commit('setstudent',student)
            } 
            router.push({
              name:"teacher_studentlist",
            })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }}
        const clickteacherperson=()=>{
            router.push({
                name:"teacher_requirement"
            })
        }

        const clickbookborrow =()=>{
          router.push({
            name:'teacher_borrow'
          }) 
        }

        const borrow =()=>{
            console.log(formLabelAlign)
        }
        const goback =()=>{
          router.back() 
        }
        const requirement =()=>{
         console.log(formLabelAlign)
        };

        const change =()=>{
          if(passwordForm.value.oldPass===passwordForm.value.newPass)
          {
            alert("新密码不可以和旧密码相同")
            
          }
          else if(passwordForm.value.newPass!=passwordForm.value.confirmPass)
          {
            alert("请再次确认密码")
            
          }
          else 
          {
            console.log(passwordForm.value)
          }
        
        }

        const person =()=>{
          router.push({
            name:'teacher_person'
          })
        }

        return {
          clicktask,
          clickread,
          clickteacherperson,
          users,
          tasks,
          className,
          goback, 
          showModal,
          requirement,
          clickbookborrow,
          borrow,
          passwordForm,
          change,
          person,
        };
      },
 
      methods: {
        handleRowDblClick(row) {
          this.currentRow = row
          this.showModal = true
      },
    },
 
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
  
  
  