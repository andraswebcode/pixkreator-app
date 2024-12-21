import { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel } from 'qr-code-styling';

export type AppID =
	| 'qr-code-generator'
	| 'chart-maker'
	| 'background-remover'
	| 'image-upscaler'
	| 'erase-object'
	| 'inpaint'
	| 'sketch-to-image'
	| 'pattern-creator'
	| 'color-palette-extractor'
	| 'color-wheel'
	| 'collage-maker'
	| 'design-generator';

export interface QRCodeOptions {
	text: string;
	size: number;
	margin: number;
	ecl: ErrorCorrectionLevel;
	background: string;
	imageSrc: string;
	imageSize: number;
	imageMargin: number;
	dotsColor: string;
	dotsType: DotType;
	cornerSquareType: CornerSquareType | '';
	cornerSquareColor: string;
	cornerDotType: CornerDotType | '';
	cornerDotColor: string;
}

export type CollageItem = {
	src: string;
	width: number; // percentage values
	height: number;
};
