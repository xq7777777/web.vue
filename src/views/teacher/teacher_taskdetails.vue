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
            <span>作业情况</span>
          </template>
          <el-menu-item v-for="cls in classname" @click = clicktask>{{ cls }}</el-menu-item>
            
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span >阅读情况</span>
          </template>
          <el-menu-item v-for="cls in classname" @click = clickread>{{ cls }}</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="6">
            <el-icon><setting /></el-icon>
            <span @click = clickteacherperson>图书申请</span>
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
            <el-descriptions
                title="作业详情"
                direction="vertical"
                :column="4"
              
                border
            >
            <el-descriptions-item label="作业标题">{{ task_title }}</el-descriptions-item>
            <el-descriptions-item label="阅读书目">{{ task_book }}</el-descriptions-item>
            <el-descriptions-item label="布置时间" :span="2">{{ startedAt }}</el-descriptions-item>
            <el-descriptions-item label="截止时间">
            <el-tag size="small">{{ endedAt }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="布置班级">{{ className }}</el-descriptions-item>
            <el-descriptions-item label="完成情况"
            >{{ address }}
            </el-descriptions-item>
        </el-descriptions>

          </el-main>
        </el-container>
      </el-container>
    </div>
    </template>
    <script>
    import {
      defineComponent,
      onMounted,
      ref
    
    } from "vue";
    import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue';
    import { useRoute } from "vue-router"; 
    import { useRouter } from "vue-router"
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
  
  
    export default defineComponent({
      setup() {
        const route = useRoute()
        const router = useRouter()
		    const {className,endedAt,startedAt,task_book,task_title,address} = JSON.parse(route.query.task)
        const cls = ref('')
        const store = useStore();
        const users = computed(() => store.state.users)
        const classname = ref(users.value.className)
        const showModal = ref(false)
        const clicktask =()=>{
          router.push({
            name:""
          })
        };
  
        const clickread =async(className)=>{
          try{
            cls.value = className
            const school = users.value.school
            console.log(className)
            console.log(school)
           
       
            const response =await axios.get(`http://139.9.118.223:3000/api/class?className=${className}&school=${school}`)
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

        const goback =()=>{
          router.back() 
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
          goback,
          className,
          endedAt,
          startedAt,
          task_book,
          task_title,
          address,
          classname,
          cls,
          clickbookborrow,
          person,
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
  
  
  