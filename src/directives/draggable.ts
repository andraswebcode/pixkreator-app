import { DirectiveBinding, ObjectDirective } from 'vue';

interface DraggableElement extends HTMLElement {
	_onDragStart: (e: any) => void;
	_onDragMove: (e: any) => void;
	_onDragEnd: (e: any) => void;
}

const draggable: ObjectDirective = {
	mounted(el: DraggableElement, binding: DirectiveBinding<{ top: number; left: number }>) {
		let isDragging = false;
		let offsetX = 0;
		let offsetY = 0;
		const handle = el.querySelector('.handle');
		const initialPosition = binding.value || { top: 0, left: 0 };

		el.style.position = 'fixed';
		el.style.top = `${initialPosition.top}px`;
		el.style.left = `${initialPosition.left}px`;

		const onMouseMove = (e) => {
			if (isDragging) {
				el.style.left = `${e.clientX - offsetX}px`;
				el.style.top = `${e.clientY - offsetY}px`;
			}
		};
		const onMouseUp = () => {
			isDragging = false;
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
		const onMouseDown = (e) => {
			isDragging = true;
			const rect = el.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;

			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		};

		if (handle) {
			handle.addEventListener('mousedown', onMouseDown);
		}

		el._onDragStart = onMouseDown;
		el._onDragMove = onMouseMove;
		el._onDragEnd = onMouseUp;
	},
	unmounted(el: DraggableElement) {
		const handle = el.querySelector('.handle');

		if (handle) {
			handle.removeEventListener('mousedown', el._onDragStart);
		}
		document.removeEventListener('mousemove', el._onDragMove);
		document.removeEventListener('mouseup', el._onDragEnd);
	}
};

export default draggable;
