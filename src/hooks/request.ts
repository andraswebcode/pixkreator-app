import axios from '../axios';
import { useUser } from '../store';

type ThenFn = (value?: any) => void;

const useRequest = () => {
	const userData = useUser();

	const get = (id: string, path: string, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);

		if (!_id) {
			then();
			return;
		}

		axios
			.get(path + '/' + _id, {
				headers: {
					Authorization: userData.bearerToken
				}
			})
			.then(({ data }) => {
				const { status = 'private', layers, layer_ids } = data;
				return {
					status,
					byIds: Array.isArray(layers) && !layers.length ? {} : layers,
					ids: layer_ids,
					...data
				};
			})
			.then(then)
			.catch(catchFn);
	};
	const list = (params: any, path: string, then: ThenFn, catchFn?: ThenFn) => {
		axios
			.get(path, {
				params,
				headers: {
					Authorization: userData.bearerToken
				}
			})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};
	const save = (id: string, path: string, data: any, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);
		const url = _id ? path + '/' + _id : path;
		const headers = {
			Authorization: userData.bearerToken
		};

		if (data instanceof FormData) {
			headers['Content-Type'] = 'multipart/form-data';
		}

		axios[_id ? 'put' : 'post'](url, data, {
			headers
		})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	const patch = (id: string, path: string, data: any, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);

		if (!_id) {
			return;
		}

		axios
			.patch(path + '/' + _id, data, {
				headers: {
					Authorization: userData.bearerToken
				}
			})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	const updateFile = (id: string, data: any, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);

		if (!_id) {
			return;
		}

		axios
			.post('uploads/' + _id + '/file', data, {
				headers: {
					Authorization: userData.bearerToken,
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	const destroy = (id: string, path: string, force: boolean, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);
		const _force = force ? '/force' : '';

		if (!_id) {
			then();
			return;
		}

		axios
			.delete(path + '/' + _id + _force, {
				headers: {
					Authorization: userData.bearerToken
				}
			})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	const restore = (id: string, path: string, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);

		if (!_id) {
			return;
		}

		axios
			.patch(
				path + '/' + _id + '/restore',
				{},
				{
					headers: {
						Authorization: userData.bearerToken
					}
				}
			)
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	return {
		get,
		list,
		save,
		patch,
		updateFile,
		destroy,
		restore
	};
};

export default useRequest;
