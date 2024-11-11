import { controlsUtils, Polygon } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPolygon extends Defaults(Polygon) {
	_createModifyControls() {
		this.controls = controlsUtils.createPolyControls(this);
	}
}

export { PROPolygon };
