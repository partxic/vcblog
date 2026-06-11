<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const pages = ref([])

onMounted(async () => {
    try {
        const res = await axios.get('/api/page/list')
        pages.value = res.data
    } catch (error) {
        ElMessage.error(error.response.data)
    }
})
</script>

<template>
    <div class="container">
        <router-link to="/">首页</router-link>
        <router-link to="/search">搜索</router-link>
        <router-link v-for="page in pages" :to="`/page/${page.id}`">{{ page.title }}</router-link>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
}

a {
    font-size: 1.2em;
}
</style>
