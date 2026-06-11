<script setup>
import { defineProps } from 'vue'

defineProps({
    link: { type: String, required: true },
    title: { type: String, required: true },
    preview: { type: String, required: true }
})
</script>

<template>
    <div class="post">
        <router-link class="post-title" :to="link">{{ title }}</router-link>
        <span class="post-preview">{{ preview }}</span>
    </div>
</template>

<style scoped>
.post {
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}

.post-title {
    display: inline-block;
    font-size: 1.5em;
}

.post-preview {
    display: block;
    color: #444;
    margin: 5px 0;
}
</style>
