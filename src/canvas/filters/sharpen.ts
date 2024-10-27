import { filters, T2DPipelineState, TMatColorMatrix, TWebGLPipelineState } from 'fabric';

type SharpenOwnProps = {
	amount: number;
	matrix: TMatColorMatrix;
	colorsOnly: boolean;
};

const defaults: SharpenOwnProps = {
	amount: 1,
	colorsOnly: false,
	matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
};

class PROSharpen extends filters.ColorMatrix<'Sharpen', SharpenOwnProps> {
	declare amount: number;

	static type = 'Sharpen';

	static defaults = defaults;

	applyTo(options: TWebGLPipelineState | T2DPipelineState): void {
		// const a = this.amount;
		// this.matrix = [];
		super.applyTo(options);
	}
}

export { PROSharpen };
