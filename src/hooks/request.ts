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
				const { title, description, status, width, height, layers, layer_ids } = data;
				return {
					title,
					description,
					status,
					width,
					height,
					byIds: Array.isArray(layers) && !layers.length ? {} : layers,
					ids: layer_ids
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
	const save = (id: string, data: any, then: ThenFn, catchFn?: ThenFn) => {
		const _id = parseInt(id);
		const url = _id ? 'designs/' + _id : 'designs';

		axios[_id ? 'put' : 'post'](url, data, {
			headers: {
				Authorization: bearerToken
			}
		})
			.then(({ data }) => data)
			.then(then)
			.catch(catchFn);
	};

	return {
		get,
		list,
		save
	};
};

export default useRequest;
