export type AppID =
	| 'qr-code-generator'
	| 'chart-maker'
	| 'background-remover'
	| 'pattern-creator'
	| 'color-palette-extractor';

export interface QRCodeOptions {
	text: string;
	size: number;
}
