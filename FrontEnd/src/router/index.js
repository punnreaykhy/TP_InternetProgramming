import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginViewV2.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue';
import Category from '../views/Dashboard/pages/category.vue';
import Item from '../views/Dashboard/pages/item.vue';
import Product from '../views/Dashboard/pages/product.vue';
import ProductEdit from '../views/Dashboard/pages/productEdit.vue';
import authApi from '@/libs/apis/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'auth/signup',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'auth/login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'category',
          name: 'dashboard/category',
          component: Category
        },
        {
          path: 'item',
          name: 'dashboard/item',
          component: Item,
        },
        {
          path: 'product',
          name: 'dashboard/product',
          component: Product,
        },
        {
          path: 'product/:id',  // Route with a parameter named 'id'
          name: 'dashboard/product/id',
          component: ProductEdit,
        },
      ],
    },
    
  ]
})

router.beforeEach(async (to, from, next) => {
  const me = await authApi.getMe();
  const isAuthenticated = !!me
  if (to.name.includes('auth') && isAuthenticated) next({ name: 'dashboard' })
  if (to.name.includes('dashboard') && !isAuthenticated) next({ name: 'auth/login' })
  else next()
})

export default router
