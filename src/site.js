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

import { needAuth } from './auth.js'

site.get('/config', needAuth, async (req, res) => {
    const config = env.config
    const keys = (await config.list()).keys
    const values = await config.get(keys.map(item => item.name))
    const data = Object.fromEntries(values)
    return res.status(200).json(data)
})

export default site
