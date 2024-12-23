import { computed } from 'vue';
import { useEditor, useProject } from '../store';
import { sanitize } from '../utils/sanitizer';
import { IDList } from '../store/project';

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
				const layer = project.getFirstLayer(editor.activeLayerIds);
				const { type } = layer;
				const others: any = {};
				const omitChildProps = [
					'left',
					'top',
					'scaleX',
					'scaleY',
					'skewX',
					'skewY',
					'flipX',
					'flipY',
					'angle',
					'opacity',
					'shadow',
					'globalCompositeOperation'
				];

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
				} else if (type === 'QRCode') {
					if (prop === 'size') {
						others.width = sanitize('width', value);
						others.height = sanitize('height', value);
					}
				}

				if (type === 'Group' && !omitChildProps.includes(prop)) {
					project.updateProps([layer.id].concat(layer.childIds as IDList), {
						[prop]: sanitize(prop, value)
					});
				} else {
					project.updateProps(layer.id, {
						[prop]: sanitize(prop, value),
						...others
					});
				}
			}
		});
		return memo;
	}, {});
};

export default useProps;
