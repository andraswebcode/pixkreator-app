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
		id: 'image-upscaler',
		title: 'Image Upscaler',
		description: 'Boost image resolution for flawless quality on any platform.'
	},
	{
		id: 'color-wheel',
		title: 'Color Wheel',
		description: 'Create perfect combinations with an interactive color wheel.'
	},
	{
		id: 'color-palette-extractor',
		title: 'Color Palette Extractor',
		description: 'Extract color palettes from your images for a cohesive design.'
	},
	{
		id: 'collage-maker',
		title: 'Collage Maker',
		description: 'Combine photos and designs into beautiful collages.'
	},
	{
		id: 'design-generator',
		title: 'Design Generator',
		description: 'Create templates from prompts with perfect images, text, and layouts.'
	},
	{
		id: 'pattern-creator',
		title: 'Pattern Creator',
		description: 'Design seamless patterns to create backgrounds.'
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
