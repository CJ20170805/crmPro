<template>
    <div class="header">
        <el-container>
           <el-header>

 <!-- 先获取当前登陆用户名  然后通过此用户名 查询数据库 获取其他相关信息 -->

              <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
                @select="handleSelect"
                background-color="#24292e"
                text-color="#fff"
                active-text-color="#ffffff">
                >
                <li class="site-logo" style="font-weight:bold;">信息管理系统</li>

                <!-- <li class="site-btns">
                    <el-button type="primary" class="loginOutBtn" plain @click="loginOut">退出登录</el-button>
                </li> -->
                <el-menu-item index='1'>
                   首页
                </el-menu-item>
                <el-menu-item index='2'>
                   问题反馈
                </el-menu-item>
              <el-menu-item index='1111'>
                   <!-- <span style="font-size:1.4em;font-weight:bold;padding-left:400px;">正在维护中，可能出现功能异常！请稍后使用！(11-20,16:40)</span> -->
                </el-menu-item>
                <el-submenu style="float:right;" class="userInfo" index='2'>
                    <template slot="title">
                         <img class='header-img' ref="usersImg" src="https://img.alicdn.com/imgextra/i3/662134481/O1CN011iyLEkOqL2AVhlE-662134481.png" alt="userLogo">
                    </template>
                    <li style="padding:10px;color:#ffffff">当前用户:<span style="margin-left:20px">{{ userLoginData.st_name }}</span></li>
                    <el-menu-item index="2-1" @click="userInfoSet">资料设置</el-menu-item>
                    <el-menu-item index="2-6" @click="loginOut">退出登录</el-menu-item>
                    <!-- <el-submenu index="2-4">
                      <template slot="title">用户切换</template>
                        <el-menu-item index="2-4-1">user-1</el-menu-item>
                        <el-menu-item index="2-4-2">user-2</el-menu-item>
                        <el-menu-item index="2-4-3">user-3</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                  <li style="float:right;line-height:60px;margin-right:30px;">
                      <el-badge :value="auditNums" class="item">

                           <el-popover
                                placement="bottom"
                                title=""
                                width="320"
                                trigger="click"
                                >
                                <div class="notified">
                                  <dl>
                                    <dd>
                                      <i class="el-icon-news"></i>
                                      <span v-if="auditNums === ''">暂无消息</span>
                                      <span v-if="auditNums !== 0 && auditNums !== ''">您有{{auditNums}}个订单需要审核</span>
                                      <span style="float:right"></span>
                                    </dd>
                                    <dt>
                                      <span @click="gotoAudit" v-if="$store.getters.userAuthority !== '80002'">进入审核列表</span>
                                    </dt>
                                  </dl>
                                </div>
                                <el-button slot="reference" size="small">
                                  <i class="el-icon-bell"></i>
                                </el-button>
                            </el-popover>

                      </el-badge>
                  </li>
                </el-menu>
           </el-header>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '3443',
      userLoginData: '',
      activeIndex: '1',
      auditNums: ''
    }
  },
  methods: {
    loginOut () {
      sessionStorage.removeItem('loginFlag')
      location.reload()
    },
    userInfoSet () {
      this.$store.state.defaultComp = 'userInfoSet'
    },
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$store.state.defaultComp = 'homePage'
      } else if (key === '2') {
        this.$store.state.defaultComp = 'feedBack'
      }
      // console.log(key, keyPath)
    },
    gotoAudit () {
      this.$store.state.defaultComp = 'myAudit'
    }
  },
  mounted () {
  },
  created () {
    let usern = sessionStorage.getItem('loginFlag')
    let that = this
    let formdata = new FormData()
    formdata.append('code', '100')
    formdata.append('username', usern)
    this.$http.post('user_info.php', formdata)
      .then(function (res) {
        // console.log('user_info', res)
        // console.log('storge', usern)
        let data = res.data[0]
        that.userLoginData = data
        that.$store.state.userName = data.st_name
        that.$store.state.userId = data.id
        that.$store.state.userPower = data.st_power
        that.$store.state.userDepart = data.st_departmentVal
        let password = data.st_word
        if (data.st_avatar !== null) {
          // alert(that.userLoginData.st_avatar)
          that.$store.state.userAvatar = data.st_avatar
          that.$refs.usersImg.src = that.$store.state.userAvatar
        }
        if (password === '12321') {
           that.$alert('<p style="color:red; font-size:1.15em; font-weight:600;">用户首次登陆请重置密码！</p><br><span>1、点击右上角头像</span><br><span>2、打开资料设置</span><br><p>3、填写新密码并点击确认重置</p>', '安全提示', {
              confirmButtonText: '确定',
              dangerouslyUseHTMLString: true
            })
        }
          //  fetch audit order's id
          setInterval(() => {
                let formData2 = new FormData()
                formData2.append('st_flag', 'auditFetch')
                formData2.append('staff_id', data.id)
                that.$http.post('staff_mng.php', formData2)
                  .then(function (res) {
                    if (res.data !== '') {
                      let str = String(res.data)
                      let strs = str.split(';')
                      // console.log('useRid', strs)
                      that.auditNums = strs.length - 1
                    } else {
                      that.auditNums = ''
                    }
                  }).catch(function (err) {
                    console.log(err)
                  })
          }, 20000)
      }).catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style lang="less">
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  border: none!important;
}
.el-badge__content.is-fixed{
    top: 12px!important;
}
.notified{
  width:320px;
  min-height: 40px;
  overflow-x:hidden;
  dl{
    dd{
      margin-left: 0;
      height: 30px;
      border-bottom: 1px solid #cccccc;
      color: #b3adad;
    }
    dt{
      padding-top: 8px;
      span{
        display: inline-block;
        line-height: 24px;
        text-align: center;
        width: 100%;
        color: #ffffff;
        background-color: #409EFF;
        border: 1px solid #cccccc;
        cursor: pointer;
      }
    }
  }
}
.site-logo{
    float: left;
    line-height: 60px;
    margin-right: 100px;
    font-size: 1.1em;
    color: #ffffff;
    margin-left: 34px;
}
.el-header{
   padding: 0 !important;
}
.site-btns{
    float: right;
    height: 60px;
    .loginOutBtn{
        margin-left: 30px;
        margin-right: 40px;
        margin-top: 10px;
    }
}
.header .header-img{
  width:40px;
  height: 40px;
  border-radius: 2px;
}
</style>
