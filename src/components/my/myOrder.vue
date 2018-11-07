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
            @click="viewAcord(scope.$index, scope.row)">日志记录</el-button>
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
            <div class="table-title">附件（点击图标下载）</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div class="imgList">
                  <!-- <img :src="item" alt="item" width="100" height="120"> -->
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

    <!--Order operating acord  -->
    <el-dialog title="" :visible.sync="acordVisible">
        <el-tabs tab-position="left">
          <el-tab-pane label="历史日志">
              <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in acordFetchData" :key="index" :title="item.acord_title + '【'+ item.acord_man +'】' +'【'+ item.reg_date +'】'">
                      <div class="collapse-item-style">{{item.acord_content}}</div>
                      <div>
                        <ul>
                          <li v-for="imgs in item.acord_img.split(',')" :key="imgs"><a :href="imgs" target="_blank"><img :src="imgs" alt=""></a></li>
                        </ul>
                      </div>
                    </el-collapse-item>
              </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="添加日志">
              <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="日志标题">
                <el-input v-model="submitAcordTitle"></el-input>
              </el-form-item>
              <el-form-item label="日志内容">
                <el-input type="textarea" rows="8" v-model="submitAcordContent"></el-input>
              </el-form-item>
              <el-form-item label="记录人员">
                <el-input
                  v-model="userName"
                  :disabled="true">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  action="http://www.huibohehe.com/crmApi/order_acord_img.php"
                  :on-success="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeImgUpload"
                  list-type="picture">
                  <el-button size="small" type="info" icon="el-icon-upload">点击上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="whetherSubmit">提交日志</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      myOrderData: [],
      myOrderList: [],
      shopInfoVisible: false,
      acordVisible: false,
      orderActive: 3,
      userName: '',
      acordTitle: 'fdfdfd',
      acordImgs: [],
      acordImgsNew: [],
      submitAcordTitle: '',
      submitAcordContent: '',
      submitAcordId: '',
      acordFetchData: [],
      abc: [
        {aa: '2018-09-29 10:46:22', bb: 23456},
        {aa: 123, bb: 23456},
        {aa: 12345, bb: 23456}
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
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
  created () {
    this.userName = this.$store.state.userDepart
    this.userName += '✈'
    this.userName += this.$store.state.userName
    let that = this
    let formData = new FormData()
    formData.append('flag', 'dispenseFetch')
    formData.append('userId', this.$store.state.userId)
    // get order's number
    this.$http.post('order_mng.php', formData)
      .then(function (res) {
        // use order's number get order's detail
        let ordersItem = res.data[0].st_orders
        // ordersItem.forEach((item, index) => {
        let formData2 = new FormData()
        formData2.append('flag', 'dispenseDetail')
        formData2.append('ordersItem', ordersItem)
        // formData2.append('orderNum', item)
        that.$http.post('order_mng.php', formData2)
          .then(function (res) {
            that.myOrderData = res.data
            // that.myOrderData.push(res.data)
            // console.log('aaa', res.data)
          }).catch(function (err) {
            console.log(err)
          })
        // })
        // console.log('dispenseFetchRes', that.myOrderList)
      }).catch(function (err) {
        console.log(err)
      })
      // console.log('orderNum', that.myOrderData)
  },
  methods: {
    whetherSubmit () {
      this.$confirm('将要添加一条新的日志, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitAcord()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加！'
        })
      })
    },
    submitAcord () {
      // console.log('id:',this.submitAcordId,'title:', this.submitAcordTitle, 'content', this.submitAcordContent, 'userName:', this.userName, 'uploadImg:', this.acordImgs)
      let that = this
      let formData = new FormData()
      formData.append('flag', 'addAcord')
      formData.append('order_id', this.submitAcordId)
      formData.append('acord_title', this.submitAcordTitle)
      formData.append('acord_content', this.submitAcordContent)
      formData.append('acord_man', this.userName)
      formData.append('acord_img', this.acordImgs)
      this.$http.post('order_acord.php', formData)
        .then(function (res) {
          if (res.data === 'addAcordSuc') {
            that.$message({
              type: 'success',
              message: '成功添加!'
            })
            that.acordVisible = false
          } else {
            that.$message.error('添加失败！')
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      let fileName = file.response
      this.acordImgsNew = []
      this.acordImgs.forEach((v, k) => {
        if (v.indexOf(fileName) === -1) {
          this.acordImgsNew.push(v)
          // v.splice(s, 1)
          // console.log('no：', v)
        }
      })
      this.acordImgs = this.acordImgsNew
      // console.log(this.acordImgs)
    },
    handlePreview (file) {
      this.acordImgs.push(file)
      // console.log(this.acordImgs)
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
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
      this.shopInfo.s_descInfo = row.desc_info
      this.shopInfo.s_timeLimit = row.time_limit
      this.shopInfo.s_salesMan = row.sales_man
      // split string for array
      let someImgArr = []
      let someImg = row.some_img
      if (someImg !== '') {
        let someStr = someImg.split(',')
        for (let i = 0; i < someStr.length; i++) {
          someImgArr.push(someStr[i])
        }
      }
      // console.log('AAAA',someImgArr)
      this.shopInfo.s_someImg = someImgArr
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
