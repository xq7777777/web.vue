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
            
          </el-header>
          
          <el-main>
    <div class="user-header">
      <el-button type="primary" @click="handleAdd">+图书借阅</el-button>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="请输入">
          <el-input v-model="formInline.keyword" placeholder="请输入图书名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSerch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="500px">
        <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : 125"
        />
      </el-table>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changePage"
        class="pager mt-4"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '新增用户' : '编辑用户'"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="formUser" ref="userForm">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="图书名称"
              prop="title"
              :rules="[{ required: true, message: '书名是必填项' }]"
            >
              <el-input v-model="formUser.title" placeholder="请输入图书名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="图书编号"
              prop="bookID"
              :rules="[
                { required: true, message: '图书编号是必填项' },
                { type: 'number', message: '图书编号必须是数字' },
              ]"
            >
              <el-input v-model.number="formUser.bookID" placeholder="请输入图书编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="性别"
              prop="sex"
              :rules="[{ required: true, message: '性别是必选项' }]"
            >
            <el-input v-model.number="formUser.sexLabel" placeholder="请输入图书编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="出生日期"
              prop="birth"
              :rules="[{ required: true, message: '出生日期是必选项' }]"
            >
              <el-date-picker
                v-model="formUser.birth"
                type="date"
                label="出生日期"
                placeholder="请输入"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="地址"
            prop="addr"
            :rules="[{ required: true, message: '地址是必填项' }]"
          >
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-row>
        <el-row style="justify-content: flex-end">
          <el-form-item>
            <el-button type="primary" @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template> -->
    </el-dialog>
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
    ref,
    reactive,
  } from "vue";
  import { useRouter } from "vue-router";
    import { useRoute } from "vue-router"
    import { computed } from 'vue'
    import { useStore } from 'vuex'
  export default defineComponent({
    setup() {
      const store = useStore();
        const route = useRoute()
        const users = computed(() => store.state.users)
        const classname = ref(users.value.className)
        const router = useRouter()
      const list = ref([]);
      const tableLabel = reactive([
        {
          prop: "title",
          label: "图书名称",
        },
        {
          prop: "bookid",
          label: "图书编号",
        },
        {
          prop: "userID",
          label: "借阅卡号",
        },
        {
          prop: "borrowedAt",
          label: "借阅时间",
          width: 200,
        },
        {
          prop: "willreturn_At",
          label: "预计归还时间",
          width: 320,
        },
      ]);
      const tableData =[{
        title: '百年孤独', 
        bookid: '001',
        userID: '00000001',
        borrowedAt: '2022-10-10',
        willreturn_At: '2022-10-25'
      }]
      const clicktask =()=>{
          router.push({
            name:""
          })
        };
       
        const clickread =()=>{
          router.push({
            name:"student_person"
          })
        }
        const clickteacherperson=()=>{

        }
      onMounted(() => {
        getUserData(config);
      });
      const config = reactive({
        total: 0,
        page: 1,
        name: "",
      });
      const getUserData = async (config) => {
        let res = await proxy.$api.getUserData(config);
        config.total = res.count;
        list.value = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
      };
      const changePage = (page) => {
        // console.log(page);
        config.page = page;
        getUserData(config);
      };
      const formInline = reactive({
        keyword: "",
      });
      const handleSerch = () => {
        config.title = formInline.keyword;
        getUserData(config);
      };
      // 控制模态框的显示隐藏
      const dialogVisible = ref(false);
      const handleClose = (done) => {
        ElMessageBox.confirm("确定关闭吗?")
          .then(() => {
            proxy.$refs.userForm.resetFields();
            done();
          })
          .catch(() => {
            // catch error
          });
      };
      // 添加用户的form数据
      const formUser = reactive({
        title: "", // 添加用户的 用户名
        bookid: "",
        userID: "",
        borrowedAt: "",
        willreturn_At: "",
      });
      const timeFormat = (time) => {
        var time = new Date(time);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        function add(m) {
          return m < 10 ? "0" + m : m;
        }
        return year + "-" + add(month) + "-" + add(date);
      };
      // 添加用户
      const onSubmit = () => {
        proxy.$refs.userForm.validate(async (valid) => {
          if (valid) {
            if (action.value == "add") {
              // formUser.birth = timeFormat(formUser.birth);
              let res = await proxy.$api.addUser(formUser);
              if (res) {
                // console.log(proxy.$refs);
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getUserData(config);
              }
            } else {
              // 编辑的接口
              // formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
              let res = await proxy.$api.editUser(formUser);
              if (res) {
                // console.log(proxy.$refs);
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
                getUserData(config);
              }
            }
          } else {
            ElMessage({
              showClose: true,
              message: "请输入正确的内容",
              type: "error",
            });
          }
        });
      };
      // 取消
      const handleCancel = () => {
        dialogVisible.value = false;
        proxy.$refs.userForm.resetFields();
      };
      // 区分编辑和新增
      const action = ref("add");
      // 编辑用户

      // 新增借阅
      const handleAdd = () => {
        action.value = "add";
        dialogVisible.value = true;
      };
      // 归还图书

      return {
        list,
        tableLabel,
        tableData,
        config,
        changePage,
        formInline,
        handleSerch,
        dialogVisible,
        handleClose,
        formUser,
        onSubmit,
        handleCancel,
        action,
        handleAdd,
        clicktask,
        clickread,
        clickteacherperson,
        classname,
      };
    },
  });
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

.table {
    position: relative;
    height: 520px;
    .pager {
      position: absolute;
      right: 0;
      bottom: -20px;
    }
  }
  .user-header {
    display: flex;
    justify-content: space-between;
  }
  </style>
  