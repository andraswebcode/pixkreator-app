import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from './vuetify';
import router from './router';
import store from './store';

import 'vuetify/styles';

createApp(App).use(router).use(vuetify).use(store).mount('#app');
