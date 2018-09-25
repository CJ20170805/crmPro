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
                <li class="site-logo">后台系统</li>

                <li class="site-btns">
                    <el-button type="primary" class="loginOutBtn" plain @click="loginOut">退出登录</el-button>
                </li>
                <el-menu-item index="1">首页</el-menu-item>
                <el-submenu index="2" style="float:right;" class="userInfo">
                    <template slot="title">
                         <img :src="headerAvatar" alt="userLogo" width="40px" height="40px">
                    </template>
                    <li style="padding:10px;color:#ffffff">当前用户:<span style="margin-left:20px">{{ userName }}</span></li>
                    <el-menu-item index="2-1" @click="userInfoSet">资料设置</el-menu-item>
                    <el-submenu index="2-4">
                      <template slot="title">用户切换</template>
                        <el-menu-item index="2-4-1">user-1</el-menu-item>
                        <el-menu-item index="2-4-2">user-2</el-menu-item>
                        <el-menu-item index="2-4-3">user-3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                  <li style="float:right;line-height:60px;margin-right:30px;">
                      <el-badge :value="12" class="item">
                           <el-popover
                                placement="bottom"
                                title="标题"
                                width="220"
                                trigger="click"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <el-button slot="reference">click 激活</el-button>
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
      headerAvatar: 'http://localhost:8080/static/img/66b38614.949ceb9.jpg',
      userName: '3443'
    }
  },
  methods: {
    loginOut () {
      sessionStorage.removeItem('loginFlag')
      location.reload()
    },
    userInfoSet () {
      this.$store.state.defaultComp = 'userInfoSet'
    }
  },
  created () {
    let that = this
    this.$http.get('table_json.php?code=1')
      .then(function (res) {
        // console.log(res.data)
        that.staffData = res.data
      }).catch(function (err) {
        console.log(err)
      })
    this.userName = this.$store.state.userName
    // alert(this.$store.state.userName)
  }
}
</script>
<style lang="less">
.el-badge__content.is-fixed{
    top: 12px;
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
   padding: 0;
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
</style>
