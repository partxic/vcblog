<script setup>
import setTitle from '@/setTitle.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'

setTitle('页面管理器')
const loading = ref(false)
const pages = ref([])

const page = {
    id: ref(0),
    data: reactive({
        title: '',
        content: ''
    })
}

const refresh = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/page/list')
        pages.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

onMounted(refresh)
</script>

<template>
    <div class="flex-align-center">
        <el-button type="primary" :loading="loading" @click="refresh">刷新</el-button>
    </div>
</template>

<style scoped></style>
