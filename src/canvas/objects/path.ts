import { controlsUtils, Path } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPath extends Defaults(Path) {
	_getModifyControls() {
		return controlsUtils.createPathControls(this);
	}
}

export { PROPath };
