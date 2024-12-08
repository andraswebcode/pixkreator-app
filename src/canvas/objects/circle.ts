import { Circle } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { PRORect } from './rect';

class PROCircle extends Defaults(Circle) {
	_getModifyControls() {
		return PRORect.prototype._getModifyControls.call(this);
	}
}

export { PROCircle };
