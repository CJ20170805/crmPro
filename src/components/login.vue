<template>
    <div class="login-wrap">
      <div class="login-form">
          <div class="login-logo">
              <img src="../assets/logo.png" alt="logo" height="180px">
          </div>
          <form>
               <el-input class="username" placeholder="请输入用户名" v-model="un" type="text" suffix-icon="el-icon-edit"> </el-input>
               <el-input class="password" @keyup.native.enter="submitLogin"  placeholder="请输入密码" v-model="pw" type="password" suffix-icon="el-icon-setting"> </el-input>
               <!-- <el-button class="resetInput" type="info" plain @click="resetLogin">重置</el-button> -->
               <el-button class="loginIn" type="info" plain @click="submitLogin">登陆</el-button>
               <el-button type="danger" disabled v-show="loginStatus">账号或密码错误</el-button>
          </form>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      loginStatus: 0,
      un: '',
      pw: ''
    }
  },
  methods: {
    submitLogin () {
    //   sessionStorage.setItem('aaaccc', 'bbbe123')
    //   this.$router.push({path: '/index'})
    //   alert(sessionStorage.getItem('aaac'))
      let that = this
      this.$http.get('api_login.php?un=' + this.un + '&pw=' + this.pw)
        .then(function (res) {
          // console.log('LoginCodedede', res)
          if (res.data.loginCode === '10000') {
            sessionStorage.setItem('loginFlag', res.data.userName)
            that.$router.push({path: '/index'})
            // console.log('Had set!!!!')
          } else {
            that.loginStatus = 1
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    resetLogin () {
      alert(1)
    }
  },
  created () {
      console.log('Version 1.016 Build 201811120938 By CJ %c QQ:1947055834', 'color:red')
      console.log('%c 石家庄灵动共创', 'text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15); font-size:5em')
  }
}
</script>
<style lang="less">
.html{
    height: 100%;
}
.login-wrap{
    width: 100%;
    height: 100%;
    background-color: #2f3638;
    overflow: hidden;
    .login-form{
        width: 300px;
        height: 400px;
        background-color: #f4f4f4;
        margin: 12% auto 0;
        border-radius: 6px;
        padding:10px;
        box-sizing: border-box;
        .login-logo{
            width: 100%;
            height: 180px;
        }
        form{
          input{
              margin: 10px 0;
          }
          button{
              float:right;
              margin: 10px 6px;
          }
        }
    }
}
</style>
