import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'homePage',
        path: '/',
        component: () => import('@/components/home.vue')
    },
    {
        name: 'scheduleTask',
        path: '/scheduleTask',
        component: () => import('@/components/ScheduleTask.vue')
    },
    {
        name: 'commonLogs',
        path: '/commonLogs',
        component: () => import('@/components/commonLogs.vue')
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;