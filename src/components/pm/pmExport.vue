<template>
    <div class="pm-export">
        <p class="title">数据导出</p>
        <div class="query-data">
          <div class="query-main">
              <el-date-picker
                    v-model="queryDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                    </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="queryData">查询数据</el-button>
          </div>
        </div>
        <div class="query-res">
             <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="ID"
                width="120">
                <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="签单人员"
                width="120">
                  <template slot-scope="scope">{{ scope.row.reach_name}}</template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="所在部门"
                show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.reach_apart}}</template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="订购产品"
                show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.buy_serv }}</template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="到账金额"
                show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.pay_price}}</template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="录入日期"
                show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.reg_date}}</template>
                </el-table-column>
            </el-table>
        </div>
         <div style="margin-top: 20px">
            <div style="width:400px;heght:60px;float:right">
               <el-button @click="exportSome" :disabled="btnStu2" type="primary">仅导出已选择的数据</el-button>
                <el-button @click="exportAll" :disabled="btnStu" type="primary">导出全部数据</el-button>
            </div>
         </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
       queryDate: '',
       tableData3: [],
       multipleSelection: [],
       selectId: [],
       btnStu: true,
       btnStu2: true
    }
  },
  methods: {
    exportAll () {
      let begin = this.queryDate[0]
      let end = this.queryDate[1]
      window.location.href = 'http://localhost:8080/api/crmApi/exportExcel.php?bn=' + begin + '&ed=' + end
    },
    exportSome () {
      console.log(this.selectId)
      window.location.href = 'http://localhost:8080/api/crmApi/exportExcel.php?sid=' + this.selectId
    },
    open1 () {
      this.$alert('请选择查询日期', '查询错误', {
        confirmButtonText: '确定'
      })
    },
    queryData () {
      if (this.queryDate !== '') {
        let begin = this.queryDate[0]
      let end = this.queryDate[1]
      //   console.log(begin,'TTT',end)
      let that = this
      let formData = new FormData()
      formData.append('flag', 'conditionFetch')
      formData.append('begin', begin)
      formData.append('end', end)
      this.$http.post('pm_mng.php', formData)
        .then(function (res) {
          // console.log(res)
          that.tableData3 = res.data
          if (res.data.length !== 0) {
            that.btnStu = false
          } else {
            that.btnStu = true
          }
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        this.open1()
      }
    },
    handleSelectionChange (val) {
      // this.multipleSelection = val.id
      if (val.length !== 0) {
        this.btnStu2 = false
      } else {
        this.btnStu2 = true
      }
      let arr = []
      val.forEach((v, k) => {
        arr.push(v.id)
      })
      this.selectId = arr
      // console.log(arr)
    }
  }
}
</script>
<style lang="less">
@blue: #409EFF;
.el-table th>.cell{
  text-align: center;
}
.pm-export{
    overflow: hidden;
   .title{
       font-size: 1.2em;
       text-align: left;
       color:@blue;
       padding: 2px 4px;
       font-weight: bold;
   }
   .query-data{
    //    background-color: #409EFF;
       border-top: 2px solid @blue;
       height: 60px;
       line-height: 60px;
       padding: 12px 0;
       .query-main{
         height: 50px;
         width: 610px;
         float: right;
       }
       .el-button--primary{
         margin-left: 20px;
       }
   }
   .query-res{
    //    border-top: 2px solid @blue;
      height: 520px;
      overflow-y: scroll;
      padding-top: 12px;
   }
}
</style>
