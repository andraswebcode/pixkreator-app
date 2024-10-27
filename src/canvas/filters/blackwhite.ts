import { filters, T2DPipelineState } from 'fabric';

type BlackWhiteOwnProps = {
	threshold: number;
};

const defaults: BlackWhiteOwnProps = {
	threshold: 0.5
};

class PROBlackWhite extends filters.BaseFilter<'BlackWhite', BlackWhiteOwnProps> {
	declare threshold: number;

	static type = 'BlackWhite';

	static defaults = defaults;

	applyTo2d({ imageData: { data } }: T2DPipelineState): void {
		const threshold = this.threshold * 255;
		for (let i = 0; i < data.length; i += 4) {
			const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
			const value = avg < threshold ? 0 : 255;

			data[i] = value; // R
			data[i + 1] = value; // G
			data[i + 2] = value; // B
		}
	}
}

export { PROBlackWhite };
