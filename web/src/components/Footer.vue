<script setup>
import useSiteStore from '@/stores/useSiteStore.js'

const siteStore = useSiteStore()

const style = document.createElement('style')
style.textContent = siteStore.siteInfo.extraCSS
document.head.appendChild(style)

const script = document.createElement('script')
script.textContent = siteStore.siteInfo.extraJS
document.head.appendChild(script)
</script>

<template>
    <span>© {{ new Date().getFullYear() }}.</span>
    &nbsp;
    <span>Powered by <a href="https://github.com/partxic/vcblog" target="_blank" rel="noopener noreferrer">VCBlog</a>.</span>
</template>

<style scoped>
a {
    color: #333;
    text-decoration: none;
}
</style>
