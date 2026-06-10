import express from 'express'
const post = express.Router()

import storage from './storage.js'
import { table } from './storage.js'
import { count, eq } from 'drizzle-orm'

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

export default post
