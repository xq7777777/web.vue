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
            <span @click="bookshelf">图书</span>
          </template>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <span>学校</span>
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

  const xAxisData = ['school', ...chartData.map(data => data.school)];

  const lineSeriesData = chartData[0]?.bookTypes.map(type => ({
    type: 'line',
    smooth: true,
    seriesLayoutBy: 'row',
    emphasis: { focus: 'series' },
    name: type.type,
    encode: { x: 'school', y: type.type },
  }));

  const lineChartData = [xAxisData, ...chartData.map(data => [data.school, ...data.bookTypes.map(type => type.count)])];

  const pieSeriesData = chartData[0]?.bookTypes.map(type => ({
    type: 'pie',
    id: type.type,
    name: type.type,
    radius: '30%',
    center: ['50%', '25%'],
    emphasis: { focus: 'self' },
    label: { formatter: `{b}: {${type.type}}` },
    encode: { itemName: type.type, value: type.type },
  }));

  const pieChartData = [
    [chartData.map(data => data.school), ...chartData[0]?.bookTypes.map(type => type.type)],
    ...chartData.map(data => [data.school, ...data.bookTypes.map(type => type.count)]),
  ];

  const option = {
    legend: {},
    tooltip: { trigger: 'axis', showContent: false },
    dataset: { source: lineChartData },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: lineSeriesData,
  };

  myLineChart.setOption(option);

  myLineChart.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myLineChart.setOption({
        series: {
          id: 'pie',
          label: { formatter: `{b}: {${dimension}} ({d}%)` },
          encode: { value: dimension, tooltip: dimension },
        },
      });
    }
  });

  const pieOption = {
    legend: {},
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
    dataset: { source: pieChartData },
    series: pieSeriesData,
  };

  myPieChart.setOption(pieOption);
};

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
  
  
  