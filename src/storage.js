import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
export const table = sqliteTable('storage', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    type: text('type').notNull().default('post'),
    title: text('title').notNull(),
    content: text('content').notNull().default('')
})

import { getenv } from './cfenv.js'
const env = getenv()

import { drizzle } from 'drizzle-orm/d1'
export default drizzle(env.storage)
