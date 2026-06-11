<script setup>
import { ref, reactive } from 'vue'
import setTitle from '@/setTitle.js'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

setTitle('管理员登录')
const router = useRouter()
const loading = ref(false)
const form = reactive({
    password: ''
})

const doLogin = async () => {
    try {
        loading.value = true
        const res = await axios.post('/api/auth/login', form)
        ElMessage.success(res.data)
        router.push({ name: 'dashboard' })
    } catch (error) {
        ElMessage.error(error.response.data)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex-center">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="flex-1" :loading="loading" @click="doLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped></style>
