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
                    component: () => import('@/view/admin/Dashboard.vue'),
                    children: [
                        {
                            path: 'config-edit',
                            name: 'config-edit',
                            meta: {
                                tab: '配置编辑'
                            },
                            component: () => import('@/view/admin/dashboard/ConfigEdit.vue')
                        },
                        {
                            path: 'page-mgr',
                            name: 'page-mgr',
                            meta: {
                                tab: '页面管理'
                            },
                            component: () => import('@/view/admin/dashboard/PageMgr.vue')
                        },
                        {
                            path: 'post-mgr',
                            name: 'post-mgr',
                            meta: {
                                tab: '文章管理'
                            },
                            component: () => import('@/view/admin/dashboard/PostMgr.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/view/NotFound.vue')
        }
    ]
})
