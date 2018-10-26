<template>
    <div class="pm-list">
         <el-table
            :data="pmListData.slice(pageSize * (curPage - 1),pageSize * curPage)"
            style="width: 100%;">
             <el-table-column
            prop="id"
            label="ID"
            sortable
            width="80">
            </el-table-column>
             <el-table-column
            prop="reach_name"
            label="签单人员"
            width="180">
            </el-table-column>
             <el-table-column
            prop="reach_apart"
            label="所在部门"
            width="180">
            </el-table-column>
             <el-table-column
            prop="buy_serv"
            label="服务产品"
            >
            </el-table-column>
            <el-table-column
            prop="pay_price"
            label="到账金额"
            width="180">
            </el-table-column>
            <el-table-column
            prop="reg_date"
            label="录入日期"
            sortable
            >
            </el-table-column>

            <el-table-column
            prop="reach_apart"
            label="分类筛选"
            width="120"
            :filters="apartData"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                disable-transitions>{{scope.row.reach_apart}}</el-tag>
            </template>
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    v-if="$store.getters.userAuthority === '80001' || $store.getters.userAuthority === '80005'"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

          <div class="block" style="margin-top:20px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalList">
            </el-pagination>
          </div>

        <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="pmInfoVisible">
        <div class="pmInfoTable">
        <el-row>
          <el-col :span="24">
            <div class="table-title">基本信息</div>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单人员：</span>
                <span class="table-item-con">{{ reachMan }}</span>
            </div>
            </el-col>
            <el-col :span="12">
                <div class="table-item">
                <span class="table-item-tit">所属部门：</span>
                <span class="table-item-con">{{ reachApart }}</span>
            </div>
            </el-col>
      </el-row>

      <el-row>
            <el-col :span="12">
              <div class="table-item">
                <span class="table-item-tit">客户名称：</span>
                <span class="table-item-con">{{ clientName }}</span>
              </div>
            </el-col>
        <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单日期：</span>
                <span class="table-item-con">{{ reachDate }}</span>
            </div>
        </el-col>
      </el-row>

     <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">订购服务：</span>
                <span class="table-item-con">{{ buyServ }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="16">
            <div class="table-item">
                <span class="table-item-tit">服务时间：</span>
                <span class="table-item-con">{{ timeLimit }}</span>
            </div>
        </el-col>
         <el-col :span="8">
            <div class="table-item">
                <span class="table-item-tit">服务费用：</span>
                <span class="table-item-con">{{ servPrice }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">到账信息</div>
          </el-col>
        </el-row>
       <el-row>
      <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">到账类型：</span>
                <span class="table-item-con">{{ buyType }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">到账金额：</span>
                <span class="table-item-con">{{ payPrice }}</span>
            </div>
        </el-col>
      </el-row>

      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">付款账户：</span>
                  <span class="table-item-con">{{ payId}}</span>
              </div>
          </el-col>
        </el-row>

       <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">收款账户：</span>
                <span class="table-item-con">{{ recId }}</span>
            </div>
        </el-col>
      </el-row>

        <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">交易订单号：</span>
                <span class="table-item-con">{{ dealId }}</span>
            </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
            <div class="table-item table-textarea">
                <span class="table-item-tit table-textarea-tit">备注信息：</span>
                <span class="table-item-con table-textarea-con" style="word-wrap:break-word">{{ descInfo }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">附件（点击图标下载）</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div v-if="imgs !== ''" class="imgList">
                  <!-- <img :src="item" alt="item" width="100" height="120"> -->
                <span class="down-left"  v-for="(item, index) in imgs" :key="index">
                   <a :href="item" target="_blank">
                       <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                   </a>
                </span>
              </div>
          </el-col>
      </el-row>
      </div>
    </el-dialog>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        currentPage3: 1,
        totalList: 1,
        pageSize: 7,
        curPage: 1,
        pmInfoVisible: false,
        pmListData: [],
        pmListData2: [],
        apartData: [
            { text: '石一家1', value: '石一,家一' },
            { text: '石一家2', value: '石一,家二' },
            { text: '石一家3', value: '石一,家三' },
            { text: '石一销1', value: '石一,销一' },
            { text: '石一销2', value: '石一,销二' },
            { text: '石一销3', value: '石一,销三' },
            { text: '石二家1', value: '石二,家一' },
            { text: '石二家2', value: '石二,家二' },
            { text: '石二家3', value: '石二,家三' },
            { text: '石二销1', value: '石二,销一' },
            { text: '石二销2', value: '石二,销二' },
            { text: '石二销3', value: '石二,销三' }
        ],
        reachMan: '',
        reachApart: '',
        clientName: '',
        reachDate: '',
        buyServ: '',
        timeLimit: '',
        servPrice: '',
        payPrice: '',
        payId: '',
        recId: '',
        dealId: '',
        descInfo: '',
        buyType: '',
        imgs: []
      }
    },
    methods: {
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.curPage = val
        console.log(`当前页: ${val}`)
      },
      formatter (row, column) {
        return row.reach_apart
      },
      filterTag (value, row) {
        console.log('filter', value, row)
        return row.reach_apart === value
      },
      filterHandler (value, row, column) {
        const property = column['property']
        return row[property] === value
      },
      handleEdit (index, row) {
        this.pmInfoVisible = true
        // console.log(index, row)
        this.descInfo = row.else_desc
        this.dealId = row.deal_id
        this.recId = row.rec_id
        this.payId = row.pay_id
        this.payPrice = row.pay_price
        this.servPrice = row.serv_price
        this.reachMan = row.reach_name
        this.reachApart = row.reach_apart
        this.clientName = row.client_name
        this.reachDate = row.reach_date
        this.buyServ = row.buy_serv
        this.timeLimit = row.time_limit
        this.buyType = row.buy_type
        let imgs = row.upload_imgs
        if (imgs !== '') {
          let imgsItem = imgs.split(',')
          let arr = []
          for (let i = 0; i < imgsItem.length; i++) {
            arr.push(imgsItem[i])
          }
          this.imgs = arr
        }
      },
      handleDelete (index, row) {
        console.log(index, row)
        this.$confirm('此操作将永久删除该条业绩, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let formData = new FormData()
        formData.append('flag', 'delPm')
        formData.append('delId', row.id)
        this.$http.post('pm_mng.php', formData)
          .then(function (res) {
            // console.log(res)
            if (res.data === 'delPmSuc') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
            that.$store.state.defaultComp = 'pmAdd'
            setTimeout(() => {
              that.$store.state.defaultComp = 'pmList'
            }, 10)
            }
          }).catch(function (err) {
            console.log(err)
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
      let formData = new FormData()
      formData.append('flag', 'fetch')
      this.$http.post('pm_mng.php', formData)
      .then(function (res) {
        console.log('Page', res.data)
        that.pmListData = res.data
        that.totalList = res.data.length
        console.log(res)
        console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.el-table th>.cell{
  text-align: center;
}
.pmInfoTable{
  width: 100%;
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
  .table-textarea{
    height: 80px!important;
  }
  .table-textarea-tit{
    height: 80px!important;
    line-height: 80px!important;
  }
  .table-textarea-con{
    height: 80px!important;
  }
  .table-title{
    margin: 8px 0;
    border-radius: 2px;
    height: 42px;
    width: 100%;
    line-height: 42px;
    color: #ffffff;
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    padding-left: 8px;
    box-sizing: border-box;
    background-color: @blue;
  }
  .table-item{
    border-radius: 2px;
    height: 28px;
    margin: 12px 2px;
    border: 1px solid @blue;
    span{
      float: left;
      height: 28px;
      line-height: 28px;
      color: #ffffff;
      font-size: 1em;
      }
    .table-item-tit{
      width: 40%;
      background-color: @blue;
    }
    .else-info-tit{
      width: 16%;
    }
    .else-info-con{
      text-align: left;
      padding-left: 4px;
    }
    .table-item-con{
      width: 60%;
      color: red;
      font-size: 1.13em;
      font-weight: bold;
    }
  }
}
</style>
