<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BackendValidator from '@/components/BackendValidator.vue'
import SiteInfoFetcher from '@/components/SiteInfoFetcher.vue'
import Layout from '@/components/Layout.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'

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
    <Layout v-if="backendOk && siteInfoFetched && routerReady">
        <template #main><router-view /></template>
        <template #aside><Aside /></template>
        <template #footer><Footer /></template>
    </Layout>
</template>

<style scoped></style>
