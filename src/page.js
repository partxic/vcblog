import express from 'express'
const page = express.Router()

import storage from './storage.js'
import { table } from './storage.js'
import { and, eq } from 'drizzle-orm'

page.get('/list', async (req, res) => {
    const result = await storage
        .select({
            id: table.id,
            title: table.title
        })
        .from(table)
        .where(eq(table.type, 'page'))
        .orderBy(table.id)

    return res.status(200).json(result)
})

page.get('/content', async (req, res) => {
    const { id } = req.query
    if (typeof id === 'undefined' || id === '') {
        return res.status(400).send('请求错误')
    }

    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
        return res.status(400).send('参数错误')
    }

    const result = await storage
        .select({
            title: table.title,
            content: table.content
        })
        .from(table)
        .where(and(eq(table.type, 'page'), eq(table.id, idNum)))

    if (result.length === 0) {
        return res.status(404).send('未找到')
    }

    return res.status(200).json(result[0])
})

import { needAuth } from './auth.js'

page.post('/update', needAuth, async (req, res) => {
    const { id } = req.query
    if (typeof id === 'undefined' || id === '') {
        return res.status(400).send('请求错误')
    }

    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
        return res.status(400).send('参数错误')
    }

    const { title, content } = req.body
    if (typeof title !== 'string' || title === '' || typeof content !== 'string') {
        return res.status(400).send('请求错误')
    }

    await storage.update(table).set({ title, content }).where(eq(table.id, idNum))
    return res.status(200).send('更新成功')
})

page.delete('/delete', needAuth, async (req, res) => {
    const { id } = req.query
    if (typeof id === 'undefined' || id === '') {
        return res.status(400).send('请求错误')
    }

    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
        return res.status(400).send('参数错误')
    }

    await storage.delete(table).where(eq(table.id, idNum))
    return res.status(200).send('删除成功')
})

page.post('/new', needAuth, async (req, res) => {
    const { title, content } = req.body
    if (typeof title !== 'string' || title === '' || typeof content !== 'string') {
        return res.status(400).send('请求错误')
    }

    const [id] = await storage.insert(table).values({ title, content, type: 'page' }).returning({ id: table.id })
    return res.status(200).json(id)
})

export default page
