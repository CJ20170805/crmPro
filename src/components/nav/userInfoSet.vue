<template>
  <div class="userinfo-set">
    <el-row class="userInfoSet">
      <el-col :span="6">
          <div style="width:220px;padding-top:20px">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/api/test.php"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <p>点击图片更换头像</p>
              </el-upload>

          </div>
      </el-col>
       <el-col :span="4">
          <div style="width:40px;height:200px;">
          </div>
      </el-col>
      <el-col :span="14">
          <div class="passVerify">
            <el-card class="userBoxCard">
              <h2>{{ userName }}</h2>
              <p>石一家一家二家三</p>
            </el-card>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="passReset">
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userName: '',
      imageUrl: 'http://localhost:8080/static/img/66b38614.949ceb9.jpg',
      ruleForm2: {
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
    this.userName = this.$store.state.userName
  }
}
</script>
<style lang="less">
  .userBoxCard{
    margin-bottom:40px;
    background-color: #409EFF;
    border-radius: 8px;
    color: #ffffff;
  }
  .passReset{
    padding: 10px 40px 10px 0;
  }
  .userInfoSet{
    width: 1000px;
    margin:0 auto!important;
    padding: 60px;
    .passVerify{
      padding: 20px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
</style>
