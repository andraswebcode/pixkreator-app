import { controlsUtils, Polyline } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPolyline extends Defaults(Polyline) {
	_getModifyControls() {
		return controlsUtils.createPolyControls(this);
	}
}

export { PROPolyline };
