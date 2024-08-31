import { onMounted, ref } from 'vue';
import useRequest from './request';
import { loadGoogleFonts } from '../utils/load-gfonts';

type FontItem = { family: string };
type FontItems = FontItem[];

let _cache: FontItems = [];
let _filteredCache: FontItems = [];
const PER_PAGE = 20;

const useGFonts = () => {
	const { list } = useRequest();
	const items = ref<FontItems>([]);

	onMounted(() => {
		if (!_cache.length) {
			list({}, 'gfonts', (response) => {
				_cache = response.items;
				_filteredCache = _cache;
				page(1);
			});
		} else {
			_filteredCache = _cache;
			page(1);
		}
	});

	const page = (p = 1) => {
		const start = (p - 1) * PER_PAGE;
		const end = start + PER_PAGE;
		const fonts = _filteredCache.slice(start, end);
		items.value = fonts;
		loadGoogleFonts(fonts);
	};

	const search = (query: string) => {
		if (!query) {
			_filteredCache = _cache;
		} else {
			const lowerQuery = query.toLowerCase();
			_filteredCache = _cache.filter((item) =>
				item.family.toLowerCase().includes(lowerQuery)
			);
		}
		page(1);
	};

	return {
		items,
		page,
		search
	};
};

export default useGFonts;
