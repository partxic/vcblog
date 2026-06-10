import express from 'express'
const app = express()

app.enable('trust proxy')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    let realhost = req.headers['x-forwarded-host']
    if (typeof realhost !== 'string') realhost = req.host
    else realhost = realhost.split(',')[0].trim()
    req.headers.host = realhost
    return next()
})

import cookieParser from 'cookie-parser'
app.use(cookieParser())

const api = express.Router()
app.use('/api', api)

import { getenv } from './cfenv.js'
const env = getenv()

api.use((req, res, next) => {
    if (typeof env.config === 'undefined') return res.status(500).send('KV 配置错误')
    if (typeof env.storage === 'undefined') return res.status(500).send('D1 配置错误')
    return next()
})

api.get('/status', (req, res) => {
    return res.status(200).send('后端正常')
})

import site from './site.js'
api.use('/site', site)

import page from './page.js'
api.use('/page', page)

import post from './post.js'
api.use('/post', post)

import { createServer, get } from 'node:http'
import { httpServerHandler } from 'cloudflare:node'
const server = createServer(app)
export default httpServerHandler(server)
