<template>
  <div class="home-wrap">
     <el-row :gutter="20" class="home-header">
        <el-col :xs="8" :sm="10" :md="8" :lg="8" :xl="8">
             <el-card class="cards-style cards-1">
                <div class="cards-left">
                    <img src="../../assets/client.png" alt="" width="120" height="120">
                </div>
                <div class="cards-right">
                    <p class="cards-main">+6个</p>
                    <p class="cards-tit">昨日新增客户数量</p>
                </div>
            </el-card>
            </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-card class="cards-style cards-2">
                <div class="cards-left">
                    <img src="../../assets/order.png" alt="" width="120" height="120">
                </div>
                <div class="cards-right">
                    <p class="cards-main">+8个</p>
                    <p class="cards-tit">昨日订单数量</p>
                </div>
                </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
               <el-card class="cards-style cards-3">
                    <div class="cards-left">
                    <img src="../../assets/money.png" alt="" width="120" height="120">
                    </div>
                    <div class="cards-right">
                        <p class="cards-main">￥15446</p>
                        <p class="cards-tit">昨日订单到账总额</p>
                    </div>
                </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20" class="home-header2">
        <el-col :xs="8" :sm="10" :md="8" :lg="8" :xl="8">
             <el-card class="hh-2">
                <h1>Swift</h1>
                <p class="best-tit">月度最佳员工</p>
                <div>
                    <img src="../../assets/hd.jpg" alt="">
                </div>
                <p class="best-reason">的沙发发送到发送到开了房间的上课了房间大收费电商连咖啡</p>
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
  data () {
    return {
      pmData: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  },
  created () {
    let date = new Date()
    let nowDate = this.formatDate(date)
    // let that = this
      let formData = new FormData()
    //   formData.append('flag', 'conditionFetch')
      formData.append('now_date', nowDate)
      this.$http.post('computed_home.php', formData)
        .then(function (res) {
          console.log(res.data.length)
        }).catch(function (err) {
          console.log(err)
        })
  },
  methods: {
    formatDate (date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
    }
  },
  mounted () {
// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('ech'))
    // 绘制图表
    myChart.setOption({
        title: {
        text: '业绩统计图'
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
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    series: [{
        data: this.pmData,
        type: 'line',
        areaStyle: {}
    }],
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
        text-align: left;
        height: 180px;
        color: #ffffff;
        padding-left: 10%;
        .cards-tit{
            font-size: 1.1em;
            font-weight: 600;
        }
        .cards-main{
          font-size: 1.8em;
          font-weight: bold;
        }
        .cards-left{
            width: 140px;
            padding-top: 12px;
            float: right;
            padding-right: 10%;
        }
        .cards-right{
            width:100%;
            font-size: 1em;
        }
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
          .best-tit{
              padding: 16px;
          }
          .best-reason{
              padding: 20px;
          }
        }
    }
}
</style>
