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
				return project.byIds[id]?.[prop];
			},
			set: (value: any) => {
				const id = editor.activeLayerIds[0];
				const type = project.byIds[id]?.type;
				const others: any = {};

				if (type === 'Ellipse') {
					if (prop === 'width') {
						others.rx = sanitize('rx', value / 2);
					} else if (prop === 'height') {
						others.ry = sanitize('ry', value / 2);
					}
				} else if (type === 'Circle') {
					if (prop === 'radius') {
						others.width = sanitize('radius', value * 2);
						others.height = sanitize('radius', value * 2);
					}
				}

				project.updateProps(id, {
					[prop]: sanitize(prop, value),
					...others
				});
			}
		});
		return memo;
	}, {});
};

export default useProps;
