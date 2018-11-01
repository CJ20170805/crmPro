<template>
 <!-- pm数据表需要 增几列统计数据的   前端把订购类型 转换为表名  后台直接根据 表名 添加至相应数据列中
    表名是前台传过去的  值是 到账金额！！！
 -->
    <div class="pm-collect">
        <p class="title">业绩统计</p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="数据汇总" name="first">
                <el-row :gutter="20">
                    <el-col :span="8">
                         <el-card shadow="always">
                            <p class="collect-price">￥{{tSeller}}</p>
                            <p>销售今日业绩</p>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                         <el-card shadow="always">
                            <p class="collect-price">￥{{tSkill}}</p>
                            <p>技术今日业绩</p>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                         <el-card shadow="always">
                            <p class="collect-price">￥{{tAll}}</p>
                            <p>今日总业绩</p>
                        </el-card>
                    </el-col>
                </el-row>
                <div id="ech2"></div>
            </el-tab-pane>
            <el-tab-pane label="统计详情" name="second">
                <div class="query-data">
                    <div class="query-main">
                        <el-date-picker
                                v-model="queryDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2">
                                </el-date-picker>
                        <el-button type="primary" icon="el-icon-search" @click="queryData">查询数据</el-button>
                    </div>
                </div>
                 <el-table
                    :data="tableData6"
                    border
                    height="566"
                    :summary-method="getSummaries"
                    show-summary
                    style="width: 100%; margin-top: 20px">
                    <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="reach_apart"
                    label="分公司">
                    </el-table-column>
                    <el-table-column
                    prop="zuanzhan"
                    label="钻展类">
                    </el-table-column>
                    <el-table-column
                    prop="zhitongche"
                    label="直通车类">
                    </el-table-column>
                    <el-table-column
                    prop="tuoguan"
                    label="托管类">
                    </el-table-column>
                    <el-table-column
                    prop="zhuangxiu"
                    label="装修">
                    </el-table-column>
                    <el-table-column
                    prop="yongjin"
                    label="佣金">
                    </el-table-column>
                    <el-table-column
                    prop="qita"
                    label="其他">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="amount3"
                    label="销售">
                    </el-table-column>
                    <el-table-column
                    prop="amount3"
                    label="技术">
                    </el-table-column> -->
                </el-table>
                <div class="totalAll" style="display:none">
                    <div class="total-main">
                        <span>总计：{{ totalNums2 }}</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
let echarts = require('echarts')
let moment = require('moment')
  export default {
    data () {
      return {
        activeName: 'first',
        queryDate: '',
        tAll: '',
        tSeller: '',
        tSkill: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        totalNums: [],
        totalNums2: 0,
        tableData6: []
      }
    },
    created () {
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetch')
      this.$http.post('pm_mng.php', formData)
      .then(function (res) {
        that.tableData6 = res.data
        // console.log(res)
        // console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
      // total price
      let today = moment().format('YYYY-MM-DD')
      let formData2 = new FormData()
      formData2.append('flag', 'conditionFetchToday')
      formData2.append('begin', today)
      this.$http.post('pm_mng.php', formData2)
      .then(function (res) {
        // that.tableData6 = res.data
        // console.log('2222222', res)
        let tAll = 0
        let tSeller = 0
        let tSkill = 0
        res.data.forEach(v => {
          tAll += parseInt(v.pay_price)
          if (v.reach_apart.indexOf('销') !== -1) {
              tSeller += parseInt(v.pay_price)
          } else {
              tSkill += parseInt(v.pay_price)
          }
        // console.log(v.reach_apart.indexOf('销'))
        })
        that.tAll = tAll
        that.tSeller = tSeller
        that.tSkill = tSkill
      }).catch(function (err) {
        console.log(err)
      })
    },
    mounted () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('ech2'), 'light')
      // collect imgTable
      let formData3 = new FormData()
      formData3.append('flag', 'conditionFetchLastWeek')
      this.$http.post('pm_mng.php', formData3)
      .then(function (res) {
        // that.tableData6 = res.data
        // console.log(res)
        let s1 = [0, 0, 0, 0, 0, 0, 0]
        let s2 = [0, 0, 0, 0, 0, 0, 0]
        res.data.forEach(v => {
          let week = new Date(v.reg_date).getDay()
          console.log(week)
          if (v.reach_apart.indexOf('石一') !== -1) {
            s1[week] += parseInt(v.pay_price)
          } else {
            s2[week] += parseInt(v.pay_price)
          }
        })
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
            legend: {
                data:['石一分公司', '石二分公司']
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
                    data : ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'石一分公司',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: s1
                },
                {
                    name:'石二分公司',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: s2
                }
            ]
            })
      }).catch(function (err) {
        console.log(err)
      })
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab.index)
        if (tab.index === '1') {
            // console.log('@@@@@@@@@@@@@@@@@@')
         let s = 0
           // let a = [1, 3, 5]
         let arr = this.totalNums
         let arr2 = arr.filter(function (item) {
             return typeof (item) === 'number'
           })
        //    arr.forEach(element => {
        //       alert(typeof(element))
        //    });
        //  console.log('EEEEE', arr2)

        for (let i = 0; i < arr2.length; i++) {
            s += arr2[i]
        }
        this.totalNums2 = s
        }
      },
     open1 () {
        this.$alert('请选择查询日期', '查询错误', {
            confirmButtonText: '确定'
        })
        },
      queryData () {
        if (this.queryDate !== '') {
        let begin = this.queryDate[0]
        let end = this.queryDate[1]
        //   console.log(begin,'TTT',end)
        let that = this
        let formData = new FormData()
        formData.append('flag', 'conditionFetch')
        formData.append('begin', begin)
        formData.append('end', end)
        this.$http.post('pm_mng.php', formData)
            .then(function (res) {
            // console.log(res)
             that.tableData6 = res.data
            }).catch(function (err) {
            console.log(err)
            })
        } else {
            this.open1()
        }
      },
      getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '小计'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            // sums[index] += ' 元'
          } else {
            sums[index] = 'E'
          }
        })
        this.totalNums = sums
        return sums
      }
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.el-table th>.cell{
    text-align: center;
}
.pm-collect{
    .title{
       font-size: 1.2em;
       text-align: left;
       color:@blue;
       padding: 2px 0;
       font-weight: bold;
       margin: 14px 0;
    }
   .el-card__body{
       background-color: @blue;
       color: #ffffff;
       font-size: 1em;
       height: 100px;
   }
   .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
       background-color: #66b1ff;
       color: #ffffff;
       font-weight: 600;
       font-size: 1.1em;
   }
   .collect-price{
       font-size: 2em;
       font-weight: 400;
       margin-top: 10px;
       letter-spacing: 1px;
   }
   #ech2{
       margin-top: 20px;
       width: 100%;
       height: 500px;
   }
    .query-data{
    //    background-color: #409EFF;
       height: 40px;
       line-height: 40px;
       .query-main{
         height: 50px;
         width: 610px;
         float: right;
       }
       .el-button--primary{
         margin-left: 20px;
       }
   }
   .totalAll{
       height: 28px;
       width: 100%;
       color: #ffffff;
       line-height: 28px;
       font-weight: 600;
       .total-main{
        background-color: #66b1ff;
        //  margin-right: 18px;
       }
   }
}
</style>
