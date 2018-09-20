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
      birthDate: '',
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
              value: '石一家一',
              label: '石一家一'
            },
            {
              value: '石一家二',
              label: '石一家二'
            },
            {
              value: '石一家三',
              label: '石一家三'
            },
            {
              value: '石一销一',
              label: '石一销一'
            },
            {
              value: '石一销二',
              label: '石一销二'
            },
            {
              value: '石一销三',
              label: '石一销三'
            }
          ]
        },
        {
          value: '石二',
          label: '石二',
          children: [
            {
              value: '石二家一',
              label: '石二家一'
            },
            {
              value: '石二家二',
              label: '石二家二'
            },
            {
              value: '石二家三',
              label: '石二家三'
            },
            {
              value: '石二销一',
              label: '石二销一'
            },
            {
              value: '石二销二',
              label: '石二销二'
            },
            {
              value: '石二销三',
              label: '石二销三'
            }
          ]
        }
      ],
      jobOptions: [
        {
          value: '运营',
          label: '运营'
        },
        {
          value: '销售',
          label: '销售'
        },
        {
          value: '美工',
          label: '美工'
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
      console.log(this.jobVal)
      let that = this
      let formData = new FormData()
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
          that.staffData = res.data
        }).catch(function (err) {
          console.log(err)
        })
    }
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
.el-main{
    padding: 0;
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
