<template>
  <div class="audit-wrap">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        label="订单编号"
        width="80">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="所属部门"
        >
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sales_apart }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="录入人员"
        >
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            <p>订购套餐: {{ scope.row.combo_info }}</p>
            <p>到账金额: {{ scope.row.pay_price }}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sales_man }}</el-tag>
            </div>
            </el-popover>
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
        <el-table-column
        label="审核状态"
        >
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.order_status }}</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
        </el-table-column>
    </el-table>
      </el-tab-pane>
      <el-tab-pane label="已审核" name="second">
        <el-table
        :data="tableData2"
        style="width: 100%">
        <el-table-column
        label="订单编号"
        width="80">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="所属部门"
        >
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sales_apart }}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="录入人员"
        >
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            <p>订购套餐: {{ scope.row.combo_info }}</p>
            <p>到账金额: {{ scope.row.pay_price }}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sales_man }}</el-tag>
            </div>
            </el-popover>
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
        <el-table-column
        label="审核状态"
        >
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.order_status }}</span>
        </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
        </el-table-column>
    </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- Audit dialog -->
    <el-dialog :visible.sync="dialogTableVisible">
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
        <el-col :span="10">
          <div class="table-item">
            <span class="table-item-tit">收款账号：</span>
            <span class="table-item-con">{{ shopInfo.s_recId }}</span>
          </div>
        </el-col>
          <el-col :span="14">
            <div class="table-item">
            <span class="table-item-tit">交易单号：</span>
            <span class="table-item-con">{{ shopInfo.s_priceId }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="17">
          <div class="table-item">
            <span class="table-item-tit">服务时间：</span>
            <span class="table-item-con">{{ shopInfo.s_timeLimit }}</span>
          </div>
        </el-col>
          <el-col :span="7">
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

       <el-row>
        <el-col :span="24">
          <div class="table-title">审核操作</div>
        </el-col>
      </el-row>

      <el-row>
        <div class="audit-btn">
            <el-col :span="12">
                    <el-checkbox-group v-model="auditPass">
                       <el-checkbox label="确认已通过审核"></el-checkbox>
                        <el-button :disabled="passAbled" type="primary" plain @click="passA">{{ passBtnText }}</el-button>
                    </el-checkbox-group>
            </el-col>
             <el-col :span="12">
                   <el-checkbox-group v-model="auditReject">
                       <el-checkbox label="确认未通过审核"></el-checkbox>
                        <el-button :disabled="rejectAbled" type="danger" plain @click="rejectA">{{ rejectBtnText }}</el-button>
                    </el-checkbox-group>
            </el-col>
        </div>
      </el-row>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeName: 'first',
        passBtnText: '通过审核',
        rejectBtnText: '驳回审核',
        passAbled: false,
        rejectAbled: false,
        auditPass: false,
        auditReject: false,
        tableData: [],
        tableData2: [],
        dialogTableVisible: false,
        shopInfo: {
        id: '',
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
        s_salesMan: '',
        s_priceId: '',
        s_recId: ''
        // s_jlAudit: '',
        // s_zjlAudit: ''
      }
      }
    },
    created () {
         //  fetch audit order's id
        let that = this
        let formData = new FormData()
        formData.append('st_flag', 'auditFetch')
        // formData.append('col_name', 'audit_content')
        formData.append('staff_id', this.$store.state.userId)
        this.$http.post('staff_mng.php', formData)
          .then(function (res) {
            let str = String(res.data)
            // console.log('new', str)
            //  Get order's detail
            let formData2 = new FormData()
            formData2.append('flag', 'auditOrderFetch')
            formData2.append('order_id', str)
            that.$http.post('order_mng.php', formData2)
            .then(function (res) {
              // console.log('TTTTTT', res)
              that.tableData = res.data
                // console.log('useRid', strs[1])
                // that.auditNums = strs.length
            }).catch(function (err) {
                console.log(err)
            })
            // console.log('useRid', strs[1])
            // that.auditNums = strs.length
          }).catch(function (err) {
            console.log(err)
          })
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
        if (tab.index === '1') {
          //  fetch audit order's id
          let that = this
          let formData = new FormData()
          formData.append('st_flag', 'auditFetch2')
          // formData.append('col_name', 'audit_content2')
          formData.append('staff_id', this.$store.state.userId)
          this.$http.post('staff_mng.php', formData)
            .then(function (res) {
              let str = String(res.data)
              // console.log('old', str)
              // console.log('PPPP', res)
              //  Get order's detail
              let formData2 = new FormData()
              formData2.append('flag', 'auditOrderFetch')
              formData2.append('order_id', str)
              that.$http.post('order_mng.php', formData2)
              .then(function (res) {
                // console.log('OOOOO', res)
                that.tableData2 = res.data
                  // console.log('useRid', strs[1])
                  // that.auditNums = strs.length
              }).catch(function (err) {
                  console.log(err)
              })
              // console.log('useRid', strs[1])
              // that.auditNums = strs.length
            }).catch(function (err) {
              console.log(err)
            })
        }
      },
      passA () {
         let orderId = this.shopInfo.id
         let linkMan = this.shopInfo.s_linkMan
         let salesMan = this.shopInfo.s_salesMan
         let payPrice = this.shopInfo.s_payPrice
         let power = this.$store.getters.userAuthority
         if (power === '80001' && this.auditPass === true) {
            //  alert(order_id + '****' + power)
                let that = this
                let formData = new FormData()
                formData.append('flag', 'changeStu')
                formData.append('order_id', orderId)
                formData.append('sales_man', salesMan)
                formData.append('pay_price', payPrice)
                formData.append('link_man', linkMan)
                formData.append('where_audit', 'zjl_audit')
                formData.append('audit_code', '2')
                formData.append('staff_id', this.$store.state.userId)
                this.$http.post('order_mng.php', formData)
                    .then(function (res) {
                     console.log('WWWW', res)
                    if (res.data === 'auditChangeSuc') {
                        that.$message({
                        type: 'success',
                        message: '审核成功!'
                        })
                        that.dialogTableVisible = false
                    } else {
                        that.$message.error('审核失败！')
                    }
                    }).catch(function (err) {
                      console.log(err)
                    })
                //  change order status
                let formData2 = new FormData()
                  formData2.append('flag', 'changeBtnText')
                  formData2.append('order_id', orderId)
                  formData2.append('btn_text', '已通过审核')
                  that.$http.post('order_mng.php', formData2)
                    .then(function (res) {
                      //  console.log(res)
                      that.$store.state.defaultComp = 'myOrder'
                      setTimeout(() => {
                        that.$store.state.defaultComp = 'myAudit'
                      }, 10)
                    }).catch(function (err) {
                      console.log(err)
                    })
                // audit and visibilety the PM
         } else if (power === '80003' && this.auditPass === true) {
                let that = this
                let formData = new FormData()
                formData.append('flag', 'changeStu')
                formData.append('order_id', orderId)
                formData.append('where_audit', 'jl_audit')
                formData.append('audit_code', '2')
                formData.append('staff_id', this.$store.state.userId)
                this.$http.post('order_mng.php', formData)
                    .then(function (res) {
                       // console.log('WWWW', res)
                        if (res.data === 'auditChangeSuc') {
                            that.$message({
                              type: 'success',
                              message: '审核成功!'
                            })
                            that.dialogTableVisible = false
                              //   通知 总经理 审核
                              let formData2 = new FormData()
                              formData2.append('st_flag', 'audit')
                              formData2.append('order_id', orderId)
                              formData2.append('staff_depart', '石一,管理层')
                              formData2.append('staff_job', '分公司总经理')
                              that.$http.post('staff_mng.php', formData2)
                                .then(function (res) {
                                  // console.log('HHHHHHH', res)
                                  if (res.data === 'notiSuc') {
                                    that.$message({
                                      type: 'success',
                                      message: '已通知总经理审核!'
                                    })
                                  } else {
                                    that.$message.error('通知失败！')
                                  }
                                }).catch(function (err) {
                                  console.log(err)
                                })
                        } else {
                            that.$message.error('审核失败！')
                        }
                    }).catch(function (err) {
                      console.log(err)
                    })
                     //  change order status
                let formData2 = new FormData()
                  formData2.append('flag', 'changeBtnText')
                  formData2.append('order_id', orderId)
                  formData2.append('btn_text', '审核中1/2')
                  that.$http.post('order_mng.php', formData2)
                    .then(function (res) {
                      //  console.log(res)
                      that.$store.state.defaultComp = 'myOrder'
                      setTimeout(() => {
                        that.$store.state.defaultComp = 'myAudit'
                      }, 10)
                    }).catch(function (err) {
                      console.log(err)
                    })
         }
      },
      rejectA () {
         let orderId = this.shopInfo.id
         let power = this.$store.getters.userAuthority
         if (power === '80001' && this.auditReject === true) {
            //  alert(order_id + '****' + power)
                let that = this
                let formData = new FormData()
                formData.append('flag', 'changeStu')
                formData.append('order_id', orderId)
                formData.append('where_audit', 'zjl_audit')
                formData.append('audit_code', '3')
                formData.append('staff_id', this.$store.state.userId)
                this.$http.post('order_mng.php', formData)
                    .then(function (res) {
                        // console.log('WWWW', res)
                    if (res.data === 'auditChangeSuc') {
                        that.$message({
                        type: 'success',
                        message: '已驳回!'
                        })
                        that.dialogTableVisible = false
                    } else {
                        that.$message.error('驳回失败！')
                    }
                    }).catch(function (err) {
                    console.log(err)
                    })
                     //  change order status
                  let formData2 = new FormData()
                  formData2.append('flag', 'changeBtnText')
                  formData2.append('order_id', orderId)
                  formData2.append('btn_text', '审核不通过')
                  that.$http.post('order_mng.php', formData2)
                    .then(function (res) {
                      //  console.log(res)
                      that.$store.state.defaultComp = 'myOrder'
                      setTimeout(() => {
                        that.$store.state.defaultComp = 'myAudit'
                      }, 10)
                    }).catch(function (err) {
                      console.log(err)
                    })
         } else if (power === '80003' && this.auditReject === true) {
                let that = this
                let formData = new FormData()
                formData.append('flag', 'changeStu')
                formData.append('order_id', orderId)
                formData.append('where_audit', 'jl_audit')
                formData.append('audit_code', '3')
                formData.append('staff_id', this.$store.state.userId)
                this.$http.post('order_mng.php', formData)
                    .then(function (res) {
                        // console.log('WWWW', res)
                    if (res.data === 'auditChangeSuc') {
                        that.$message({
                        type: 'success',
                        message: '已驳回!'
                        })
                        that.dialogTableVisible = false
                    } else {
                        that.$message.error('驳回失败！')
                    }
                    }).catch(function (err) {
                    console.log(err)
                    })
                //  change order status
                let formData2 = new FormData()
                  formData2.append('flag', 'changeBtnText')
                  formData2.append('order_id', orderId)
                  formData2.append('btn_text', '审核不通过')
                  that.$http.post('order_mng.php', formData2)
                    .then(function (res) {
                      //  console.log(res)
                      that.$store.state.defaultComp = 'myOrder'
                      setTimeout(() => {
                        that.$store.state.defaultComp = 'myAudit'
                      }, 10)
                    }).catch(function (err) {
                      console.log(err)
                  })
         }
      },
      handleEdit (index, row) {
        this.dialogTableVisible = true
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
        this.shopInfo.s_priceId = row.price_id
        this.shopInfo.s_recId = row.rec_id
        this.shopInfo.id = row.id
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
          // console.log(index, row)
     },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.audit-wrap{
  padding-bottom: 100px;
    .el-table th>.cell{
        text-align: center;
    }
    .audit-btn{
      padding: 10px;
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
    .el-button--danger.is-plain{
        margin-left: 20px;
    }
    .el-button--primary.is-plain{
         margin-left: 20px;
    }
}
}
</style>
