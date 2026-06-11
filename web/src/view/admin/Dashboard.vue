<script setup>
document.title = '正在跳转...'

import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const tabs = computed(() => {
    const allRoutes = router.getRoutes()
    const dashboardRoute = allRoutes.find(route => route.name === 'dashboard')
    return dashboardRoute ? dashboardRoute.children || [] : []
})

const redirect = () => {
    if (!route.name || route.name === 'dashboard') router.push({ name: 'config-edit' })
    else router.push({ name: route.name })
}

watch(
    () => route.name,
    name => {
        if (name === 'dashboard') redirect()
    }
)

onMounted(redirect)
</script>

<template>
    <el-tabs :model-value="route.name" @tab-click="(tab, _) => router.push({ name: tab.paneName })">
        <el-tab-pane v-for="tab in tabs" :label="tab.meta.tab" :name="tab.name" />
    </el-tabs>
    <router-view />
</template>

<style scoped></style>
