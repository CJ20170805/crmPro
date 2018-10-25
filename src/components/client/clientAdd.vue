<template>
  <div class="client-add">
    <div class="client-main">
       <el-form :model="client" :rules="rules" ref="client" label-width="100px">
        <div class="form-title">
          <p>客户信息</p>
        </div>
        <el-form-item label="客户名称" prop="name">
          <el-col :span="9">
             <el-input v-model="client.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客户类型">
            <el-col :span="9">
              <el-radio-group v-model="client.type">
                <el-radio label="新客户"></el-radio>
                <el-radio label="老客户"></el-radio>
              </el-radio-group>
            </el-col>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-col :span="9">
             <el-input v-model="client.address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="linkMethods">
          <!-- <el-input v-model="shop.linkMethods"></el-input> -->
           <el-input placeholder="请输入联系方式" v-model="client.linkMethods" class="input-with-select">
            <el-select style="width:100px;" v-model="client.linkMethodsSel" slot="prepend" placeholder="请选择">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="旺旺" value="旺旺"></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item label="客户意向">
          <el-input type="textarea" rows="4" v-model="client.intent"></el-input>
        </el-form-item>

        <div class="form-title">
          <p>联系信息</p>
        </div>

        <el-form-item label="录入人员">
          <el-col :span="9">
            <el-input v-model="client.writeMan" :disabled="true"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="销售人员" prop="salesMan">
          <el-col :span="9">
            <el-input v-model="client.salesMan"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="联系日期">
          <el-col :span="9">
            <!-- <el-input v-model="shop.payPrice" suffix-icon="el-icon-sold-out"></el-input> -->
             <el-date-picker
                v-model="client.linkDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>

       <el-form-item label="联系渠道">
            <el-col :span="9">
              <el-radio-group v-model="client.linkChannel">
                <el-radio label="电话沟通"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
            </el-col>
        </el-form-item>

        <el-form-item label="备注信息">
          <el-input type="textarea" rows="4" v-model="client.descInfo"></el-input>
        </el-form-item>

        <el-form-item label="添加附件">

              <!--action="http://localhost:8080/api/crmApi/client_img.php" -->

          <el-upload
            action="http://www.huibohehe.com/crmApi/client_img.php"
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
          <el-button type="primary" @click="submitNewClient">立即创建</el-button>
          <el-button @click="resetForm('client')">重置</el-button>
        </el-form-item>
     </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        client: {
          name: '',
          type: '',
          address: '',
          linkMethods: '',
          intent: '',
          salesMan: '',
          linkDate: '',
          linkChannel: '',
          descInfo: '',
          linkMethodsSel: '',
          writeMan: ''
        },
        clientFiles: [],
        clientFilesNew: [],
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          linkMethods: [
            { required: true, message: '请输入联系人的联系方式', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          salesMan: [
            { required: true, message: '请输入销售人员姓名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.client.writeMan = this.$store.state.userDepart
      this.client.writeMan += '✈'
      this.client.writeMan += this.$store.state.userName
    },
    methods: {
      orderUploadSuc (response, file, fileList) {
        let imgUrl = file.response
        this.clientFiles.push(imgUrl)
        // console.log("Onsuc",this.orderImgs)
      },
      handleRemove (file, fileList) {
        let fileName = file.name
        this.clientFilesNew = []
        this.clientFiles.forEach((v, k) => {
          if (v.indexOf(fileName) === -1) {
            this.clientFilesNew.push(v)
          }
        })
        this.clientFiles = this.clientFilesNew
        // console.log("OnErr",this.orderImgs)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      submitNewClient () {
        this.$confirm('即将添加新客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm('client')
        // console.log(this.client.type)
          // this.submitFlag = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      },

      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            // alert(this.shop.payPrice)
            let linkStr = this.client.linkMethodsSel + ':' + this.client.linkMethods
            let that = this
            let formData = new FormData()
            formData.append('flag', 'add')
            formData.append('client_name', this.client.name)
            formData.append('client_type', this.client.type)
            formData.append('client_address', this.client.address)
            formData.append('client_link', linkStr)
            formData.append('client_intent', this.client.intent)
            formData.append('sales_man', this.client.salesMan)
            formData.append('link_date', this.client.linkDate)
            formData.append('link_channel', this.client.linkChannel)
            formData.append('desc_info', this.client.descInfo)
            formData.append('write_man', this.client.writeMan)
            formData.append('files', this.clientFiles)
            this.$http.post('client_mng.php', formData)
              .then(function (res) {
                console.log(res)
            if (res.data === 'AddSUC') {
              that.$message({
                type: 'success',
                message: '添加成功!'
              })
              that.$store.state.defaultComp = 'clientList'
            } else {
              that.$message({
                type: 'info',
                message: '请检查表单是否正确填写!'
              })
            }
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
.submitBtn{
  padding:80px 0 100px 300px;
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
.client-add{
    width: 100%;
    height: 100%;
    padding: 60px 0 100px 0;
}
.client-main{
    width: 600px;
    margin: 0 auto;
}
.el-checkbox+.el-checkbox{
    margin-left: 10px;
}
</style>
