<template>
    <div class="staff-add">
        <table>
            <thead>
                <th>
                    <div class="staff-title">基本信息</div>
                </th>
            </thead>
            <tbody>
               <tr>
                    <td class="input-name">姓名：</td>
                    <td class="input-main">
                    <el-input class="input-fl input-size-100" v-model="staffName" placeholder="请输入姓名"></el-input>
                    </td>
               </tr>
                <tr>
                <td class="input-name">性别：</td>
                    <td>
                    <el-radio-group v-model="staffSex" class="input-fl">
                        <el-radio-button label="男"></el-radio-button>
                        <el-radio-button label="女"></el-radio-button>
                        </el-radio-group>
                    </td>
               </tr>
               <tr>
                    <td class="input-name">入职日期：</td>
                    <td>
                        <el-date-picker
                        v-model="joinDate"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        class="input-fl"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </td>
               </tr>
                <tr>
                  <td class="input-name">身份证号：</td>
                    <td>
                      <el-input class="input-fl" v-model="cardNum" placeholder="请输入身份证号码"></el-input>
                    </td>
               </tr>
               <tr>
                  <td class="input-name">家庭住址：</td>
                    <td>
                      <el-input class="input-fl" v-model="address" placeholder="请输入家庭住址"></el-input>
                    </td>
               </tr>
            </tbody>

            <thead>
                <th>
                    <div class="staff-title">联系方式</div>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td class="input-name">现住址：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="nowAddress" placeholder="请输入现住址"></el-input>
                    </td>
               </tr>
               <tr>
                    <td class="input-name">联系电话：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="staffPhone" placeholder="请输入联系电话"></el-input>
                    </td>
               </tr>
                <tr>
                    <td class="input-name">备用联系方式：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="staffPhone2" placeholder="请输入备用联系方式"></el-input>
                    </td>
               </tr>
            </tbody>

               <thead>
                <th>
                    <div class="staff-title">职位信息</div>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td class="input-name">部门：</td>
                    <td class="input-main">
                       <el-cascader
                        :options="departmentOptions"
                        v-model="departmentVal"
                        ></el-cascader>
                    </td>
               </tr>
               <tr>
                    <td class="input-name">职位：</td>
                    <td class="input-main">
                        <el-cascader
                        :options="jobOptions"
                        v-model="jobVal"
                        ></el-cascader>
                    </td>
               </tr>
                <tr>
                    <td class="input-name">备注信息：</td>
                    <td class="input-main">
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="请输入内容"
                      v-model="elseInfo">
                    </el-input>
                    </td>
               </tr>
               <tr>
                   <td></td>
                   <td>
                      <el-button style="float:right" type="primary" @click="submitInfo">提交录入</el-button>
                   </td>
               </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      staffName: '',
      staffSex: '男',
      address: '',
      joinDate: '',
      cardNum: '',
      staffPhone: '',
      staffPhone2: '',
      nowAddress: '',
      departmentVal: [],
      jobVal: ['运营'],
      elseInfo: '',
      departmentOptions: [
        {
          value: '石一',
          label: '石一',
          children: [
            {
              value: '家一',
              label: '石一家一'
            },
            {
              value: '家二',
              label: '石一家二'
            },
            {
              value: '家三',
              label: '石一家三'
            },
            {
              value: '销一',
              label: '石一销一'
            },
            {
              value: '销二',
              label: '石一销二'
            },
            {
              value: '销三',
              label: '石一销三'
            },
            {
              value: '视觉部',
              label: '视觉部'
            },
            {
              value: '管理层',
              label: '管理层'
            },
            {
              value: '人事',
              label: '人事行政'
            },
            {
              value: '技术总监',
              label: '技术总监'
            },
            {
              value: '销售总监',
              label: '销售总监'
            }
          ]
        },
        {
          value: '石二',
          label: '石二',
          children: [
            {
              value: '家一',
              label: '石二家一'
            },
            {
              value: '家二',
              label: '石二家二'
            },
            {
              value: '家三',
              label: '石二家三'
            },
            {
              value: '销一',
              label: '石二销一'
            },
            {
              value: '销二',
              label: '石二销二'
            },
            {
              value: '销三',
              label: '石二销三'
            },
            {
              value: '管理层',
              label: '管理层'
            },
            {
              value: '销售总监',
              label: '销售总监'
            },
            {
              value: '技术总监',
              label: '技术总监'
            },
            {
              value: '人事',
              label: '人事行政'
            }
          ]
        }
      ],
      jobOptions: [
        {
          value: 'AM',
          label: 'AM'
        },
        {
          value: 'AE',
          label: 'AE'
        },
        {
          value: 'BD',
          label: 'BD'
        },
        {
          value: 'BD经理',
          label: 'BD经理'
        },
        {
          value: '销售',
          label: '销售'
        },
        {
          value: '美工',
          label: '美工'
        },
        {
          value: '客服',
          label: '客服'
        },
        {
          value: '质检主管',
          label: '质检主管'
        },
        {
          value: '销售总监',
          label: '销售总监'
        },
        {
          value: '技术总监',
          label: '技术总监'
        },
        {
          value: '人事行政专员',
          label: '人事行政专员'
        },
        {
          value: '分公司总经理',
          label: '分公司总经理'
        }
      ],
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    submitInfo () {
      console.log(this.joinDate)
      let that = this
      let formData = new FormData()
      formData.append('st_flag', 'add')
      formData.append('st_name', this.staffName)
      formData.append('st_sex', this.staffSex)
      formData.append('st_joinDate', this.joinDate)
      formData.append('st_cardNum', this.cardNum)
      formData.append('st_address', this.address)
      formData.append('st_nowAddress', this.nowAddress)
      formData.append('st_staffPhone', this.staffPhone)
      formData.append('st_staffPhone2', this.staffPhone2)
      formData.append('st_departmentVal', this.departmentVal)
      formData.append('st_jobVal', this.jobVal)
      formData.append('st_elseInfo', this.elseInfo)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post('staff_mng.php', formData, config)
        .then(function (res) {
          console.log(res)
          if (res.data === 'AddSuccess') {
            that.staffData = res.data
            that.addBox()
          } else {
            alert('添加失败！')
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    addBox () {
      this.$confirm('信息添加成功，是否继续添加？', '添加成功', {
        distinguishCancelAndClose: true,
        confirmButtonText: '查看列表',
        cancelButtonText: '继续添加',
        type: 'success'
      })
        .then(() => {
          this.$message({
            type: 'info',
            message: '员工信息列表'
          })
          // this.$store.getters.toSfList
          // this.$store.state.defaultComp = 'staffAdd'
           this.$store.state.defaultComp = 'staffList'
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '继续添加员工信息'
              : '停留在当前页面'
          })
          this.staffName = ''
          this.staffSex = '男'
          this.address = ''
          // this.joinDate = '',
          this.cardNum = ''
          this.staffPhone = ''
          this.staffPhone2 = ''
          this.nowAddress = ''
          this.departmentVal = []
          // jobVal: ['运营'],
          this.elseInfo = ''
        })
    }
  },
  mounted () {
    // this.open6()
  }
}
</script>
<style lang="less">
.staff-add{
  padding: 60px;
  table{
      width: 600px;
      margin: 0 auto;
      tr{
          td{
              padding: 10px;
          }
          .input-name{
              float:right;
              line-height:40px;
          }
          .input-fl{
              float: left;
          }
          .input-size-100{
              width: 100px;
          }
      }
  }
}
.staff-title{
    text-align: left;
    font-size: 1.2em;
    font-weight: bold;
    color: #409EFF;
}
.el-row{
    margin: 20px 0;
    .form-wrap{
        width: 100%;
        float: left;
    }
}
.add-form{
    max-width: 500px;
    margin: 0 auto;
    padding:20px;
    display: inline-block;
    input{
        padding: 20px;
    }
}
</style>
