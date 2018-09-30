<template>
    <div class="dispense-order">
        <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
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
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button @click="alertName" class="transfer-footer" slot="right-footer">立即分发</el-button>
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
          return <span>{ option.apart } - { option.label }</span>
        }
      }
    },
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

          for (let i = 0; i < data.length; i++) {
            that.staffNames.push({
              key: i,
              apart: '石一家一',
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
      alertName () {
        console.log(this.hadRemove)
        // staffNames.forEach(item => {
        // })
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
