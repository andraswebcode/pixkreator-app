import axios from '../axios';
import { useUser } from '../store';

type ThenFn = (value?: any) => void;

const useRequest = () => {
	const userData = useUser();
	const { bearerToken } = userData;

	const get = (id: string, path: string, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);

		if (!_id) {
			then();
			return;
		}

		axios
			.get(path + '/' + _id, {
				headers: {
					Authorization: bearerToken
				}
			})
			.then(({ data }) => {
				const {
					title,
					description,
					status = 'private',
					width,
					height,
					background,
					layers,
					layer_ids,
					link
				} = data;
				return {
					title,
					description,
					status,
					width,
					height,
					background,
					byIds: Array.isArray(layers) && !layers.length ? {} : layers,
					ids: layer_ids,
					link
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
					Authorization: bearerToken
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
			Authorization: bearerToken
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

		const headers = {
			Authorization: bearerToken
		};

		if (data instanceof FormData) {
			headers['Content-Type'] = 'multipart/form-data';
		}

		axios
			.patch(path + '/' + _id, data, {
				headers
			})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	return {
		get,
		list,
		save,
		patch
	};
};

export default useRequest;
