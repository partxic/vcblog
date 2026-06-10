import express from 'express'
const post = express.Router()

import storage from './storage.js'
import { table } from './storage.js'
import { count, eq, desc, sql } from 'drizzle-orm'

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
    const { page } = req.query
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

    const result = await storage
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview')
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(limit)
        .offset(offset)

    return res.status(200).json(result)
})

export default post
