import { util } from 'fabric';
import { useEditor, useProject } from '../store';
import { toFixed } from '../utils/functions';

const useFitToScreen = () => {
	const editor = useEditor();
	const project = useProject();

	return () => {
		const zoom = util.findScaleToFit(
			{
				width: project.width,
				height: project.height
			},
			{
				width: editor.width,
				height: editor.height
			}
		);
		editor.zoom = toFixed(zoom);
		editor.panX = 0;
		editor.panY = 0;
	};
};

export default useFitToScreen;
