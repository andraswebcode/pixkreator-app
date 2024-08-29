import { DirectiveBinding, ObjectDirective } from 'vue';
import Sortable from 'sortablejs/modular/sortable.core.esm.js';

interface SortableElement extends HTMLElement {
	_sortable: any;
}

const sortable: ObjectDirective = {
	mounted(el: SortableElement, binding: DirectiveBinding) {
		const sortable = Sortable.create(el, {
			handle: '.handle',
			animation: 150,
			onUpdate: () => {
				binding.value?.(sortable.toArray());
			}
		});

		el._sortable = sortable;
	},
	unmounted(el: SortableElement) {
		if (el._sortable) {
			el._sortable.destroy();
			el._sortable = null;
		}
	}
};

export default sortable;
