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

         
        </el-main>
      </el-container>
    </el-container>
  </div>
  

  </template>
  <script>



  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    ref
  
  } from "vue";
  import { useRouter } from "vue-router";


  export default defineComponent({
    setup() {
      const clickhome =()=>{
        router.push({
          name:"home"
        })
      };
      const router = useRouter();
      const clickperson =()=>{
        router.push({
          name:"student_person"
        })
      }

      return {
        clickhome,
        clickperson,
        // clickMenu,
   
      };
    },

    


 
  })
      
  </script>
  
  <style lang="less" scoped>
  
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
html,body {
      margin: 0;
      height: 100%;
}

</style>


