import { filters, Color, T2DPipelineState } from 'fabric';
import { clamp } from '../../utils/functions';

type DuotoneOwnProps = {
	lightColor: string;
	darkColor: string;
	threshold: number;
};

const defaults: DuotoneOwnProps = {
	lightColor: '#FFFFFF',
	darkColor: '#000000',
	threshold: 0.5
};

class PRODuotone extends filters.BaseFilter<'Duotone', DuotoneOwnProps> {
	declare darkColor: string;
	declare lightColor: string;
	declare threshold: number;

	static type = 'Duotone';

	static defaults = defaults;

	applyTo2d({ imageData: { data } }: T2DPipelineState): void {
		const darkColor = new Color(this.darkColor).getSource();
		const lightColor = new Color(this.lightColor).getSource();
		const threshold = this.threshold * 255;
		console.log(darkColor, lightColor);

		for (let i = 0; i < data.length; i += 4) {
			const grayscale = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
			const ratio = clamp((grayscale - threshold) / (255 - threshold), 0, 1);
			data[i] = darkColor[0] * (1 - ratio) + lightColor[0] * ratio; // R
			data[i + 1] = darkColor[1] * (1 - ratio) + lightColor[1] * ratio; // G
			data[i + 2] = darkColor[2] * (1 - ratio) + lightColor[2] * ratio; // B
		}
	}
}

export { PRODuotone };
