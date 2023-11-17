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
      <h3>学生端</h3>
        <el-menu-item index="3" >
          <el-icon><document /></el-icon>
          <span @click = clickhome>首页</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span @click = clickperson>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>

      </el-aside >
      <el-container>
        <el-header></el-header>
        <el-main>

          <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">

            <div class="user-info">
              <p class="name" >{{users.username}}</p>
              <br>
              <p class="role">学生</p>
            </div>
          </div>
          <div class="login-info">
            <p>班级信息：<span>{{users.className}}</span></p>
            <p>学号:<span>{{users.userID}}</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px" height="450px">
          <el-table  @row-dblclick="handleRowDblClick"   :data="tasks">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
            
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px" class="right-num">
   
        <el-table :data="records" style="width: 100%" height="fix_content">
              <el-table-column fixed prop="title" label="图书名称" width="150" />
              <el-table-column prop="bookid" label="图书编号" width="140" />
              <el-table-column prop="book_type" label="图书类别" width="140" />
              <el-table-column prop="pressmark" label="书架编号" width="140" />
              <el-table-column prop="borrowedAt" label="借书时间" width="140" />
              <el-table-column prop="willreturn_At" label="计还书时间" width="140" />
              
        </el-table>
      </el-col>
    </el-row>


    <teleport to="body">
        <el-dialog v-if="showModal" :model-value="showModal" title="任务详情"
        font-size="32px">
    <!-- 弹窗内容 -->
    <el-descriptions
    :column="2"
    border
  >
    <el-descriptions-item label="任务名称">{{ currentRow.task_title }}</el-descriptions-item>
    <el-descriptions-item label="阅读书目">{{ currentRow.task_book }}</el-descriptions-item>
    <el-descriptions-item label="布置时间">
      <el-tag >{{currentRow.startedAt }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="截止时间">
      <el-tag >{{currentRow.endedAt }}</el-tag>
    </el-descriptions-item>
    <br>
    <el-descriptions-item label="任务详情"
      >暂无详情
    </el-descriptions-item>
  </el-descriptions>
  <br><br><br>
          <el-button @click="showModal = false,
          currentRow= null">关闭</el-button>
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
    ref
  
  } from "vue";
  import { useRouter } from "vue-router";
  import { computed } from 'vue'
  import { useStore } from 'vuex'


  export default defineComponent({
    setup() {
      const tableLabel = {
        task_title: "任务名称",
        startedAt: "布置时间",
        endedAt: "截止时间",
        A: "完成状态",
      };
      const showModal = ref(false)
      const currentRow = ref(null)
      onMounted(() => {
      
      });
      
      const store = useStore();
       const users = ref()
       const tasks = computed(() => store.state.tasks)
       const records = computed(() => store.state.records)
       const router = useRouter();
      const clickhome =()=>{
        router.push({
          name:"home"
        })
      };

      const clickperson =()=>{
        router.push({
          name:"student_person"
        })
      }

      onMounted(() =>{
        users.value = store.state.users
      })
        console.log(users.value)
      return {
        users,
        tasks,
        records,
        tableLabel,
        clickhome,
        clickperson,
        currentRow,
        showModal
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

// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }

html,body {
      margin: 0;
      height: 100%;
}

</style>


