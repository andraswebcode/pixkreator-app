import { DirectiveBinding, ObjectDirective } from 'vue';
import { debounce } from '../utils/functions';

interface ResizeDirectiveElement extends HTMLElement {
	__resizeObserver__?: ResizeObserver;
}

const domResize: ObjectDirective = {
	mounted: (el: ResizeDirectiveElement, binding: DirectiveBinding) => {
		const debouncedCallback = debounce((rect: { width: number; height: number }) => {
			if (binding.value && typeof binding.value === 'function') {
				binding.value(rect);
			}
		}, 220);

		el.__resizeObserver__ = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			debouncedCallback({
				width,
				height
			});
		});

		el.__resizeObserver__.observe(el);
	},
	unmounted: (el) => {
		if (el.__resizeObserver__) {
			el.__resizeObserver__.disconnect();
			delete el.__resizeObserver__;
		}
	}
};

export default domResize;
