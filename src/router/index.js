// router.js

//import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
//import VueRouter from 'vue-router';
import CipherComponent from '../components/CipherComponent.vue';
import DecipherComponent from '../components/DecipherComponent.vue';

//Vue.use(VueRouter);

const routes = [
  { path: '/cipher', component: CipherComponent },
  { path: '/decipher', component: DecipherComponent },
  { path: '/', redirect: '/cipher' }, // Redirect to the cipher component by default
];

// const router = new VueRouter({
//   routes,
// });

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;
