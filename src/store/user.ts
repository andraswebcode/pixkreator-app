import { defineStore } from 'pinia';

export type UserPlan = 'free';

export type UserData = {
	id?: number;
	admin?: boolean;
	name?: string;
	email?: string;
	avatar?: string;
	token?: string;
	plan?: UserPlan;
	can_generate_image?: boolean;
	stai_credits?: number;
};

export type UserState = {
	user: UserData;
};

export type UserGetters = {
	loggedIn: (state: UserState) => boolean;
	bearerToken: (state: UserState) => string;
	canGenerateImage: (state: UserState) => boolean;
};

type UserActions = {};

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
		canGenerateImage: ({ user: { can_generate_image, id, token } }) =>
			!!id && !!token && !!can_generate_image
	},
	actions: {},
	undo: {
		disable: true
	}
});
