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
      </el-menu>
    </el-col>

      </el-aside >
        <el-container>
          <el-header>
            <el-button type="info" @click="goback">返回</el-button>
          </el-header>
          <el-main>
            <div>
              <el-card shadow="hover" style="height: 500px;margin-top: 20px">
                <div style="height: 100%;">
                  <div ref="combinedChart" style="width: 100%; height: 500px;"></div>
                </div>
              </el-card>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from "vue";
  import * as echarts from "echarts";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { computed } from '@vue/runtime-core';
  
  export default defineComponent({
    setup() {
      const store = useStore();
      const router = useRouter();
      const preferType = computed(() => store.state.prefertype);
      const combinedChart = ref(null);
      const lineChart = ref(null);
     const pieChart = ref(null);
      const goback = () => {
        router.back();
      };
  
      onMounted(() => {
       initCombinedChart();
     });
  
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
  
      return {
        goback,
        lineChart,
        pieChart,
        combinedChart,
        preferType,
      };
    },
  });
  </script>
  
  
    <style lang="less" scoped>
    .home {
      
          .txt {
            font-size: 14px;
            text-align: center;
            color: #999;
          }
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
  
  
  