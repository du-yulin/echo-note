import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../layouts/homeLayout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        layout: HomeLayout,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/test/index.vue'),
      meta: {
        layout: HomeLayout,
      },
    },
    {
      path: '/:catchAll(.+)',
      name: 'notFound',
      component: () => import('../views/notFound/index.vue'),
    },
  ],
})

export default router
