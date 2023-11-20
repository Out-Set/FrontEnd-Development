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
        name: 'cron1Logs',
        path: '/cron1Logs',
        component: () => import('@/components/cron1Logs.vue')
    },
    {
        name: 'cron2Logs',
        path: '/cron2Logs',
        component: () => import('@/components/cron2Logs.vue')
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;