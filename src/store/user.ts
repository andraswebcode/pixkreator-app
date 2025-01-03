import { defineStore } from 'pinia';
import { BrandColorObject } from '../types/brand';

export type UserPlan = 'free';

export type UserData = {
	id?: number;
	admin?: boolean;
	name?: string;
	email?: string;
	email_verified?: boolean;
	avatar?: string;
	token?: string;
	plan?: UserPlan;
	sub_news?: 'yes' | 'no';
	ai_credits?: number;
	openai_credits?: number;
	stai_credits?: number;
	brand_introduction?: string;
	brand_colors?: BrandColorObject[];
};

export type UserState = {
	user: UserData;
};

export type UserGetters = {
	loggedIn: (state: UserState) => boolean;
	bearerToken: (state: UserState) => string;
	isProPlan: (state: UserState) => boolean;
	canGenerateImage: (state: UserState) => boolean;
};

type UserActions = {
	setAndSave: (key: string, value: any) => void;
};

let user: UserData = {};

try {
	user = JSON.parse(localStorage.getItem('userData') || '');
} catch (error) {
	// console.error(error);
}

export default defineStore<string, UserState, UserGetters, UserActions>('user', {
	state: () => ({
		user
	}),
	getters: {
		loggedIn: ({ user: { id, token } }) => !!(id && token),
		bearerToken: ({ user: { token } }) => 'Bearer ' + token,
		isProPlan: ({ user: { plan, id, token, admin } }) =>
			!!id && !!token && (plan !== 'free' || !!admin),
		canGenerateImage: ({ user: { ai_credits, openai_credits, stai_credits, id, token } }) =>
			!!id && !!token && !!(ai_credits || openai_credits || stai_credits)
	},
	actions: {
		setAndSave(key, value) {
			this.user[key] = value;
			// Also, save to localStorage.
			const data = JSON.parse(localStorage.getItem('userData') || '');
			data[key] = value;
			localStorage.setItem('userData', JSON.stringify(data));
		}
	},
	undo: {
		disable: true
	}
});
