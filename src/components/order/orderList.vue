<template>
  <div class="order-list">
    <el-table
      :data="orderData"
      style="width: 100%">
       <el-table-column
        label="订单编号"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="销售人员">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sales_man }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p><span class="shop-bar-title">店铺ID: </span> {{ scope.row.shop_id }}</p>
            <p><span class="shop-bar-title">店铺URL: </span>{{ scope.row.shop_url }}</p>
            <p><span class="shop-bar-title">店铺类型: </span>{{ scope.row.shop_type }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.shop_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="订购套餐"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.combo_info }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="200"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="480">
        <!-- width="420" -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            v-if="$store.getters.userAuthority === '80001' || $store.getters.userAuthority === '80005'"
            size="mini"
            type="primary"
            @click="dispenseOrder(scope.$index, scope.row)">分发此单</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleAudit(scope.$index, scope.row)">{{ scope.row.order_status }}</el-button>
          <el-button
            size="mini"
            type="success"
            @click="viewAcord(scope.$index, scope.row)">日志记录</el-button>
          <el-button
            v-if="$store.getters.userAuthority === '80001' ||  $store.getters.userAuthority === '80005'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="shopInfoVisible">
      <div class="shopInfoTable">
        <el-row>
          <el-col :span="24">
            <div class="table-title">店铺信息</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <div class="table-item">
              <span class="table-item-tit">店铺名称：</span>
              <span class="table-item-con">{{ shopInfo.s_name }}</span>
            </div>
          </el-col>
           <el-col :span="8">
            <div class="table-item">
              <span class="table-item-tit">店铺类型：</span>
              <span class="table-item-con">{{ shopInfo.s_type }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="16">
          <div class="table-item">
            <span class="table-item-tit">店铺链接：</span>
            <span class="table-item-con"><a v-if="shopInfo.s_url !== ''" :href="shopInfo.s_url" style="color:red;text-decoration:none;" target="_blank">点击打开</a></span>
          </div>
        </el-col>
         <el-col :span="8">
             <div class="table-item">
              <span class="table-item-tit">店铺ID：</span>
              <span class="table-item-con">{{ shopInfo.s_id }}</span>
            </div>
          </el-col>
      </el-row>
        <el-row>
          <el-col :span="10">
            <div class="table-item">
              <span class="table-item-tit">店铺联系人：</span>
              <span class="table-item-con">{{ shopInfo.s_linkMan }}</span>
            </div>
          </el-col>
           <el-col :span="14">
             <div class="table-item">
              <span class="table-item-tit">联系方式：</span>
              <span class="table-item-con">{{ shopInfo.s_linkMethods }}</span>
            </div>
          </el-col>
        </el-row>
      <el-row>
        <el-col :span="24">
          <div class="table-title">订单信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <div class="table-item">
            <span class="table-item-tit">订购套餐：</span>
            <span class="table-item-con">{{ shopInfo.s_comboInfo }}</span>
          </div>
        </el-col>
          <el-col :span="14">
            <div class="table-item">
            <span class="table-item-tit">付款金额：</span>
            <span class="table-item-con">{{ shopInfo.s_payPrice }}</span>
          </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="10">
          <div class="table-item">
            <span class="table-item-tit">付款账号：</span>
            <span class="table-item-con">{{ shopInfo.s_payId }}</span>
          </div>
        </el-col>
          <el-col :span="7">
            <div class="table-item">
            <span class="table-item-tit">付款方式：</span>
            <span class="table-item-con">{{ shopInfo.s_payMethods }}</span>
          </div>
        </el-col>
          <el-col :span="7">
            <div class="table-item">
            <span class="table-item-tit">付款时间：</span>
            <span class="table-item-con">{{ shopInfo.s_payDate }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <div class="table-item">
            <span class="table-item-tit">服务时间：</span>
            <span class="table-item-con">{{ shopInfo.s_timeLimit }}</span>
          </div>
        </el-col>
          <el-col :span="8">
            <div class="table-item">
            <span class="table-item-tit">签单人员：</span>
            <span class="table-item-con">{{ shopInfo.s_salesMan }}</span>
          </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="24">
          <div class="table-item">
            <span class="table-item-tit else-info-tit">备注信息：</span>
            <span class="table-item-con else-info-con">{{ shopInfo.s_descInfo }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="table-title">审核信息</div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-steps :active="auditStatus" align-center>
            <el-step title="录入成功"></el-step>
            <el-step title="经理审核"></el-step>
            <el-step title="总经理审核"></el-step>
            <el-step title="审核成功"></el-step>
          </el-steps>
          <el-tag type="danger">{{ auditStatusText }}</el-tag>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="table-title">附件 (点击图标下载)</div>
        </el-col>
      </el-row>

      <el-row v-if="shopInfo.s_someImg.length !== 0">
        <el-col :span="24">
            <div class="imgList">
              <span class="down-left"  v-for="(item, index) in shopInfo.s_someImg" :key="index">
                   <a :href="item" target="_blank">
                       <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                   </a>
              </span>
            </div>
        </el-col>
      </el-row>

      </div>

    </el-dialog>

    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="dispenceOrderVisible">
      <dispense-order :orderDispenseInfo = "this.orderDispenseInfo"></dispense-order>
    </el-dialog>

    <!-- order acord dialog -->
    <el-dialog title="" :visible.sync="orderAcordVisible">
        <el-collapse accordion class="acord-block">
              <el-collapse-item v-for="(item,index) in acordFetchData" :key="index" :title="item.acord_title + '【'+ item.acord_man +'】' +'【'+ item.reg_date +'】'">
                <div class="collapse-item-style">{{item.acord_content}}</div>
                <div>
                  <ul>
                    <li v-for="imgs in item.acord_img.split(',')" :key="imgs"><a :href="imgs" target="_blank"><img :src="imgs" alt=""></a></li>
                  </ul>
                </div>
              </el-collapse-item>
        </el-collapse>
    </el-dialog>
  </div>
</template>
<script>
import dispenseOrder from './dispenseOrder'
export default {
  data () {
    return {
      auditStatusText: '录入成功，等待审核',
      tableData: [],
      orderData: [],
      shopInfoVisible: false,
      dispenceOrderVisible: false,
      orderAcordVisible: false,
      orderDispenseInfo: '',
      acordFetchData: [],
      orderActive: 3,
      auditStatus: '',
      shopInfo: {
        s_name: '',
        s_id: '',
        s_url: '',
        s_type: '',
        s_linkMan: '',
        s_linkMethods: '',
        s_comboInfo: '',
        s_payPrice: '',
        s_descInfo: '',
        s_timeLimit: '',
        s_someImg: [],
        s_salesMan: ''
      }
    }
  },
  components: {
    dispenseOrder
  },
  created () {
    this.fetchOrderData()
  },
  methods: {
    handleAudit (index, row) {
      console.log('III', index, 'RRR', row)
      // this.$refs.auditBtnn.$el.innerText = 'PPPPP'
      if (row.order_code === '1') {
        this.$alert('审核信息已提交，等待审核完成', '审核信息', {
          confirmButtonText: '确定'
        })
      } else if (row.order_code === '0') {
        this.$confirm('即将通知销售经理、总经理进行订单审核, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let formData = new FormData()
        formData.append('st_flag', 'audit')
        formData.append('order_id', row.id)
        formData.append('staff_depart', this.$store.state.userDepart)
        formData.append('staff_job', 'BD经理')
        this.$http.post('staff_mng.php', formData)
          .then(function (res) {
            // console.log(res)
            if (res.data === 'notiSuc') {
              //  change  btn text
                  let formData2 = new FormData()
                  formData2.append('flag', 'changeBtnText')
                  formData2.append('order_id', row.id)
                  formData2.append('btn_text', '审核中')
                  that.$http.post('order_mng.php', formData2)
                    .then(function (res) {
                      //  console.log(res)
                      that.$store.state.defaultComp = 'orderAdd'
                      setTimeout(() => {
                        that.$store.state.defaultComp = 'orderList'
                      }, 10)
                    }).catch(function (err) {
                      console.log(err)
                    })
              // that.auditBtn = '正在审核'
              // that.auditBtnStu = true
              that.$message({
                type: 'success',
                message: '通知成功!'
              })
            } else {
              that.$message.error('通知失败！')
            }
          }).catch(function (err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消通知'
        })
      })
      }
    },
    dispenseOrder (index, row) {
      this.dispenceOrderVisible = true
      this.orderDispenseInfo = row
    },
    viewDetail (index, row) {
      this.shopInfoVisible = true
      // console.log(index, row)
      this.shopInfo.s_name = row.shop_name
      this.shopInfo.s_id = row.shop_id
      this.shopInfo.s_url = row.shop_url
      this.shopInfo.s_type = row.shop_type
      this.shopInfo.s_linkMan = row.link_man
      this.shopInfo.s_linkMethods = row.link_methods
      this.shopInfo.s_comboInfo = row.combo_info
      this.shopInfo.s_payPrice = row.pay_price
      this.shopInfo.s_payId = row.pay_id
      this.shopInfo.s_payMethods = row.pay_methods
      this.shopInfo.s_payDate = row.pay_date
      this.shopInfo.s_descInfo = row.desc_info
      this.shopInfo.s_timeLimit = row.time_limit
      this.shopInfo.s_salesMan = row.sales_man
      let jl = row.jl_audit
      let zjl = row.zjl_audit
      if (jl === '1' && zjl === '1') {
        this.auditStatus = 1
        this.auditStatusText = '录入成功，等待审核'
      } else if (jl === '2' && zjl === '2') {
        this.auditStatus = 4
        this.auditStatusText = '审核通过'
      } else if (jl === '3' || zjl === '3') {
        this.auditStatus = 0
        this.auditStatusText = '审核不通过'
      } else if (jl === '2') {
        this.auditStatus = 2
        this.auditStatusText = '经理审核通过'
      }
      // split string for array
      let someImgArr = []
      let someImg = row.some_img
      if (someImg !== '') {
        let someStr = someImg.split(',')
        for (let i = 0; i < someStr.length; i++) {
          someImgArr.push(someStr[i])
        }
        // console.log('AAAA',someImgArr)
        this.shopInfo.s_someImg = someImgArr
      } else {
        this.shopInfo.s_someImg = someImgArr
      }
    },
    handleDelete (index, row) {
      // console.log(index, row.id)
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let formData = new FormData()
        formData.append('flag', 'delOrder')
        formData.append('delId', row.id)
        this.$http.post('order_mng.php', formData)
          .then(function (res) {
            if (res.data === 'DelOrderSuc') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            that.$store.state.defaultComp = 'orderAdd'
            setTimeout(() => {
              that.$store.state.defaultComp = 'orderList'
            }, 10)
            }
          }).catch(function (err) {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fetchOrderData () {
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetch')
      formData.append('depart', this.$store.state.userDepart)
      formData.append('name', this.$store.state.userName)
      formData.append('power', this.$store.state.userPower)
      // formData.append('shop_name', this.shop.name)
      this.$http.post('order_mng.php', formData)
        .then(function (res) {
          console.log(res)
          that.orderData = res.data
        // alert(that.submitFlag)
        }).catch(function (err) {
          console.log(err)
        })
    },
    viewAcord (index, row) {
      this.orderAcordVisible = true
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetchAcord')
      formData.append('order_id', row.id)
      this.$http.post('order_acord.php', formData)
        .then(function (res) {
          if (res.data.length !== 0) {
            that.acordFetchData = res.data
          } else {
            that.acordFetchData = [{'acord_title':'【暂】【无】', 'acord_content':'', 'acord_man':'记', 'acord_img':'', 'reg_date':'录'}]
          }
          console.log('res', res.data.length)
          // console.log('fetchData', that.acordFetchData)
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
@blue: #409EFF;
.acord-block{
  text-align: left;
  .collapse-item-style{
    color: red;
  }
  ul{
    li{
      list-style-type: none;
      display: inline-block;
      img{
        width: 120px;
        height: 160px;
        margin: 3px;
      }
    }
  }
}
.el-steps--horizontal{
  padding: 10px;
}
.order-step{
  width: 100%;
  padding:20px 0 30px 0;
}
.el-tag--danger{
  width: 100%;
}
.order-status-title{
  color: #409EFF;
  font-weight: bold;
  font-size: 1.3em;
  padding-bottom: 10px;
}
.order-list .imgList{
  width: 100%;
  padding: 0;
  li{
    display: inline-block;
    padding: 10px;
    list-style: none;
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
.order-list .el-table th>.cell{
  text-align: center;
}
.el-popover p {
  color: red;
}
.el-popover .shop-bar-title{
  color:#000000;
  font-size:1.1em;
}
</style>
