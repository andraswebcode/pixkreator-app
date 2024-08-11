import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EditorView from '../views/EditorView.vue';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PWResetView from '../views/PWResetView.vue';
import { useUser } from '../store';
import AccountView from '../views/AccountView.vue';

const routes: RouteRecordRaw[] = [
	{
		name: 'editor',
		path: '/:id?',
		component: EditorView
	},
	{
		name: 'dashboard',
		path: '/dashboard',
		component: DashboardView,
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'account',
		path: '/account',
		component: AccountView,
		meta: {
			requiresAuth: true
		}
	},
	{
		name: 'login',
		path: '/login',
		component: LoginView
	},
	{
		name: 'register',
		path: '/register',
		component: RegisterView
	},
	{
		name: 'pwreset',
		path: '/pwreset',
		component: PWResetView
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

router.beforeEach((to) => {
	const userData = useUser();
	if (to.meta.requiresAuth && !userData.user.id) {
		return '/login';
	} else if (userData.user.id && to.meta.hideOnLoggedIn) {
		return '/';
	}
});

export default router;
