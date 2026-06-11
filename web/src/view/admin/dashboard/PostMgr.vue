<script setup>
import setTitle from '@/setTitle.js'
import { Refresh } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'

setTitle('文章管理器')
const loading = ref(false)
const totalPage = ref(0)
const currentPage = ref(1)
const posts = ref([])

const post = {
    id: ref(0),
    data: reactive({
        title: '',
        content: ''
    })
}

const fetchCount = async () => {
    try {
        const res = await axios.get('/api/post/count')
        totalPage.value = res.data.totalPage
    } catch (error) {
        ElMessage.error(error.response.data)
    }
}

const fetchPosts = async () => {
    try {
        const res = await axios.get(`/api/post/list?page=${currentPage.value}&preview=no`)
        posts.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
    }
}

const refresh = async () => {
    loading.value = true
    await Promise.all([fetchCount(), fetchPosts()])
    loading.value = false
}

onMounted(refresh)
</script>

<template>
    <div class="flex-align-center">
        <el-button type="primary" :loading="loading" @click="refresh" :icon="Refresh" />
    </div>
</template>

<style scoped></style>
