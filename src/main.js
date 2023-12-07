import NavigationComponent from './components/NavigationComponent.vue'
import CipherComponent from './components/CipherComponent.vue'
import DecipherComponent from './components/DecipherComponent.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

app.component('NavigationComponent', NavigationComponent);
app.component('CipherComponent', CipherComponent);
app.component('DecipherComponent', DecipherComponent);
