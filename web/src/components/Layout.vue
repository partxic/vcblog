<script setup>
import { useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'
import useSiteStore from '@/stores/useSiteStore.js'
import { Close, Operation } from '@element-plus/icons-vue'

const siteStore = useSiteStore()
const { width: windowWidth } = useWindowSize()
const isSmallWidth = computed(() => windowWidth.value < 768)
const showAside = ref(false)
const switcherIcon = computed(() => (showAside.value ? Close : Operation))
</script>

<template>
    <el-container>
        <el-header class="flex-center">{{ siteStore.siteInfo.title }}</el-header>
        <el-container>
            <el-button v-if="isSmallWidth" class="switcher" :aside-open="showAside" :icon="switcherIcon" @click="showAside = !showAside" text />
            <el-aside :in-small-width="isSmallWidth" :is-open="showAside">
                <slot name="aside"></slot>
            </el-aside>
            <el-main>
                <slot name="main"></slot>
            </el-main>
        </el-container>
        <el-footer class="flex-center">
            <slot name="footer"></slot>
        </el-footer>
    </el-container>
</template>

<style scoped>
.el-header,
.el-footer {
    background: #ede796;
    color: #333;
}

.el-header {
    font-size: 2em;
}

.el-footer {
    height: min-content;
    padding: 5px 0;
}

.el-aside {
    padding: 20px 0;
    width: 200px;
}

.switcher {
    position: absolute;
    top: 15px;
    width: 70px;
    height: 50px;
    background: #eee !important;
    box-shadow: 0px 0px 10px 0;
    border: transparent;
    border-radius: 0px 24px 24px 0px;
    transition: none;
    z-index: 20000;
}

.switcher :deep(.el-icon) {
    transform: scale(1.5);
}

.switcher[aside-open='false'] {
    left: 0;
}

.switcher[aside-open='true'] {
    left: 200px;
}

.el-aside[in-small-width='true'] {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #eee;
    box-shadow: 0 0 10px 0;
    z-index: 20000;
}

.el-aside[is-open='false'] {
    left: -200px;
}

.el-aside[is-open='true'] {
    left: 0;
}
</style>
