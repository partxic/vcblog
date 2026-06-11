<script setup>
import setTitle from '@/setTitle.js'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, onMounted, computed } from 'vue'

setTitle('配置编辑器')
const loading = ref(false)
const currentConfig = ref({})
const previousConfig = ref({})

const configDiff = computed(() => {
    const diff = []
    const current = currentConfig.value
    const previous = previousConfig.value

    for (const key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
            if (current[key] !== previous[key]) {
                diff.push(key)
            }
        }
    }

    return diff
})

const saveConfig = async () => {
    const keysToUpdate = [...configDiff.value]

    for (const key of keysToUpdate) {
        try {
            loading.value = true
            const value = currentConfig.value[key]
            const res = await axios.post('/api/site/update', { key, value })
            ElMessage.success(res.data)
            previousConfig.value[key] = value
        } catch (error) {
            ElMessage.error(error.response.data)
        } finally {
            loading.value = false
        }
    }
}

const refresh = async () => {
    try {
        loading.value = true
        const res = await axios.get('/api/site/config')
        currentConfig.value = JSON.parse(JSON.stringify(res.data))
        previousConfig.value = JSON.parse(JSON.stringify(res.data))
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}

onMounted(refresh)
</script>

<template>
    <div class="top">
        <el-button type="primary" :loading="loading" @click="refresh">刷新</el-button>
        <el-button type="primary" :loading="loading" @click="saveConfig">保存</el-button>
    </div>
    <el-form :model="currentConfig" label-width="auto" style="max-width: 600px">
        <el-form-item v-for="(_, key) in currentConfig" :label="key">
            <el-input v-model="currentConfig[key]" placeholder="空" :type="key.startsWith('extra') ? 'textarea' : 'text'" clearable />
        </el-form-item>
    </el-form>
    <span>待保存的更改: {{ configDiff.join(', ') || '无' }}</span>
</template>

<style scoped>
.top {
    display: flex;
    align-items: center;
}

.el-form {
    margin: 10px 0;
}
</style>
