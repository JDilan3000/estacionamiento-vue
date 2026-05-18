import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NoteList from '@/views/note/NoteList.vue'
import RegisterView from '@/views/RegisterView.vue'
import { isLogin } from '@/services/authService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NoteList,
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/estacionamiento',
      name: 'estacionamiento',
      component: NoteList, 
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && isLogin()) {
    next('/estacionamiento') // Si ya inició sesión, que vaya directo al parqueo
  } else if (to.meta.requiresAuth && !isLogin()) {
    next('/login')
  } else {
    next()
  }
});

export default router