import Lines from '@/pages/Lines.vue'
import Stops from '@/pages/Stops.vue'
import NotFound from '@/components/NotFound.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ROUTE } from '@/constans'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: ROUTE.BUS_LINES, component: Lines },
  { path: '/stops', name: ROUTE.BUS_STOPS, component: Stops },
  { path: '/:pathMatch(.*)*', name: ROUTE.NOT_FOUND, component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
