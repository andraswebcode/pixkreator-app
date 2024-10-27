import { filters, T2DPipelineState } from 'fabric';

type GammaOwnProps = {
	red: number;
	green: number;
	blue: number;
};

const defaults: GammaOwnProps = {
	red: 0,
	green: 0,
	blue: 0
};

class PROGamma extends filters.BaseFilter<'Gamma', GammaOwnProps> {
	declare red: number;
	declare green: number;
	declare blue: number;

	static type = 'Gamma';

	static defaults = defaults;

	private _rgbValues = {
		r: new Uint8Array(256),
		g: new Uint8Array(256),
		b: new Uint8Array(256)
	};

	applyTo2d({ imageData: { data } }: T2DPipelineState): void {
		const rgb = this._rgbValues;
		const rInv = 1 / this.red;
		const gInv = 1 / this.green;
		const bInv = 1 / this.blue;

		for (let i = 0; i < 256; i++) {
			rgb.r[i] = Math.pow(i / 255, rInv) * 255;
			rgb.g[i] = Math.pow(i / 255, gInv) * 255;
			rgb.b[i] = Math.pow(i / 255, bInv) * 255;
		}
		for (let i = 0; i < data.length; i += 4) {
			data[i] = rgb.r[data[i]];
			data[i + 1] = rgb.g[data[i + 1]];
			data[i + 2] = rgb.b[data[i + 2]];
		}
	}
}

export { PROGamma };
