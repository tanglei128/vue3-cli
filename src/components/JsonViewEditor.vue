<template>
    <div class='content'>

        <v-ace-editor v-model:value="dataForm.textareashow" @init="jsonFormat" lang="json"
            :readonly="aceConfig.readOnly" :theme="aceConfig.theme" :options="aceConfig.options"
            style="height:600px;margin-bottom: 20px;" class="ace-editor" />
        <el-button @click="jsonFormat">格式化</el-button>
        <el-button @click="jsonNoFormat">压缩</el-button>
    </div>
</template>
<script setup>
import { reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';

const props = defineProps({
    result: {
        type: String,
        default: () => {
            return '' 
        }
    },
})

//ace编辑器配置
const aceConfig = reactive({
    lang: 'json', //解析json
    theme: 'clouds', //主题
    fontSize: 18, //字体大小
    readOnly: false, //是否只读
    options: {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
        showPrintMargin: false,
        fontSize: 16
    }
});

const dataForm = reactive({
    textareashow: '{"A":"A1","B":"B1"}'
});

onMounted(() => {
    dataForm.textareashow = props.result
    // console.log(dataForm.textareashow,9)
})
const jsonError = (e) => {
    console.log(`JSON字符串错误：${e.message}`);
    ElMessage.error(`JSON字符串错误：${e.message}`);
}
// JSON格式化
const jsonFormat = () => {
    try {
        dataForm.textareashow = JSON.stringify(JSON.parse(dataForm.textareashow), null, 2)
    } catch (e) {
        jsonError(e)
    }
};
// JSON压缩
const jsonNoFormat = () => {
    try {
        dataForm.textareashow = JSON.stringify(JSON.parse(dataForm.textareashow))
    } catch (e) {
        jsonError(e)
    }
}
</script>
<style scoped>
.content {
    padding-top: 20px;
}

.el-button {
    margin-left: 20px;
}
</style>
