import { controlsUtils, Polygon } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPolygon extends Defaults(Polygon) {
	_getModifyControls() {
		return controlsUtils.createPolyControls(this);
	}
}

export { PROPolygon };
