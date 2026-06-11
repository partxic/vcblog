<script setup>
import setTitle from '@/setTitle.js'
import { Refresh, Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive, watch } from 'vue'

setTitle('文章管理器')
const loading = ref(false)
const totalPage = ref(0)
const currentPage = ref(1)
const posts = ref([])
const showEditor = ref(false)

const post = {
    id: ref(0),
    data: reactive({
        title: '',
        content: ''
    })
}

const newPost = () => {}

const openEditor = async idx => {}

const deletePost = async idx => {}

const closeEditor = async () => {
    showEditor.value = false
    await refresh()
}

const savePost = async () => {}

const refresh = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/post/count')
        totalPage.value = res.data.totalPage
    } catch (error) {
        ElMessage.error(error.response.data)
        return
    } finally {
        loading.value = false
    }

    try {
        loading.value = true
        const res = await axios.get(`/api/post/list?page=${currentPage.value}&preview=no`)
        posts.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
        return
    } finally {
        loading.value = false
    }
}

watch(
    () => currentPage.value,
    async _ => await refresh()
)

onMounted(refresh)
</script>

<template>
    <div class="flex-align-center">
        <el-button type="primary" :loading="loading" @click="refresh" :icon="Refresh" />
        <el-button type="primary" :loading="loading" @click="newPost" :icon="Plus" />
    </div>
    <el-table v-loading="loading" :data="posts">
        <el-table-column fixed="left" prop="id" label="序号" width="100" />
        <el-table-column prop="title" label="标题" width="1000" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="line">
                <el-button type="primary" @click="openEditor(line.$index)" link>编辑</el-button>
                <el-button type="danger" @click="deletePost(line.$index)" link>删除</el-button>
            </template>
        </el-table-column>
        <template #empty>没有数据</template>
    </el-table>
    <el-pagination v-if="totalPage !== 0" class="flex-center" layout="prev, pager, next" v-model:current-page="currentPage" :page-count="totalPage" />
    <MarkdownEditor :show="showEditor" :loading="loading" :data="post.data" @close="closeEditor" @save="savePost" />
</template>

<style scoped>
.el-table {
    margin: 10px 0;
}

.el-pagination * {
    background: transparent !important;
}
</style>
