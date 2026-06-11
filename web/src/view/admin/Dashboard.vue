<script setup>
document.title = '正在跳转...'

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const tabs = computed(() => {
    const allRoutes = router.getRoutes()
    const dashboardRoute = allRoutes.find(route => route.name === 'dashboard')
    return dashboardRoute ? dashboardRoute.children || [] : []
})

const handleClick = (tab, _) => {
    const name = tab.paneName
    if (name !== 'logout') router.push({ name })
    else doLogout()
}

const doLogout = async () => {
    try {
        const res = await axios.get('/api/auth/logout')
        ElMessage.success(res.data)
        router.push({ name: 'login' })
    } catch (error) {
        ElMessage.error(error.response.data)
    }
}

const redirect = () => {
    if (!route.name || route.name === 'dashboard') router.push({ name: 'config-edit' })
    else router.push({ name: route.name })
}

watch(
    () => route.name,
    name => {
        if (name === 'dashboard') redirect()
    }
)

onMounted(redirect)
</script>

<template>
    <el-tabs :model-value="route.name" @tab-click="handleClick">
        <el-tab-pane v-for="tab in tabs" :label="tab.meta.tab" :name="tab.name" />
        <el-tab-pane label="退出登录" name="logout" />
    </el-tabs>
    <router-view />
</template>

<style scoped>
.el-tabs :deep(.el-tabs__nav) {
    margin-top: -10px;
}

.el-tabs :deep(.el-tabs__item) {
    font-size: 1.2em;
}
</style>
