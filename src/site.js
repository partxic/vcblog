import express from 'express'
const site = express.Router()

import { getenv } from './cfenv.js'
const env = getenv()

site.get('/info', async (req, res) => {
    const config = env.config
    const values = await config.get(['title', 'extraCSS', 'extraJS'])
    return res.json(values)
})

export default site
