import { defineStore } from 'pinia';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationState {
	message: string;
	type: NotificationType;
	show: boolean;
}

export type NotificationGetters = {};

export interface NotificationActions {
	send: (message: string, type: NotificationType) => void;
}

export default defineStore<string, NotificationState, NotificationGetters, NotificationActions>(
	'notification',
	{
		state: () => ({
			message: '',
			type: 'info',
			show: false
		}),
		getters: {},
		actions: {
			send(message, type) {
				this.$patch({
					message,
					type,
					show: true
				});
			}
		}
	}
);
