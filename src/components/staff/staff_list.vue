<template>
<div class="staff-table">
    <el-table
    :data="staffData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="ID"
      sortable
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
      :filters="apartData"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.st_departmentVal }}</span>
      </template>
    </el-table-column>
     <el-table-column
      prop="name"
      label="是否转正"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.whether_regular }}</span>
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

  <!-- Table Detail-->
  <el-dialog :visible.sync="dialogTableVisible">
    <table>
      <tr class="edit-title">
        <td>基本信息</td>
      </tr>
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
        <td class="tdTit">民族：</td>
        <td>
          <el-input v-model="m_nation"></el-input>
        </td>
        <td></td>
      </tr>
      <tr>
       <tr>
        <td class="tdTit">学历：</td>
        <td>
           <el-input v-model="m_eduBack"></el-input>
        </td>
      </tr>
       <tr>
        <td class="tdTit">专业：</td>
        <td>
           <el-input v-model="m_major"></el-input>
        </td>
      </tr>
       <tr>
        <td class="tdTit">毕业院校：</td>
        <td>
           <el-input v-model="m_schoolName"></el-input>
        </td>
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
      <tr class="edit-title">
        <td>联系方式</td>
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
        <td class="tdTit">备用联系方式：</td>
        <td>
           <el-input v-model="m_staffPhone2"></el-input>
        </td>
      </tr>
      <tr class="edit-title">
        <td>职位信息</td>
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
            :picker-options="picker111"
            value-format="yyyy-MM-dd"
            >
            </el-date-picker>
        </td>
        <td></td>
      </tr>
      <tr>
        <tr>
        <td class="tdTit">任职部门：</td>
        <td>
               <el-cascader
                style="float:left"
                :options="departmentOptions"
                v-model="m_deparmentVal"
                ></el-cascader>
        </td>
      </tr>
        <tr>
        <td class="tdTit">职位类型：</td>
        <td>
          <el-input v-model="m_jobVal"></el-input>
        </td>
      </tr>
      <tr>
        <td class="tdTit">转正信息：</td>
        <td>
          <el-radio-group v-model="m_whetherRegular">
            <el-radio label="已转正">已转正</el-radio>
            <el-radio label="未转正">未转正</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr v-if="m_whetherRegular === '已转正' ? true : false">
        <td class="tdTit">转正时间：</td>
        <td>
          <el-date-picker
                        v-model="m_regularDate"
                        align="right"
                        type="date"
                        placeholder="请选择日期"
                        class="input-fl"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="picker111">
                        </el-date-picker>
        </td>
      </tr>
      <tr>
        <td class="tdTit">备注信息：</td>
        <td>
            <el-input type="textarea" :rows="2" v-model="m_elseInfo"></el-input>
        </td>
      </tr>
      <tr>
          <td class="tdTit">附件：</td>
          <td>
            <div class="imgList"  v-if="m_files.length !== 0">
            <span class="down-left"  v-for="(item, index) in m_files" :key="index">
                  <a :href="item" target="_blank">
                      <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                  </a>
            </span>
          </div>
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
      m_deparmentVal: [],
      m_jobVal: '',
      m_elseInfo: '',
      m_files: [],
      m_whetherRegular: '',
      m_regularDate: '',
      m_nation: '',
      m_eduBack: '',
      m_schoolName: '',
      m_major: '',
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
      picker111: {
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
      },
      apartData: [
          { text: '技术一部', value: '技术部,一部' },
          { text: '技术二部', value: '技术部,二部' },
          { text: '技术三部', value: '技术部,三部' },
          { text: '销售一部', value: '销售部,一部' },
          { text: '销售二部', value: '销售部,二部' },
          { text: '销售三部', value: '销售部,三部' },
          { text: '客服一部', value: '客服部,一部' },
          { text: '客服二部', value: '客服部,二部' },
          { text: '客服三部', value: '客服部,三部' },
          { text: '管理层', value: '其他,管理层' },
          { text: '人事部', value: '其他,人事部' }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
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
      // this.m_deparmentVal = ['技术部','一部']
      this.m_jobVal = row.st_jobVal
      this.m_elseInfo = row.st_elseInfo
      this.m_whetherRegular = row.whether_regular
      this.m_regularDate = row.regular_date
      this.m_nation = row.nation
      this.m_eduBack = row.edu_back
      this.m_schoolName = row.school_name
      this.m_major = row.major
      // this.m_files = row.files
      // split string for array
      let someImgArr = []
      let someImg = row.files
      if (someImg !== '') {
        let someStr = someImg.split(',')
        for (let i = 0; i < someStr.length; i++) {
          someImgArr.push(someStr[i])
        }
        // console.log('AAAA',someImgArr)
        this.m_files = someImgArr
      } else {
        this.m_files = someImgArr
      }
      // depart split
      let departStr = row.st_departmentVal.split(',')
      this.m_deparmentVal = departStr
      // let deArr = []
      // console.log('Q', departStr)
    },
    filterTag (value, row) {
      // console.log('filter', value, row)
      return row.st_departmentVal === value
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
      // newAdd 6
       formData.append('whether_regular', this.m_whetherRegular)
        formData.append('regular_date', this.m_regularDate)
         formData.append('nation', this.m_nation)
          formData.append('school_name', this.m_schoolName)
           formData.append('major', this.m_major)
            formData.append('edu_back', this.m_eduBack)

      this.$http.post('staff_mng.php', formData)
        .then(function (res) {
          // console.log(res.data)
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
@blue: #409EFF;
.edit-title{
  color: @blue;
  font-size: 1.2em;
  font-weight: bold;
}
.staff-table{
  padding-bottom: 100px;
}
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
.imgList{
  width: 100%;
  height: 130px;
    border: 1px solid @blue;
    span{
      display: inline-block;
      a{
        display: block;
      }
    }
    .down-left{
      border-right:1px solid @blue;
      width: 80%;
      width: 120px;
      float: left;
      margin: 6px;
    }
}
</style>
