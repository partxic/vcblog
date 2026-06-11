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

import storage from './storage.js'
import { table } from './storage.js'

import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

site.get('/map', async (req, res) => {
    const hostname = `${req.protocol}://${req.host}`

    const result = await storage
        .select({
            id: table.id,
            type: table.type
        })
        .from(table)

    const links = result.map(item => ({
        url: `/${item.type}/${item.id}`,
        changefreq: 'daily',
        priority: 0.8
    }))

    const stream = new SitemapStream({ hostname: hostname })
    const xmlBuffer = await streamToPromise(Readable.from(links).pipe(stream))

    res.type('application/xml')
    res.send(xmlBuffer.toString())
})

import { desc, eq, sql } from 'drizzle-orm'
import { Feed } from 'feed'

site.get('/feed', async (req, res) => {
    const hostname = `${req.protocol}://${req.host}`

    const feed = new Feed({
        title: await config.get('title'),
        link: hostname
    })

    const config = env.config
    const postPerPage = parseInt(await config.get('postPerPage'), 10)
    if (isNaN(postPerPage)) {
        return res.status(500).send('数据错误')
    }

    const posts = await storage
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String)
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(postPerPage)

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            link: `${hostname}/post/${post.id}`,
            id: post.id,
            description: post.preview
        })
    })

    res.type('application/xml')
    res.send(feed.rss2())
})

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
