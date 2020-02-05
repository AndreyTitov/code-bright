import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '../components/HomePage.vue';
import Comments from '../components/Comments.vue';
import Comment from '../components/Comment.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/comments',
    name: 'comments',
    component: Comments,
    // component: () => import(/* webpackChunkName: "about" */ '../components/Comments.vue'),
  },
  {
    path: '/comments/:id',
    name: 'currentId',
    component: Comment,
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: 'smooth',
      });
    }
    return { x: 0, y: 0 };
  },
});

export default router;
