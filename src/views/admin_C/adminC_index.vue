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
      <h3>教育局端</h3>
      <el-sub-menu  index="0">
        <template #title>
          <span @click="bookshelf">图书类型</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span @click="prefer">阅读偏好</span>
        </template>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span @click="readtime">阅读时长统计</span>
        </template>
      </el-sub-menu>
        <el-menu-item index="8">
          <el-icon><setting /></el-icon>
          <span @click="adminperson" >个人中心</span>
        </el-menu-item>
        <el-menu-item index="9">
          <el-icon><setting /></el-icon>
          <span @click="logout" >退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-col>
      </el-aside >
      <el-container>
        <el-header>
        </el-header>
        <el-main>
          <el-row class="home" :gutter="20">
            <el-col :span="9" style="margin-top: 20px;">
              <el-card shadow="hover">
                <div class="user">
                  <div class="user-info">
                    <p class="name">{{ username }}</p>
                    <br />
                  </div>
                </div>
                <div class="login-info">
                  <p>账号：<span>{{ userID }}</span></p>
                </div>
              </el-card>
              <el-card shadow="hover" style="margin-top: 20px;">
                <div>
                  <div ref="pieChart1" style="width: 100%; height: 600px;"></div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="15" style="width: 100%;">
      <!-- 联合图 -->
      <el-card shadow="hover" style="height: 500px;margin-top: 20px">
        <div style="height: 100%;">
          <div ref="combinedChart" style="width: 100%; height: 500px;"></div>
        </div>
      </el-card>

      <!-- 折线图 -->
      <el-card shadow="hover" style="margin-top: 20px; height: 300px;">
        <div style="height: 100%;">
          <div ref="LineChart" style="width: 100%; height: 300px;"></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</el-main>
      </el-container>
    </el-container>
  </div>
  </template>
 <script>
 import { defineComponent, onMounted, ref, computed } from "vue";
 import { useStore } from "vuex";
 import { useRouter} from "vue-router";
 import * as echarts from "echarts";
 import axios from 'axios'
 export default defineComponent({
   setup() {
     const store = useStore();
     const router = useRouter()
     const username = computed(() => store.state.username);
     const userID = computed(() => store.state.userID);
     const chartData = computed(() => store.state.booktype);
     const readTime = computed(() => store.state.readtime);
     const preferType = computed(() => store.state.prefertype);
     const lineChart = ref(null);
     const pieChart = ref(null);
     const LineChart = ref(null);
     const pieChart1 = ref(null);
     const combinedChart = ref(null);
     const initPieChart1 = () => {
  
    const chart = echarts.init(pieChart1.value);
    const option = {
  title: {
    text: "不同类型图书的阅读量",
    left: "center",
    top: 20, // 调整标题距离顶部的距离
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "65%",
      center: ["45%", "50%"], // 调整图表的中心位置
      data: chartData.value.map((item) => ({
        value: item.count,
        name: item.type || "未知类型",
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
    chart.setOption(option);
};
     const initCombinedChart = () => {
       const chart = echarts.init(combinedChart.value);
 
       const bookTypes = preferType.value.reduce((acc, curr) => {
         curr.bookTypes.forEach((type) => {
           if (!acc.includes(type.type)) {
             acc.push(type.type);
           }
         });
         return acc;
       }, []);
       const dataset = {
         source: [
           ["product", ...preferType.value.map((_, index) => `学校${index + 1}`)],
           ...bookTypes.map((type) => [
             type,
             ...preferType.value.map((data) => {
               const bookType = data.bookTypes.find((bt) => bt.type === type);
               return bookType ? bookType.count : 0;
             }),
           ]),
         ],
       };
       const option = {
  title: {
    text: "不同学校对不同类型图书的喜好",
    left: "center",
    top: 0, // 调整 top 属性
  },
  legend: {
    top: 35, // 调整 top 属性
    data: bookTypes,
  },
  tooltip: {
    trigger: "axis",
    showContent: false,
  },
  dataset: dataset,
  xAxis: { type: "category" },
  yAxis: { gridIndex: 0 },
  grid: { top: "55%" },
  series: [
    ...bookTypes.map((type) => ({
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
      name: type, // 添加图例名称
    })),
    {
      type: "pie",
      id: "pie",
      radius: "30%",
      center: ["50%", "33%"],
      emphasis: {
        focus: "self",
      },
      label: {
        formatter: "{b}: {@学校1} ({d}%)",
      },
      encode: {
        itemName: "product",
        value: "学校1",
        tooltip: "学校1",
      },
    },
  ],
};
       chart.on("updateAxisPointer", function (event) {
         const xAxisInfo = event.axesInfo[0];
         if (xAxisInfo) {
           const dimension = xAxisInfo.value + 1;
           chart.setOption({
             series: {
               id: "pie",
               label: {
                 formatter: "{b}: {@[" + dimension + "]} ({d}%)",
               },
               encode: {
                 value: dimension,
                 tooltip: dimension,
               },
             },
           });
         }
       });
       chart.setOption(option);
     };
     // 初始化折线图
     const initLineChart = () => {
  if (LineChart.value) {
    const chart = echarts.init(LineChart.value);
    const option = {
      title: {
        text: "不同学校的平均阅读时长",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        formatter: "{a} <br/>{b} : {c} 小时",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: readTime.value.map((item) => item.school || "未知类型"),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "",
          data: readTime.value.map((item) => item.avgReadTime),
          type: "line",
          areaStyle: {},
        },
      ],
    };

    chart.setOption(option);
  }
};
     onMounted(() => {
       initPieChart1();
       initCombinedChart();
       initLineChart();
     });
     const bookshelf =async()=>{
        try{
            
            const response =await axios.get(`http://121.36.23.117:3000/api/book_type_stats`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_booktypepn'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }

      const prefer =async()=>{
        try{
            
            const response =await axios.get(`http://121.36.23.117:3000/api/school_book_type_stats`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_prefertype'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }
      
      const readtime =async()=>{
        try{
            
            const response =await axios.get(`http://121.36.23.117:3000/api/school_average_read_time`)
            if(response.status){
              console.log(response.data)
              const data = response.data
              store.commit('setdata', data)
            } 
            
            router.push({
            name:'adminC_readtime'
          })
          }catch (error) {  
        // 请求错误处理
        console.log(error.message)
      }
       
      }

     return {
      bookshelf,
      readtime,
      prefer,
       username,
       userID,
       chartData,
       readTime,
       preferType,
       lineChart,
       pieChart,
       LineChart,
       pieChart1,
       combinedChart,
     };
     
   },
   methods: {
    logout() {
      // 清除所有 Vuex store 缓存
      this.$store.commit('clearAllState')
      // 其他退出登录的逻辑，比如跳转到登录页面等
      // 例如：
      this.$router.push({ name: 'ogin' })
    }
  }
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
</style>


