<script setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import PostCard from '@/components/PostCard.vue'
import setTitle from '@/setTitle.js'

const totalPage = ref(0)
const currentPage = ref(1)
const posts = ref([])

watch(
    () => currentPage.value,
    async pageNum => {
        setTitle(`第 ${pageNum} 页`)

        try {
            const res = await axios.get(`/api/post/list?page=${pageNum}`)
            posts.value = res.data
        } catch (error) {
            ElMessage.error(error.response.data)
        }
    },
    { immediate: true }
)

onMounted(async () => {
    try {
        const res = await axios.get('/api/post/count')
        totalPage.value = res.data.totalPage
    } catch (error) {
        ElMessage.error(error.response.data)
    }
})
</script>

<template>
    <div v-if="totalPage !== 0">
        <PostCard v-for="post in posts" :link="`/post/${post.id}`" :title="post.title" :preview="post.preview" />
        <el-pagination class="flex-center" layout="prev, pager, next" v-model:current-page="currentPage" :page-count="totalPage" />
    </div>
</template>

<style scoped>
.el-pagination * {
    background: transparent !important;
}
</style>
