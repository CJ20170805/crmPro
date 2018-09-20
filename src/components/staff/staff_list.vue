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
          <p>联系电话: {{ scope.row.st_staffPhone }}</p>
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
        <span style="margin-left: 10px">{{ scope.row.st_jobVal }}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="name"
      label="任职部门"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.st_departmentVal }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="入职日期"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.st_joinDate }}</span>
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
      // console.log(row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除请求
        let formData = new FormData()
        formData.append('st_flag', 'del')
        formData.append('del_id', row.id)
        formData.append('del_name', row.st_name)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post('staff_mng.php', formData, config)
          .then(function (res) {
          // console.log(res)
            if (res.data === 'DelSuccess') {
              // console.log('delSuccess')
              //  this.$router.push({path: '/index'})
              location.reload()
            } else {
              alert('del失败！')
            }
          }).catch(function (err) {
            console.log(err)
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
  }
}
</script>
<style lang="less">
.el-table th>.cell{
  text-align: center;
}
</style>
