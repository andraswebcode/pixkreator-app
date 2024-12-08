import { Ellipse } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { PRORect } from './rect';

class PROEllipse extends Defaults(Ellipse) {
	_getModifyControls() {
		return PRORect.prototype._getModifyControls.call(this);
	}
}

export { PROEllipse };
