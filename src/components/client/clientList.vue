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
          <p>地区: {{ scope.row.client_address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.client_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订购套餐"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.combo_type }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="店铺名称"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="店铺类型"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.shop_type }}</span>
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
          v-if="$store.getters.userAuthority !== '80002' && $store.getters.userAuthority !== '80004'"
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
            <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">客户名称：</span>
                <span class="table-item-con">{{ clientName }}</span>
            </div>
            </el-col>
       </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">联系方式：</span>
                  <span class="table-item-con">{{ clientLink }}</span>
              </div>
          </el-col>
        </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">订购套餐：</span>
                  <span class="table-item-con">{{ comboType }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                  <div class="table-item">
                  <span class="table-item-tit">所在地区：</span>
                  <span class="table-item-con">{{ clientAddress }}</span>
              </div>
              </el-col>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">客户编号：</span>
                  <span class="table-item-con">{{ clientId }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div class="table-title">店铺信息</div>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">店铺名称：</span>
                  <span class="table-item-con">{{ shopName }}</span>
              </div>
          </el-col>
        </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">店铺链接：</span>
                  <span class="table-item-con"><a :href="shopUrl" style="color:red;text-decoration:none;" target="_blank">点击打开</a></span>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">店铺ID：</span>
                  <span class="table-item-con">{{ shopId }}</span>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">店铺等级：</span>
                  <span class="table-item-con">{{ shopGrade }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">店铺类型：</span>
                  <span class="table-item-con">{{ shopType }}</span>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">所属行业：</span>
                  <span class="table-item-con">{{ shopIndustry }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div class="table-title">其他信息</div>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">销售人员：</span>
                  <span class="table-item-con">{{ salesMan }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">录入人员：</span>
                  <span class="table-item-con">{{ writeMan }}</span>
              </div>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="table-item">
                    <span class="table-item-tit">录入日期：</span>
                    <span class="table-item-con">{{ regDate }}</span>
                </div>
            </el-col>
          </el-row>

        <!-- <el-row>
            <el-col :span="24">
              <div class="table-title">附件（点击图标下载）</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <div class="imgList">
                  <span class="down-left" v-for="(item, index) in clientFiles" :key="index">
                    <a :href="item" target="_blank">
                        <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                    </a>
                  </span>
                </div>
            </el-col>
        </el-row> -->

      </div>
    </el-dialog>

 </div>
</template>
<script>
export default {
  data () {
    return {
      clientData: [],
      clientInfoVisible: false,
      clientId: '',
      clientName: '',
      clientLink: '',
      clientAddress: '',
      writeMan: '',
      salesMan: '',
      shopName: '',
      shopUrl: '',
      shopId: '',
      shopGrade: '',
      shopIndustry: '',
      shopType: '',
      comboType: '',
      regDate: '',
      clientFiles: []
    }
  },
  created () {
    let that = this
    let formData = new FormData()
    formData.append('flag', 'fetch')
    formData.append('depart', this.$store.state.userDepart)
    formData.append('name', this.$store.state.userName)
    formData.append('power', this.$store.state.userPower)
    this.$http.post('client_mng.php', formData)
      .then(function (res) {
        that.clientData = res.data
        // console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    handleDetail (index, row) {
      this.clientInfoVisible = true
      // console.log(index, row)
      this.clientId = row.id
      this.clientName = row.client_name
      this.clientLink = row.client_link
      this.clientAddress = row.client_address
      this.writeMan = row.write_man
      this.salesMan = row.sales_man
      this.shopName = row.shop_name
      this.shopUrl = row.shop_url
      this.shopId = row.shop_id
      this.shopGrade = row.shop_grade
      this.shopIndustry = row.shop_industry
      this.shopType = row.shop_type
      this.comboType = row.combo_type
      this.regDate = row.reg_date
      // this.clientFiles = row.files
      // if (row.files !== '') {
      //   let file = row.files.split(',')
      //   let fileArr = []
      //   for (let i = 0; i < file.length; i++) {
      //     fileArr.push(file[i])
      //   }
      //   this.clientFiles = fileArr
      //   }
    },
    handleDelete (index, row) {
     console.log(index, row)
     this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let formData = new FormData()
        formData.append('flag', 'delClient')
        formData.append('delId', row.id)
        this.$http.post('client_mng.php', formData)
          .then(function (res) {
            // console.log(res)
            if (res.data === 'delClientSuc') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            that.$store.state.defaultComp = 'clientAdd'
            setTimeout(() => {
              that.$store.state.defaultComp = 'clientList'
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
  padding-bottom: 100px;
.clientInfoTable{
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
  .table-textarea{
    height: 80px!important;
  }
  .table-textarea-tit{
    height: 80px!important;
    line-height: 80px!important;
  }
  .table-textarea-con{
    height: 80px!important;
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
