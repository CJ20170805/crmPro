<template>
    <div class="login-wrap">
      <div class="login-form">
          <form action="" method="get">
               <el-input placeholder="请选择日期" suffix-icon="el-icon-edit" v-model="input2"> </el-input>
               <el-input placeholder="请选择日期" suffix-icon="el-icon-share" v-model="input2"> </el-input>
               <el-button type="info" plain>登陆</el-button>
          </form>
      </div>
    </div>
</template>
<script>
export default {
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
    }
}
</style>
