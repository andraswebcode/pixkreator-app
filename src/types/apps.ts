import { ErrorCorrectionLevel } from 'qr-code-styling';

export type AppID =
	| 'qr-code-generator'
	| 'chart-maker'
	| 'background-remover'
	| 'pattern-creator'
	| 'color-palette-extractor';

export interface QRCodeOptions {
	text: string;
	size: number;
	margin: number;
	ecl: ErrorCorrectionLevel;
}
