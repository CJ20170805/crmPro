<template>
  <div class="order-add">
    <div class="order-main">
       <el-form :model="shop" :rules="rules" ref="shop" label-width="100px">
        <div class="form-title">
          <p>店铺信息</p>
        </div>
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="shop.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺链接" prop="url">
          <el-input v-model="shop.url"></el-input>
        </el-form-item>
        <el-form-item label="店铺ID" prop="id">
          <el-input v-model="shop.id"></el-input>
        </el-form-item>
         <el-form-item label="店铺等级">
          <el-input v-model="shop.grade"></el-input>
        </el-form-item>
         <el-form-item label="所属行业">
          <el-input v-model="shop.industry"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型">
            <el-col :span="24">
              <el-radio-group v-model="shop.type">
                <el-radio label="天猫店铺"></el-radio>
                <el-radio label="淘宝店铺"></el-radio>
                <el-radio label="京东店铺"></el-radio>
                <el-radio label="拼多多店铺"></el-radio>
              </el-radio-group>
            </el-col>
        </el-form-item>
        <el-form-item label="联系人" prop="linkMan">
          <el-input v-model="shop.linkMan"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-input v-model="shop.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="linkMethods">
          <!-- <el-input v-model="shop.linkMethods"></el-input> -->
           <el-input placeholder="请输入内容" v-model="shop.linkMethods" class="input-with-select">
            <el-select style="width:100px;" v-model="shop.linkMethodsSel" slot="prepend" placeholder="请选择">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="旺旺" value="旺旺"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <div class="form-title">
          <p>订单信息</p>
        </div>
         <el-form-item label="签单人员"  required>
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                     <el-select v-model="shop.salesMan" filterable placeholder="请选择(可搜索)">
                        <el-option
                        v-for="item in options222"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
        </el-form-item>

       <el-form-item label="到账类型">
              <el-col :span="10">
                  <el-select v-model="shop.buyType" placeholder="请选择到账类型">
                    <el-option label="钻展类" value="zuanzhan"></el-option>
                    <el-option label="直通车类" value="zhitongche"></el-option>
                    <el-option label="托管类" value="tuoguan"></el-option>
                    <el-option label="装修类" value="zhuangxiu"></el-option>
                      <el-option label="佣金" value="yongjin"></el-option>
                        <el-option label="其他" value="qita"></el-option>
                  </el-select>
              </el-col>
        </el-form-item>

        <el-form-item label="签单产品" required>
          <el-col :span="10">
              <!-- <el-select v-model="comboInfo" placeholder="请选择已订购的套餐">
                <el-option label="店铺运营流量白金版/7000/2个月" value="店铺运营流量白金版"></el-option>
                <el-option label="店铺运营白银版/6000/5款产品/2个月" value="店铺运营白银版"></el-option>
                <el-option label="店铺运营黄金版/8000/5款产品/2个月" value="店铺运营黄金版"></el-option>
                 <el-option label="店铺运营铂金版/12000/5款产品/2个月" value="店铺运营铂金版"></el-option>
                  <el-option label="店铺运营钻石版/22000/10款产品/2个月" value="店铺运营钻石版"></el-option>
              </el-select> -->
              <el-input v-model="comboInfo" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="签单类型" required>
          <el-col :span="10">
                <el-cascader
                        style="float:left"
                        :options="departmentOptions"
                        placeholder="请选择签单类型"
                        v-model="reachType"
                        ></el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="签单渠道">
          <el-col :span="10">
               <el-select v-model="shop.reachMethods" placeholder="请选择签单渠道">
                <el-option label="线下" value="线下"></el-option>
                <el-option label="JD服务市场" value="JD服务市场"></el-option>
                <el-option label="Ali服务市场" value="Ali服务市场"></el-option>
                <el-option label="直通车BP后台" value="直通车BP后台"></el-option>
              </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="签单金额" prop="reachPrice">
          <el-col :span="10">
            <el-input type="number" v-model="shop.reachPrice" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="到账金额" prop="payPrice">
          <el-col :span="10">
            <el-input type="number" v-model="shop.payPrice" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="直接成本" prop="payCost">
          <el-col :span="10">
            <el-input type="number" v-model="shop.payCost" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="到账日期">
          <el-col :span="10">
            <!-- <el-input v-model="shop.payPrice" suffix-icon="el-icon-sold-out"></el-input> -->
             <el-date-picker
                v-model="shop.payDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
         <el-form-item label="到账方式">
          <el-col :span="10">
               <el-select v-model="shop.payMethods" placeholder="请选择付款方式">
                <el-option label="分公司账号" value="分公司账号"></el-option>
                <el-option label="支付宝TP" value="支付宝TP"></el-option>
                <el-option label="京东钱包" value="京东钱包"></el-option>
                <el-option label="微信支付" value="微信支付"></el-option>
                <el-option label="网银支付" value="网银支付"></el-option>
                <el-option label="现金支付" value="现金支付"></el-option>
              </el-select>
          </el-col>
        </el-form-item>
         <el-form-item label="付款账号" prop="payId">
          <el-col :span="17">
            <el-input v-model="shop.payId" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
           <el-form-item label="收款账号">
          <el-col :span="17">
            <el-input v-model="shop.recId" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
          <el-form-item label="交易订单号">
          <el-col :span="17">
            <el-input v-model="shop.priceId" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="联系人" prop="linkMan">
          <el-input v-model="shop.linkMan"></el-input>
        </el-form-item> -->
        <el-form-item label="服务时间" required>
          <el-col :span="11">
            <el-date-picker
              v-model="shop.timeLimit"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              value-format="yyyy-MM-dd"
              end-placeholder="结束日期"
              :picker-options="servTimeLimit">
            </el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="备注信息">
          <el-input type="textarea" rows="6" v-model="descInfo"></el-input>
        </el-form-item>

        <el-form-item label="添加附件">

              <!-- action="http://www.huibohehe.com/crmApi/order_img.php" -->

          <el-upload
            action="http://www.huibohehe.com/crmApi/order_img.php"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="orderUploadSuc"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-col :span="3">
              <el-switch v-model="shop.delivery"></el-switch>
          </el-col>
        </el-form-item> -->

        <el-form-item class="submitBtn">
          <!-- <el-button type="primary" @click="alertVal">AAAA</el-button> -->
          <!-- <el-button type="primary" @click="submitForm('shop')">立即创建</el-button> -->
          <el-button type="primary" @click="submitNewOrder">立即创建</el-button>
          <el-button @click="resetForm('shop')">重置</el-button>
        </el-form-item>
     </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        shop: {
          name: '',
          id: '',
          url: '',
          linkMan: '',
          linkMethods: '',
          linkMethodsSel: '',
          reachMethods: '',
          payPrice: '',
          reachPrice: '',
          payCost: 0,
          timeLimit: '',
          payId: '',
          payMethods: '',
          payDate: '',
          salesMan: '',
          buyType: '',
          recId: '',
          priceId: '',
          grade: '',
          industry: '',
          address: ''
          // delivery: false,
        },
        options222: [],
        rules: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入店铺链接', trigger: 'blur' },
            { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请输入店铺id', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          linkMan: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          linkMethods: [
            { required: true, message: '请输入联系人的联系方式', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          payPrice: [
            { required: true, message: '请输入到账金额', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          reachPrice: [
            { required: true, message: '请输入签单金额', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          payId: [
            { required: true, message: '请输入付款账号', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          salesMan: [
            { required: true, message: '请输入签单人员姓名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
          // region: [
          //   { required: true, message: '请选择活动区域', trigger: 'change' }
          // ],
          // type: [
          //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          // ],
          // resource: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ]
        },
        departmentOptions: [
          {
            value: '新单',
            label: '新单',
            children: [
              {
                value: '首款',
                label: '首款'
              },
              {
                value: '尾款',
                label: '尾款'
              },
              {
                value: '全款',
                label: '全款'
              }
            ]
          },
          {
            value: '续费',
            label: '续费',
            children: [
              {
                value: '首款',
                label: '首款'
              },
              {
                value: '尾款',
                label: '尾款'
              },
              {
                value: '全款',
                label: '全款'
              }
            ]
          },
          {
            value: '分业绩',
            label: '分业绩'
          },
          {
            value: '换店/换产品',
            label: '换店/换产品'
          }
        ],
        comboInfo: '',
        descInfo: '',
        reachType: [],
        submitFlag: false,
        orderImgs: [],
        orderImgsNew: [],
        servTimeLimit: {
          shortcuts: [
          {
            text: '快捷可选'
          },
          {
            text: '一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '六个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
            }
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      orderUploadSuc (response, file, fileList) {
        let imgUrl = file.response
        this.orderImgs.push(imgUrl)
        // console.log("Onsuc",this.orderImgs)
      },
      handleRemove (file, fileList) {
        let fileName = file.name
        this.orderImgsNew = []
        this.orderImgs.forEach((v, k) => {
          if (v.indexOf(fileName) === -1) {
            this.orderImgsNew.push(v)
          }
        })
        this.orderImgs = this.orderImgsNew
        // console.log("OnErr",this.orderImgs)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      submitNewOrder () {
        this.$confirm('即将开始下单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm('shop')
          // this.submitFlag = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下单'
          })
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            // alert(this.shop.payPrice)
            let linkStr = this.shop.linkMethodsSel + ':' + this.shop.linkMethods
            let sales = this.shop.salesMan.split(';')
            let that = this
            let formData = new FormData()
            formData.append('flag', 'add')
            formData.append('power', this.$store.getters.userAuthority)
            formData.append('shop_name', this.shop.name)
            formData.append('shop_url', this.shop.url)
            formData.append('shop_id', this.shop.id)
            formData.append('shop_type', this.shop.type)
            formData.append('link_man', this.shop.linkMan)
            formData.append('link_methods', linkStr)
            formData.append('combo_info', this.comboInfo)
            formData.append('pay_price', this.shop.payPrice)
            formData.append('reach_price', this.shop.reachPrice)
            formData.append('pay_id', this.shop.payId)
            formData.append('pay_methods', this.shop.payMethods)
            formData.append('pay_date', this.shop.payDate)
            formData.append('time_limit', this.shop.timeLimit)
            formData.append('desc_info', this.descInfo)
            formData.append('some_img', this.orderImgs)
            formData.append('sales_man', sales[2])
            formData.append('sales_id', sales[0])
            formData.append('sales_apart', sales[1])
            formData.append('buy_type', this.shop.buyType)
            formData.append('rec_id', this.shop.recId)
            formData.append('price_id', this.shop.priceId)
            formData.append('shop_grade', this.shop.grade)
            formData.append('shop_industry', this.shop.industry)
            formData.append('shop_address', this.shop.address)
            formData.append('write_man', this.$store.state.userName)
            // new add 4
            formData.append('reach_type', this.reachType)
            formData.append('pay_cost', this.shop.payCost)
            formData.append('reach_methods', this.shop.reachMethods)
            formData.append('job_type', sales[1].substring(0, 2))
            this.$http.post('order_mng.php', formData)
              .then(function (res) {
               console.log(res)
            if (res.data === 'AddSUC') {
              that.$message({
                type: 'success',
                message: '下单成功!'
              })
              that.$store.state.defaultComp = 'orderList'
            } else {
              that.$message({
                type: 'info',
                message: '请检查表单是否正确填写!'
              })
            }
              // alert(that.submitFlag)
              }).catch(function (err) {
                console.log(err)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    created () {
      let that = this
      let formData = new FormData()
      formData.append('code', '400')
      this.$http.post('user_info.php', formData)
        .then(function (res) {
          let data = res.data
          // console.log('DDDDAta:', data)
          for (let i = 0; i < data.length; i++) {
            that.options222.push({
              value: data[i].id + ';' + data[i].st_departmentVal + ';' + data[i].st_name,
              label: data[i].st_departmentVal + '=>' + data[i].st_name
            })
          }
        //   console.log('StaffName:', that.staffNames)
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.submitBtn{
  padding:60px 0 300px 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.form-title{
  p{
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    color: @blue;
    margin:20px 0 20px 20px;
  }
}
.order-add{
    width: 100%;
    height: 100%;
    padding: 60px 0 100px 0;
}
.order-main{
    width: 600px;
    margin: 0 auto;
}
.el-checkbox+.el-checkbox{
    margin-left: 10px;
}
</style>
