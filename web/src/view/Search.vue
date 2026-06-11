<script setup>
import setTitle from '@/setTitle.js'
import { ref } from 'vue'
import PostCard from '@/components/PostCard.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

setTitle('搜索')
const keyword = ref('')
const loading = ref(false)
const result = ref([])

const search = async () => {
    try {
        loading.value = true
        const res = await axios.get(`/api/post/search?keyword=${keyword.value}`)
        result.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="top">
        <el-input v-model="keyword" />
        <el-button type="primary" :loading="loading" @click="search">搜索</el-button>
    </div>
    <div v-if="result.length !== 0" class="main">
        <PostCard v-for="post in result" :link="`/post/${post.id}`" :title="post.title" :preview="post.preview" />
    </div>
</template>

<style scoped>
.top {
    display: flex;
    align-items: center;
    column-gap: 5px;
}

.main {
    margin-top: 10px;
}
</style>
