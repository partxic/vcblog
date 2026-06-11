<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    show: {
        type: Boolean,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    }
})

defineEmits(['save', 'close'])
</script>

<template></template>

<style scoped></style>
