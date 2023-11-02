import { createWebHistory, createRouter } from 'vue-router'
import Home from './components/Home.vue'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    }
];

const router=createRouter({
    history:createWebHistory(),
    routes
});

export default router;