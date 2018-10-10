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
          <el-steps :active="orderActive" align-center>
            <el-step title="完成下单" ></el-step>
            <el-step title="完成分单" ></el-step>
            <el-step title="服务运营中" ></el-step>
            <el-step title="服务结束" ></el-step>
          </el-steps>
      </div>
       <ul class="imgList">
            <li v-for="(item, index) in shopInfo.s_someImg" :key="index">
              <img :src="item" alt="" width="160px" height="220px">
            </li>
       </ul>
    </el-dialog>

    <!--Order operating acord  -->
    <el-dialog title="" :visible.sync="acordVisible">
        <el-tabs tab-position="left">
          <el-tab-pane label="操作日志">
              <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in abc" :key="index" :title="item.aa+item.bb+'发的说法是的'">
                      <div class="collapse-item-style">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                      <div>
                        <ul>
                          <li><a href="../../assets/logo.png" target="_blank"><img src="../../assets/logo.png" alt=""></a></li>
                          <li><img src="../../assets/logo.png" alt=""></li>
                          <li><img src="../../assets/logo.png" alt=""></li>
                          <li><img src="../../assets/logo.png" alt=""></li>
                        </ul>
                      </div>
                    </el-collapse-item>
              </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="增加日志">
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
                  action="http://localhost:8080/api/order_acord_img.php"
                  :on-success="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeImgUpload"
                  list-type="picture">
                  <el-button size="small" type="info" icon="el-icon-upload">点击上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitAcord">提交日志</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
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
    submitAcord () {
      // console.log('id:',this.submitAcordId,'title:', this.submitAcordTitle, 'content', this.submitAcordContent, 'userName:', this.userName, 'uploadImg:', this.acordImgs)
      let formData = new FormData()
      formData.append('flag', 'addAcord')
      formData.append('order_id', this.submitAcordId)
      formData.append('acord_title', this.submitAcordTitle)
      formData.append('acord_content', this.submitAcordContent)
      formData.append('acord_man', this.userName)
      formData.append('acord_img', this.acordImgs)
      this.$http.post('order_acord.php', formData)
        .then(function (res) {
          console.log('res', res)
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
      console.log(this.acordImgs)
    },
    handlePreview (file) {
      this.acordImgs.push(file)
      console.log(this.acordImgs)
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
    viewAcord (index, row) {
      this.acordVisible = true
      this.submitAcordId = row.id
      //  acord fetch
      let formData = new FormData()
      formData.append('flag', 'fetchAcord')
      formData.append('order_id', this.submitAcordId)
      this.$http.post('order_acord.php', formData)
        .then(function (res) {
          console.log('res', res)
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
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
