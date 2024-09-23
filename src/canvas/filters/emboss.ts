import { filters } from 'fabric';

type EmbossOwnProps = {};

class PROEmboss extends filters.BaseFilter<'Emboss', EmbossOwnProps> {
	static type = 'Emboss';
}

export { PROEmboss };
