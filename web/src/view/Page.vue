<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import setTitle from '@/setTitle.js'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const route = useRoute()
const pageContent = ref('')

onMounted(async () => {
    const { id } = route.params
    const { type } = route.meta

    try {
        const res = await axios.get(`/api/${type}/content?id=${id}`)
        pageContent.value = res.data.content
        setTitle(res.data.title)
    } catch (error) {
        ElMessage.error(error.response.data)
    }
})
</script>

<template>
    <MdPreview id="markdown-viewer" :modelValue="pageContent" />
</template>

<style scoped>
#markdown-viewer {
    background: transparent;
}
</style>
