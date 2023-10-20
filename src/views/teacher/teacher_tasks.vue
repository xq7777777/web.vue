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
            <span @click = clicktask>作业情况</span>
          </template>
          <el-menu-item v-for="cls in classname">{{ cls }}</el-menu-item>
            
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span @click = clickread>阅读情况</span>
          </template>
          <el-menu-item v-for="cls in classname">{{ cls }}</el-menu-item>
        </el-sub-menu>
          <el-menu-item index="6">
            <el-icon><setting /></el-icon>
            <span @click = clickteacherperson>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-col>

        </el-aside >
        <el-container>
          <el-header>
            <el-button type="info" @click="goback">返回</el-button>
          </el-header>
          <el-main>
           <h3>布置作业</h3>
           <br>
           <br>
           <el-form-item label="作业标题">
              <el-input v-model="taskForm.task_title" ></el-input>
            </el-form-item>
            <br>
            <el-form-item label="阅读书目">
              <el-input v-model="taskForm.task_book"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="布置时间">
              <el-input v-model="taskForm.startedAt"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="截止时间">
              <el-input v-model="taskForm.ehdedAt"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="选择班级">
              <el-input v-model="taskForm.className"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="作业描述">
              <el-input v-model="taskForm.task_description"></el-input>
            </el-form-item>
            <br>
          <el-form-item>
            <el-button type="primary" @click="set"> 确认布置 </el-button>
          </el-form-item>

            
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
  
  
    export default defineComponent({
      setup() {
        const store = useStore();
        const users = computed(() => store.state.users)
        const classname = ref(users.value.className)
        const router = useRouter()
        const showModal = ref(false)
        const clicktask =()=>{
          router.push({
            name:""
          })
        };
  
        const taskForm = reactive({
          task_title:"",
          task_book:"",
          className:"",
          startedAt:"",
          endedAt:"",
          task_description:""
      });

        const clickread =()=>{
          router.push({
            name:"student_person"
          })
        }
        const clickteacherperson=()=>{

        }
      
        
        const goback =()=>{
          router.back() 
        }
        
        const set =()=>{
          console.log(taskForm)
          router.push({
            name:'teacher_index'
          })
        }
    
        return {
          clicktask,
          clickread,
          clickteacherperson,
          set,
          taskForm,
          goback,
          classname,
        };
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
  
  
  