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

export default site
