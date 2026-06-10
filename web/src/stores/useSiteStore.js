import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

export default defineStore('site', () => {
    const siteInfo = reactive({
        title: '<title>',
        extraCSS: '',
        extraJS: ''
    })

    const fetchInfo = async () => {
        const res = await axios.get('/api/site/info')
        Object.assign(siteInfo, res.data)
    }

    return { siteInfo, fetchInfo }
})
