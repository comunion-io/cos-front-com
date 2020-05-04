import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../Layout/Components/Header/Home'),
        },
        {
            path: '/bounty',
            name: 'bounty',
            component: () => import('../Layout/Components/Header/Bounty'),
        },
        {
            path: '/newStartUp',
            name: 'newStartUp',
            component: ()=> import('../Layout/Components/Header/NewStartup'),
        }
    ]
})
