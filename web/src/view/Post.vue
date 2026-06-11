<script setup>
import { ref, onMounted } from 'vue'
import useSiteStore from '@/stores/useSiteStore'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

const siteStore = useSiteStore()
const route = useRoute()
const postContent = ref('')

onMounted(async () => {
    const { id } = route.params

    try {
        const res = await axios.get(`/api/post/content?id=${id}`)
        postContent.value = res.data.content
        document.title = `${res.data.title} | ${siteStore.siteInfo.title}`
    } catch (error) {
        ElMessage.error(error.response.data)
    }
})
</script>

<template>
    <MdPreview id="markdown-viewer" :modelValue="postContent" />
</template>

<style scoped>
#markdown-viewer {
    background: transparent;
    margin-top: -20px;
}
</style>
