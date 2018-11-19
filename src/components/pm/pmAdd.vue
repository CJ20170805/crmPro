<template>
    <div class="pm-add">
      <div class="pm-main">
        <el-form :model="pmForm" :rules="rules" ref="pmForm" label-width="100px">
            <div class="form-title">
              <p>签单信息</p>
            </div>
            <el-form-item label="签单人员"  required>
                <el-col :span="9">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                     <el-select v-model="pmForm.reachMan" filterable placeholder="请选择(可搜索)">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="签单类型" required>
                <el-col :span="9">
                      <el-cascader
                              style="float:left"
                              :options="departmentOptions"
                              placeholder="请选择签单类型"
                              v-model="pmForm.reachType"
                              ></el-cascader>
                </el-col>
            </el-form-item>
          <el-form-item label="签单渠道">
          <el-col :span="10">
               <el-select v-model="pmForm.reachMethods" placeholder="请选择签单渠道">
                <el-option label="线下" value="线下"></el-option>
                <el-option label="JD服务市场" value="JD服务市场"></el-option>
                <el-option label="Ali服务市场" value="Ali服务市场"></el-option>
                <el-option label="直通车BP后台" value="直通车BP后台"></el-option>
              </el-select>
          </el-col>
        </el-form-item>
            <el-form-item label="签单产品" required>
                <el-col :span="12">
                    <el-input v-model="pmForm.buyServ"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="客户姓名" prop="clientName">
                <el-col :span="12">
                    <el-input v-model="pmForm.clientName"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="店铺名称">
                <el-col :span="12">
                    <el-input v-model="pmForm.shopName"></el-input>
                </el-col>
            </el-form-item>
                  <el-form-item label="店铺ID">
                <el-col :span="12">
                    <el-input v-model="pmForm.shopId"></el-input>
                </el-col>
            </el-form-item>
          <el-form-item label="服务时间" required>
            <el-col :span="11">
                <el-date-picker
                v-model="pmForm.timeLimit"
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
           <div class="form-title">
              <p>到账信息</p>
            </div>
              <el-form-item label="到账时间" required>
                <el-col :span="8">
                    <el-date-picker
                        v-model="pmForm.reachDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-form-item>
             <el-form-item label="到账类型" prop="region">
              <el-col :span="10">
                  <el-select v-model="pmForm.buyType" placeholder="请选择到账类型">
                    <el-option label="钻展类" value="zuanzhan"></el-option>
                    <el-option label="直通车类" value="zhitongche"></el-option>
                    <el-option label="托管类" value="tuoguan"></el-option>
                    <el-option label="装修类" value="zhuangxiu"></el-option>
                      <el-option label="佣金" value="yongjin"></el-option>
                        <el-option label="其他" value="qita"></el-option>
                  </el-select>
              </el-col>
            </el-form-item>
        <el-form-item label="签单金额" prop="reachPrice">
          <el-col :span="10">
            <el-input type="number" v-model="pmForm.reachPrice" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="到账金额" prop="payPrice">
          <el-col :span="10">
            <el-input type="number" v-model="pmForm.payPrice" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="直接成本" prop="payCost">
          <el-col :span="10">
            <el-input type="number" v-model="pmForm.payCost" suffix-icon="el-icon-sold-out"></el-input>
          </el-col>
        </el-form-item>
          <el-form-item label="到账方式">
          <el-col :span="10">
               <el-select v-model="pmForm.payMethods" placeholder="请选择付款方式">
                <el-option label="分公司账号" value="分公司账号"></el-option>
                <el-option label="支付宝TP" value="支付宝TP"></el-option>
                <el-option label="京东钱包" value="京东钱包"></el-option>
                <el-option label="微信支付" value="微信支付"></el-option>
                <el-option label="网银支付" value="网银支付"></el-option>
                <el-option label="现金支付" value="现金支付"></el-option>
              </el-select>
          </el-col>
        </el-form-item>
            <el-form-item label="付款账号">
                <el-col>
                    <el-input v-model="pmForm.payId" suffix-icon="el-icon-star-off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="收款账号">
                <el-col>
                    <el-input v-model="pmForm.recId" suffix-icon="el-icon-star-off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="交易订单号">
                <el-col>
                    <el-input v-model="pmForm.dealId"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="附件添加">
                  <!-- action="http://localhost:8080/api/crmApi/pm_img.php" -->
                <el-col :span="9">
                    <el-upload
                        class="upload-demo"
                        action="http://www.huibohehe.com/crmApi/pm_img.php"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuc"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传图片或压缩文件</div>
                    </el-upload>
                </el-col>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input type="textarea" rows="4" v-model="pmForm.elseDesc"></el-input>
            </el-form-item>
            <el-form-item class="submitBtn">
                  <el-button type="primary" class="" @click="submitForm('pmForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        pmForm: {
          shopName: '',
          shopId: '',
          reachType: [],
          reachMethods: '',
          reachPrice: '',
          payPrice: '',
          payCost: '',
          payMethods: '',
          timeLimit: '',
          reachDate: '',
          clientName: '',
          reachMan: '',
          buyServ: '',
          servPrice: '',
          payId: '',
          recId: '',
          dealId: '',
          elseDesc: '',
          buyType: '',
          uploadImgs: [],
          uploadImgsNew: []
        },
        options: [],
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
        rules: {
          clientName: [
            { required: true, message: '请填写客户名称', trigger: 'change' }
          ],
          payId: [
            { required: true, message: '请填写付款账户名称', trigger: 'change' }
          ]
        },
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
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this
            let formData = new FormData()
            let reachMan = this.pmForm.reachMan.split(';')
            formData.append('flag', 'add')
            formData.append('id', reachMan[0])
            formData.append('apart', reachMan[1])
            formData.append('name', reachMan[2])
            formData.append('reach_date', this.pmForm.reachDate)
            formData.append('client_name', this.pmForm.clientName)
            formData.append('buy_serv', this.pmForm.buyServ)
            formData.append('serv_price', this.pmForm.servPrice)
            formData.append('time_limit', this.pmForm.timeLimit)
            // pay info
            formData.append('buy_type', this.pmForm.buyType)
            formData.append('pay_price', this.pmForm.payPrice)
            formData.append('pay_id', this.pmForm.payId)
            formData.append('rec_id', this.pmForm.recId)
            formData.append('deal_id', this.pmForm.dealId)
            formData.append('else_desc', this.pmForm.elseDesc)
            formData.append('upload_imgs', this.pmForm.uploadImgs)
            // new add
            formData.append('job_type', reachMan[1].substring(0, 2))
            formData.append('shop_id', this.pmForm.shopId)
            formData.append('shop_name', this.pmForm.shopName)
            formData.append('reach_type', this.pmForm.reachType)
            formData.append('reach_methods', this.pmForm.reachMethods)
            formData.append('pay_methods', this.pmForm.payMethods)
            formData.append('reach_price', this.pmForm.reachPrice)
            formData.append('pay_cost', this.pmForm.payCost)
            this.$http.post('pm_mng.php', formData)
              .then(function (res) {
                // console.log(res)
            if (res.data === 'AddSUC') {
              that.$message({
                type: 'success',
                message: '录入成功!'
              })
              that.$store.state.defaultComp = 'pmList'
            } else {
              that.$message({
                type: 'info',
                message: '录入失败!'
              })
            }
              // alert(that.submitFlag)
              }).catch(function (err) {
                console.log(err)
              })
          } else {
            this.$message.error('请检查表单填写!')
            return false
          }
        })
      },
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 10MB!')
        }
        return isLt2M
      },
      handleRemove (file, fileList) {
        // console.log(file, fileList)
        let fileName = file.name
        this.pmForm.uploadImgsNew = []
        this.pmForm.uploadImgs.forEach((v, k) => {
          if (v.indexOf(fileName) === -1) {
            this.pmForm.uploadImgsNew.push(v)
          }
        })
        this.pmForm.uploadImgs = this.pmForm.uploadImgsNew
        // console.log(this.pmForm.uploadImgs)
      },
      handlePreview (file) {
      },
      handleSuc (response, file, fileListfile) {
        this.pmForm.uploadImgs.push(file.response)
        console.log(this.pmForm.uploadImgs)
        // let fileArr = []
        // fileArr.push(file)
        // console.log(fileArr)
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
            that.options.push({
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
.pm-add{
    width: 600px;
    margin: 0 auto;
}
.pm-main{
    width: 100%;
    height: 100%;
    padding: 60px 0 100px 0;
}
.submitBtn{
  padding:80px 0 100px 300px;
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
</style>
