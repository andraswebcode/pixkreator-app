import { controlsUtils, Polyline } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPolyline extends Defaults(Polyline) {
	_createModifyControls() {
		this.controls = controlsUtils.createPolyControls(this);
	}
}

export { PROPolyline };
