<template>
  <div class="home-wrap">
     <el-row :gutter="20" class="home-header">
        <el-col :xs="8" :sm="10" :md="8" :lg="8" :xl="8">
             <el-card class="cards-style cards-1">
                <div class="cards-left">
                    <img src="../../assets/client.png" alt="" width="120" height="120">
                </div>
                <div class="cards-right">
                    <p class="cards-main">{{ myClient }}</p>
                    <p class="cards-tit">我的客户数量</p>
                </div>
            </el-card>
            </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-card class="cards-style cards-2">
                <div class="cards-left">
                    <img src="../../assets/order.png" alt="" width="120" height="120">
                </div>
                <div class="cards-right">
                    <p class="cards-main">{{ myOrder }}</p>
                    <p class="cards-tit">我的订单数量</p>
                </div>
                </el-card>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
               <el-card class="cards-style cards-3">
                    <div class="cards-left">
                    <img src="../../assets/money.png" alt="" width="120" height="120">
                    </div>
                    <div class="cards-right">
                        <p class="cards-main">￥{{ myPm }}</p>
                        <p class="cards-tit">我的业绩总额</p>
                    </div>
                </el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20" class="home-header2">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
             <el-card class="hh-2">
                <h1>{{ bt_apart + bt_name }}</h1>
                <p class="best-tit">月度最佳员工</p>
                <div style="height:125px;">
                  <img :src="bt_avatar" width="120" height="120" alt="">
                </div>
                <p class="best-reason"><span style="font-weight:550;">上榜理由：</span>{{ bt_reason }}</p>
                <el-button v-if="$store.getters.userAuthority === '80001'" type="info" plain size="small" @click="setBest">设置</el-button>
            </el-card>
            </el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
             <div id="ech"></div>
        </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogTableVisible">

      <div class="best-set-form">
           <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="员工名称">
            <el-col :span="6">
                    <el-select v-model="form.setName" filterable placeholder="请选择(可搜索)">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </el-col>
            </el-form-item>
            <el-form-item label="上榜理由">
            <el-col :span="20">
                    <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="请输入内容"
                        v-model="form.reason">
                    </el-input>
            </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="24">
                    <el-button type="primary" @click="submitSet">提交更改</el-button>
                </el-col>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let echarts = require('echarts')
export default {
  data () {
    return {
      dialogTableVisible: false,
      form: {
        setName: '',
        reason: ''
      },
      bt_name: '共创',
      bt_apart: '灵动',
      bt_reason: 'Because emmmmmmmm...',
      bt_avatar: 'https://img.alicdn.com/imgextra/i4/662134481/O1CN011iyLEmtX4Jj7jhy-662134481.png',
      options: [],
      setName: '',
      myClient: 0,
      myOrder: 0,
      myPm: 0
    }
  },
  created () {
    // my  client
        let that = this
    let usern = this.$store.state.userName

    let formData = new FormData()
    formData.append('flag', 'myClient')
    formData.append('user_name', usern)
    this.$http.post('computed_home.php', formData)
        .then(function (res) {
        // console.log('homeee1', res.data.length)
            that.myClient = res.data.length
        }).catch(function (err) {
        console.log(err)
    })
    // my order
      let formData2 = new FormData()
      formData2.append('flag', 'myOrder')
      formData2.append('user_name', usern)
      this.$http.post('computed_home.php', formData2)
        .then(function (res) {
        // console.log('homeee2', res.data)
            that.myOrder = res.data.length
        }).catch(function (err) {
          console.log(err)
        })
    // my pm total
     let formData3 = new FormData()
      formData3.append('flag', 'myPm')
      formData3.append('user_name', usern)
      this.$http.post('computed_home.php', formData3)
        .then(function (res) {
          let data = res.data
        //   console.log('homeee3', res.data)
          let pm = 0
          data.forEach(item => {
            pm += parseInt(item.pay_price)
          })

          that.myPm = pm
        //   if (res.data.length !== 0) {
        //     that.myOrder = res.data.length
        //   }
        }).catch(function (err) {
          console.log(err)
        })
      //  all  users' name
      let formData5 = new FormData()
      formData5.append('code', '400')
      this.$http.post('user_info.php', formData5)
        .then(function (res) {
            let data = res.data
            // console.log('DDDDAta:', data)
            for (let i = 0; i < data.length; i++) {
            that.options.push({
                value: data[i].id + ';' + data[i].st_departmentVal + ';' + data[i].st_name,
                label: data[i].st_departmentVal + data[i].st_name
            })
            }
        //   console.log('StaffName:', that.staffNames)
        }).catch(function (err) {
            console.log(err)
        })
      let formData6 = new FormData()
      formData6.append('flag', 'fetchUserInfo')
      this.$http.post('computed_home.php', formData6)
        .then(function (res) {
          let data = res.data
          that.bt_name = data[0].st_name
          that.bt_apart = data[0].st_departmentVal
          that.bt_reason = data[0].best_reason
          that.bt_avatar = data[0].st_avatar
        //   console.log('homeee666', res.data)
        }).catch(function (err) {
          console.log(err)
        })
  },
  methods: {
    setBest () {
      this.dialogTableVisible = true
    },
    submitSet () {
      let that = this
      let formData7 = new FormData()
      formData7.append('flag', 'setUserInfo')
      formData7.append('set_name', this.form.setName.split(';')[2])
      formData7.append('set_info', this.form.reason)
      this.$http.post('computed_home.php', formData7)
        .then(function (res) {
          let data = res.data
        // console.log('homeee7777', res.data)
         if (data === 'setSuc') {
             that.$message({
                type: 'success',
                message: '设置成功!'
            })
            that.dialogTableVisible = false
            that.$store.state.defaultComp = 'myOrder'
            setTimeout(() => {
              that.$store.state.defaultComp = 'homePage'
            }, 10)
         } else {
             that.$message.error('请选择员工！')
         }
        }).catch(function (err) {
          console.log(err)
        })
    },
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
    var myChart = echarts.init(document.getElementById('ech'), 'light')
        //  my pm detail
    let that = this
     let formData4 = new FormData()
      formData4.append('flag', 'myPmDetail')
      formData4.append('user_name', this.$store.state.userName)
      this.$http.post('computed_home.php', formData4)
        .then(function (res) {
          let data = res.data
          let arr = [0, 0, 0, 0, 0, 0, 0]
          let username = that.$store.state.userName
          data.forEach(item => {
            if (item.reach_name.indexOf(username) !== -1) {
                let week = new Date(item.reg_date).getDay()
                arr[week] += parseInt(item.pay_price)
            }
          })
        // 绘制图表
            myChart.setOption({
                title: {
                text: '个人业绩(上周)',
                textStyle: {
                color: '#303133'
                }
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
                data: arr,
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
                    data : ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ]
            })
        }).catch(function (err) {
          console.log(err)
        })
  }
}
</script>
<style lang="less">

#ech{
    width: 100%;
    height: 440px;
    overflow-x: hidden;
    padding-top: 18px;
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
              width: 120px;
              height: 120px;
              border-radius: 6px;
          }
          .best-tit{
              padding: 16px;
              font-weight: 550;
          }
          .best-reason{
              font-size: 0.95em;
              padding: 20px;
              margin-bottom: 0;
              margin-top: 0;
          }
          .el-button--info.is-plain{
              float: right;
          }
        }
    }
    .best-set-form{
        font-size: 1.1em;
        box-sizing: border-box;
        padding: 20px 60px 20px;
        .el-form-item__label{
         color: #409EFF;
         font-weight: 550;
        }
        .el-col-24{
          padding-right: 100px;
          .el-button--primary{
            float: right;
           }
        }
    }
}
</style>
