import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify';
import router from './router';
import store from './store';
import domResize from './directives/dom-resize';

import './style.scss';

createApp(App).directive('dom-resize', domResize).use(router).use(vuetify).use(store).mount('#app');
