<template>
    <div class="index-paper">
        <header-c></header-c>
        <el-container>
            <el-aside style="width:auto">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true" v-if="isCollapse !== true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" :unique-opened="true"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu v-if="$store.getters.userAuthority === '80001' || $store.getters.userAuthority === '80004'" index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span slot="title">员工管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="001" @click="switchComp('staffList')">员工列表</el-menu-item>
                    <el-menu-item index="002" @click="switchComp('staffAdd')">员工添加</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>

                <el-submenu index="10">
                    <template slot="title">
                    <i class="el-icon-phone-outline"></i>
                    <span slot="title">客户管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="1001" @click="switchComp('clientList')">签单客户</el-menu-item>
                     <el-menu-item index="1002" @click="switchComp('intentList')">意向列表</el-menu-item>
                    <el-menu-item index="1003" @click="switchComp('clientAdd')">添加意向</el-menu-item>
                    <!-- <el-menu-item index="002" @click="switchComp('orderAdd')">开始下单</el-menu-item> -->
                    </el-menu-item-group>
                </el-submenu>

                 <el-submenu index="7">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">订单管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="701" @click="switchComp('orderList')">订单列表</el-menu-item>
                    <el-menu-item index="702" @click="switchComp('orderAdd')">
                      新单录入
                    </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">个人中心</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="801" @click="switchComp('myOrder')">我的订单</el-menu-item>
                    <el-menu-item index="803"  v-if="$store.getters.userAuthority === '80002' " @click="switchComp('myPm')">我的业绩</el-menu-item>
                     <el-menu-item index="802" @click="switchComp('myAudit')" v-if="$store.getters.userAuthority === '80001' || $store.getters.userAuthority === '80003'">我的审核</el-menu-item>
                    <!-- <el-menu-item index="002" @click="switchComp('orderAdd')">开始下单</el-menu-item> -->
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="11" v-if="$store.getters.userAuthority !== '80002' ">
                    <template slot="title">
                    <i class="el-icon-news"></i>
                    <span slot="title">业绩管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="1100" v-if="$store.getters.userAuthority === '80001'" @click="switchComp('pmCollect')">业绩统计</el-menu-item>
                    <el-menu-item index="1101" @click="switchComp('pmList')">业绩列表</el-menu-item>
                    <el-menu-item index="1102" @click="switchComp('pmAdd')" v-if="$store.getters.userAuthority === '80001'">业绩录入</el-menu-item>
                    <el-menu-item index="1103" @click="switchComp('pmExport')" v-if="$store.getters.userAuthority === '80001' || $store.getters.userAuthority === '80004'">业绩导出</el-menu-item>
                    <!-- <el-menu-item index="002" @click="switchComp('orderAdd')">开始下单</el-menu-item> -->
                    </el-menu-item-group>
                </el-submenu>
                <!-- <el-menu-item index="222">
                    <i class="el-icon-menu"></i>
                    <span slot="title">问题反馈</span>
                </el-menu-item> -->
                </el-menu>
            </el-aside>
            <el-main ref="elMainHeight">
                <component :is="this.$store.state.defaultComp" class="compon-sc"></component>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import headerC from './nav/header'
import staffList from './staff/staff_list'
import staffAdd from './staff/staff_add'
import userInfoSet from './nav/userInfoSet'
import homePage from './home/homePage'
import orderList from './order/orderList'
import orderAdd from './order/orderAdd'
import myOrder from './my/myOrder'
import myAudit from './my/myAudit'
import clientAdd from './client/clientAdd'
import clientList from './client/clientList'
import intentList from './client/intentList'
import pmAdd from './pm/pmAdd'
import pmList from './pm/pmList'
import pmExport from './pm/pmExport'
import pmCollect from './pm/pmCollect'
import myPm from './my/myPm'
import feedBack from './home/feedback'
export default {
  data () {
    return {
      cName: 'staffList',
      isCollapse: false
    }
  },
  mounted () {
    // alert(this.$store.state.toStaffList)
    // let that = this
    // window.onresize = function () {
    //   console.log('111',document.documentElement.clientHeight)
    //   that.clientHeight = document.documentElement.clientHeight
    // }
  },
  components: {
    headerC,
    staffList,
    staffAdd,
    userInfoSet,
    homePage,
    orderList,
    orderAdd,
    myOrder,
    myAudit,
    clientAdd,
    clientList,
    intentList,
    pmAdd,
    pmList,
    pmExport,
    pmCollect,
    myPm,
    feedBack
  },
  methods: {
    switchComp (aa) {
      this.$store.state.defaultComp = aa
      // switch (aa) {
      //   case 'ref1':
      //     this.cName = 'staffList'
      //     break
      //   case 'ref2':
      //     this.cName = this.$store.state.toStaffAdd
      //     break
      // }
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
  body{
    overflow: hidden;
  }
  .el-main{
    height: 800px;
    padding-top: 14px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .el-main::-webkit-scrollbar {
        display: none;
    }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-aside{
    margin-top: 20px;
  }
  .el-menu-item{
    font-size: 12px;
  }
  .el-submenu__title{
    font-weight: bold;
  }
  .el-submenu .el-menu-item{
    padding-left: 80px!important;
  }
  .el-popover, .el-radio-button:first-child:last-child .el-radio-button__inner{
    width: 64px;
  }
</style>
