<script setup>
import setTitle from '@/setTitle.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

setTitle('页面管理器')
const loading = ref(false)
const pages = ref([])
const showEditor = ref(false)

const page = {
    id: ref(0),
    data: reactive({
        title: '',
        content: ''
    })
}

const openEditor = async idx => {
    const pageID = pages.value[idx].id
    page.id.value = pageID

    try {
        loading.value = true
        const res = await axios.get(`/api/page/content?id=${pageID}`)
        Object.assign(page.data, res.data)
        showEditor.value = true
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const newPage = async () => {
    page.id.value = -1
    Object.assign(page.data, {
        title: '',
        content: ''
    })
    showEditor.value = true
}

const deletePage = async idx => {
    const pageID = pages.value[idx].id

    try {
        loading.value = true
        const res = await axios.delete(`/api/page/delete?id=${pageID}`)
        ElMessage.success(res.data)
        await refresh()
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const savePage = async () => {
    const isNewPage = page.id.value === -1

    try {
        loading.value = true

        const urlPath = isNewPage ? `new` : `update?id=${page.id.value}`
        const res = await axios.post(`/api/page/${urlPath}`, page.data)

        ElMessage.success(isNewPage ? '创建成功' : res.data)
        if (isNewPage) page.id.value = res.data.id
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

const closeEditor = async () => {
    showEditor.value = false
    await refresh()
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
        <el-button type="primary" :loading="loading" @click="newPage">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="pages">
        <el-table-column fixed="left" prop="id" label="序号" width="100" />
        <el-table-column prop="title" label="标题" width="1000" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="line">
                <el-button type="primary" @click="openEditor(line.$index)" link>编辑</el-button>
                <el-button type="danger" @click="deletePage(line.$index)" link>删除</el-button>
            </template>
        </el-table-column>
        <template #empty>没有数据</template>
    </el-table>
    <MarkdownEditor :show="showEditor" :loading="loading" :data="page.data" @close="closeEditor" @save="savePage" />
</template>

<style scoped>
.el-table {
    margin-top: 10px;
}
</style>
