import axios from '../axios';
import { useUser } from '../store';

const useRequest = () => {
	const userData = useUser();
	const { bearerToken } = userData;

	const get = () => {};
	const list = (params: any, path: string, then: (value: any) => void) => {
		axios
			.get(path, {
				params,
				headers: {
					Authorization: bearerToken
				}
			})
			.then(({ data }) => {
				return {
					page: data.page,
					totalPages: data.total_pages,
					items: data.items
				};
			})
			.then(then)
			.catch((error) => {
				console.error(error);
			});
	};
	const save = () => {};

	return {
		get,
		list,
		save
	};
};

export default useRequest;
