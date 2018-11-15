<template>
  <div class="my-pm">
      <el-table
      :data="myPmData"
      style="width: 100%">
       <el-table-column
        label="ID"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="签单人员"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.reach_name }}</span>
        </template>
      </el-table-column>
     <el-table-column
        label="所在部门"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.reach_apart }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订购套餐"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.buy_serv }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="到账金额"
        width="190"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.pay_price }}</span>
        </template>
      </el-table-column>
    <el-table-column
        label="录入日期"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetail(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="pmInfoVisible">
        <div class="pmInfoTable">
        <el-row>
          <el-col :span="24">
            <div class="table-title">基本信息</div>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单人员：</span>
                <span class="table-item-con">{{ reachMan }}</span>
            </div>
            </el-col>
            <el-col :span="12">
                <div class="table-item">
                <span class="table-item-tit">所属部门：</span>
                <span class="table-item-con">{{ reachApart }}</span>
            </div>
            </el-col>
      </el-row>

      <el-row>
            <el-col :span="12">
              <div class="table-item">
                <span class="table-item-tit">客户名称：</span>
                <span class="table-item-con">{{ clientName }}</span>
              </div>
            </el-col>
        <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单日期：</span>
                <span class="table-item-con">{{ reachDate }}</span>
            </div>
        </el-col>
      </el-row>

     <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">订购服务：</span>
                <span class="table-item-con">{{ buyServ }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="16">
            <div class="table-item">
                <span class="table-item-tit">服务时间：</span>
                <span class="table-item-con">{{ timeLimit }}</span>
            </div>
        </el-col>
         <el-col :span="8">
            <div class="table-item">
                <span class="table-item-tit">服务费用：</span>
                <span class="table-item-con">{{ servPrice }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">到账信息</div>
          </el-col>
        </el-row>
       <el-row>
      <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">到账类型：</span>
                <span class="table-item-con">{{ buyType }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">到账金额：</span>
                <span class="table-item-con">{{ payPrice }}</span>
            </div>
        </el-col>
      </el-row>

      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">付款账户：</span>
                  <span class="table-item-con">{{ payId}}</span>
              </div>
          </el-col>
        </el-row>

       <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">收款账户：</span>
                <span class="table-item-con">{{ recId }}</span>
            </div>
        </el-col>
      </el-row>

        <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">交易订单号：</span>
                <span class="table-item-con">{{ dealId }}</span>
            </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
            <div class="table-item table-textarea">
                <span class="table-item-tit table-textarea-tit">备注信息：</span>
                <span class="table-item-con table-textarea-con" style="word-wrap:break-word">{{ descInfo }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">附件（点击图标下载）</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div v-if="imgs !== ''" class="imgList">
                  <!-- <img :src="item" alt="item" width="100" height="120"> -->
                <span class="down-left"  v-for="(item, index) in imgs" :key="index">
                   <a :href="item" target="_blank">
                       <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                   </a>
                </span>
              </div>
          </el-col>
      </el-row>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      myPmData: [],
      pmInfoVisible: false,
    reachMan: '',
    reachApart: '',
    clientName: '',
    reachDate: '',
    buyServ: '',
    timeLimit: '',
    servPrice: '',
    payPrice: '',
    payId: '',
    recId: '',
    dealId: '',
    descInfo: '',
    buyType: '',
    imgs: []
    }
  },
  created () {
       let that = this
      let formData = new FormData()
      formData.append('flag', 'fetch')
      formData.append('depart', this.$store.state.userDepart)
      formData.append('name', this.$store.state.userName)
      formData.append('power', this.$store.state.userPower)
      this.$http.post('pm_mng.php', formData)
      .then(function (res) {
        // console.log('Page', res.data)
        that.myPmData = res.data
        // that.totalList = res.data.length
        // console.log(res)
        // console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    viewDetail (index, row) {
        this.pmInfoVisible = true
        // console.log(index, row)
        this.descInfo = row.else_desc
        this.dealId = row.deal_id
        this.recId = row.rec_id
        this.payId = row.pay_id
        this.payPrice = row.pay_price
        this.servPrice = row.serv_price
        this.reachMan = row.reach_name
        this.reachApart = row.reach_apart
        this.clientName = row.client_name
        this.reachDate = row.reach_date
        this.buyServ = row.buy_serv
        this.timeLimit = row.time_limit
        this.buyType = row.buy_type
        let imgs = row.upload_imgs
        if (imgs !== '') {
            let imgsItem = imgs.split(',')
            let arr = []
            for (let i = 0; i < imgsItem.length; i++) {
            arr.push(imgsItem[i])
            }
            this.imgs = arr
        }
    },
    viewAcord (index, row) {
      this.acordVisible = true
      this.submitAcordId = row.id
      //  acord fetch
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetchAcord')
      formData.append('order_id', this.submitAcordId)
      this.$http.post('order_acord.php', formData)
        .then(function (res) {
          that.acordFetchData = res.data
          // console.log('res', res)
          console.log('fetchData', that.acordFetchData)
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
@blue: #409EFF;
.my-order{
  padding-bottom: 100px;
  .el-table th>.cell{
    text-align: center;
  }
 .imgList{
  width: 100%;
  padding: 0;
  li{
    display: inline-block;
    padding: 10px;
    list-style: none;
  }
 }
 .el-tabs__content{
   padding: 0 10px;
   text-align: left;
 }
 .collapse-item-style{
   color: red;
 }
 ul{
   padding: 0 20px;
   li{
     list-style: none;
     display: inline-block;
     img{
       width: 120px;
       height: 160px;
       margin: 3px;
     }
   }
 }
 .shopInfoTable{
  width: 100%;
  .imgList{
    width: 100%;
    height: 130px;
      border: 1px solid @blue;
      span{
        display: inline-block;
        a{
          display: block;
        }
      }
      .down-left{
        border-right:1px solid @blue;
        width: 80%;
        width: 120px;
        float: left;
        margin: 6px;
      }
  }
  .table-title{
    margin: 8px 0;
    border-radius: 2px;
    height: 42px;
    width: 100%;
    line-height: 42px;
    color: #ffffff;
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    padding-left: 8px;
    box-sizing: border-box;
    background-color: @blue;
  }
  .table-item{
    border-radius: 2px;
    height: 28px;
    margin: 12px 2px;
    border: 1px solid @blue;
    span{
      float: left;
      height: 28px;
      line-height: 28px;
      color: #ffffff;
      font-size: 1em;
      }
    .table-item-tit{
      width: 40%;
      background-color: @blue;
    }
    .else-info-tit{
      width: 16%;
    }
    .else-info-con{
      text-align: left;
      padding-left: 4px;
    }
    .table-item-con{
      width: 60%;
      color: red;
      font-size: 1.13em;
      font-weight: bold;
    }
  }
}
 .abv{
   width: 100%;
   height: 100%;
   background-color: #cccccc
 }
}
</style>
