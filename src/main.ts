import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify';
import router from './router';
import store from './store';

import './style.scss';

createApp(App).use(router).use(vuetify).use(store).mount('#app');
