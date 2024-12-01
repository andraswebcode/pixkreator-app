import { computed } from 'vue';
import { useEditor, useProject } from '../store';
import { sanitize } from '../utils/sanitizer';

const useImage = (props: string[] = []) => {
	const editor = useEditor();
	const project = useProject();

	const currentImage = computed(() => {
		const activeId = editor.activeLayerIds[0];
		return activeId && project.byIds[activeId]?.type === 'Image'
			? project.byIds[activeId]
			: project.ids.map((id) => project.byIds[id]).find((layer) => layer?.type === 'Image');
	});

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

	return { currentImage, currentImageProps };
};

export default useImage;
