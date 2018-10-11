<template>
  <div class="home-wrap">
    <el-row :gutter="20">
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
             <el-card class="cards-style">
                    <div>afdsfadsfasd</div>
            </el-card>
            </el-col>
        <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
              <el-card class="cards-style">
                    <div>afdsfadsfasd</div>
                </el-card>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=55" style="border:solid 1px #7ec8ea" width="255" height="294" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
        </el-col>
    </el-row>
    <div id="ech"></div>
  </div>
</template>
<script>
let echarts = require('echarts')
export default {
  mounted () {
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ech'))
    // 绘制图表
    myChart.setOption({
        title: {
        text: '堆叠XXX图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'eeeee']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'aaaaa',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'bbbbb',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'ccccc',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'ddddd',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
          {
            name:'eeeee',
            type:'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    })
  }
}
</script>
<style lang="less">
#ech{
    width: 100%;
    height: 600px;
    padding: 20px;
    margin: 0 auto;
}
.home-wrap{
    .cards-style{
        height: 290px;
    }
}
</style>
