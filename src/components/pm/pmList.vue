<template>
    <div class="pm-list">
      <!-- pmListData.slice(pageSize * (curPage - 1),pageSize * curPage) -->
         <el-table
            :data="pmListData"
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

          <!-- <div class="block" style="margin-top:20px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalList">
            </el-pagination>
          </div> -->

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
                <span class="table-item-tit">客户姓名：</span>
                <span class="table-item-con">{{ clientName }}</span>
              </div>
            </el-col>
        <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">到账日期：</span>
                <span class="table-item-con">{{ reachDate }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">店铺名称：</span>
                <span class="table-item-con">{{ shopName }}</span>
            </div>
        </el-col>
      </el-row>

     <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">签单产品：</span>
                <span class="table-item-con">{{ buyServ }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">服务时间：</span>
                <span class="table-item-con">{{ timeLimit }}</span>
            </div>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="24">
            <div class="table-title">到账信息</div>
          </el-col>
        </el-row>
       <el-row>
      <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单类型：</span>
                <span class="table-item-con">{{ reachType }}</span>
            </div>
        </el-col>
         <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">签单金额：</span>
                <span class="table-item-con">{{ reachPrice }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">到账金额：</span>
                <span class="table-item-con">{{ payPrice }}</span>
            </div>
        </el-col>
          <el-col :span="12">
            <div class="table-item">
                <span class="table-item-tit">直接成本：</span>
                <span class="table-item-con">{{ payCost }}</span>
            </div>
        </el-col>
      </el-row>
            <el-row>
      <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">最终业绩：</span>
                <span class="table-item-con">{{ payPrice - payCost }}</span>
            </div>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">付款账号：</span>
                  <span class="table-item-con">{{ payId}}</span>
              </div>
          </el-col>
        </el-row>

       <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">到账方式：</span>
                <span class="table-item-con">{{ payMethods }}</span>
            </div>
        </el-col>
      </el-row>

        <el-row>
        <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">签单渠道：</span>
                <span class="table-item-con">{{ reachMethods }}</span>
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
        <el-row  v-if="imgs.length !== 0">
          <el-col :span="24">
              <div class="imgList">
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
            { text: '技术一部', value: '技术部,一部' },
            { text: '技术二部', value: '技术部,二部' },
            { text: '技术三部', value: '技术部,三部' },
            { text: '销售一部', value: '销售部,一部' },
            { text: '销售二部', value: '销售部,二部' },
            { text: '销售三部', value: '销售部,三部' }
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
        shopName: '',
        reachType: '',
        reachPrice: '',
        payCost: '',
        payMethods: '',
        reachMethods: '',
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
        // console.log('filter', value, row)
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
        this.shopName = row.shop_name
        this.reachType = row.reach_type
        this.reachPrice = row.reach_price
        this.payCost = row.pay_cost
        this.payMethods = row.pay_methods
        this.reachMethods = row.reach_methods
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
      formData.append('depart', this.$store.state.userDepart)
      formData.append('name', this.$store.state.userName)
      formData.append('power', this.$store.state.userPower)
      this.$http.post('pm_mng.php', formData)
      .then(function (res) {
        // console.log('Page', res.data)
        that.pmListData = res.data
        // that.totalList = res.data.length
        // console.log(res)
        // console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.pm-list{
  padding-bottom: 100px;
}
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
