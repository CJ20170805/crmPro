<template>
    <div class="index-paper">
        <header-c></header-c>
        <el-container>
            <el-aside style="width:auto">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu v-if="true" index="1">
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
                 <el-submenu v-if="true" index="7">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">下单管理</span>
                    </template>
                    <el-menu-item-group>
                    <!-- <span slot="title">---</span> -->
                    <el-menu-item index="001" @click="switchComp('orderList')">下单列表</el-menu-item>
                    <el-menu-item index="002" @click="switchComp('orderAdd')">开始下单</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main style="width">
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
export default {
  data () {
    return {
      cName: 'staffList',
      isCollapse: false
    }
  },
  mounted () {
    // alert(this.$store.state.toStaffList)
  },
  components: {
    headerC,
    staffList,
    staffAdd,
    userInfoSet,
    homePage,
    orderList,
    orderAdd
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
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less">
  body{
    overflow: hidden;
  }
  .el-main{
    padding-top: 14px;
    overflow: scroll;
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
</style>
