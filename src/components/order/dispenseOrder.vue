<template>
    <div class="dispense-order">
        <p style="text-align: center; margin: 0 0 30px;">订单分发</p>
        <div style="text-align: center">
            <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value3"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['选择姓名', '已选姓名']"
            :button-texts="['撤回', '选择']"
            :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="staffNames">
            <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
            <el-button @click="whetherDispense" type="primary" size="small"  class="transfer-footer" slot="right-footer">立即分发</el-button>
            </el-transfer>
        </div>
    </div>
</template>
<script>
export default {
    data () {
      return {
        staffNames: [],
        // data: [],
        value3: [],
        hadRemove: [],
        renderFunc (h, option) {
          return <span>{ option.apart } ☞ { option.label }</span>
        }
      }
    },
    props: ['orderDispenseInfo'],
    mounted () {
    },
    created () {
    //   获取所有员工姓名   员工部门 需要变成数据获取

      let that = this
      let formData = new FormData()
      formData.append('code', '400')
      this.$http.post('user_info.php', formData)
        .then(function (res) {
          let data = res.data
          console.log('DDDDAta:', data)
          for (let i = 0; i < data.length; i++) {
            that.staffNames.push({
              key: i,
              apart: data[i].st_departmentVal,
              label: data[i].st_name
            })
          }
          console.log('StaffName:', that.staffNames)
        }).catch(function (err) {
          console.log(err)
        })
    },
    methods: {
      handleChange (value, direction, movedKeys) {
        // console.log(value, direction, movedKeys)
        // this.hadRemove = value
        let names = []
        value.forEach((index) => {
        //   console.log(item, '====', index)
          names.push(this.staffNames[index].label)
        })
        this.hadRemove = names
      },
      whetherDispense () {
        this.$confirm('<p>即将分发订单给<span style="color:red; font-weight:600; margin:0 4px;">' + this.hadRemove + '</span>是否继续?</p>', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true
        }).then(() => {
          this.beginDispense()
          this.$message({
            type: 'success',
            message: '分发成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分发'
          })
        })
    },
    beginDispense () {
      // 存订单id 到数据库   根据id反查订单
      console.log(this.orderDispenseInfo.id)
    }
  }
}
</script>
<style lang="less">
 .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
