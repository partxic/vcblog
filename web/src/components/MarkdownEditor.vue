<script setup>
import { defineProps, defineEmits } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = defineProps({
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

const emits = defineEmits(['save', 'close'])

const handleClose = done => {
    done()
    emits('close')
}
</script>

<template>
    <el-dialog class="column-flex" :model-value="props.show" title="Markdown 编辑器" :before-close="handleClose" body-class="flex-1 column-flex" fullscreen>
        <div class="top flex-align-center">
            <el-text size="large">标题</el-text>
            <el-input class="flex-1" v-model="props.data.title" />
            <el-button type="primary" :loading="props.loading" @click="emits('save')">保存</el-button>
        </div>
        <MdEditor class="flex-1" v-model="props.data.content" />
    </el-dialog>
</template>

<style scoped>
.top {
    column-gap: 5px;
    margin-bottom: 5px;
}
</style>
