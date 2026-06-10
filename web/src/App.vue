<script setup>
import { ref } from 'vue'
import BackendValidator from '@/components/BackendValidator.vue'

const backendOk = ref(false)
</script>

<template>
    <BackendValidator v-model="backendOk" />
</template>

<style scoped></style>
