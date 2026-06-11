<script setup>
document.title = '正在跳转...'

import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'

const route = useRoute()
const router = useRouter()

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

<template></template>

<style scoped></style>
