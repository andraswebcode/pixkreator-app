import { FabricObject } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROChart extends Defaults(FabricObject) {
	static type = 'Chart';
}

export { PROChart };
