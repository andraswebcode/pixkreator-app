import { computed } from 'vue';
import { useEditor, useProject } from '../store';
import { sanitize } from '../utils/sanitizer';
import { TMat2D, util } from 'fabric';

const useImage = (props: string[] = []) => {
	const editor = useEditor();
	const project = useProject();

	const currentImage = computed(() => {
		const activeId = editor.activeLayerIds[0];
		return activeId && project.byIds[activeId]?.type === 'Image'
			? project.byIds[activeId]
			: project.ids.map((id) => project.byIds[id]).find((layer) => layer?.type === 'Image');
	});

	const currentImageId = computed(() => currentImage.value?.id || '');

	const currentImageProps: any = props.reduce((memo, prop) => {
		memo[prop] = computed({
			get: () => {
				if (!currentImage.value) {
					return '';
				}
				const id = currentImage.value.id;
				return project.byIds[id]?.[prop];
			},
			set: (value: any) => {
				if (!currentImage.value) {
					return;
				}
				project.updateProps(currentImage.value.id, {
					[prop]: sanitize(prop, value)
				});
			}
		});
		return memo;
	}, {});

	const currentImageMatrix = computed<TMat2D>(() => {
		if (!currentImage.value) {
			return [1, 0, 0, 1, 0, 0];
		}
		const { left, top, scaleX, scaleY, skewX, skewY, angle } = currentImage.value;
		return util.composeMatrix({
			translateX: left,
			translateY: top,
			scaleX,
			scaleY,
			skewX,
			skewY,
			angle
		});
	});

	return { currentImage, currentImageId, currentImageProps, currentImageMatrix };
};

export default useImage;
