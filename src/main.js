import Vue from 'vue';
import Router from 'vue-router';
import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';
import service from '@/assets/js/service';

import loginComponent from '@/components/Login.vue';
import homeComponent from '@/components/Home.vue';
import profileComponent from '@/components/Profile.vue';
import recoverComponent from '@/components/Recover.vue';
import registerComponent from '@/components/Register.vue';
import resetComponent from '@/components/Reset.vue';
import usersComponent from '@/components/Users.vue';
import validateComponent from '@/components/Validate.vue';

Vue.config.productionTip = false;

const ifNotAuthenticated = (to, from, next) => {
    if (!service.auth.isLoggedIn()) {
        next();
        return;
    }
    next({ name: 'bookings' });
};

const ifAuthenticated = (to, from, next) => {
    if (service.auth.isLoggedIn()) {
        next();
        return;
    }
    next({ name: 'login' });
};

const router = new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            component: homeComponent,
        },
        {
            name: 'login',
            path: '/login',
            component: loginComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'profile',
            path: '/profile',
            component: profileComponent,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'recover',
            path: '/recover',
            component: recoverComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'register',
            path: '/register',
            component: registerComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'reset',
            path: '/reset',
            component: resetComponent,
            beforeEnter: ifNotAuthenticated,
        },
        {
            name: 'users',
            path: '/users',
            component: usersComponent,
            beforeEnter: ifAuthenticated,
        },
        {
            name: 'validate',
            path: '/validate',
            component: validateComponent,
        },
    ],
});

Vue.use(Router);

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
}).$mount('#app');
