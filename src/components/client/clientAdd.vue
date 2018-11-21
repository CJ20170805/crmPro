<template>
  <div class="client-add">
    <div class="client-main">
       <el-form :model="client" :rules="rules" ref="client" label-width="100px">
        <div class="form-title">
          <p>客户信息</p>
        </div>
        <el-form-item label="客户姓名">
          <el-col :span="10">
             <el-input v-model="client.name"></el-input>
          </el-col>
        </el-form-item>
         <el-form-item label="旺旺名称" required>
          <el-col :span="10">
             <el-input v-model="client.wwName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺名称" required>
          <el-col :span="10">
             <el-input v-model="client.shopName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺等级" required>
          <el-col :span="10">
              <el-cascader
                :options="gradeOptions"
                v-model="client.shopGrade"
                >
              </el-cascader>
          </el-col>
        </el-form-item>
         <el-form-item label="主营类目" required>
          <el-col :span="10">
              <el-cascader
                :options="sortOptions"
                v-model="client.shopSort"
                 @change="handleChange"
                >
              </el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-col :span="10">
             <el-input v-model="client.address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="店铺链接">
          <el-col :span="16">
             <el-input v-model="client.shopUrl">
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
                  <i
            class="el-icon-location-outline"
            slot="suffix"
            >
             </i>
             </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="linkMethods">
          <!-- <el-input v-model="shop.linkMethods"></el-input> -->
           <el-input placeholder="请输入联系方式" v-model="client.linkMethods" class="input-with-select">
            <el-select style="width:100px;" v-model="client.linkMethodsSel" slot="prepend" placeholder="请选择">
              <el-option label="手机" value="手机"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="QQ" value="QQ"></el-option>
              <el-option label="旺旺" value="旺旺"></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item label="录入人员">
          <el-col :span="9">
            <el-input v-model="client.writeMan" :disabled="true"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="联系日期">
          <el-col :span="9">
            <!-- <el-input v-model="shop.payPrice" suffix-icon="el-icon-sold-out"></el-input> -->
             <el-date-picker
                v-model="client.linkDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" rows="4" v-model="client.descInfo"></el-input>
        </el-form-item>

        <el-form-item label="添加附件">

              <!--action="http://localhost:8080/api/crmApi/client_img.php" -->

          <el-upload
            action="http://www.huibohehe.com/crmApi/client_img.php"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="orderUploadSuc"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <!-- <el-form-item label="即时配送" prop="delivery">
          <el-col :span="3">
              <el-switch v-model="shop.delivery"></el-switch>
          </el-col>
        </el-form-item> -->

        <el-form-item class="submitBtn">
          <!-- <el-button type="primary" @click="alertVal">AAAA</el-button> -->
          <!-- <el-button type="primary" @click="submitForm('shop')">立即创建</el-button> -->
          <el-button type="primary" @click="submitNewClient">立即创建</el-button>
          <el-button @click="resetForm('client')">重置</el-button>
        </el-form-item>
     </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        client: {
          name: '',
          address: '',
          linkMethods: '',
          linkDate: '',
          descInfo: '',
          linkMethodsSel: '',
          writeMan: '',
          shopGrade: [],
          shopSort: [],
          wwName: '',
          shopName: '',
          shopUrl: ''
        },
        dialogImageUrl: '',
        gradeOptions: [
          {
          value: 'A店',
          label: 'A店',
          children: [
            {
            value: '1心',
            label: '1心'
            },
            {
            value: '2心',
            label: '2心'
            },
            {
            value: '3心',
            label: '3心'
            },
            {
            value: '4心',
            label: '4心'
            },
            {
            value: '5心',
            label: '5心'
            },
            {
            value: '1钻',
            label: '1钻'
            },
            {
            value: '2钻',
            label: '2钻'
            },
            {
            value: '3钻',
            label: '3钻'
            },
            {
            value: '4钻',
            label: '4钻'
            },
            {
            value: '5钻',
            label: '5钻'
            },
            {
            value: '1皇冠',
            label: '1皇冠'
            },
            {
            value: '2皇冠',
            label: '2皇冠'
            },
            {
            value: '3皇冠',
            label: '3皇冠'
            },
            {
            value: '4皇冠',
            label: '4皇冠'
            },
            {
            value: '5皇冠',
            label: '5皇冠'
            },
            {
            value: '1金冠',
            label: '1金冠'
            },
            {
            value: '2金冠',
            label: '2金冠'
            },
            {
            value: '3金冠',
            label: '3金冠'
            },
            {
            value: '4金冠',
            label: '4金冠'
            },
            {
            value: '5金冠',
            label: '5金冠'
            }
          ]
          },
          {
          value: 'B店',
          label: 'B店',
          children: [
            {
            value: '1心',
            label: '1心'
            },
            {
            value: '2心',
            label: '2心'
            },
            {
            value: '3心',
            label: '3心'
            },
            {
            value: '4心',
            label: '4心'
            },
            {
            value: '5心',
            label: '5心'
            },
            {
            value: '1钻',
            label: '1钻'
            },
            {
            value: '2钻',
            label: '2钻'
            },
            {
            value: '3钻',
            label: '3钻'
            },
            {
            value: '4钻',
            label: '4钻'
            },
            {
            value: '5钻',
            label: '5钻'
            },
            {
            value: '1皇冠',
            label: '1皇冠'
            },
            {
            value: '2皇冠',
            label: '2皇冠'
            },
            {
            value: '3皇冠',
            label: '3皇冠'
            },
            {
            value: '4皇冠',
            label: '4皇冠'
            },
            {
            value: '5皇冠',
            label: '5皇冠'
            },
            {
            value: '1金冠',
            label: '1金冠'
            },
            {
            value: '2金冠',
            label: '2金冠'
            },
            {
            value: '3金冠',
            label: '3金冠'
            },
            {
            value: '4金冠',
            label: '4金冠'
            },
            {
            value: '5金冠',
            label: '5金冠'
            }
          ]
          },
          {
          value: 'C店',
          label: 'C店',
          children: [
            {
            value: '1心',
            label: '1心'
            },
            {
            value: '2心',
            label: '2心'
            },
            {
            value: '3心',
            label: '3心'
            },
            {
            value: '4心',
            label: '4心'
            },
            {
            value: '5心',
            label: '5心'
            },
            {
            value: '1钻',
            label: '1钻'
            },
            {
            value: '2钻',
            label: '2钻'
            },
            {
            value: '3钻',
            label: '3钻'
            },
            {
            value: '4钻',
            label: '4钻'
            },
            {
            value: '5钻',
            label: '5钻'
            },
            {
            value: '1皇冠',
            label: '1皇冠'
            },
            {
            value: '2皇冠',
            label: '2皇冠'
            },
            {
            value: '3皇冠',
            label: '3皇冠'
            },
            {
            value: '4皇冠',
            label: '4皇冠'
            },
            {
            value: '5皇冠',
            label: '5皇冠'
            },
            {
            value: '1金冠',
            label: '1金冠'
            },
            {
            value: '2金冠',
            label: '2金冠'
            },
            {
            value: '3金冠',
            label: '3金冠'
            },
            {
            value: '4金冠',
            label: '4金冠'
            },
            {
            value: '5金冠',
            label: '5金冠'
            }
          ]
          }
        ],
        sortOptions: [
          {
            value: 'A',
            label: '服装类',
            children: [
              {
              value: '男装',
              label: '男装'
              },
              {
              value: '女装',
              label: '女装'
              },
              {
              value: '内衣',
              label: '内衣'
              }
            ]
          },
           {
            value: 'B',
            label: '鞋包类',
            children: [
              {
              value: '鞋靴',
              label: '鞋靴'
              },
              {
              value: '箱包',
              label: '箱包'
              },
              {
              value: '配件配饰',
              label: '配件配饰'
              }
            ]
          },
          {
            value: 'C',
            label: '孕产类',
            children: [
              {
              value: '童装玩具',
              label: '童装玩具'
              },
              {
              value: '孕产用品',
              label: '孕产用品'
              },
              {
              value: '奶粉辅食',
              label: '奶粉辅食'
              }
            ]
          },
          {
            value: 'D',
            label: '数码家电类',
            children: [
              {
              value: '家电',
              label: '家电'
              },
              {
              value: '数码',
              label: '数码'
              },
              {
              value: '手机',
              label: '手机'
              }
            ]
          },
          {
            value: 'E',
            label: '个人护理类',
            children: [
              {
              value: '美妆',
              label: '美妆'
              },
              {
              value: '个人护理',
              label: '个人护理'
              },
              {
              value: '营养保健',
              label: '营养保健'
              }
            ]
          },
          {
            value: 'F',
            label: '饰品类',
            children: [
              {
              value: '珠宝',
              label: '珠宝'
              },
              {
              value: '眼镜',
              label: '眼镜'
              },
              {
              value: '手表',
              label: '手表'
              }
            ]
          },
                 {
            value: 'G',
            label: '运动、乐器类',
            children: [
              {
              value: '运动',
              label: '运动'
              },
              {
              value: '户外',
              label: '户外'
              },
              {
              value: '乐器',
              label: '乐器'
              }
            ]
          },
                 {
            value: 'H',
            label: '动漫影视类',
            children: [
              {
              value: '游戏',
              label: '游戏'
              },
              {
              value: '动漫',
              label: '动漫'
              },
              {
              value: '影视',
              label: '影视'
              }
            ]
          },
                 {
            value: 'I',
            label: '食品类',
            children: [
              {
              value: '美食',
              label: '美食'
              },
              {
              value: '生鲜',
              label: '生鲜'
              },
              {
              value: '零食',
              label: '零食'
              }
            ]
          },
                 {
            value: 'J',
            label: '宠物园艺类',
            children: [
              {
              value: '鲜花园艺',
              label: '鲜花园艺'
              },
              {
              value: '宠物水族',
              label: '宠物水族'
              },
              {
              value: '农资',
              label: '农资'
              }
            ]
          },
          {
            value: 'K',
            label: '工具建材类',
            children: [
              {
              value: '工具',
              label: '工具'
              },
              {
              value: '装修',
              label: '装修'
              },
              {
              value: '建材',
              label: '建材'
              }
            ]
          },
                {
            value: 'L',
            label: '家居类',
            children: [
              {
              value: '家居',
              label: '家居'
              },
              {
              value: '布艺软饰',
              label: '布艺软饰'
              },
              {
              value: '床上用品',
              label: '床上用品'
              }
            ]
          },
          {
            value: 'M',
            label: '汽车类',
            children: [
              {
              value: '品质汽车',
              label: '品质汽车'
              },
              {
              value: '二手车',
              label: '二手车'
              },
              {
              value: '汽车用品',
              label: '汽车用品'
              }
            ]
          },
                {
            value: 'N',
            label: '办公五金类',
            children: [
              {
              value: '办公用品',
              label: '办公用品'
              },
              {
              value: 'DIY',
              label: 'DIY'
              },
              {
              value: '五金电子',
              label: '五金电子'
              }
            ]
          },
          {
            value: 'O',
            label: '家庭类',
            children: [
              {
              value: '百货',
              label: '百货'
              },
              {
              value: '餐厨',
              label: '餐厨'
              },
              {
              value: '家庭保健',
              label: '家庭保健'
              }
            ]
          },
           {
            value: 'P',
            label: '学习服务类',
            children: [
              {
              value: '学习',
              label: '学习'
              },
              {
              value: '卡券',
              label: '卡券'
              },
              {
              value: '本地服务',
              label: '本地服务'
              }
            ]
          }
        ],
        clientFiles: [],
        clientFilesNew: [],
        dialogVisible: false,
        rules: {
          linkMethods: [
            { required: true, message: '请输入联系人的联系方式', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          salesMan: [
            { required: true, message: '请输入销售人员姓名', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.client.writeMan = this.$store.state.userDepart
      this.client.writeMan += '=>'
      this.client.writeMan += this.$store.state.userName
    },
    methods: {
      orderUploadSuc (response, file, fileList) {
        let imgUrl = file.response
        this.clientFiles.push(imgUrl)
        // console.log("Onsuc",this.orderImgs)
      },
      handleRemove (file, fileList) {
        let fileName = file.name
        this.clientFilesNew = []
        this.clientFiles.forEach((v, k) => {
          if (v.indexOf(fileName) === -1) {
            this.clientFilesNew.push(v)
          }
        })
        this.clientFiles = this.clientFilesNew
        // console.log("OnErr",this.orderImgs)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      submitNewClient () {
        this.$confirm('即将添加新客户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm('client')
        // console.log(this.client.type)
          // this.submitFlag = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      },
      handleChange (value) {
          console.log(value)
        },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            // alert(this.shop.payPrice)
            let linkStr = this.client.linkMethodsSel + ':' + this.client.linkMethods
            let that = this
            let formData = new FormData()
            formData.append('flag', 'add')
            formData.append('client_name', this.client.name)
            formData.append('client_address', this.client.address)
            formData.append('client_link', linkStr)
            formData.append('link_date', this.client.linkDate)
            formData.append('desc_info', this.client.descInfo)
            formData.append('write_man', this.client.writeMan)
            formData.append('files', this.clientFiles)
            // new add
            formData.append('ww_name', this.client.wwName)
            formData.append('shop_url', this.client.shopUrl)
            formData.append('shop_name', this.client.shopName)
            formData.append('shop_grade', this.client.shopGrade)
            formData.append('shop_sort', this.client.shopSort[1])
            this.$http.post('client_mng.php', formData)
              .then(function (res) {
                console.log(res)
            if (res.data === 'AddSUC') {
              that.$message({
                type: 'success',
                message: '添加成功!'
              })
              that.$store.state.defaultComp = 'intentList'
            } else {
              that.$message({
                type: 'info',
                message: '请检查表单是否正确填写!'
              })
            }
              }).catch(function (err) {
                console.log(err)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style lang="less">
@blue: #409EFF;
.submitBtn{
  padding:80px 0 100px 300px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.form-title{
  p{
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    color: @blue;
    margin:20px 0 20px 20px;
  }
}
.client-add{
    width: 100%;
    height: 100%;
    padding: 60px 0 100px 0;
}
.client-main{
    width: 600px;
    margin: 0 auto;
}
.el-checkbox+.el-checkbox{
    margin-left: 10px;
}
</style>
