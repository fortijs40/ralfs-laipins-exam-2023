import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth.js";
import Login from "@/views/Login.vue";
import Songs from "@/views/Songs.vue";
import Albums from "@/views/Album.vue";
import About from "@/views/About.vue";
const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name: 'songs',
            component: Songs
        },
        {
            path: '/albums',
            name: 'albums',
            component: Albums
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

// LV
// Tiek izveidots middleware / starpprogrammatūra kura katru reizi veiks pārbaudi pirms tiks nomainīta rūtera adrese
// arguments to glabā adresi uz kurieni gribam iet
// arguments from glabā adresi no kurienes mēs nākam

// ENG
// Middleware is a function that is executed before the route is changed
// argument "to" stores the address where we want to navigate/go
// argument "from" stores the address from where we're coming from

router.beforeEach((to, from, next) => {
    if (!useAuthStore().is_authenticated && to.path !== '/login') {
        next('/login'); 
    }else if(useAuthStore().is_authenticated && to.path === '/login'){
        next(from); 
    }else{
        next(); 
    }
});

export default router;
