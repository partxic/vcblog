import express from 'express'
const post = express.Router()

import storage from './storage.js'
import { table } from './storage.js'
import { count, and, eq, desc, sql, like, or } from 'drizzle-orm'

import { getenv } from './cfenv.js'
const env = getenv()

post.get('/count', async (req, res) => {
    const result = await storage
        .select({
            totalPost: count()
        })
        .from(table)
        .where(eq(table.type, 'post'))

    const config = env.config
    const postPerPage = parseInt(await config.get('postPerPage'), 10)
    if (isNaN(postPerPage)) {
        return res.status(500).send('数据错误')
    }

    const totalPost = result[0].totalPost
    const totalPage = Math.ceil(totalPost / postPerPage)

    return res.status(200).json({ totalPage })
})

post.get('/list', async (req, res) => {
    const { page, preview } = req.query
    if (typeof page !== 'string' || page === '') {
        return res.status(400).send('请求错误')
    }

    const pageNum = parseInt(page, 10)
    if (isNaN(pageNum)) {
        return res.status(400).send('参数错误')
    }

    const config = env.config
    const postPerPage = parseInt(await config.get('postPerPage'), 10)
    if (isNaN(postPerPage)) {
        return res.status(500).send('数据错误')
    }

    const offset = (pageNum - 1) * postPerPage
    const limit = postPerPage

    const noPreview = preview === 'no'
    const result = await storage
        .select({
            id: table.id,
            title: table.title,
            ...(!noPreview && {
                preview: sql`substr(${table.content}, 1, 200)`.mapWith(String)
            })
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(limit)
        .offset(offset)

    return res.status(200).json(result)
})

post.get('/content', async (req, res) => {
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
        .where(and(eq(table.type, 'post'), eq(table.id, idNum)))

    if (result.length === 0) {
        return res.status(404).send('未找到')
    }

    return res.status(200).json(result[0])
})

post.get('/search', async (req, res) => {
    const { keyword } = req.query
    if (typeof keyword === 'undefined' || keyword === '') {
        return res.status(400).send('请求错误')
    }

    const config = env.config
    const postPerPage = parseInt(await config.get('postPerPage'), 10)
    if (isNaN(postPerPage)) {
        return res.status(500).send('数据错误')
    }

    const sqlKeyword = `%${keyword}%`
    const result = await storage
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview')
        })
        .from(table)
        .where(and(eq(table.type, 'post'), or(like(table.title, sqlKeyword), like(table.content, sqlKeyword))))
        .orderBy(desc(table.id))
        .limit(postPerPage)

    return res.status(200).json(result)
})

import { needAuth } from './auth.js'

post.post('/update', needAuth, async (req, res) => {
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

post.delete('/delete', needAuth, async (req, res) => {
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

post.post('/new', needAuth, async (req, res) => {
    const { title, content } = req.body
    if (typeof title !== 'string' || title === '' || typeof content !== 'string') {
        return res.status(400).send('请求错误')
    }

    const [id] = await storage.insert(table).values({ title, content, type: 'post' }).returning({ id: table.id })
    return res.status(200).json(id)
})

export default post
