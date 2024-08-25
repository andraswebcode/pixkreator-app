import { computed } from 'vue';
import { useEditor, useProject } from '../store';
import { sanitize } from '../utils/sanitizer';

const useProps = (props: string[]): any => {
	const editor = useEditor();
	const project = useProject();

	return props.reduce((memo, prop) => {
		memo[prop] = computed({
			get: () => {
				const id = editor.activeLayerIds[0];
				return project.byIds[id][prop];
			},
			set: (value: any) => {
				const id = editor.activeLayerIds[0];
				project.updateProps(id, {
					[prop]: sanitize(prop, value)
				});
			}
		});
		return memo;
	}, {});
};

export default useProps;
