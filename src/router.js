import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import store from './store/index.js';

const UserAuth = defineAsyncComponent(() =>
  import('./pages/auth/UserAuth.vue')
);
const CoachesList = defineAsyncComponent(() =>
  import('./pages/coaches/CoachesList.vue')
);
const CoachDetails = defineAsyncComponent(() =>
  import('./pages/coaches/CoachDetails.vue')
);
const CoachRegister = defineAsyncComponent(() =>
  import('./pages/coaches/CoachRegister.vue')
);
const ContactCoach = defineAsyncComponent(() =>
  import('./pages/requests/ContactCoach.vue')
);
const RequestsReceived = defineAsyncComponent(() =>
  import('./pages/requests/RequestsReceived.vue')
);

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/register',
      component: CoachRegister,
      meta: { needsUnauth: true }
    },
    { path: '/auth', component: UserAuth },
    { path: '/coaches', component: CoachesList, name: 'coaches.index' },
    {
      name: 'coach.show',
      path: '/coaches/:coachId',
      props: true,
      component: CoachDetails,
      children: [
        {
          name: 'coaches.contact',
          path: 'contact',
          props: true,
          component: ContactCoach
        }
      ]
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { needsAuth: true }
    },
    { path: '/requests/:requestId', component: null },
    { path: '/:notFound(.*)', component: null }
  ]
});

router.beforeEach(function(to, from, next) {
  if (to.meta.needsAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.needsUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
