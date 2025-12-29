import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import HomePage from '@/components/HomePage.vue'
import MovieDetail from '@/components/views/movie/MovieDetail.vue'
import MusicDetail from '@/components/views/music/MusicDetail.vue'
import GameDetail from '@/components/views/game/GameDetail.vue'

const routes = [
    { path: '/login', name: 'Login', component: LoginForm },
    { path: '/register', name: 'Register', component: RegisterForm },
    { path: '/home', name: 'Home', component: HomePage },
    { path: '/', redirect: '/home' },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: () => MovieDetail,
        props: true
    },
    {
        path: '/music/:id',
        name: 'MusicDetail',
        component: () => MusicDetail,
        props: true
    },
    {
        path: '/game/:id',
        name: 'GameDetail',
        component: () => GameDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
