<script setup>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue'
import useSiteStore from '@/stores/useSiteStore'

const siteStore = useSiteStore()
const totalPage = ref(0)
const currentPage = ref(1)
const posts = ref([])

watch(
    () => currentPage.value,
    async pageNum => {
        document.title = `第 ${pageNum} 页 | ${siteStore.siteInfo.title}`

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
        <div v-for="post in posts" class="post">
            <router-link class="post-title" :to="`/post/${post.id}`">{{ post.title }}</router-link>
            <span class="post-preview">{{ post.preview }}</span>
        </div>
        <el-pagination class="flex-center" layout="prev, pager, next" v-model:current-page="currentPage" :page-count="totalPage" />
    </div>
</template>

<style scoped>
.post {
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}

.post-title {
    display: inline-block;
    font-size: 1.5em;
}

.post-preview {
    display: block;
    color: #444;
    margin: 5px 0;
}

.el-pagination * {
    background: transparent !important;
}
</style>
