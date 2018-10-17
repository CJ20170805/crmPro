<template>
    <div class="client-list">
    <el-table
    :data="clientData"
    style="width: 100%">
    <el-table-column
      label="客户编号"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="客户名称"
      >
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>联系方式: {{ scope.row.client_link}}</p>
          <p>地区: {{ scope.row.client_address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.client_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="销售人员"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sales_man }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="录入人员"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.write_man }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="录入日期"
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
          @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="clientInfoVisible">
      <div class="clientInfoTable">
        <el-row>
          <el-col :span="24">
            <div class="table-title">客户信息</div>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="10">
            <div class="table-item">
                <span class="table-item-tit">客户名称：</span>
                <span class="table-item-con">{ shopInfo.s_timeLimit }}</span>
            </div>
            </el-col>
            <el-col :span="7">
                <div class="table-item">
                <span class="table-item-tit">客户类型：</span>
                <span class="table-item-con">{ shopInfo.s_salesMan }}</span>
            </div>
            </el-col>
            <el-col :span="7">
                <div class="table-item">
                <span class="table-item-tit">所在地区：</span>
                <span class="table-item-con">{ shopInfo.s_salesMan }}</span>
            </div>
            </el-col>
      </el-row>

     <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">联系方式：</span>
                <span class="table-item-con">{ shopInfo.s_timeLimit }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">客户意向：</span>
                <span class="table-item-con">{ shopInfo.s_timeLimit }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">其他信息</div>
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
      clientData: '',
      clientInfoVisible: false
    }
  },
  created () {
    let that = this
    let formData = new FormData()
    formData.append('flag', 'fetch')
    this.$http.post('client_mng.php', formData)
      .then(function (res) {
        that.clientData = res.data
        console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    handleDetail (index, row) {
      this.clientInfoVisible = true
      console.log(index, row)
    },
    handleDelete (index, row) {
    console.log(index, row)
    }
  }
}
</script>
<style lang="less">
@blue: #409EFF;
.el-table th>.cell{
  text-align: center;
}
.client-list{
  .clientInfoTable{
  width: 100%;
  .imgList{
    width: 100%;
      border: 1px solid @blue;
      span{
        display: inline-block;
        text-align: center;
        a{
          display: block;
          width: 100%;
        }
      }
      .down-left{
        border-right:1px solid @blue;
        width: 80%;
      }
      .down-right{
        width: 19%;
        text-align: center;
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
}
</style>
