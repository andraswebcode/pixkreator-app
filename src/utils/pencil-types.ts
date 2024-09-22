import { EditorPencilType } from '../store/editor';

type PenType = {
	label: string;
	value: EditorPencilType;
};

const pencilTypes: PenType[] = [
	{
		label: 'Brush',
		value: 'brush'
	},
	{
		label: 'Rectangle',
		value: 'rect'
	},
	{
		label: 'Ellipse',
		value: 'ellipse'
	},
	{
		label: 'Circle',
		value: 'circle'
	},
	{
		label: 'Triangle',
		value: 'triangle'
	},
	{
		label: 'Arrow',
		value: 'arrow'
	}
];

export default pencilTypes;
