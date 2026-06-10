<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useSiteStore from '@/stores/useSiteStore'

import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const siteStore = useSiteStore()
const route = useRoute()
const pageContent = ref('')

const id = 'markdown-viewer'
const scrollElement = document.documentElement

onMounted(async () => {
    const { id } = route.query

    try {
        const res = await axios.get(`/api/page/content?id=${id}`)
        pageContent.value = res.data.content
        document.title = `${res.data.title} | ${siteStore.siteInfo.title}`
    } catch (error) {
        ElMessage.error(error.response.data)
    }
})
</script>

<template>
    <MdPreview :id="id" :modelValue="pageContent" />
    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<style scoped></style>
