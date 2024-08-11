import { defineStore } from 'pinia';

type UserData = {
	id?: number;
	name?: string;
	email?: string;
	token?: string;
};

type UserState = {
	user: UserData;
};

type UserGetters = {
	loggedIn: (state: UserState) => boolean;
	bearerToken: (state: UserState) => string;
};

type UserActions = {
	logout: () => void;
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
		bearerToken: ({ user: { token } }) => 'Bearer ' + token
	},
	actions: {
		logout() {
			this.user = {};
			localStorage.removeItem('userData');
		}
	}
});