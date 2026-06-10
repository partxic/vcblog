<script setup>
document.title = '加载中...'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BackendValidator from '@/components/BackendValidator.vue'
import SiteInfoFetcher from '@/components/SiteInfoFetcher.vue'
import Layout from '@/components/Layout.vue'

const backendOk = ref(false)
const siteInfoFetched = ref(false)
const routerReady = ref(false)

onMounted(async () => {
    const router = useRouter()
    await router.isReady()
    routerReady.value = true
})
</script>

<template>
    <BackendValidator v-model="backendOk" />
    <SiteInfoFetcher v-if="backendOk" v-model="siteInfoFetched" />
    <Layout v-if="backendOk && siteInfoFetched && routerReady"></Layout>
</template>

<style scoped></style>
