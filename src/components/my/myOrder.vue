<template>
  <div class="my-order">
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

  </div>
</template>
<script>
export default {
}
</script>
