<template>
  <el-table
    :data="staffData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="序号"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="姓名"
      >
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.st_name }}</p>
          <p>住址: {{ scope.row.st_address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.st_name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="性别"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.st_sex }}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="name"
      label="职位"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.st_sex }}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="name"
      label="任职部门"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.st_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="入职日期"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      staffData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  created () {
    let that = this
    this.$http.get('table_json.php?code=1')
      .then(function (res) {
        console.log(res.data)
        that.staffData = res.data
      }).catch(function (err) {
        console.log(err)
      })
  }
}
</script>
<style lang="less">
.el-table th>.cell{
  text-align: center;
}
</style>
