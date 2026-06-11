<script setup>
document.title = '正在跳转...'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const redirect = async () => {
    try {
        const res = await axios.get('/api/auth/status')
        ElMessage.success(res.data)
        if (!route.name || route.name === 'login') router.push({ name: 'dashboard' })
        else router.push({ name: route.name })
    } catch (error) {
        ElMessage.error(error.response.data)
        router.push({ name: 'login' })
    }
}

watch(
    () => route.path,
    path => {
        if (path === '/admin') redirect()
    }
)

onMounted(redirect)
</script>

<template></template>

<style scoped></style>
