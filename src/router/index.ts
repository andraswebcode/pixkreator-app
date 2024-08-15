import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EditorView from '../views/EditorView.vue';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PWResetView from '../views/PWResetView.vue';
import { useUser } from '../store';
import AccountView from '../views/AccountView.vue';
import DashboardHomeView from '../views/dashboard/DashboardHomeView.vue';
import DashboardTemplatesView from '../views/dashboard/DashboardTemplatesView.vue';
import DashboardProjectsView from '../views/dashboard/DashboardProjectsView.vue';
import DashboardUploadsView from '../views/dashboard/DashboardUploadsView.vue';
import DashboardAIImagesView from '../views/dashboard/DashboardAIImagesView.vue';
import DashboardBrandView from '../views/dashboard/DashboardBrandView.vue';
import DashboardPhotosView from '../views/dashboard/DashboardPhotosView.vue';
import AccountProfileView from '../views/account/AccountProfileView.vue';
import AccountNotificationView from '../views/account/AccountNotificationView.vue';
import AccountSubscriptionView from '../views/account/AccountSubscriptionView.vue';
import AccountSupportView from '../views/account/AccountSupportView.vue';

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
		},
		children: [
			{
				name: 'home',
				path: '',
				component: DashboardHomeView
			},
			{
				name: 'projects',
				path: 'projects/:folder?',
				component: DashboardProjectsView
			},
			{
				name: 'uploads',
				path: 'uploads',
				component: DashboardUploadsView
			},
			{
				name: 'templates',
				path: 'templates/:category?',
				component: DashboardTemplatesView
			},
			{
				name: 'photos',
				path: 'photos',
				component: DashboardPhotosView
			},
			{
				name: 'ai-images',
				path: 'ai-images',
				component: DashboardAIImagesView
			},
			{
				name: 'brand',
				path: 'brand',
				component: DashboardBrandView
			}
		]
	},
	{
		name: 'account',
		path: '/account',
		component: AccountView,
		meta: {
			requiresAuth: true
		},
		children: [
			{
				name: 'profile',
				path: '',
				component: AccountProfileView
			},
			{
				name: 'notification',
				path: 'notification',
				component: AccountNotificationView
			},
			{
				name: 'subscription',
				path: 'subscription',
				component: AccountSubscriptionView
			},
			{
				name: 'support',
				path: 'support',
				component: AccountSupportView
			}
		]
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
