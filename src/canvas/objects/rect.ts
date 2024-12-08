import { Rect } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { ResizeControl } from '../controls/resize';

class PRORect extends Defaults(Rect) {
	_getModifyControls() {
		return {
			mt: new ResizeControl({
				x: 0,
				y: -0.5
			}),
			mb: new ResizeControl({
				x: 0,
				y: 0.5
			}),
			ml: new ResizeControl({
				x: -0.5,
				y: 0
			}),
			mr: new ResizeControl({
				x: 0.5,
				y: 0
			})
		};
	}
}

export { PRORect };
