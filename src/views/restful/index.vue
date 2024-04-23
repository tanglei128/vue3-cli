<template>
    <div class="container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item :index="item.index" v-for="item in menuList" :key="item.index">{{ item.name }}</el-menu-item>
        </el-menu>
        <RouterView />
    </div>

</template>

<script  setup>
import { ref, onMounted } from 'vue'
import { RouterView, useRouter,  } from 'vue-router'
const router = useRouter()
const activeIndex = ref(null)
const menuList = ref([
    { index: '1', name: 'GET', url: '/get' },
    { index: '2', name: 'POST', url: '/post' },
    { index: '3', name: 'File Upload', url: '/file-upload' },
    { index: '4', name: 'JSON View', url: '/json-view' },
])

const handleSelect = (key, keyPath) => {

    router.push(menuList.value[key - 1].url)
}
onMounted(() => {
    //获取当前路由地址
    // 例如：/get
    const currentPath = router.currentRoute.value.path
    console.log(currentPath)
    // 遍历菜单列表，找到对应的索引
    const index = menuList.value.findIndex(item => item.url === currentPath)
    if (index !== -1) {
        activeIndex.value = String(index + 1)
        console.log(activeIndex.value)
    }
})
</script>
<style scoped>
.container {
    margin: 0 auto;
    /* border: solid 1px #ccc; */
    padding: 20px;
    background: #f2f2f5;
    min-height: 600px;
    height: 100%;
}
</style>