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

const openEditor = async idx => {}

const deletePage = async idx => {}

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
    <el-table :data="pages">
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
</template>

<style scoped>
.el-table {
    margin-top: 10px;
}
</style>
