<template>
    <div class="pm-add">
      <div class="pm-main">
        <el-form :model="pmForm" :rules="rules" ref="pmForm" label-width="100px">
            <div class="form-title">
              <p>订购信息</p>
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
            <el-form-item label="签单时间" required>
                <el-col :span="9">
                    <el-date-picker
                        v-model="pmForm.reachDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="客户名称" prop="clientName">
                <el-col :span="12">
                    <el-input v-model="pmForm.clientName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="订购服务" >
                <el-col :span="12">
                    <el-input v-model="pmForm.buyServ"></el-input>
                </el-col>
            </el-form-item>
             <el-form-item label="服务费用"  required>
                <el-col :span="12">
                    <el-input v-model="pmForm.servPrice"></el-input>
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
             <el-form-item label="到账类型" prop="region">
              <el-col :span="10">
                  <el-select v-model="pmForm.buyType" placeholder="请选择到账类型">
                    <el-option label="钻展类" value="钻展类"></el-option>
                    <el-option label="直通车类" value="直通车类"></el-option>
                    <el-option label="托管类" value="托管类"></el-option>
                    <el-option label="装修类" value="装修类"></el-option>
                      <el-option label="佣金" value="佣金"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                  </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="到账金额" >
                <el-col :span="12">
                    <el-input v-model="pmForm.payPrice" suffix-icon="el-icon-star-off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="付款账户" prop="payId">
                <el-col>
                    <el-input v-model="pmForm.payId" suffix-icon="el-icon-star-off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="收款账户" required>
                <el-col>
                    <el-input v-model="pmForm.recId" suffix-icon="el-icon-star-off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="交易订单号" required>
                <el-col>
                    <el-input v-model="pmForm.dealId"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="交易凭证">
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
        timeLimit: '',
        reachDate: '',
        clientName: '',
        reachMan: '',
        buyServ: '',
        servPrice: '',
        payPrice: '',
        payId: '',
        recId: '',
        dealId: '',
        elseDesc: '',
        buyType: '',
        uploadImgs: [],
        uploadImgsNew: []
        },
        options: [],
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
            this.$http.post('pm_mng.php', formData)
              .then(function (res) {
                console.log(res)
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
          console.log('DDDDAta:', data)
          for (let i = 0; i < data.length; i++) {
            that.options.push({
              value: data[i].id + ';' + data[i].st_departmentVal + ';' + data[i].st_name,
              label: data[i].st_departmentVal + data[i].st_name
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
