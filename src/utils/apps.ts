import { ErrorCorrectionLevel } from 'qr-code-styling';
import { AppID } from '../types/apps';

type App = {
	id: AppID;
	title: string;
	description: string;
};

const apps: App[] = [
	{
		id: 'qr-code-generator',
		title: 'QR Code Generator',
		description: 'Easily generate and customize QR codes for your designs.'
	},
	{
		id: 'chart-maker',
		title: 'Chart Maker',
		description: 'Easily create stunning data visualizations for your projects.'
	},
	{
		id: 'background-remover',
		title: 'Background Remover',
		description: 'Easily remove backgrounds from your images with precision.'
	},
	{
		id: 'pattern-creator',
		title: 'Pattern Creator',
		description: 'Design seamless patterns to elevate your backgrounds and layouts.'
	},
	{
		id: 'color-palette-extractor',
		title: 'Color Palette Extractor',
		description: 'Extract color palettes from your images for a cohesive design.'
	}
];

const qrCodeECLs: {
	label: string;
	value: ErrorCorrectionLevel;
}[] = [
	{
		label: 'Low',
		value: 'L'
	},
	{
		label: 'Medium',
		value: 'M'
	},
	{
		label: 'Quartile',
		value: 'Q'
	},
	{
		label: 'High',
		value: 'H'
	}
];

export { apps, qrCodeECLs };
