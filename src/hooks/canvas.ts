import { computed } from 'vue';
import { useEditor, useProject } from '../store';
import { TMat2D } from 'fabric';

const useCanvas = () => {
	const editor = useEditor();
	const project = useProject();
	const viewportTransform = computed<TMat2D>(() => {
		const panX = editor.width / 2 - (project.width / 2) * editor.zoom + editor.panX;
		const panY = editor.height / 2 - (project.height / 2) * editor.zoom + editor.panY;
		return [editor.zoom, 0, 0, editor.zoom, panX, panY];
	});

	return { viewportTransform };
};

export default useCanvas;
