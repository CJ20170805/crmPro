<template>
  <div class="home-wrap">
     <el-row :gutter="20" class="home-header">
        <el-col :xs="8" :sm="10" :md="8" :lg="8" :xl="8">
             <el-card class="cards-style cards-1">
                    <div>afdsfadsfasd</div>
            </el-card>
            </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-card class="cards-style cards-2">
                    <div>afdsfadsfasd</div>
                </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
               <el-card class="cards-style cards-3">
                    <div>afdsfadsfasd</div>
                </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20" class="home-header2">
        <el-col :xs="8" :sm="10" :md="8" :lg="8" :xl="8">
             <el-card class="hh-2">
                <h1>Swift</h1>
                <p>月度最佳员工</p>
                <div>
                    <img src="../../assets/hd.jpg" alt="">
                </div>
                <p>的沙发发送到发送到开了房间的上课了房间大收费电商连咖啡</p>
            </el-card>
            </el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
             <div id="ech"></div>
        </el-col>
    </el-row>

    <!-- <el-row :gutter="20">
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
    </el-row> -->
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
    height: 440px;
    padding: 20px;
    margin: 0 auto;
}
.home-wrap{
    .cards-style{
        height: 180px;
        color: #ffffff;
        font-size: 1.4em;
    }
    .home-header{
        padding: 10px 0;
        .cards-1{
            background-color: #32c5d2;
        }
        .cards-3{
            background-color: #8E44AD;
        }
        .cards-2{
            background-color: #409EFF;
        }
    }
    .home-header2{
        padding: 20px 0;
        .hh-2{
          height: 440px;
          color: #ffffff;
          font-size: 1.1em;
          background-color: rgb(241, 128, 144);
          img{
              width: 100px;
              height: 100px;
              border-radius: 6px;
          }
        }
    }
}
</style>
