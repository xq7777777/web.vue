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
          <el-menu-item index="9">
          <el-icon><setting /></el-icon>
          <span @click="logout" >退出登录</span>
        </el-menu-item>
        </el-menu>
      </el-col>
  
        </el-aside >
        <el-container>
          <el-header></el-header>
          <el-main>

            <div class="user-profile">

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>个人信息</span>
  </div>

  <div class="user-info">
    <div class="info" font-size="32px">
        <span>姓名:{{users.username}}</span>
        <br><br><br>
        <span>学号:{{users.userID}}</span>
        <br><br><br>
        <span>班级:{{users.className}}</span>
        <br><br><br>
        <span>手机号:{{}}</span>
        <br><br><br>
        <el-button @click=" showModal = true ">修改密码</el-button>
    </div>
  </div>

</el-card>
<teleport to="body">
        <el-dialog v-if="showModal" v-model="showModal" title="修改密码"
        font-size="32px">
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
      ref
    
    } from "vue";
    import { useRouter } from "vue-router";
    import { computed } from 'vue'
    import { useStore } from 'vuex'
  
  
    export default defineComponent({
      setup() {
        const store = useStore();
         const users = computed(() => store.state.users)
         const router = useRouter()
         const passwordForm = ref({
      oldPass: '',
      newPass: '',
      confirmPass: '' 
    })
        const showModal = ref(false)
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
            console.log("暂时不能修改密码")
          }
        
        }
        return {
          users,
          clickhome,
          clickperson,
          passwordForm,
          showModal,
          change
        };
      },
      methods: {
    logout() {
      // 清除所有 Vuex store 缓存
      this.$store.commit('clearAllState')
      // 其他退出登录的逻辑，比如跳转到登录页面等
      // 例如：
      this.$router.push({ name: 'login' })
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
  
  
  