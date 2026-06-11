import express from 'express'
const auth = express.Router()

import jwt from 'jsonwebtoken'
const expiresIn = 24 * 60 * 60
const cookieName = 'auth_token'

import { getenv } from './cfenv.js'
const env = getenv()

auth.post('/login', async (req, res) => {
    const { password } = req.body
    if (typeof password !== 'string' || password === '') {
        return res.status(401).send('请求错误')
    }

    const config = env.config

    const truePassword = await config.get('password')
    if (password !== truePassword) {
        return res.status(401).send('密码错误')
    }

    const jwtSecret = await config.get('jwtSecret')
    const token = jwt.sign({}, jwtSecret, { expiresIn })
    res.cookie(cookieName, token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: expiresIn * 1000
    })

    return res.status(200).send('登录成功')
})

export const needAuth = async (req, res, next) => {
    const token = req.cookies[cookieName]
    if (!token) {
        return res.status(401).send('未授权')
    }

    const config = env.config
    const jwtSecret = await config.get('jwtSecret')

    try {
        jwt.verify(token, jwtSecret)
        return next()
    } catch {
        res.clearCookie(cookieName)
        return res.status(401).send('验证失败')
    }
}

auth.get('/status', needAuth, (req, res) => {
    return res.status(200).send('验证成功')
})

auth.get('/logout', needAuth, (req, res) => {
    res.clearCookie(cookieName)
    return res.status(200).send('已登出')
})

export default auth
