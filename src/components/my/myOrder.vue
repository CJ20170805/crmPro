<template>
  <div class="my-order">
      <el-table
      :data="myOrderData"
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
        >
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
        width="190"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="viewDetail(scope.$index, scope.row)">记录操作</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  data () {
    return {
      myOrderData: [],
      myOrderList: []
    }
  },
  created () {
    let that = this
    let formData = new FormData()
    formData.append('flag', 'dispenseFetch')
    formData.append('userId', this.$store.state.userId)
    // get order's number
    this.$http.post('order_mng.php', formData)
      .then(function (res) {
        // use order's number get order's detail
        res.data.forEach((item, index) => {
          let formData2 = new FormData()
          formData2.append('flag', 'dispenseDetail')
          formData2.append('orderNum', item.st_orders)
          that.$http.post('order_mng.php', formData2)
            .then(function (res) {
              that.myOrderData = res.data
            }).catch(function (err) {
              console.log(err)
            })
        })
        // console.log('dispenseFetchRes', that.myOrderList)
      }).catch(function (err) {
        console.log(err)
      })
      // console.log('orderNum', that.myOrderData)
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="less">
.my-order{
  .el-table th>.cell{
    text-align: center;
  }
}
</style>
