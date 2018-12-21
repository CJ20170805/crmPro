<template>
    <div class="client-list" ref="table">
        <el-table
        :data="clientData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          label="客户编号"
          width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户名称"
          >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>地区: {{ scope.row.client_address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.client_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称"
          >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shop_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="主营类目"
          >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shop_industry }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="旺旺名称"
          >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ww_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="tag"
          label="录入人员"
          >
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.write_man }}</span> -->
              <el-tag
                type="primary"
                disable-transitions>{{scope.row.write_man}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="录入日期"
          >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.reg_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- v-if="$store.getters.userAuthority === '80002' || $store.getters.userAuthority === '80003'" -->
          </template>
        </el-table-column>
      </el-table>
      <!-- intent sort -->
      <div class="intent-sort" v-if="$store.getters.userAuthority === '80001'" @click="flexBtn" :style="{width: flexWidth}" ref="flexBtn">
        <transition name="sortMan">
           <div class="intent-sort-main" v-show="!sortFlexFlag">
            <el-select v-model="sortValue" filterable  @change="sortChange" placeholder="请选择">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="info" plain v-show="!sortFlexFlag" @click="fetchAll">显示全部</el-button>
          </div>
        </transition>
      </div>
      <!-- list pagination -->
     <div class="pag" :style="{width: tableWidth}">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper, total"
            :total="total">
          </el-pagination>
    </div>
    <!--Order Detail dialog -->
    <el-dialog title="" :visible.sync="clientInfoVisible">
      <div class="clientInfoTable">
        <el-row>
          <el-col :span="24">
            <div class="table-title">客户信息</div>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
            <div class="table-item">
                <span class="table-item-tit">客户名称：</span>
                <span class="table-item-con">{{ clientName }}</span>
            </div>
            </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">联系方式：</span>
                  <span class="table-item-con">{{ clientLink }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">联系日期：</span>
                  <span class="table-item-con">{{ linkDate }}</span>
              </div>
          </el-col>
        </el-row>
      <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">旺旺名称：</span>
                  <span class="table-item-con">{{ wwName }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                  <div class="table-item">
                  <span class="table-item-tit">所在地区：</span>
                  <span class="table-item-con">{{ clientAddress }}</span>
              </div>
              </el-col>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">客户编号：</span>
                  <span class="table-item-con">{{ clientId }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div class="table-title">店铺信息</div>
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
                  <span class="table-item-tit">店铺链接：</span>
                  <span class="table-item-con"><a :href="shopUrl" v-if="shopUrl !== ''" style="color:red;text-decoration:none;" target="_blank">点击打开</a></span>
              </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">所属行业：</span>
                  <span class="table-item-con">{{ shopIndustry }}</span>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="table-item">
                  <span class="table-item-tit">店铺等级：</span>
                  <span class="table-item-con">{{ shopGrade }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div class="table-title">其他信息</div>
            </el-col>
          </el-row>
        <el-row>
          <el-col :span="24">
              <div class="table-item">
                  <span class="table-item-tit">录入人员：</span>
                  <span class="table-item-con">{{ writeMan }}</span>
              </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="table-item">
                    <span class="table-item-tit">录入日期：</span>
                    <span class="table-item-con">{{ regDate }}</span>
                </div>
            </el-col>
      </el-row>
        <el-row>
            <el-col :span="24">
                <div class="table-item" style="height:80px">
                    <span class="table-item-tit" style="height:80px;line-height:80px">备注信息：</span>
                    <span class="table-item-con" style="height:80px;">{{ desc }}</span>
                </div>
            </el-col>
          </el-row>
        <el-row v-if="clientFiles.length !== 0">
            <el-col :span="24">
              <div class="table-title">附件（点击下载）</div>
            </el-col>
          </el-row>
          <el-row v-if="clientFiles.length !== 0">
            <el-col :span="24">
                <div class="imgList">
                  <span class="down-left" v-for="(item, index) in clientFiles" :key="index">
                    <a :href="item" target="_blank">
                        <img :src="item.substring(item.length-3) === 'zip' ? 'https://img.alicdn.com/imgextra/i2/662134481/O1CN011iyLEr3kJJ6YdeJ-662134481.jpg' : item" width="120" height="120">
                    </a>
                  </span>
                </div>
            </el-col>
        </el-row>

      </div>
    </el-dialog>
    <!--edit dialog -->
    <el-dialog title="" :visible.sync="editInfoVisible">
      <div class="editInfoTable">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-title">客户信息</div>
                      </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="24">
                        <div class="table-item">
                            <span class="table-item-tit">客户名称：</span>
                            <span class="table-item-con"><el-input v-model="clientName"></el-input></span>
                        </div>
                        </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">联系方式：</span>
                              <span class="table-item-con"><el-input v-model="clientLink"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">联系日期：</span>
                              <span class="table-item-con"><el-input v-model="linkDate"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                  <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">旺旺名称：</span>
                              <span class="table-item-con"><el-input v-model="wwName"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                              <div class="table-item">
                              <span class="table-item-tit">所在地区：</span>
                              <span class="table-item-con"><el-input v-model="clientAddress"></el-input></span>
                          </div>
                          </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                          <div class="table-title">店铺信息</div>
                        </el-col>
                      </el-row>
                    <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">店铺名称：</span>
                              <span class="table-item-con"><el-input v-model="shopName"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">所属行业：</span>
                              <span class="table-item-con"><el-input v-model="shopIndustry"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                          <div class="table-item">
                              <span class="table-item-tit">店铺等级：</span>
                              <span class="table-item-con"><el-input v-model="shopGrade"></el-input></span>
                          </div>
                      </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                          <div class="table-title">其他信息</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="table-item" style="height:80px">
                                <span class="table-item-tit" style="height:92px;line-height:92px">备注信息：</span>
                                <span class="table-item-con" style="height:92px;"><el-input
                            type="textarea"
                            rows="4"
                            v-model="desc">
            </el-input></span>
                            </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <span style="display:block;">
                              <el-button @click="submitUpdate" type="primary" style="float:right; margin:30px 20px 30px">提交更新</el-button>
                          </span>
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
      sortOptions: [],
      sortFlexFlag: true,
      flexWidth: '20px',
      sortValue: '',
      search: '',
      clientData: [],
      clientInfoVisible: false,
      editInfoVisible: false,
      clientId: '',
      clientName: '',
      clientLink: '',
      clientAddress: '',
      writeMan: '',
      salesMan: '',
      shopName: '',
      shopUrl: '',
      shopId: '',
      shopGrade: '',
      shopIndustry: '',
      shopType: '',
      comboType: '',
      regDate: '',
      clientFiles: [],
      wwName: '',
      linkDate: '',
      desc: '',
      tableWidth: '100%',
      currentPage: 1,
      pageSize: 7,
      total: null,
      queryMan: '',
      fFlag: 'false'
    }
  },
  created () {
    if (window.screen.width >= 1920) {
      this.pageSize = 10
    }
    let writeM = this.$store.state.userDepart + '=>' + this.$store.state.userName
    this.queryMan = writeM
    let that = this
    let formData = new FormData()
    formData.append('flag', 'fetchIntent')
    formData.append('power', this.$store.state.userPower)
    formData.append('writeM', writeM)
    formData.append('cur_page', 1)
    formData.append('page_size', this.pageSize)
    this.$http.post('client_mng.php', formData)
      .then(function (res) {
        that.clientData = res.data.data
        that.total = parseInt(res.data.total)
        // console.log('Client', res)
      }).catch(function (err) {
        console.log(err)
      })

      //  all  users' name
        let formData5 = new FormData()
        formData5.append('code', '400')
        this.$http.post('user_info.php', formData5)
            .then(function (res) {
                let data = res.data
                // console.log('DDDDAta:', data)
                for (let i = 0; i < data.length; i++) {
                that.sortOptions.push({
                  value: data[i].st_departmentVal + '=>' + data[i].st_name,
                  label: data[i].st_departmentVal + '=>' + data[i].st_name
                })
                }
            //   console.log('StaffName:', that.staffNames)
            }).catch(function (err) {
                console.log(err)
            })
  },
  mounted () {
    this.tableWidth = this.$refs.table.clientWidth + 'px'
    // console.log(window.screen.width)
    // console.log(this.$refs.table.clientWidth)
    const that = this
    document.addEventListener('click', function (e) {
      if (that.$refs.flexBtn.contains(e.target) === false) {
        // console.log('yes')
        that.flexWidth = '10px'
        that.sortFlexFlag = true
      }
    })
  },
  methods: {
    fetchAll () {
      let that = this
      this.fFlag = 'false'
      let formData = new FormData()
      formData.append('flag', 'fetchIntent')
      formData.append('power', this.$store.state.userPower)
      formData.append('cur_page', 1)
      formData.append('page_size', this.pageSize)
      this.$http.post('client_mng.php', formData)
        .then(function (res) {
          that.clientData = res.data.data
          that.total = parseInt(res.data.total)
          // console.log('Client', res)
        }).catch(function (err) {
          console.log(err)
        })
    },
    flexBtn () {
      this.sortFlexFlag = !this.sortFlexFlag
      // console.log(this.sortFlexFlag)
      this.sortFlexFlag ? this.flexWidth = '10px' : this.flexWidth = '332px'
      // this.flexWidth = '240px'? this.flexWidth = '40px'" : this.flexWidth = '40px'
    },
    sortChange () {
      // console.log('a')
      this.queryMan = this.sortValue
      this.fFlag = 'true'
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetchIntent')
      formData.append('power', this.$store.state.userPower)
      formData.append('writeM', this.sortValue)
      formData.append('f_flag', this.fFlag)
      formData.append('cur_page', 1)
      formData.append('page_size', this.pageSize)
      this.$http.post('client_mng.php', formData)
        .then(function (res) {
          that.clientData = res.data.data
          that.total = parseInt(res.data.total)
          // console.log('ClientFilter', res)
        }).catch(function (err) {
          console.log(err)
        })
    },
    filterTag (value, row) {
      // let writeM = this.$store.state.userDepart + '=>' + this.$store.state.userName
      // let that = this
      // let formData = new FormData()
      // formData.append('flag', 'fetchIntent')
      // formData.append('power', this.$store.state.userPower)
      // formData.append('writeM', value)
      // formData.append('f_flag', true)
      // formData.append('cur_page', 1)
      // formData.append('page_size', this.pageSize)
      // this.$http.post('client_mng.php', formData)
      //   .then(function (res) {
      //     that.clientData = res.data.data
      //     that.total = parseInt(res.data.total)
      //     console.log('ClientFilter', res)
      //   }).catch(function (err) {
      //     console.log(err)
      //   })

      return row.write_man === value
      //  console.log(value)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // power-flag  power
      let that = this
      let formData = new FormData()
      formData.append('flag', 'fetchIntent')
      formData.append('power', this.$store.state.userPower)
      formData.append('writeM', this.queryMan)
      formData.append('cur_page', val)
      formData.append('f_flag', this.fFlag)
      formData.append('page_size', this.pageSize)
      this.$http.post('client_mng.php', formData)
      .then(function (res) {
        that.clientData = res.data.data
        // console.log('paginationDetail', res)
      }).catch(function (err) {
        console.log(err)
      })
    },
    handleDetail (index, row) {
      this.clientInfoVisible = true
      // console.log(index, row)
      this.clientId = row.id
      this.clientName = row.client_name
      this.clientLink = row.client_link
      this.clientAddress = row.client_address
      this.writeMan = row.write_man
      this.salesMan = row.sales_man
      this.shopName = row.shop_name
      this.shopUrl = row.shop_url
      this.shopId = row.shop_id
      this.shopGrade = row.shop_grade
      this.shopIndustry = row.shop_industry
      this.shopType = row.shop_type
      this.comboType = row.combo_type
      this.regDate = row.reg_date
      // new add
      this.wwName = row.ww_name
      this.linkDate = row.link_date
      this.desc = row.desc_info
      this.clientFiles = row.files
      if (row.files !== '') {
        let file = row.files.split(',')
        let fileArr = []
        for (let i = 0; i < file.length; i++) {
          fileArr.push(file[i])
        }
        this.clientFiles = fileArr
        }
    },
    handleDelete (index, row) {
      //  console.log(index, row)
      this.$confirm('此操作将永久删除该意向客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let that = this
          let formData = new FormData()
          formData.append('flag', 'delClient')
          formData.append('delId', row.id)
          this.$http.post('client_mng.php', formData)
            .then(function (res) {
              // console.log(res)
              if (res.data === 'delClientSuc') {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              that.$store.state.defaultComp = 'clientAdd'
              setTimeout(() => {
                that.$store.state.defaultComp = 'intentList'
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
    },
    handleEdit (index, row) {
      this.editInfoVisible = true
      // console.log(index, row)
      this.clientId = row.id
      this.clientName = row.client_name
      this.clientLink = row.client_link
      this.clientAddress = row.client_address
      this.shopName = row.shop_name
      this.shopGrade = row.shop_grade
      this.shopIndustry = row.shop_industry
      // new add
      this.wwName = row.ww_name
      this.linkDate = row.link_date
      this.desc = row.desc_info
    },
    submitUpdate () {
     // alert(12345)
      let that = this
      let formData = new FormData()
      formData.append('flag', 'updateIntent')
      formData.append('id', this.clientId)
      formData.append('client_name', this.clientName)
      formData.append('client_link', this.clientLink)
      formData.append('link_date', this.linkDate)
      formData.append('ww_name', this.wwName)
      formData.append('client_address', this.clientAddress)
      formData.append('shop_name', this.shopName)
      formData.append('shop_industry', this.shopIndustry)
      formData.append('shop_grade', this.shopGrade)
      formData.append('desc', this.desc)
      // formData.append('power', this.$store.state.userPower)
      // formData.append('writeM', writeM)
      this.$http.post('client_mng.php', formData)
        .then(function (res) {
          // that.clientData = res.data
            // console.log('intent', res)
            if (res.data === 'upSuc') {
              that.$message({
                type: 'success',
                message: '更新成功!'
              })
              that.editInfoVisible = false
              that.$store.state.defaultComp = 'clientAdd'
              setTimeout(() => {
                that.$store.state.defaultComp = 'intentList'
              }, 10)
            } else {
               that.$message.error('更新失败~')
            }
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="less">
@blue: #409EFF;
.intent-sort{
  position: fixed;
  right: 0;
  top: 74px;
  width: 10px;
  height: 44px;
  border-radius: 6px 0 0 6px;
  background-color: #409EFF;
  transition: all .3s ease-in-out;
}
.intent-sort::before{
  content: '';
  display: inline-block;
  width: 3px;
  height: 28px;
  border-radius: 4px;
  background-color: #ffffff;
  position: absolute;
  top: 8px;
  left: 4px;
}
.intent-sort-main{
  // display: none;
  // transition: all 1s;
  padding-top: 2px;
  float: right;
}
.sortMan-enter-active, .sortMan-leave-active {
  transition: opacity 1s;
}
.sortMan-enter, .sortMan-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pag{
  height: 80px;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  right: 20px;
  .el-pagination{
    margin-top: 20px;
  }
  .el-pagination__total{
    margin-left: 20px;
  }
}
.el-table th>.cell{
  text-align: center;
}
.client-list{
  position: relative;
  padding-bottom: 30px;
.clientInfoTable{
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
 .editInfoTable{
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
    height: 40px;
    margin: 12px 2px;
    // border: 1px solid @blue;
    span{
      float: left;
      height: 40px;
      line-height: 40px;
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
}
</style>
