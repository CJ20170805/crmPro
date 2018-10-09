<template>
  <div class="my-order">
      <el-table
      :data="myOrderData"
      style="width: 100%">
       <el-table-column
        label="订单编号"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="销售人员"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
        width="200px"
      >
      <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p><span class="shop-bar-title">店铺ID: </span> {{ scope.row.shop_id }}</p>
            <p><span class="shop-bar-title">店铺URL: </span>{{ scope.row.shop_url }}</p>
            <p><span class="shop-bar-title">店铺类型: </span>{{ scope.row.shop_type }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.shop_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="订购套餐"
        width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.combo_info }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="190"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="290">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="viewAcord(scope.$index, scope.row)">日志记录</el-button>
        </template>
      </el-table-column>
    </el-table>

 <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="shopInfoVisible">
      <table class="shopInfoTable">
        <thead>
          <tr>
            <th>店铺信息</th>
            <th>订购信息</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>店铺名称：<span class="shopInfoValue">{{ shopInfo.s_name }} </span></td>
            <td>订购套餐：<span class="shopInfoValue">{{ shopInfo.s_comboInfo }} </span></td>
          </tr>
          <tr>
            <td>店铺类型：<span class="shopInfoValue">{{ shopInfo.s_type }} </span></td>
            <td>付款金额：<span class="shopInfoValue">{{ shopInfo.s_payPrice }} </span></td>
          </tr>
           <tr>
            <td>店铺ID：<span class="shopInfoValue">{{ shopInfo.s_id }} </span></td>
            <td>服务时间：<span class="shopInfoValue">{{ shopInfo.s_timeLimit }} </span></td>
          </tr>
          <tr>
            <td>店铺URL：<span class="shopInfoValue"><a :href="shopInfo.s_url" target="_blank">{{ shopInfo.s_url}}</a></span></td>
            <td>销售人员：<span class="shopInfoValue">{{ shopInfo.s_salesMan }} </span></td>
          </tr>
           <tr>
            <td>联系人：<span class="shopInfoValue">{{ shopInfo.s_linkMan }} </span></td>
            <td>其他信息：<span class="shopInfoValue">{{ shopInfo.s_descInfo }} </span></td>
          </tr>
          <tr>
            <td>联系方式:<span class="shopInfoValue">{{ shopInfo.s_linkMethods }} </span></td>
          </tr>
        </tbody>
      </table>
      <div class="order-step">
          <p class="order-status-title">订单状态</p>
          <el-steps :active="orderActive" align-center>
            <el-step title="完成下单" ></el-step>
            <el-step title="完成分单" ></el-step>
            <el-step title="服务运营中" ></el-step>
            <el-step title="服务结束" ></el-step>
          </el-steps>
      </div>
       <ul class="imgList">
            <li v-for="(item, index) in shopInfo.s_someImg" :key="index">
              <img :src="item" alt="" width="160px" height="220px">
            </li>
       </ul>
    </el-dialog>

    <!--Order operating acord  -->
    <el-dialog title="" :visible.sync="acordVisible">
        <el-tabs tab-position="left">
          <el-tab-pane label="操作日志">
              <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">
                        一致性 Consistency<i class="header-icon el-icon-info"></i>
                      </template>
                      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                    <el-collapse-item title="反馈 Feedback">
                      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                    </el-collapse-item>
                    <el-collapse-item title="效率 Efficiency">
                      <div>简化流程：设计简洁直观的操作流程；</div>
                      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                    </el-collapse-item>
                    <el-collapse-item title="可控 Controllability">
                      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                    </el-collapse-item>
                </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="增加日志">
              <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="日志标题">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="日志内容">
                <el-input type="textarea" rows="8" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      myOrderData: '',
      myOrderList: [],
      shopInfoVisible: false,
      acordVisible: true,
      orderActive: 3,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      shopInfo: {
        s_name: '',
        s_id: '',
        s_url: '',
        s_type: '',
        s_linkMan: '',
        s_linkMethods: '',
        s_comboInfo: '',
        s_payPrice: '',
        s_descInfo: '',
        s_timeLimit: '',
        s_someImg: '',
        s_salesMan: ''
      }
    }
  },
  created () {
    let that = this
    let formData = new FormData()
    formData.append('flag', 'dispenseFetch')
    formData.append('userId', this.$store.state.userId)
    // get order's number
    this.$http.post('order_mng.php', formData)
      .then(function (res) {
        // use order's number get order's detail
        let ordersItem = res.data[0].st_orders

        // ordersItem.forEach((item, index) => {
          let formData2 = new FormData()
          formData2.append('flag', 'dispenseDetail')
          formData2.append('ordersItem', ordersItem)
          // formData2.append('orderNum', item)
          that.$http.post('order_mng.php', formData2)
            .then(function (res) {
              that.myOrderData = res.data
              // that.myOrderData.push(res.data)
              // console.log('aaa', res.data)
            }).catch(function (err) {
              console.log(err)
            })
        // })
        // console.log('dispenseFetchRes', that.myOrderList)
      }).catch(function (err) {
        console.log(err)
      })
      // console.log('orderNum', that.myOrderData)
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    viewDetail (index, row) {
      this.shopInfoVisible = true
      console.log(index, row)
      this.shopInfo.s_name = row.shop_name
      this.shopInfo.s_id = row.shop_id
      this.shopInfo.s_url = row.shop_url
      this.shopInfo.s_type = row.shop_type
      this.shopInfo.s_linkMan = row.link_man
      this.shopInfo.s_linkMethods = row.link_methods
      this.shopInfo.s_comboInfo = row.combo_info
      this.shopInfo.s_payPrice = row.pay_price
      this.shopInfo.s_descInfo = row.desc_info
      this.shopInfo.s_timeLimit = row.time_limit
      this.shopInfo.s_salesMan = row.sales_man
      // split string for array
      let someImgArr = []
      let someImg = row.some_img
      let someStr = someImg.split(',')
      for (let i = 0; i < someStr.length; i++) {
        someImgArr.push(someStr[i])
      }
      // console.log('AAAA',someImgArr)
      this.shopInfo.s_someImg = someImgArr
    },
    viewAcord (index, row) {
      this.acordVisible = true
    }
  }
}
</script>
<style lang="less">
.my-order{
  .el-table th>.cell{
    text-align: center;
  }
 .imgList{
  width: 100%;
  padding: 0;
  li{
    display: inline-block;
    padding: 10px;
    list-style: none;
  }
 }
 .el-tabs__content{
   padding: 0 10px;
 }
}
</style>
