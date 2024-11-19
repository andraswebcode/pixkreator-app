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
import DashboardBrandView from '../views/dashboard/DashboardBrandView.vue';
import DashboardPhotosView from '../views/dashboard/DashboardPhotosView.vue';
import AccountProfileView from '../views/account/AccountProfileView.vue';
import AccountSubscriptionView from '../views/account/AccountSubscriptionView.vue';
import AccountSupportView from '../views/account/AccountSupportView.vue';
import VerifyEmailView from '../views/VerifyEmailView.vue';
import VerifiedEmailView from '../views/VerifiedEmailView.vue';
import ForgotPWView from '../views/ForgotPWView.vue';
import DashboardAdmin from '../views/dashboard/DashboardAdmin.vue';
import AccountSettingsView from '../views/account/AccountSettingsView.vue';
import DeleteUserView from '../views/DeleteUserView.vue';
import AppsView from '../views/AppsView.vue';

const routes: RouteRecordRaw[] = [
	{
		name: 'editor',
		path: '/:id?',
		component: EditorView
	},
	{
		name: 'apps',
		path: '/apps',
		component: AppsView,
		children: []
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
				path: 'projects',
				component: DashboardProjectsView
			},
			{
				name: 'files',
				path: 'files/:source?',
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
				name: 'brand',
				path: 'brand',
				component: DashboardBrandView,
				meta: {
					requiresProPlan: true
				}
			},
			{
				name: 'admin',
				path: 'admin',
				component: DashboardAdmin,
				meta: {
					requiresAdmin: true
				}
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
				name: 'settings',
				path: 'settings',
				component: AccountSettingsView
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
		component: LoginView,
		meta: {
			hideOnLoggedIn: true
		}
	},
	{
		name: 'register',
		path: '/register',
		component: RegisterView,
		meta: {
			hideOnLoggedIn: true
		}
	},
	{
		name: 'forgotpw',
		path: '/forgotpw',
		component: ForgotPWView,
		meta: {
			hideOnLoggedIn: true
		}
	},
	{
		name: 'pwreset',
		path: '/pwreset/:token',
		component: PWResetView,
		meta: {
			hideOnLoggedIn: true
		}
	},
	{
		name: 'verified',
		path: '/verified/:status?',
		component: VerifiedEmailView
	},
	{
		name: 'verify',
		path: '/verify',
		component: VerifyEmailView
	},
	{
		name: 'deleteuser',
		path: '/deleteuser',
		component: DeleteUserView,
		meta: {
			requiresAuth: true
		}
	}
];

const router = createRouter({
	routes,
	history: createWebHistory('/app')
});

router.beforeEach((to) => {
	const userData = useUser();
	if (to.meta.requiresAuth && !userData.loggedIn) {
		return '/login';
	} else if (
		(to.meta.hideOnLoggedIn && userData.loggedIn) ||
		(to.meta.requiresAdmin && !userData.user.admin) ||
		(to.meta.requiresProPlan && !userData.isProPlan)
	) {
		return '/dashboard';
	}
});

export default router;
