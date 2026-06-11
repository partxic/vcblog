import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/view/Index.vue')
        },
        {
            path: '/page/:id',
            meta: {
                type: 'page'
            },
            component: () => import('@/view/Page.vue')
        },
        {
            path: '/post/:id',
            meta: {
                type: 'post'
            },
            component: () => import('@/view/Page.vue')
        }
    ]
})
