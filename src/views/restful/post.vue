<template>
  <div class="container">

    传参注解：<el-select v-model="value" placeholder="请选择" style="width:50%;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-divider></el-divider>
    <el-form ref="ruleFormRef" :label-position="labelPosition" label-width="auto" :model="formLabelAlign"
      style="max-width: 600px">
      <el-form-item :rules="[
      {
        required: true,
        message: 'Please input name',
        trigger: 'blur',
      }]" prop="name" label=" Name">
        <el-input v-model="formLabelAlign.name" required="true" />
      </el-form-item>
      <!-- <el-form-item label="Activity zone">
                <el-input v-model="formLabelAlign.region" />
            </el-form-item> -->
      <!-- <el-form-item label="Activity form">
                <el-input v-model="formLabelAlign.type" />
            </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
      <h3>请求入参</h3>
      <json-view-editor v-if="jsonResult" :result="jsonResult"></json-view-editor>
      <h3>返回结果</h3>
      <el-input type="textarea" :rows="3" v-model="result" placeholder=""></el-input>
    </div>

  </div>
</template>

<script setup>
import { getUserInfoMethodPost, getUserInfo4 } from '@/api/index'
import { reactive, ref, onMounted } from 'vue'
import JsonViewEditor from '@/components/JsonViewEditor.vue'

const labelPosition = ref('right')
const ruleFormRef = ref();
const value = ref('1')
const options= ref([{
  value: '1',
  label: '@RequestParam',
}, {
  value: '2',
  label: '@RequestBody',
}])
const formLabelAlign = reactive({
  name: '',
  // region: '',
  // type: '',
})
const jsonResult = ref()
const result = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  jsonResult.value = null;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!', formLabelAlign)
      let res = null;
      if (value.value == '1') {
        res = await getUserInfoMethodPost(formLabelAlign)
      } else {
        res = await getUserInfo4(formLabelAlign)
      }
      
      result.value = JSON.stringify(res.data);
      jsonResult.value = JSON.stringify(res);
      console.log(res)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {

})
</script>

<style></style>