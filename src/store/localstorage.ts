import { PiniaPluginContext } from 'pinia';

const propsToSave = ['showMargin', 'margin', 'snap'];

export default ({ store }: PiniaPluginContext) => {
	if (store.$id !== 'editor') {
		return;
	}

	const data = localStorage.getItem('editor');

	if (data) {
		store.$patch(JSON.parse(data));
	}

	store.$subscribe((_mutation, state) => {
		const newData = propsToSave.reduce((memo, prop) => {
			memo[prop] = state[prop];
			return memo;
		}, {});
		localStorage.setItem('editor', JSON.stringify(newData));
	});
};
