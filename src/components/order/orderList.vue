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
        label="销售人员"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
        width="200px"
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
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.combo_info }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单时间"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="dispenseOrder(scope.$index, scope.row)">分发此单</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="shopInfoVisible">
      <table class="shopInfoTable">
        <thead>
          <tr>
            <th>店铺信息</th>
            <th>订购信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>店铺名称：<span class="shopInfoValue">{{ shopInfo.s_name }} </span></td>
            <td>订购套餐：<span class="shopInfoValue">{{ shopInfo.s_comboInfo }} </span></td>
          </tr>
          <tr>
            <td>店铺类型：<span class="shopInfoValue">{{ shopInfo.s_type }} </span></td>
            <td>付款金额：<span class="shopInfoValue">{{ shopInfo.s_payPrice }} </span></td>
          </tr>
           <tr>
            <td>店铺ID：<span class="shopInfoValue">{{ shopInfo.s_id }} </span></td>
            <td>服务时间：<span class="shopInfoValue">{{ shopInfo.s_timeLimit }} </span></td>
          </tr>
          <tr>
            <td>店铺URL：<span class="shopInfoValue"><a :href="shopInfo.s_url" target="_blank">{{ shopInfo.s_url}}</a></span></td>
            <td>销售人员：<span class="shopInfoValue">{{ shopInfo.s_salesMan }} </span></td>
          </tr>
           <tr>
            <td>联系人：<span class="shopInfoValue">{{ shopInfo.s_linkMan }} </span></td>
            <td>其他信息：<span class="shopInfoValue">{{ shopInfo.s_descInfo }} </span></td>
          </tr>
          <tr>
            <td>联系方式:<span class="shopInfoValue">{{ shopInfo.s_linkMethods }} </span></td>
          </tr>
        </tbody>
      </table>
      <div class="order-step">
          <p class="order-status-title">订单状态</p>
          <el-steps :active="1" align-center>
            <el-step title="完成下单" ></el-step>
            <el-step title="完成分单" ></el-step>
            <el-step title="服务运营" ></el-step>
            <el-step title="服务结束" ></el-step>
          </el-steps>
      </div>
       <ul class="imgList">
            <li v-for="(item, index) in shopInfo.s_someImg" :key="index">
              <img :src="item" alt="" width="160px" height="220px">
            </li>
       </ul>
    </el-dialog>

       <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="dispenceOrderVisible">
      <dispense-order :orderDispenseInfo = "this.orderDispenseInfo"></dispense-order>
    </el-dialog>
  </div>
</template>
<script>
import dispenseOrder from './dispenseOrder'
export default {
  data () {
    return {
      tableData: [],
      orderData: '',
      shopInfoVisible: false,
      dispenceOrderVisible: true,
      orderDispenseInfo: '',
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
        s_someImg: '',
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
    dispenseOrder (index, row) {
      this.dispenceOrderVisible = true
      this.orderDispenseInfo = row
    },
    viewDetail (index, row) {
      this.shopInfoVisible = true
      console.log(index, row)
      this.shopInfo.s_name = row.shop_name
      this.shopInfo.s_id = row.shop_id
      this.shopInfo.s_url = row.shop_url
      this.shopInfo.s_type = row.shop_type
      this.shopInfo.s_linkMan = row.link_man
      this.shopInfo.s_linkMethods = row.link_methods
      this.shopInfo.s_comboInfo = row.combo_info
      this.shopInfo.s_payPrice = row.pay_price
      this.shopInfo.s_descInfo = row.desc_info
      this.shopInfo.s_timeLimit = row.time_limit
      this.shopInfo.s_salesMan = row.sales_man
      // split string for array
      let someImgArr = []
      let someImg = row.some_img
      let someStr = someImg.split(',')
      for (let i = 0; i < someStr.length; i++) {
        someImgArr.push(someStr[i])
      }
      // console.log('AAAA',someImgArr)
      this.shopInfo.s_someImg = someImgArr
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    fetchOrderData () {
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetch')
      // formData.append('shop_name', this.shop.name)
      this.$http.post('order_mng.php', formData)
        .then(function (res) {
          console.log(res)
          that.orderData = res.data
        // alert(that.submitFlag)
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
.order-step{
  width: 100%;
  padding:20px 0 30px 0;
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
  }
}
.shopInfoTable{
  width: 100%;
  td{
    text-align: left;
    padding: 8px;
    width: 50%;
    font-size: 1.1em;
    font-weight: 600;
  }
  th{
    padding: 0 0 20px 0;
    text-align: left;
    width: 50%;
    color: #409EFF;
    font-size: 1.2em;
  }
  .shopInfoValue{
    color: red;
    font-size: 1em;
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
