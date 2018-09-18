<template>
    <div class="index-paper">
        <header-c></header-c>
        <el-container>
            <el-aside width="200px">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">员工管理</span>
                    </template>
                    <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="001" @click="switchComp('ref1')">员工列表</el-menu-item>
                    <el-menu-item index="002" @click="switchComp('ref2')">员工添加</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
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
            <el-main>
                <component :is="cName" class="compon-sc"></component>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import headerC from './nav/header'
import staffList from './staff_list'
export default {
  data () {
    return {
      cName: 'staffList',
      isCollapse: false
    }
  },
  components: {
    headerC,
    staffList
  },
  methods: {
    switchComp (aa) {
      switch (aa) {
        case 'ref1':
          this.cName = 'headerC'
          break
        case 'ref2':
          this.cName = 'staffList'
          break
      }
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
