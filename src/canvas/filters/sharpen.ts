import { filters } from 'fabric';

type SharpenOwnProps = {};

class PROSharpen extends filters.BaseFilter<'Sharpen', SharpenOwnProps> {
	static type = 'Sharpen';
}

export { PROSharpen };
