import { createRouter, createWebHistory } from 'vue-router';
import MainDashboard from '@/components/MainDashboard';
import TaskDetail from '@/components/TaskDetail';

const routes = [
    {
        path: '/',
        component: MainDashboard

    },
    {
        path: '/tasks/:id',
        name: 'TaskDetail',
        component: TaskDetail,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;