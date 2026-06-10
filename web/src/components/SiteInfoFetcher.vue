<script setup>
import { ref, defineModel, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import useSiteStore from '@/stores/useSiteStore'

const siteStore = useSiteStore()
const isOk = defineModel({ type: Boolean, required: true })
const isLoading = ref(false)
const dialogVisible = computed(() => !isOk.value)

const fetch = async () => {
    try {
        isLoading.value = true
        await siteStore.fetchInfo()
        isOk.value = true
    } catch (error) {
        ElMessage.error(error.response.data)
        isOk.value = false
    } finally {
        isLoading.value = false
    }
}

onMounted(fetch)
</script>

<template>
    <el-dialog v-model="dialogVisible" align-center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :header-class="'display-none'">
        <div class="flex-center">
            <el-button :loading="isLoading" @click="fetch">获取站点信息</el-button>
        </div>
    </el-dialog>
</template>

<style scoped></style>
