<template>
<div class="staff-table">
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

  <!-- Table -->
  <el-dialog title="信息更新" :visible.sync="dialogTableVisible">
    <table>
      <tr>
        <td class="tdTit">姓名：</td>
             <el-input v-model="m_name"></el-input>
        <td></td>
      </tr>
      <tr>
        <td class="tdTit">性别：</td>
        <td>
           <el-radio-group v-model="m_sex" style="float:left">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </td>
        <td>
        </td>
      </tr>
      <tr>
        <td class="tdTit">入职日期：</td>
        <td>
            <el-date-picker
            v-model="m_joinDate"
            style="float:left"
            align="right"
            type="date"
            placeholder="选择日期"
            class="input-fl"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </td>
        <td></td>
      </tr>
       <tr>
        <td class="tdTit">身份证号码：</td>
        <td>
          <el-input v-model="m_cardNum"></el-input>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="tdTit">身份证住址：</td>
        <td>
          <el-input v-model="m_address"></el-input>
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="tdTit">现住址：</td>
        <td>
          <el-input v-model="m_nowAddress"></el-input>
        </td>
      </tr>
       <tr>
        <td class="tdTit">联系电话：</td>
        <td>
           <el-input v-model="m_staffPhone"></el-input>
        </td>
      </tr>
        <tr>
        <td class="tdTit">备用联系电话：</td>
        <td>
           <el-input v-model="m_staffPhone2"></el-input>
        </td>
      </tr>
        <tr>
        <td class="tdTit">任职部门：</td>
        <td>
           <el-input v-model="m_deparmentVal"></el-input>
        </td>
      </tr>
        <tr>
        <td class="tdTit">职位信息：</td>
        <td>
          <el-input v-model="m_jobVal"></el-input>
        </td>
      </tr>
        <tr>
        <td class="tdTit">备注信息：</td>
        <td>
            <el-input type="textarea" :rows="2" v-model="m_elseInfo"></el-input>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>
          <el-button type="primary" @click="updateInfo">更新信息</el-button>
        </td>
      </tr>
    </table>
  </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      staffData: [],
      itemData: {},
      dialogTableVisible: false,
      m_id: '',
      m_name: '',
      m_sex: '',
      m_joinDate: '',
      m_cardNum: '',
      m_address: '',
      m_nowAddress: '',
      m_staffPhone: '',
      m_staffPhone2: '',
      m_deparmentVal: '',
      m_jobVal: '',
      m_elseInfo: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.itemData = row
      this.dialogTableVisible = true
      this.m_id = row.id
      this.m_name = row.st_name
      this.m_sex = row.st_sex
      this.m_joinDate = row.st_joinDate
      this.m_cardNum = row.st_cardNum
      this.m_address = row.st_address
      this.m_nowAddress = row.st_nowAddress
      this.m_staffPhone = row.st_staffPhone
      this.m_staffPhone2 = row.st_staffPhone2
      this.m_deparmentVal = row.st_departmentVal
      this.m_jobVal = row.st_jobVal
      this.m_elseInfo = row.st_elseInfo
    },
    handleDelete (index, row) {
      // console.log(row.id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
              console.log('delSuccess')
              //  this.$router.push({path: '/index'})
            } else {
              alert('del失败')
            }
          }).catch(function (err) {
            console.log(err)
          })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$store.state.defaultComp = 'staffAdd'
        setTimeout(() => {
          this.$store.state.defaultComp = 'staffList'
        }, 100)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateInfo () {
      let that = this
      let formData = new FormData()
      formData.append('st_flag', 'update')
      formData.append('st_id', this.m_id)
      formData.append('st_name', this.m_name)
      formData.append('st_sex', this.m_sex)
      formData.append('st_joinDate', this.m_joinDate)
      formData.append('st_cardNum', this.m_cardNum)
      formData.append('st_address', this.m_address)
      formData.append('st_nowAddress', this.m_nowAddress)
      formData.append('st_staffPhone', this.m_staffPhone)
      formData.append('st_staffPhone2', this.m_staffPhone2)
      formData.append('st_departmentVal', this.m_deparmentVal)
      formData.append('st_jobVal', this.m_jobVal)
      formData.append('st_elseInfo', this.m_elseInfo)

      this.$http.post('staff_mng.php', formData)
        .then(function (res) {
          console.log(res.data)
          that.dialogTableVisible = false
          that.$store.state.defaultComp = 'staffAdd'
          setTimeout(() => {
            that.$store.state.defaultComp = 'staffList'
          }, 10)
        }).catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    let that = this
    this.$http.get('table_json.php?code=1')
      .then(function (res) {
      //  console.log(res.data)
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
li{
  list-style-type: none;
}
.m_logo{
  float: right;
}
.el-dialog{
  max-width: 800px;
  min-width: 460px;
}
table{
  width: 100%;
  tr{
    td{
      padding: 8px;
    }
    .tdTit{
      text-align: right;
      font-weight: bold;
      font-size: 1.1em;
    }
  }
}
</style>
