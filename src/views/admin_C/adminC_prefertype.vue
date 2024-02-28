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
              
              <div ref="lineChart" style="width: 600px; height: 400px;"></div>
              <div ref="pieChart" style="width: 600px; height: 400px;"></div>
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
      const chart = computed(() => store.state.data);
      const chartData = chart.value;
  
      const goback = () => {
        router.back();
      };
  
      const lineChart = ref(null);
      const pieChart = ref(null);
  
      onMounted(() => {
        initCharts();
      });
  
      const initCharts = () => {
        const myLineChart = echarts.init(lineChart.value);
        const myPieChart = echarts.init(pieChart.value);
  
        const schools = chartData.map(data => data.school);
  
        const lineSeriesData = chartData[0]?.bookTypes.map(type => ({
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' },
          name: type.type,
          data: chartData.map(data => {
            const bookType = data.bookTypes.find(bt => bt.type === type.type);
            return bookType ? bookType.count : 0;
          }),
        }));
  
        const pieOption = {
          legend: {},
          tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
          series: [
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: { focus: 'self' },
              label: { formatter: '{b}: {@2012} ({d}%)' },
              encode: { itemName: 'product', value: '2012', tooltip: '2012' },
              data: chartData[0]?.bookTypes.map(type => ({
                name: type.type,
                value: type.count,
              })) || [],
            },
          ],
        };
  
        myLineChart.setOption({
          legend: {},
          tooltip: { trigger: 'axis', showContent: false },
          xAxis: { type: 'category', data: schools },
          yAxis: { gridIndex: 0 },
          grid: { top: '55%' },
          series: lineSeriesData,
        });
  
        myPieChart.setOption(pieOption);
  
        myLineChart.on('mousemove', function (params) {
          const schoolIndex = params.dataIndex;
          myPieChart.setOption({
            series: [
              {
                id: 'pie',
                data: chartData[schoolIndex]?.bookTypes.map(type => ({
                  name: type.type,
                  value: type.count,
                })) || [],
              },
            ],
          });
        });
      }
  
      return {
        goback,
        chartData,
        lineChart,
        pieChart,
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
  
  
  