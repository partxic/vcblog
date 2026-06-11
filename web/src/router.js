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
        },
        {
            path: '/search',
            component: () => import('@/view/Search.vue')
        },
        {
            path: '/admin',
            component: () => import('@/view/Admin.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/view/admin/Login.vue')
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('@/view/admin/Dashboard.vue')
                }
            ]
        }
    ]
})
