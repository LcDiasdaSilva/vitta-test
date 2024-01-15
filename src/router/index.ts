import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/:type',
      name: 'listing',
      meta: {
        hideFooter: true
      },
      component: () => import('../pages/ListingPage.vue')
    },
    {
      path: '/item/:type/:id',
      name: 'itemPage',
      component: () => import('../pages/ItemPage.vue')
    },
    {
      path: '/carrinho',
      name: 'shoppingCart',
      component: () => import('../pages/ShoppingCart.vue')
    },
  ]
})

export default router
