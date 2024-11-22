import { computed } from 'vue';
import { useEditor, useProject } from '../store';

const useImage = () => {
	const editor = useEditor();
	const project = useProject();

	const currentImage = computed(() => {
		const activeId = editor.activeLayerIds[0];
		return activeId && project.byIds[activeId]?.type === 'Image'
			? project.byIds[activeId]
			: project.ids.map((id) => project.byIds[id]).find((layer) => layer?.type === 'Image');
	});

	return { currentImage };
};

export default useImage;
