import express from 'express'
const page = express.Router()

import storage from './storage.js'
import { table } from './storage.js'
import { eq } from 'drizzle-orm'

page.get('/list', async (req, res) => {
    const result = await storage
        .select({
            id: table.id,
            title: table.title
        })
        .from(table)
        .where(eq(table.type, 'page'))

    return res.status(200).json(result)
})

export default page
