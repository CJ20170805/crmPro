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
                    <td class="input-name">民族：</td>
                    <td class="input-main">
                    <el-input class="input-fl input-size-100" v-model="nation" placeholder="请输入"></el-input>
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
                  <td class="input-name">身份证号码：</td>
                    <td>
                      <el-input class="input-fl" v-model="cardNum" placeholder="请输入身份证号码"></el-input>
                    </td>
               </tr>
               <tr>
                  <td class="input-name">身份证住址：</td>
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
                    <div class="staff-title">学历信息</div>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td class="input-name">学历：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="eduBack" placeholder="请输入学历信息"></el-input>
                    </td>
               </tr>
               <tr>
                    <td class="input-name">专业：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="major" placeholder="请输入专业信息"></el-input>
                    </td>
               </tr>
                <tr>
                    <td class="input-name">毕业院校：</td>
                    <td class="input-main">
                    <el-input class="input-fl" v-model="schoolName" placeholder="请输入院校名称"></el-input>
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
                    <td>
                       <el-cascader
                        style="float:left"
                        :options="departmentOptions"
                        v-model="departmentVal"
                        ></el-cascader>
                    </td>
               </tr>
               <tr>
                    <td class="input-name">职位：</td>
                    <td class="input-main">
                        <el-cascader
                         style="float:left"
                        :options="jobOptions"
                        v-model="jobVal"
                        ></el-cascader>
                    </td>
               </tr>
                <tr>
                    <td class="input-name">转正信息：</td>
                    <td class="input-main">
                          <el-radio-group v-model="whetherRegular">
                            <el-radio label="已转正">已转正</el-radio>
                            <el-radio label="未转正">未转正</el-radio>
                          </el-radio-group>
                    </td>
               </tr>
               <tr v-if="whetherRegular === '已转正' ? true : false">
                    <td class="input-name">转正时间：</td>
                    <td>
                        <el-date-picker
                        v-model="regularDate"
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
                 <td class="input-name">附件：</td>
                  <td class="input-main">
                    <!-- action="http://www.huibohehe.com/crmApi/order_img.php" -->
                  <el-upload
                    action="http://www.huibohehe.com/crmApi/staff_img.php"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="orderUploadSuc"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  </td>
               </tr>
               <tr>
                   <td></td>
                   <td style="padding-bottom:200px;">
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
      dialogVisible: false,
      dialogImageUrl: '',
      orderImgs: [],
      orderImgsNew: [],
      staffName: '',
      staffSex: '男',
      major: '',
      eduBack: '',
      schoolName: '',
      whetherRegular: '未转正',
      regularDate: '',
      nation: '',
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
          value: '销售部',
          label: '销售部',
          children: [
            {
              value: '一部',
              label: '销售一部'
            },
            {
              value: '二部',
              label: '销售二部'
            },
            {
              value: '三部',
              label: '销售三部'
            }
          ]
        },
        {
          value: '技术部',
          label: '技术部',
          children: [
            {
              value: '一部',
              label: '技术一部'
            },
            {
              value: '二部',
              label: '技术二部'
            },
            {
              value: '三部',
              label: '技术三部'
            }
          ]
        },
        {
          value: '客服部',
          label: '客服部',
          children: [
            {
              value: '一部',
              label: '客服一部'
            },
            {
              value: '二部',
              label: '客服二部'
            },
            {
              value: '三部',
              label: '客服三部'
            }
          ]
        },
        {
          value: '其他',
          label: '其他',
          children: [
            {
              value: '管理层',
              label: '管理层'
            },
            {
              value: '人事部',
              label: '人事部'
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
          value: '客服',
          label: '客服'
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
    orderUploadSuc (response, file, fileList) {
      let imgUrl = file.response
      this.orderImgs.push(imgUrl)
      // console.log("Onsuc",this.orderImgs)
    },
    handleRemove (file, fileList) {
      let fileName = file.name
      this.orderImgsNew = []
      this.orderImgs.forEach((v, k) => {
        if (v.indexOf(fileName) === -1) {
          this.orderImgsNew.push(v)
        }
      })
      this.orderImgs = this.orderImgsNew
      // console.log("OnErr",this.orderImgs)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitInfo () {
      // console.log(this.joinDate)
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
      formData.append('files', this.orderImgs)
      formData.append('whether_regular', this.whetherRegular)
      formData.append('regular_date', this.regularDate)
      formData.append('nation', this.nation)
      formData.append('edu_back', this.eduBack)
      formData.append('major', this.major)
      formData.append('school_name', this.schoolName)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post('staff_mng.php', formData, config)
        .then(function (res) {
          // console.log(res)
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
    // margin: 20px 0;
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
