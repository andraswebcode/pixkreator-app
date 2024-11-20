import { CornerDotType, CornerSquareType, DotType, ErrorCorrectionLevel } from 'qr-code-styling';

export type AppID =
	| 'qr-code-generator'
	| 'chart-maker'
	| 'background-remover'
	| 'pattern-creator'
	| 'color-palette-extractor'
	| 'color-wheel'
	| 'collage-maker'
	| 'image-upscaler'
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
