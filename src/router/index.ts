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
import DashboardFilesView from '../views/dashboard/DashboardFilesView.vue';
import DashboardUploadView from '../views/dashboard/DashboardUploadView.vue';
import DashboardBrandView from '../views/dashboard/DashboardBrandView.vue';
import DashboardPhotosView from '../views/dashboard/DashboardPhotosView.vue';
import AccountProfileView from '../views/account/AccountProfileView.vue';
import AccountSubscriptionView from '../views/account/AccountSubscriptionView.vue';
import AccountSupportView from '../views/account/AccountSupportView.vue';
import VerifyEmailView from '../views/VerifyEmailView.vue';
import VerifiedEmailView from '../views/VerifiedEmailView.vue';
import ForgotPWView from '../views/ForgotPWView.vue';
import DashboardAdminView from '../views/dashboard/DashboardAdminView.vue';
import AccountSettingsView from '../views/account/AccountSettingsView.vue';
import DeleteUserView from '../views/DeleteUserView.vue';
import AppsView from '../views/AppsView.vue';
import AppHomeView from '../views/apps/AppHomeView.vue';
import AppQRCodeGeneratorView from '../views/apps/AppQRCodeGeneratorView.vue';
import AppChartMakerView from '../views/apps/AppChartMakerView.vue';
import AppBGRemoverView from '../views/apps/AppBGRemoverView.vue';
import AppPatternCreatorView from '../views/apps/AppPatternCreatorView.vue';
import AppCPExtractorView from '../views/apps/AppCPExtractorView.vue';
import AppCollageMakerView from '../views/apps/AppCollageMakerView.vue';
import AppColorWheelView from '../views/apps/AppColorWheelView.vue';
import AppImageUpscalerView from '../views/apps/AppImageUpscalerView.vue';
import AppDesignGeneratorView from '../views/apps/AppDesignGeneratorView.vue';
import AppSketchToImageView from '../views/apps/AppSketchToImageView.vue';
import AppEraseObjectView from '../views/apps/AppEraseObjectView.vue';
import AppInpaintView from '../views/apps/AppInpaintView.vue';
import DashboardAdminAssetsView from '../views/dashboard/admin/DashboardAdminAssetsView.vue';
import DashboardAdminBlogView from '../views/dashboard/admin/DashboardAdminBlogView.vue';

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
		children: [
			{
				name: 'applist',
				path: '',
				component: AppHomeView
			},
			{
				name: 'qr-code-generator',
				path: 'qr-code-generator',
				component: AppQRCodeGeneratorView
			},
			{
				name: 'chart-maker',
				path: 'chart-maker',
				component: AppChartMakerView
			},
			{
				name: 'background-remover',
				path: 'background-remover',
				component: AppBGRemoverView
			},
			{
				name: 'image-upscaler',
				path: 'image-upscaler',
				component: AppImageUpscalerView
			},
			{
				name: 'sketch-to-image',
				path: 'sketch-to-image',
				component: AppSketchToImageView
			},
			{
				name: 'erase-object',
				path: 'erase-object',
				component: AppEraseObjectView
			},
			{
				name: 'inpaint',
				path: 'inpaint',
				component: AppInpaintView
			},
			{
				name: 'design-generator',
				path: 'design-generator',
				component: AppDesignGeneratorView
			},
			{
				name: 'pattern-creator',
				path: 'pattern-creator',
				component: AppPatternCreatorView
			},
			{
				name: 'color-palette-extractor',
				path: 'color-palette-extractor',
				component: AppCPExtractorView
			},
			{
				name: 'collage-maker',
				path: 'collage-maker',
				component: AppCollageMakerView
			},
			{
				name: 'color-wheel',
				path: 'color-wheel',
				component: AppColorWheelView
			}
		]
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
				component: DashboardFilesView
			},
			{
				name: 'upload',
				path: 'upload',
				component: DashboardUploadView
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
				component: DashboardAdminView,
				meta: {
					requiresAdmin: true
				},
				children: [
					{
						name: 'admin-blog',
						path: '',
						component: DashboardAdminBlogView
					},
					{
						name: 'admin-assets',
						path: 'assets',
						component: DashboardAdminAssetsView
					}
				]
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
