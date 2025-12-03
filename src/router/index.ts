import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import HomePage from '@/components/HomePage.vue'

const routes = [
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/', redirect: '/home' } // 기본 진입 시 home으로
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
