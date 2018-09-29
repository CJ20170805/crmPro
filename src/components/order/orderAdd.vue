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
        <el-form-item label="订购套餐" prop="region">
          <el-col :span="9">
              <el-select v-model="comboInfo" placeholder="请选择已订购的套餐">
                <el-option label="套餐一" value="套餐1"></el-option>
                <el-option label="套餐二" value="套餐2"></el-option>
              </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="付款金额" prop="payPrice">
          <el-col :span="9">
            <el-input v-model="shop.payPrice" suffix-icon="el-icon-sold-out"></el-input>
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
          <el-input type="textarea" v-model="descInfo"></el-input>
        </el-form-item>

        <el-form-item label="添加图片">
          <el-upload
            action="http://localhost:8080/api/order_img.php"
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

        <el-form-item>
          <el-button type="primary" @click="alertVal">AAAA</el-button>
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
          payPrice: '',
          timeLimit: ''
          // delivery: false,
        },
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
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
        comboInfo: '',
        descInfo: '',
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
      alertVal () {
        // let linkStr = this.shop.linkMethodsSel + ":" + this.shop.linkMethods
        // alert(linkStr)
        alert(this.payPrice)
      },
      orderUploadSuc (response, file, fileList) {
        let imgUrl = file.response
        this.orderImgs.push(imgUrl)
        console.log(this.orderImgs)
      },
      handleRemove (file, fileList) {
        let fileName = file.name
        this.orderImgs.forEach((v, k) => {
          if (v.indexOf(fileName) === -1) {
            this.orderImgsNew.push(v)
          }
        })
        console.log(this.orderImgsNew)
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
          setTimeout(() => {
            if (this.submitFlag) {
              this.$message({
                type: 'success',
                message: '下单成功!'
              })
            this.$store.state.defaultComp = 'orderList'
            } else {
            this.$message({
              type: 'info',
              message: '请检查表单是否正确填写!'
            })
          }
          }, 1000)
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
            let that = this
            let formData = new FormData()
            formData.append('flag', 'add')
            formData.append('shop_name', this.shop.name)
            formData.append('shop_url', this.shop.url)
            formData.append('shop_id', this.shop.id)
            formData.append('shop_type', this.shop.type)
            formData.append('link_man', this.shop.linkMan)
            formData.append('link_methods', linkStr)
            formData.append('combo_info', this.comboInfo)
            formData.append('pay_price', this.shop.payPrice)
            formData.append('time_limit', this.shop.timeLimit)
            formData.append('desc_info', this.descInfo)
            formData.append('some_img', this.orderImgsNew)
            this.$http.post('order_mng.php', formData)
              .then(function (res) {
                console.log(res)
                that.submitFlag = true
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
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
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
