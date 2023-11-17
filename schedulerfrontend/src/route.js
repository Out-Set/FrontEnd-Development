import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'scheduleTask',
        path: '/',
        component: () => import('@/components/ScheduleTask.vue')
    },
    {
        name: 'cronLogs',
        path: '/cronLogs',
        component: () => import('@/components/cronLogs.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;