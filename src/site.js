import express from 'express'
const site = express.Router()

import { getenv } from './cfenv.js'

const env = getenv()

site.get('/info', async (req, res) => {
    const config = env.config
    const values = await config.get(['title', 'extraCSS', 'extraJS'])
    const data = Object.fromEntries(values)
    return res.status(200).json(data)
})

import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

site.get('/map', async (req, res) => {})

import { Feed } from 'feed'

site.get('/feed', async (req, res) => {})

import { needAuth } from './auth.js'

site.get('/config', needAuth, async (req, res) => {
    const config = env.config
    const keys = (await config.list()).keys
    const values = await config.get(keys.map(item => item.name))
    const data = Object.fromEntries(values)
    return res.status(200).json(data)
})

site.post('/update', needAuth, async (req, res) => {
    const { key, value } = req.body
    if (typeof key !== 'string' || key === '' || typeof value !== 'string') {
        return res.status(400).send('请求错误')
    }

    const config = env.config
    await config.put(key, value)
    return res.status(200).send('操作成功')
})

export default site
