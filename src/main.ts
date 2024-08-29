import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './vuetify';
import router from './router';
import store from './store';
import domResize from './directives/dom-resize';
import draggable from './directives/draggable';
import sortable from './directives/sortable';

import './canvas/register';
import './style.scss';

createApp(App)
	.directive('dom-resize', domResize)
	.directive('draggable', draggable)
	.directive('sortable', sortable)
	.use(router)
	.use(vuetify)
	.use(store)
	.mount('#app');
